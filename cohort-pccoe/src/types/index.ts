export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  branch: string;
  year: string;
  role?: string;
  bio?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
}

export interface Club {
  id: string;
  name: string;
  acronym: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Special Interest';
  logo: string;
  tagline: string;
  description: string;
  membersCount: number;
  featured?: boolean;
  leads: string[];
  bannerUrl: string;
  upcomingEvent?: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    branch: string;
    year: string;
    badge?: string;
  };
  timestamp: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  mediaUrl?: string;
  category: 'General' | 'Hackathon' | 'Club Announcement' | 'Resource' | 'Doubt';
}

export interface XDProject {
  id: string;
  title: string;
  description: string;
  category: 'Full-Stack' | 'AI / ML' | 'IoT / Embedded' | 'UI / UX' | 'Cybersecurity';
  creator: {
    name: string;
    avatar: string;
    branch: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  upvotes: number;
  hasUpvoted?: boolean;
  thumbnail: string;
  featured?: boolean;
}

export interface CampusSpot {
  id: string;
  name: string;
  category: 'Labs' | 'Library' | 'Canteen' | 'Auditorium' | 'Sports' | 'Admin';
  building: string;
  floor: string;
  description: string;
  timing: string;
  amenities: string[];
  image: string;
  coordinates: { x: number; y: number }; // Relative percentage for interactive map
}
