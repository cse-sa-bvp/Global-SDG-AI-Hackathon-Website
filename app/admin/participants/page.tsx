'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { User } from '@/types';

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<User[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersList = usersSnapshot.docs.map(doc => ({
          ...doc.data()
        })) as User[];
        setParticipants(usersList);
        setFilteredParticipants(usersList);
      } catch (error) {
        console.error('Error fetching participants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  useEffect(() => {
    const filtered = participants.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.college.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParticipants(filtered);
  }, [searchTerm, participants]);

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Department', 'Year', 'Team Status'];
    const rows = filteredParticipants.map(p => [
      p.name,
      p.email,
      p.phone,
      p.college,
      p.department,
      p.year,
      p.teamId ? 'In Team' : 'No Team'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'participants.csv';
    a.click();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Participants</h1>
          <p className="text-neutral-600">Manage participant registrations</p>
        </div>
        <Button onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Participants ({filteredParticipants.length})</CardTitle>
          <Input
            placeholder="Search by name, email, or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">College</th>
                  <th className="text-left p-3">Department</th>
                  <th className="text-left p-3">Team</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.uid} className="border-b hover:bg-neutral-50">
                    <td className="p-3">{participant.name}</td>
                    <td className="p-3">{participant.email}</td>
                    <td className="p-3">{participant.phone}</td>
                    <td className="p-3">{participant.college}</td>
                    <td className="p-3">{participant.department}</td>
                    <td className="p-3">
                      {participant.teamId ? (
                        <span className="text-green-600">In Team</span>
                      ) : (
                        <span className="text-neutral-400">No Team</span>
                      )}
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
