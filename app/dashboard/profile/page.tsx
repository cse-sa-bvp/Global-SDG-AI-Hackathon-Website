'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, getDoc, updateDoc } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { User } from '@/types';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  college: z.string().min(2, 'College name is required'),
  department: z.string().min(2, 'Department is required'),
  year: z.string().min(1, 'Year is required'),
  gender: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as User;
          setUserData(data);
          reset({
            name: data.name,
            phone: data.phone,
            college: data.college,
            department: data.department,
            year: data.year,
            gender: data.gender || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, reset]);

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;

    setUpdating(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: data.name,
        phone: data.phone,
        college: data.college,
        department: data.department,
        year: data.year,
        gender: data.gender || '',
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-neutral-600">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ''} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...register('phone')} />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="college">College Name</Label>
              <Input id="college" {...register('college')} />
              {errors.college && <p className="text-sm text-red-500">{errors.college.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" {...register('department')} />
              {errors.department && <p className="text-sm text-red-500">{errors.department.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input id="year" {...register('year')} />
              {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender (Optional)</Label>
              <Input id="gender" {...register('gender')} />
            </div>

            <Button type="submit" disabled={updating}>
              {updating ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
