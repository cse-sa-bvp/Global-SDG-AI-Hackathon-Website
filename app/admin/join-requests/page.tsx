'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { JoinRequest } from '@/types';

export default function JoinRequestsPage() {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<JoinRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsQuery = query(
          collection(db, 'joinRequests'),
          orderBy('createdAt', 'desc')
        );
        const requestsSnapshot = await getDocs(requestsQuery);
        const requestsList = requestsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JoinRequest[];
        setRequests(requestsList);
        setFilteredRequests(requestsList);
      } catch (error) {
        console.error('Error fetching join requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const filtered = requests.filter(
      (r) =>
        r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.teamCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [searchTerm, requests]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const acceptedCount = requests.filter(r => r.status === 'accepted').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Join Requests</h1>
        <p className="text-neutral-600">Monitor team join request activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{acceptedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Join Requests ({filteredRequests.length})</CardTitle>
          <Input
            placeholder="Search by name, email, or team code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">College</th>
                  <th className="text-left p-3">Team Code</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-neutral-50">
                    <td className="p-3 font-medium">{request.userName}</td>
                    <td className="p-3">{request.email}</td>
                    <td className="p-3">{request.college}</td>
                    <td className="p-3">{request.teamCode}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          request.status === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : request.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-neutral-600">
                      {request.createdAt && new Date(request.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}