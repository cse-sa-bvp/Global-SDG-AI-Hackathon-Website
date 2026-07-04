'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc, serverTimestamp } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  college: z.string().min(2, 'College name is required'),
  department: z.string().min(2, 'Department is required'),
  year: z.string().min(1, 'Year is required'),
  gender: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function CompleteProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin');
    }
  }, [user, authLoading, router]);

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: data.name,
        email: user.email,
        phone: data.phone,
        college: data.college,
        department: data.department,
        year: data.year,
        gender: data.gender || '',
        role: 'participant',
        teamId: null,
        createdAt: serverTimestamp(),
      });
      
      toast.success('Profile completed successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Please provide your details to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" {...register('phone')} placeholder="1234567890" />
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
            <Input id="year" {...register('year')} placeholder="1st Year, 2nd Year, etc." />
            {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender (Optional)</Label>
            <Input id="gender" {...register('gender')} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Complete Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
