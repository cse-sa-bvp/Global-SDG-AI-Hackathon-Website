'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, where } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Download, Search, CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Payment, Team, User } from '@/types';

interface PaymentWithDetails extends Payment {
  teamName?: string;
  leaderName?: string;
  leaderEmail?: string;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentWithDetails[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'failed'>('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [searchQuery, statusFilter, payments]);

  const fetchPayments = async () => {
    try {
      // Fetch all payments
      const paymentsQuery = query(
        collection(db, 'payments'),
        orderBy('createdAt', 'desc')
      );
      const paymentsSnapshot = await getDocs(paymentsQuery);
      const paymentsData = paymentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        paidAt: doc.data().paidAt?.toDate(),
      })) as Payment[];

      // Fetch team and leader details
      const paymentsWithDetails = await Promise.all(
        paymentsData.map(async (payment) => {
          const teamDoc = await getDocs(
            query(collection(db, 'teams'), where('__name__', '==', payment.teamId))
          );
          const teamData = teamDoc.docs[0]?.data() as Team;

          let leaderData: User | undefined;
          if (payment.leaderId) {
            const leaderDoc = await getDocs(
              query(collection(db, 'users'), where('__name__', '==', payment.leaderId))
            );
            leaderData = leaderDoc.docs[0]?.data() as User;
          }

          return {
            ...payment,
            teamName: teamData?.teamName,
            leaderName: leaderData?.name,
            leaderEmail: leaderData?.email,
          };
        })
      );

      setPayments(paymentsWithDetails);
      setFilteredPayments(paymentsWithDetails);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const filterPayments = () => {
    let filtered = [...payments];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (payment) =>
          payment.teamName?.toLowerCase().includes(query) ||
          payment.leaderName?.toLowerCase().includes(query) ||
          payment.leaderEmail?.toLowerCase().includes(query) ||
          payment.paymentId?.toLowerCase().includes(query) ||
          payment.orderId?.toLowerCase().includes(query)
      );
    }

    setFilteredPayments(filtered);
  };

  const exportToCSV = () => {
    const headers = [
      'Team Name',
      'Leader Name',
      'Leader Email',
      'Amount',
      'Status',
      'Payment ID',
      'Order ID',
      'Payment Date',
    ];

    const rows = filteredPayments.map((payment) => [
      payment.teamName || 'N/A',
      payment.leaderName || 'N/A',
      payment.leaderEmail || 'N/A',
      `₹${payment.amount}`,
      payment.status,
      payment.paymentId,
      payment.orderId,
      payment.paidAt ? new Date(payment.paidAt).toLocaleString() : 'N/A',
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Payments exported to CSV');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = {
    total: payments.length,
    paid: payments.filter((p) => p.status === 'paid').length,
    pending: payments.filter((p) => p.status === 'pending').length,
    failed: payments.filter((p) => p.status === 'failed').length,
    totalRevenue: payments
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p>Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments Management</h1>
        <p className="text-neutral-600">View and manage all payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Payments</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.paid}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Failed</CardDescription>
            <CardTitle className="text-3xl text-red-600">{stats.failed}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">₹{stats.totalRevenue}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <Input
                  placeholder="Search by team, leader, or payment ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="paid">Paid ({stats.paid})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="failed">Failed ({stats.failed})</TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Leader</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Payment Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-neutral-500">
                          No payments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">
                            {payment.teamName || 'N/A'}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{payment.leaderName || 'N/A'}</p>
                              <p className="text-xs text-neutral-500">
                                {payment.leaderEmail || 'N/A'}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>₹{payment.amount}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            <code className="text-xs bg-neutral-100 px-2 py-1 rounded">
                              {payment.paymentId}
                            </code>
                          </TableCell>
                          <TableCell>
                            {payment.paidAt
                              ? new Date(payment.paidAt).toLocaleString()
                              : 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
