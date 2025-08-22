export interface Person {
  _id: string;
  name: string;
  title: string;
  role?: string;
  department: string;
  image?: string;
  cloudinaryPublicId?: string;
  bio: string;
  phone?: string;
  order: number;
  isLeadership: boolean;
  slug: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Program {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  image?: string;
  cloudinaryPublicId?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  goals?: string[];
  requirements?: string[];
  applicationUrl?: string;
  slug: string;
  category: string;
  // Fundraising fields
  requiresDonation: boolean;
  fundraisingGoal?: number;
  currentFunding?: number;
  donationDescription?: string;
  contributors?: Array<{
    name: string;
    amount: number;
    isAnonymous: boolean;
    contributedAt: string;
  }>;
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

export interface Volunteer {
  _id: string;
  portfolioUrl: string;
  firstName: string;
  surname: string;
  phoneNumber: string;
  socialMediaLink: string;
  volunteerRole: string;
  createdAt: string;
  updatedAt: string;
}

export interface CountResponse {
  count: number;
} 