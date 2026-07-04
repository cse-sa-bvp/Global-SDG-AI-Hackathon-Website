'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Team } from '@/types';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        setFilteredTeams(teamsList);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const filtered = teams.filter(
      (t) =>
        t.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.teamCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Teams</h1>
        <p className="text-neutral-600">Manage team registrations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Teams ({filteredTeams.length})</CardTitle>
          <Input
            placeholder="Search by team name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Team Name</th>
                  <th className="text-left p-3">Team Code</th>
                  <th className="text-left p-3">Members</th>
                  <th className="text-left p-3">Payment</th>
                  <th className="text-left p-3">Registration</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team) => (
                  <tr key={team.teamId} className="border-b hover:bg-neutral-50">
                    <td className="p-3 font-medium">{team.teamName}</td>
                    <td className="p-3">{team.teamCode}</td>
                    <td className="p-3">{team.members.length}/4</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          team.paymentStatus === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {team.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          team.registrationStatus === 'registered'
                            ? 'bg-green-100 text-green-700'
                            : team.registrationStatus === 'pending_payment'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        {team.registrationStatus.replace('_', ' ')}
                      </span>
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
