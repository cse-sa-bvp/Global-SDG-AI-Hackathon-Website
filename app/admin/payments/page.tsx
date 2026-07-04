'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Team } from '@/types';

export default function AdminPaymentsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsSnapshot = await getDocs(collection(db, 'teams'));
        const teamsList = teamsSnapshot.docs.map(doc => ({
          teamId: doc.id,
          ...doc.data()
        })) as Team[];
        setTeams(teamsList);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const completedPayments = teams.filter(t => t.paymentStatus === 'completed').length;
  const pendingPayments = teams.filter(t => t.paymentStatus === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-neutral-600">Monitor payment status</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Completed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{pendingPayments}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Status by Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Team Name</th>
                  <th className="text-left p-3">Team Code</th>
                  <th className="text-left p-3">Members</th>
                  <th className="text-left p-3">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.teamId} className="border-b hover:bg-neutral-50">
                    <td className="p-3 font-medium">{team.teamName}</td>
                    <td className="p-3">{team.teamCode}</td>
                    <td className="p-3">{team.members.length}/4</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-sm rounded ${
                          team.paymentStatus === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {team.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600">
            Payment integration with Razorpay will be implemented here. Currently showing payment status tracking only.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
