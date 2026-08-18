export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  branch?: string;
  year?: string;
  bio?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    branch: string;
    year: string;
    badge?: string;
  };
  timestamp: string;
  category: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  mediaUrl?: string;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

export interface Club {
  id: string;
  name: string;
  acronym: string;
  logo: string;
  tagline: string;
  membersCount: number;
  category: string;
  description: string;
  featured?: boolean;
  leads: string[];
  bannerUrl?: string;
  upcomingEvent?: string;
}

export interface Friend {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  initials: string;
  color: string;
  online?: boolean;
}

export interface HeadsUp {
  id: string;
  type: 'important' | 'info' | 'event';
  content: string;
  timestamp: string;
}
