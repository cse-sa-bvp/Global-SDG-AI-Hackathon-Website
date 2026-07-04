'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Announcement } from '@/types';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener for announcements
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'announcements'), (snapshot) => {
      const announcementsList = snapshot.docs
        .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
        } as Announcement;
        })
        .filter((announcement) => announcement.visible !== false)
        .sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        });
      setAnnouncements(announcementsList);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching announcements:', error);
      setLoading(false);
    });

    return () => unsubscribe();
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
