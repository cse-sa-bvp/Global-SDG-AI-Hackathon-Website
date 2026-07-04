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
  onSnapshot,
  serverTimestamp 
} from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { uploadSubmission, validateSubmissionFile } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import type { User, Submission, Team } from '@/types';

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
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submissionsEnabled, setSubmissionsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubmissionForm>({
    resolver: zodResolver(submissionSchema),
  });

  // Real-time listener for submissions
  useEffect(() => {
    if (!user || !userData?.teamId) return;

    const submissionQuery = query(
      collection(db, 'submissions'),
      where('teamId', '==', userData.teamId)
    );

    const unsubscribe = onSnapshot(submissionQuery, (snapshot) => {
      if (!snapshot.empty) {
        const submissionData = snapshot.docs[0].data();
        setSubmission({
          id: snapshot.docs[0].id,
          ...submissionData,
          submittedAt: submissionData.submittedAt?.toDate?.() || submissionData.submittedAt,
        } as Submission);
      } else {
        setSubmission(null);
      }
    });

    return () => unsubscribe();
  }, [user, userData?.teamId]);

  // Real-time listener for submission settings
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'submissions'), (doc) => {
      if (doc.exists()) {
        setSubmissionsEnabled(doc.data().enabled || false);
      }
    });

    return () => unsubscribe();
  }, []);

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
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateSubmissionFile(file);
      if (!validation.valid) {
        toast.error(validation.error);
        e.target.value = '';
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: SubmissionForm) => {
    if (!user || !userData?.teamId || !teamData) {
      toast.error('You need to be in a team to submit');
      return;
    }

    if (uploading) {
      toast.error('Upload already in progress');
      return;
    }

    const file = selectedFile || data.pptFile[0];
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const validation = validateSubmissionFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Supabase Storage
      const pptUrl = await uploadSubmission(teamData.teamCode, file);
      
      clearInterval(progressInterval);
      setUploadProgress(95);

      // Save metadata to Firestore
      const submissionRef = doc(collection(db, 'submissions'));
      await setDoc(submissionRef, {
        teamId: userData.teamId,
        teamCode: teamData.teamCode,
        projectName: data.projectName,
        description: data.description,
        github: data.github,
        pptUrl,
        pptFileName: file.name,
        submittedAt: serverTimestamp(),
      });

      setUploadProgress(100);
      toast.success('Submission uploaded successfully!');
      reset();
      setSelectedFile(null);
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error?.message || 'Failed to upload submission');
    } finally {
      setUploading(false);
      setUploadProgress(0);
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
              <Label htmlFor="pptFile">Presentation (PDF, PPT, or PPTX - Max 20MB)</Label>
              <Input 
                id="pptFile" 
                type="file" 
                accept=".pdf,.ppt,.pptx" 
                {...register('pptFile')} 
                onChange={handleFileChange}
                disabled={uploading}
              />
              {selectedFile && (
                <p className="text-sm text-neutral-600">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
              {errors.pptFile && (
                <p className="text-sm text-red-500">Please select a file</p>
              )}
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-pulse" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Project
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
