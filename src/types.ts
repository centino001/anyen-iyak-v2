export interface Person {
  _id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Program {
  _id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
  category: string;
  location: string;
  capacity: number;
  currentParticipants: number;
}

export interface News {
  _id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
}

export interface Grant {
  _id: string;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  requirements: string[];
  status: 'open' | 'closed' | 'upcoming';
  category: string;
  applicationProcess: string;
}

export interface CountResponse {
  count: number;
} 