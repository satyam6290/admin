export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'interviewing' | 'hired' | 'rejected';
  position: string;
  experience: number;
  skills: string[];
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  contactName: string;
  contactEmail: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export type EntityType = 'admin' | 'candidate' | 'company';

export interface StatsCard {
  title: string;
  value: number;
  icon: string;
  color: string;
}