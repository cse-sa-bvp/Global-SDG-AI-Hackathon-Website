'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UsersRound, CheckCircle, DollarSign, Upload, Clock } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeams: 0,
    registeredTeams: 0,
    pendingPaymentTeams: 0,
    completedPayments: 0,
    totalSubmissions: 0,
    pendingJoinRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const teamsSnapshot = await getDocs(collection(db, 'teams'));
        
        const registeredTeamsQuery = query(
          collection(db, 'teams'),
          where('registrationStatus', '==', 'registered')
        );
        const registeredTeamsSnapshot = await getDocs(registeredTeamsQuery);

        const pendingPaymentTeamsQuery = query(
          collection(db, 'teams'),
          where('registrationStatus', '==', 'pending_payment')
        );
        const pendingPaymentTeamsSnapshot = await getDocs(pendingPaymentTeamsQuery);

        const completedPaymentsQuery = query(
          collection(db, 'teams'),
          where('paymentStatus', '==', 'completed')
        );
        const completedPaymentsSnapshot = await getDocs(completedPaymentsQuery);

        const submissionsSnapshot = await getDocs(collection(db, 'submissions'));

        const pendingJoinRequestsQuery = query(
          collection(db, 'joinRequests'),
          where('status', '==', 'pending')
        );
        const pendingJoinRequestsSnapshot = await getDocs(pendingJoinRequestsQuery);

        setStats({
          totalUsers: usersSnapshot.size,
          totalTeams: teamsSnapshot.size,
          registeredTeams: registeredTeamsSnapshot.size,
          pendingPaymentTeams: pendingPaymentTeamsSnapshot.size,
          completedPayments: completedPaymentsSnapshot.size,
          totalSubmissions: submissionsSnapshot.size,
          pendingJoinRequests: pendingJoinRequestsSnapshot.size,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-neutral-600">Overview of hackathon statistics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-neutral-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <UsersRound className="h-4 w-4 text-neutral-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeams}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Registered Teams</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.registeredTeams}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPaymentTeams}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Upload className="h-4 w-4 text-neutral-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Join Requests Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.pendingJoinRequests}</div>
          <p className="text-sm text-neutral-600">Pending team join requests</p>
        </CardContent>
      </Card>
    </div>
  );
}
