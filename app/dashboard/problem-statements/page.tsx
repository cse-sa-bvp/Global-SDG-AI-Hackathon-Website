'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { ProblemStatement } from '@/types';

export default function ProblemStatementsPage() {
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);
  const [filteredStatements, setFilteredStatements] = useState<ProblemStatement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblemStatements = async () => {
      try {
        const problemStatementsQuery = query(
          collection(db, 'problemStatements'),
          where('isActive', '==', true),
          orderBy('createdAt', 'desc')
        );
        const problemStatementsSnapshot = await getDocs(problemStatementsQuery);
        const problemStatementsList = problemStatementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ProblemStatement[];
        setProblemStatements(problemStatementsList);
        setFilteredStatements(problemStatementsList);
      } catch (error) {
        console.error('Error fetching problem statements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemStatements();
  }, []);

  useEffect(() => {
    let filtered = problemStatements;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTrack !== 'all') {
      filtered = filtered.filter(p => p.track === selectedTrack);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(p => p.difficulty === selectedDifficulty);
    }

    setFilteredStatements(filtered);
  }, [searchTerm, selectedTrack, selectedDifficulty, problemStatements]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const tracks = [...new Set(problemStatements.map(p => p.track))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Problem Statements</h1>
        <p className="text-neutral-600">Choose a problem to solve for the hackathon</p>
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
            <CardTitle>Tracks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{tracks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Easy Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {problemStatements.filter(p => p.difficulty === 'Easy').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hard Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {problemStatements.filter(p => p.difficulty === 'Hard').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Track</label>
              <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                <SelectTrigger>
                  <SelectValue placeholder="Select track" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tracks</SelectItem>
                  {tracks.map((track) => (
                    <SelectItem key={track} value={track}>
                      {track}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problem Statements */}
      <div className="space-y-4">
        {filteredStatements.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-neutral-600">No problem statements found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredStatements.map((problemStatement) => (
            <Card key={problemStatement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2">
                      {problemStatement.title}
                      <Badge
                        variant={
                          problemStatement.difficulty === 'Easy' 
                            ? 'default'
                            : problemStatement.difficulty === 'Medium'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {problemStatement.difficulty}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-neutral-500">
                      <strong>Track:</strong> {problemStatement.track}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-neutral-700 whitespace-pre-wrap">{problemStatement.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {problemStatement.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {problemStatement.resources && problemStatement.resources.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-2">Helpful Resources:</p>
                      <ul className="text-sm space-y-1">
                        {problemStatement.resources.map((resource, index) => (
                          <li key={index}>
                            <a 
                              href={resource} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-600 hover:underline break-all"
                            >
                              {resource}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredStatements.length > 0 && (
        <div className="text-center text-sm text-neutral-500">
          Showing {filteredStatements.length} of {problemStatements.length} problem statements
        </div>
      )}
    </div>
  );
}