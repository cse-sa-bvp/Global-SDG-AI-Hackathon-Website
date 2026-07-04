'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection,
  query,
  where,
  getDocs,
  serverTimestamp 
} from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from '@/lib/firebase/storage';
import { storage } from '@/lib/firebase/storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { User, Submission } from '@/types';

const submissionSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  github: z.string().url('Must be a valid URL'),
  pptFile: z.any(),
});

type SubmissionForm = z.infer<typeof submissionSchema>;

export default function SubmissionPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submissionsEnabled, setSubmissionsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SubmissionForm>({
    resolver: zodResolver(submissionSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as User;
          setUserData(data);

          if (data.teamId) {
            const submissionQuery = query(
              collection(db, 'submissions'),
              where('teamId', '==', data.teamId)
            );
            const submissionSnapshot = await getDocs(submissionQuery);
            if (!submissionSnapshot.empty) {
              setSubmission({
                id: submissionSnapshot.docs[0].id,
                ...submissionSnapshot.docs[0].data()
              } as Submission);
            }
          }
        }

        const settingsDoc = await getDoc(doc(db, 'settings', 'submissions'));
        if (settingsDoc.exists()) {
          setSubmissionsEnabled(settingsDoc.data().enabled || false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const onSubmit = async (data: SubmissionForm) => {
    if (!user || !userData?.teamId) {
      toast.error('You need to be in a team to submit');
      return;
    }

    setUploading(true);
    try {
      const file = data.pptFile[0];
      if (!file) {
        toast.error('Please select a PPT file');
        return;
      }

      const storageRef = ref(storage, `submissions/${userData.teamId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const pptUrl = await getDownloadURL(storageRef);

      const submissionRef = doc(collection(db, 'submissions'));
      await setDoc(submissionRef, {
        teamId: userData.teamId,
        projectName: data.projectName,
        description: data.description,
        github: data.github,
        pptUrl,
        submittedAt: serverTimestamp(),
      });

      toast.success('Submission uploaded successfully!');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to upload submission');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.teamId) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Submission</h1>
          <p className="text-neutral-600">Submit your project</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-neutral-600 text-center">
              You need to join a team before you can submit
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submission) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Submission</h1>
          <p className="text-neutral-600">Your project submission</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{submission.projectName}</CardTitle>
            <CardDescription>
              Submitted on {submission.submittedAt && new Date(submission.submittedAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-neutral-700">{submission.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">GitHub Repository</h3>
              <a
                href={submission.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {submission.github}
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Presentation</h3>
              <a
                href={submission.pptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Download PPT
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!submissionsEnabled) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Submission</h1>
          <p className="text-neutral-600">Submit your project</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-neutral-600 text-center text-lg font-semibold">
              Submissions Closed
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Submission</h1>
        <p className="text-neutral-600">Submit your project</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Project</CardTitle>
          <CardDescription>Fill in the details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" {...register('projectName')} />
              {errors.projectName && (
                <p className="text-sm text-red-500">{errors.projectName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                {...register('description')}
                className="w-full min-h-[100px] rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub Repository URL</Label>
              <Input id="github" {...register('github')} placeholder="https://github.com/..." />
              {errors.github && (
                <p className="text-sm text-red-500">{errors.github.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pptFile">Presentation (PPT/PPTX)</Label>
              <Input id="pptFile" type="file" accept=".ppt,.pptx" {...register('pptFile')} />
              {errors.pptFile && (
                <p className="text-sm text-red-500">Please select a file</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Submit Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
