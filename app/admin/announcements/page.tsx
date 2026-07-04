'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp 
} from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import type { Announcement } from '@/types';

const announcementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type AnnouncementForm = z.infer<typeof announcementSchema>;

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AnnouncementForm>({
    resolver: zodResolver(announcementSchema),
  });

  // Real-time listener for announcements
  useEffect(() => {
    const announcementsQuery = query(
      collection(db, 'announcements'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(announcementsQuery, (snapshot) => {
      const announcementsList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
        } as Announcement;
      });
      setAnnouncements(announcementsList);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching announcements:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: AnnouncementForm) => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        title: data.title,
        description: data.description,
        visible: true,
        createdAt: serverTimestamp(),
      });

      toast.success('Announcement created successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to create announcement');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      await deleteDoc(doc(db, 'announcements', id));
      toast.success('Announcement deleted');
    } catch (error) {
      toast.error('Failed to delete announcement');
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await updateDoc(doc(db, 'announcements', id), {
        visible: !currentVisibility,
      });
      toast.success('Visibility updated');
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Announcements</h1>
        <p className="text-neutral-600">Create and manage announcements</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                {...register('description')}
                className="w-full min-h-25 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Announcement'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Announcements ({announcements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{announcement.title}</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={announcement.visible ? 'default' : 'outline'}
                      onClick={() => toggleVisibility(announcement.id, announcement.visible)}
                    >
                      {announcement.visible ? 'Published' : 'Hidden'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteAnnouncement(announcement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-neutral-700 mb-2">{announcement.description}</p>
                <p className="text-xs text-neutral-400">
                  {announcement.createdAt && new Date(announcement.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
