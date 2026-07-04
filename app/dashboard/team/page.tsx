'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  serverTimestamp,
  arrayUnion
} from '@/lib/firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { generateTeamCode } from '@/lib/utils/team';
import { CheckCircle, Clock, XCircle, Copy, Share, UserCheck, UserX, CreditCard } from 'lucide-react';
import { RegistrationDialog } from '@/components/payment/RegistrationDialog';
import type { User, Team, JoinRequest } from '@/types';

export default function TeamPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  
  const [userData, setUserData] = useState<User | null>(null);
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [userJoinRequest, setUserJoinRequest] = useState<JoinRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (action === 'register' && teamData && userData?.uid === teamData.leaderId) {
      // Only show dialog if payment is still pending
      if (teamData.paymentStatus !== 'paid' && teamData.registrationStatus !== 'registered') {
        setShowRegistrationDialog(true);
      }
    }
  }, [action, teamData, userData]);

  const fetchData = async () => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as User;
        setUserData(data);

        if (data.teamId) {
          // User has a team
          const teamDoc = await getDoc(doc(db, 'teams', data.teamId));
          if (teamDoc.exists()) {
            const teamDocData = teamDoc.data();
            const team = { 
              teamId: teamDoc.id, 
              ...teamDocData,
              paidAt: teamDocData.paidAt?.toDate?.() || teamDocData.paidAt,
              createdAt: teamDocData.createdAt?.toDate?.() || teamDocData.createdAt,
            } as Team;
            setTeamData(team);

            // Fetch team members
            const membersQuery = query(
              collection(db, 'users'),
              where('teamId', '==', data.teamId)
            );
            const membersSnapshot = await getDocs(membersQuery);
            const members = membersSnapshot.docs.map(doc => doc.data() as User);
            setTeamMembers(members);

            // If user is leader, fetch join requests
            if (team.leaderId === user.uid) {
              const requestsQuery = query(
                collection(db, 'joinRequests'),
                where('teamId', '==', data.teamId),
                where('status', '==', 'pending')
              );
              const requestsSnapshot = await getDocs(requestsQuery);
              const requests = requestsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              })) as JoinRequest[];
              setJoinRequests(requests);
            }
          }
        } else {
          // Check if user has any pending join requests
          const userRequestQuery = query(
            collection(db, 'joinRequests'),
            where('userId', '==', user.uid),
            where('status', '==', 'pending')
          );
          const userRequestSnapshot = await getDocs(userRequestQuery);
          if (!userRequestSnapshot.empty) {
            setUserJoinRequest({
              id: userRequestSnapshot.docs[0].id,
              ...userRequestSnapshot.docs[0].data()
            } as JoinRequest);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async () => {
    if (!user || !userData || !teamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }

    if (userData.teamId) {
      toast.error('You are already in a team');
      return;
    }

    setActionLoading(true);
    try {
      const teamCode = generateTeamCode();
      const teamRef = doc(collection(db, 'teams'));
      
      await setDoc(teamRef, {
        teamName: teamName.trim(),
        teamCode,
        leaderId: user.uid,
        members: [user.uid],
        paymentStatus: 'pending',
        registrationStatus: 'incomplete',
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, 'users', user.uid), {
        teamId: teamRef.id,
      });

      toast.success(`Team created! Team Code: ${teamCode}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to create team');
    } finally {
      setActionLoading(false);
    }
  };

  const sendJoinRequest = async () => {
    if (!user || !userData || !joinCode.trim()) {
      toast.error('Please enter a team code');
      return;
    }

    if (userData.teamId) {
      toast.error('You are already in a team');
      return;
    }

    if (userJoinRequest) {
      toast.error('You already have a pending join request');
      return;
    }

    setActionLoading(true);
    try {
      // Find team by code
      const teamsQuery = query(
        collection(db, 'teams'),
        where('teamCode', '==', joinCode.trim().toUpperCase())
      );
      const teamsSnapshot = await getDocs(teamsQuery);

      if (teamsSnapshot.empty) {
        toast.error('Team not found');
        return;
      }

      const teamDoc = teamsSnapshot.docs[0];
      const team = teamDoc.data() as Team;

      if (team.members.length >= 4) {
        toast.error('Team is full (maximum 4 members)');
        return;
      }

      if (team.leaderId === user.uid) {
        toast.error('You cannot join your own team');
        return;
      }

      // Check if user already has a pending request for this team
      const existingRequestQuery = query(
        collection(db, 'joinRequests'),
        where('userId', '==', user.uid),
        where('teamId', '==', teamDoc.id),
        where('status', '==', 'pending')
      );
      const existingRequestSnapshot = await getDocs(existingRequestQuery);

      if (!existingRequestSnapshot.empty) {
        toast.error('You already have a pending request for this team');
        return;
      }

      // Create join request
      await addDoc(collection(db, 'joinRequests'), {
        teamId: teamDoc.id,
        teamCode: joinCode.trim().toUpperCase(),
        userId: user.uid,
        userName: userData.name,
        email: userData.email,
        college: userData.college,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      toast.success('Join request sent! Waiting for team leader approval.');
      fetchData();
    } catch (error) {
      toast.error('Failed to send join request');
    } finally {
      setActionLoading(false);
    }
  };

  const handleJoinRequest = async (requestId: string, action: 'accept' | 'reject') => {
    setActionLoading(true);
    try {
      const requestDoc = await getDoc(doc(db, 'joinRequests', requestId));
      if (!requestDoc.exists()) {
        toast.error('Request not found');
        return;
      }

      const request = requestDoc.data() as JoinRequest;

      if (action === 'accept') {
        // Add user to team
        await updateDoc(doc(db, 'teams', request.teamId), {
          members: arrayUnion(request.userId)
        });

        // Update user's teamId
        await updateDoc(doc(db, 'users', request.userId), {
          teamId: request.teamId
        });

        toast.success(`${request.userName} added to team`);
      } else {
        toast.success(`Join request from ${request.userName} rejected`);
      }

      // Update request status
      await updateDoc(doc(db, 'joinRequests', requestId), {
        status: action === 'accept' ? 'accepted' : 'rejected',
        respondedAt: serverTimestamp(),
      });

      fetchData();
    } catch (error) {
      toast.error(`Failed to ${action} request`);
    } finally {
      setActionLoading(false);
    }
  };

  const copyTeamCode = () => {
    if (teamData) {
      navigator.clipboard.writeText(teamData.teamCode);
      toast.success('Team code copied to clipboard!');
    }
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationDialog(false);
    fetchData();
    router.push('/dashboard/team');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // User has a team
  if (teamData) {
    const isLeader = userData?.uid === teamData.leaderId;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Team</h1>
          <p className="text-neutral-600">Manage your team</p>
        </div>

        {/* Team Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{teamData.teamName}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">Code: {teamData.teamCode}</span>
                <Button size="sm" variant="outline" onClick={copyTeamCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              {isLeader && `You are the team leader • `}
              Registration: {teamData.registrationStatus.replace('_', ' ').toUpperCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLeader && (
              <>
                {teamData.paymentStatus === 'pending' && teamData.registrationStatus === 'incomplete' && teamMembers.length > 0 && (
                  <Button onClick={() => setShowRegistrationDialog(true)} size="lg">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Register Team (₹199)
                  </Button>
                )}
                {teamData.paymentStatus === 'paid' && teamData.registrationStatus === 'registered' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <CheckCircle className="h-5 w-5" />
                      <h3 className="font-semibold">Registration Completed!</h3>
                    </div>
                    <div className="space-y-1 text-sm text-green-600">
                      <p><strong>Payment ID:</strong> {teamData.paymentId}</p>
                      <p><strong>Status:</strong> Paid</p>
                      {teamData.paidAt && (
                        <p><strong>Paid on:</strong> {new Date(teamData.paidAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                )}
                {teamData.paymentStatus === 'failed' && (
                  <div className="space-y-2">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                      <XCircle className="h-5 w-5 inline mr-2" />
                      Payment failed. Please try again.
                    </div>
                    <Button onClick={() => setShowRegistrationDialog(true)} variant="outline">
                      Retry Payment
                    </Button>
                  </div>
                )}
              </>
            )}
            {!isLeader && teamData.registrationStatus === 'registered' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                <CheckCircle className="h-5 w-5 inline mr-2" />
                Your team is registered for the hackathon!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Members */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members ({teamMembers.length}/4)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div key={member.uid} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-neutral-600">{member.email}</p>
                    <p className="text-xs text-neutral-500">{member.college}</p>
                  </div>
                  {member.uid === teamData.leaderId && (
                    <span className="text-xs bg-neutral-900 text-white px-2 py-1 rounded">
                      Leader
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Join Requests (Leader only) */}
        {isLeader && joinRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Pending Join Requests ({joinRequests.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {joinRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{request.userName}</p>
                      <p className="text-sm text-neutral-600">{request.email}</p>
                      <p className="text-xs text-neutral-500">{request.college}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleJoinRequest(request.id, 'accept')}
                        disabled={actionLoading}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleJoinRequest(request.id, 'reject')}
                        disabled={actionLoading}
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Registration Dialog */}
        {showRegistrationDialog && userData && (
          <RegistrationDialog
            team={teamData}
            teamMembers={teamMembers}
            currentUser={userData}
            onClose={() => setShowRegistrationDialog(false)}
            onSuccess={handleRegistrationSuccess}
          />
        )}
      </div>
    );
  }

  // User has pending join request
  if (userJoinRequest) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Join Request Sent</h1>
          <p className="text-neutral-600">Waiting for team leader approval</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Request Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Team Code:</strong> {userJoinRequest.teamCode}</p>
              <p className="text-sm text-neutral-600">
                Your request has been sent to the team leader. You'll be notified once they respond.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User needs to create or join team
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Join or Create a Team</h1>
        <p className="text-neutral-600">You need a team to participate</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create Team</CardTitle>
            <CardDescription>Start a new team and invite others</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
              />
            </div>
            <Button 
              onClick={createTeam} 
              className="w-full" 
              disabled={actionLoading}
            >
              Create Team
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Join Team</CardTitle>
            <CardDescription>Send join request to existing team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="joinCode">Team Code</Label>
              <Input
                id="joinCode"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="BVHACK-XXXXX"
              />
            </div>
            <Button 
              onClick={sendJoinRequest} 
              className="w-full" 
              disabled={actionLoading}
            >
              Send Join Request
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
