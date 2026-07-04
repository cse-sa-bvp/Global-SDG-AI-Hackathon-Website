export interface IconProps {
  className?: string;
  size?: number;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  gender?: string;
  role: 'participant' | 'admin';
  teamId?: string;
  createdAt: Date;
}

export interface Team {
  teamId: string;
  teamName: string;
  teamCode: string;
  leaderId: string;
  members: string[];
  paymentStatus: 'pending' | 'completed';
  registrationStatus: 'incomplete' | 'pending_payment' | 'registered';
  createdAt: Date;
}

export interface JoinRequest {
  id: string;
  teamId: string;
  teamCode: string;
  userId: string;
  userName: string;
  email: string;
  college: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  respondedAt?: Date;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  visible: boolean;
}

export interface ProblemStatement {
  id: string;
  title: string;
  description: string;
  track: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  resources?: string[];
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;
}

export interface Submission {
  id: string;
  teamId: string;
  projectName: string;
  description: string;
  github: string;
  pptUrl: string;
  submittedAt: Date;
}

export interface Payment {
  paymentId: string;
  teamId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: Date;
}
