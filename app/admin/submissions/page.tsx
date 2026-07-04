'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc, setDoc } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ExternalLink, Download } from 'lucide-react';
import type { Submission } from '@/types';

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsEnabled, setSubmissionsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const submissionsSnapshot = await getDocs(collection(db, 'submissions'));
      const submissionsList = submissionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Submission[];
      setSubmissions(submissionsList);

      const settingsDoc = await getDoc(doc(db, 'settings', 'submissions'));
      if (settingsDoc.exists()) {
        setSubmissionsEnabled(settingsDoc.data().enabled || false);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubmissions = async () => {
    try {
      await setDoc(doc(db, 'settings', 'submissions'), {
        enabled: !submissionsEnabled,
      });
      setSubmissionsEnabled(!submissionsEnabled);
      toast.success(`Submissions ${!submissionsEnabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Submissions</h1>
          <p className="text-neutral-600">Manage project submissions</p>
        </div>
        <Button onClick={toggleSubmissions} variant={submissionsEnabled ? 'destructive' : 'default'}>
          {submissionsEnabled ? 'Disable Submissions' : 'Enable Submissions'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Submissions ({submissions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <p className="text-neutral-600 text-center py-8">No submissions yet</p>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{submission.projectName}</h3>
                      <p className="text-sm text-neutral-500">Team ID: {submission.teamId}</p>
                    </div>
                    <span className="text-sm text-neutral-400">
                      {submission.submittedAt && new Date(submission.submittedAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-neutral-700 mb-3">{submission.description}</p>
                  
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={submission.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a
                        href={submission.pptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PPT
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
