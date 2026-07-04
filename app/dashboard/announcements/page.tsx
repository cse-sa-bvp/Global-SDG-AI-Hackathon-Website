'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Announcement } from '@/types';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsQuery = query(
          collection(db, 'announcements'),
          where('visible', '==', true),
          orderBy('createdAt', 'desc')
        );
        const announcementsSnapshot = await getDocs(announcementsQuery);
        const announcementsList = announcementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Announcement[];
        setAnnouncements(announcementsList);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Announcements</h1>
        <p className="text-neutral-600">Stay updated with latest news</p>
      </div>

      {announcements.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-neutral-600 text-center">No announcements yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{announcement.title}</CardTitle>
                  <span className="text-sm text-neutral-500">
                    {announcement.createdAt && new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 whitespace-pre-wrap">{announcement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
