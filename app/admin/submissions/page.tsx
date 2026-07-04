'use client';

import { useEffect, useState } from 'react';
import { collection, doc, setDoc, onSnapshot, getDoc, query, orderBy } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ExternalLink, Download, Search } from 'lucide-react';
import type { Submission, Team, User } from '@/types';

interface SubmissionWithDetails extends Submission {
  teamName?: string;
  leaderName?: string;
  leaderEmail?: string;
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionWithDetails[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<SubmissionWithDetails[]>([]);
  const [submissionsEnabled, setSubmissionsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Real-time listener for submissions
  useEffect(() => {
    const submissionsQuery = query(
      collection(db, 'submissions'),
      orderBy('submittedAt', 'desc')
    );

    const unsubscribe = onSnapshot(submissionsQuery, async (snapshot) => {
      const submissionsList = await Promise.all(
        snapshot.docs.map(async (docSnapshot) => {
          const data = docSnapshot.data();
          
          // Fetch team details
          let teamName = 'Unknown Team';
          let leaderName = 'Unknown';
          let leaderEmail = '';

          if (data.teamId) {
            const teamDoc = await getDoc(doc(db, 'teams', data.teamId));
            if (teamDoc.exists()) {
              const teamData = teamDoc.data() as Team;
              teamName = teamData.teamName;
              
              // Fetch leader details
              const leaderDoc = await getDoc(doc(db, 'users', teamData.leaderId));
              if (leaderDoc.exists()) {
                const leaderData = leaderDoc.data() as User;
                leaderName = leaderData.name;
                leaderEmail = leaderData.email;
              }
            }
          }

          return {
            id: docSnapshot.id,
            ...data,
            submittedAt: data.submittedAt?.toDate?.() || data.submittedAt,
            teamName,
            leaderName,
            leaderEmail,
          } as SubmissionWithDetails;
        })
      );

      setSubmissions(submissionsList);
      setFilteredSubmissions(submissionsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time listener for submission settings
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'submissions'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setSubmissionsEnabled(docSnapshot.data().enabled || false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Filter submissions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSubmissions(submissions);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = submissions.filter(
      (sub) =>
        sub.teamName?.toLowerCase().includes(query) ||
        sub.teamCode?.toLowerCase().includes(query) ||
        sub.leaderName?.toLowerCase().includes(query) ||
        sub.projectName?.toLowerCase().includes(query) ||
        sub.description?.toLowerCase().includes(query)
    );
    setFilteredSubmissions(filtered);
  }, [searchQuery, submissions]);

  const toggleSubmissions = async () => {
    try {
      await setDoc(doc(db, 'settings', 'submissions'), {
        enabled: !submissionsEnabled,
      }, { merge: true });
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
          <div className="flex items-center justify-between">
            <CardTitle>All Submissions ({filteredSubmissions.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search submissions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSubmissions.length === 0 ? (
            <p className="text-neutral-600 text-center py-8">
              {searchQuery ? 'No submissions found matching your search' : 'No submissions yet'}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{submission.projectName}</h3>
                      <div className="text-sm text-neutral-600 space-y-1 mt-1">
                        <p><strong>Team:</strong> {submission.teamName} ({submission.teamCode})</p>
                        <p><strong>Leader:</strong> {submission.leaderName} ({submission.leaderEmail})</p>
                      </div>
                    </div>
                    <span className="text-sm text-neutral-500 whitespace-nowrap">
                      {submission.submittedAt && new Date(submission.submittedAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-neutral-700 mb-3 line-clamp-2">{submission.description}</p>
                  
                  {submission.pptFileName && (
                    <p className="text-sm text-neutral-600 mb-3">
                      <strong>File:</strong> {submission.pptFileName}
                    </p>
                  )}
                  
                  <div className="flex gap-3 flex-wrap">
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
                      asChild
                    >
                      <a
                        href={submission.pptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Open Submission
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
