'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import type { User, Team, Announcement } from '@/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as User;
          setUserData(data);

          if (data.teamId) {
            const teamDoc = await getDoc(doc(db, 'teams', data.teamId));
            if (teamDoc.exists()) {
              setTeamData({ teamId: teamDoc.id, ...teamDoc.data() } as Team);
            }
          }
        }

        const announcementsQuery = query(
          collection(db, 'announcements'),
          where('visible', '==', true),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const announcementsSnapshot = await getDocs(announcementsQuery);
        const announcementsList = announcementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Announcement[];
        setAnnouncements(announcementsList);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const registrationStatus = teamData?.registrationStatus === 'registered';
  const paymentStatus = teamData?.paymentStatus === 'paid';
  const registrationPending = teamData?.registrationStatus === 'pending_payment';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {userData?.name}!</h1>
        <p className="text-neutral-600">Here&apos;s your hackathon dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Registration Status</CardTitle>
            {registrationStatus ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Clock className="h-4 w-4 text-yellow-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrationStatus ? 'Registered' : registrationPending ? 'Pending Payment' : 'Incomplete'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            {paymentStatus ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paymentStatus ? 'Completed' : 'Pending'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Status</CardTitle>
            {teamData ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamData ? 'Joined' : 'Not Joined'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <p className="text-neutral-600">No announcements yet</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border-b pb-4 last:border-0">
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{announcement.description}</p>
                  <p className="text-xs text-neutral-400 mt-2">
                    {announcement.createdAt && new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
