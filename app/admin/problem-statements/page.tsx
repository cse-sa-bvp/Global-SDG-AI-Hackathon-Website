'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  orderBy,
  query,
  serverTimestamp 
} from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, Eye, EyeOff } from 'lucide-react';
import type { ProblemStatement } from '@/types';

const problemStatementSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  track: z.string().min(1, 'Track is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  tags: z.string().min(1, 'At least one tag is required'),
  resources: z.string().optional(),
});

type ProblemStatementForm = z.infer<typeof problemStatementSchema>;

const tracks = [
  'Healthcare',
  'Education',
  'Agriculture',
  'Climate Action',
  'Smart Cities',
  'Clean Water & Sanitation',
  'Affordable Clean Energy',
  'Industry Innovation'
];

export default function ProblemStatementsPage() {
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProblemStatementForm>({
    resolver: zodResolver(problemStatementSchema),
  });

  useEffect(() => {
    fetchProblemStatements();
  }, []);

  const fetchProblemStatements = async () => {
    try {
      const problemStatementsQuery = query(
        collection(db, 'problemStatements'),
        orderBy('createdAt', 'desc')
      );
      const problemStatementsSnapshot = await getDocs(problemStatementsQuery);
      const problemStatementsList = problemStatementsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProblemStatement[];
      setProblemStatements(problemStatementsList);
    } catch (error) {
      console.error('Error fetching problem statements:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProblemStatementForm) => {
    setSubmitting(true);
    try {
      const problemStatementData = {
        title: data.title,
        description: data.description,
        track: data.track,
        difficulty: data.difficulty,
        tags: data.tags.split(',').map(tag => tag.trim()),
        resources: data.resources ? data.resources.split(',').map(resource => resource.trim()) : [],
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, 'problemStatements', editingId), {
          ...problemStatementData,
          createdAt: undefined, // Don't update createdAt when editing
        });
        toast.success('Problem statement updated successfully!');
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'problemStatements'), problemStatementData);
        toast.success('Problem statement created successfully!');
      }

      reset();
      setShowForm(false);
      fetchProblemStatements();
    } catch (error) {
      toast.error('Failed to save problem statement');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProblemStatement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this problem statement?')) return;

    try {
      await deleteDoc(doc(db, 'problemStatements', id));
      toast.success('Problem statement deleted');
      fetchProblemStatements();
    } catch (error) {
      toast.error('Failed to delete problem statement');
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await updateDoc(doc(db, 'problemStatements', id), {
        isActive: !currentVisibility,
        updatedAt: serverTimestamp(),
      });
      toast.success('Visibility updated');
      fetchProblemStatements();
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  const editProblemStatement = (problemStatement: ProblemStatement) => {
    setValue('title', problemStatement.title);
    setValue('description', problemStatement.description);
    setValue('track', problemStatement.track);
    setValue('difficulty', problemStatement.difficulty);
    setValue('tags', problemStatement.tags.join(', '));
    setValue('resources', problemStatement.resources?.join(', ') || '');
    setEditingId(problemStatement.id);
    setShowForm(true);
  };

  const cancelEdit = () => {
    reset();
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Problem Statements</h1>
          <p className="text-neutral-600">Manage hackathon problem statements by track</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Problem Statement
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{problemStatements.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {problemStatements.filter(p => p.isActive).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tracks Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {new Set(problemStatements.map(p => p.track)).size}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-orange-600">
              {problemStatements.length > 0 
                ? Math.round(problemStatements.reduce((acc, p) => 
                    acc + (p.difficulty === 'Easy' ? 1 : p.difficulty === 'Medium' ? 2 : 3), 0
                  ) / problemStatements.length * 10) / 10 
                : 0}/3
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Problem Statement' : 'Add New Problem Statement'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="track">Track</Label>
                <Select onValueChange={(value) => setValue('track', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select track" />
                  </SelectTrigger>
                  <SelectContent>
                    {tracks.map((track) => (
                      <SelectItem key={track} value={track}>
                        {track}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.track && <p className="text-sm text-red-500">{errors.track.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select onValueChange={(value) => setValue('difficulty', value as 'Easy' | 'Medium' | 'Hard')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                {errors.difficulty && <p className="text-sm text-red-500">{errors.difficulty.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  {...register('description')}
                  className="w-full min-h-[120px] rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
                  placeholder="Detailed problem description..."
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...register('tags')} placeholder="AI, ML, Web Development" />
                {errors.tags && <p className="text-sm text-red-500">{errors.tags.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resources">Resources (comma-separated, optional)</Label>
                <Input id="resources" {...register('resources')} placeholder="https://example.com, Dataset link" />
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : (editingId ? 'Update' : 'Create')} Problem Statement
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Problem Statements List */}
      <div className="space-y-4">
        {problemStatements.map((problemStatement) => (
          <Card key={problemStatement.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {problemStatement.title}
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        problemStatement.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : problemStatement.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {problemStatement.difficulty}
                    </span>
                  </CardTitle>
                  <p className="text-sm text-neutral-500 mt-1">
                    Track: {problemStatement.track} | 
                    Tags: {problemStatement.tags.join(', ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={problemStatement.isActive ? 'default' : 'outline'}
                    onClick={() => toggleVisibility(problemStatement.id, problemStatement.isActive)}
                  >
                    {problemStatement.isActive ? (
                      <><Eye className="h-4 w-4 mr-1" /> Active</>
                    ) : (
                      <><EyeOff className="h-4 w-4 mr-1" /> Hidden</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editProblemStatement(problemStatement)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteProblemStatement(problemStatement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 whitespace-pre-wrap mb-3">{problemStatement.description}</p>
              {problemStatement.resources && problemStatement.resources.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2">Resources:</p>
                  <ul className="text-sm text-blue-600 space-y-1">
                    {problemStatement.resources.map((resource, index) => (
                      <li key={index}>
                        <a href={resource} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {resource}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-xs text-neutral-400 mt-3">
                Created: {problemStatement.createdAt && new Date(problemStatement.createdAt).toLocaleDateString()}
                {problemStatement.updatedAt && (
                  <> | Updated: {new Date(problemStatement.updatedAt).toLocaleDateString()}</>
                )}
              </p>
            </CardContent>
          </Card>
        ))}

        {problemStatements.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-neutral-600">No problem statements yet. Add the first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}