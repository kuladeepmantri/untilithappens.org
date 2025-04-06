/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Navigation Types
export interface NavLink {
  href: string;
  label: string;
}

// Story Types
export interface Story {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  image: string;
  content: string;
  tags: string[];
}

// Resource Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'tool' | 'article' | 'video';
  url: string;
  icon?: React.ReactNode;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  image: string;
}

// Statistics Types
export interface Statistic {
  id: string;
  value: string;
  label: string;
  description: string;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Partner Types
export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'support' | 'press' | 'partnership';
}

// Help Request Types
export interface HelpRequest {
  id: string;
  type: 'emergency' | 'consultation' | 'resources';
  status: 'pending' | 'inProgress' | 'resolved';
  description: string;
  contactInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  dateSubmitted: string;
  lastUpdated: string;
}

// Donation Types
export interface DonationTier {
  id: string;
  name: string;
  amount: number;
  description: string;
  benefits: string[];
  isPopular?: boolean;
}

// Blog Post Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: TeamMember;
  publishDate: string;
  readTime: number;
  tags: string[];
  image: string;
} 