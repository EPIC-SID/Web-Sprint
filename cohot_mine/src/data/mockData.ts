import type { Post, Club, Friend, HeadsUp } from '../types';

export const CURRENT_USER = {
  id: 'usr_01',
  name: 'Siddhant Deshmukh',
  email: 'siddhant.deshmukh@pccoepune.org',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  branch: 'Computer Engineering',
  year: 'TE (3rd Year)',
  initials: 'SD',
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'post_1',
    author: {
      name: 'Vrushabh Hirap',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      branch: 'Computer Engg',
      year: 'TE',
      badge: 'ACM Member',
    },
    timestamp: '5 May',
    category: 'Resource',
    content: 'TOC solutions are up on Cohort. 🎊\nhave a look whenever you want... panic studying before the exam is still an option 😤',
    tags: ['TOC', 'Resource', 'Exam'],
    likesCount: 5,
    commentsCount: 1,
    isLiked: false,
    replies: [
      {
        id: 'reply_1',
        author: { name: 'Soham Zagare', avatar: undefined },
        content: 'Cohort goated ngl',
        timestamp: '6 May',
      },
    ],
  },
  {
    id: 'post_2',
    author: {
      name: 'Anushka Shinde',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      branch: 'IT',
      year: 'TE',
      badge: 'GDGC Member',
    },
    timestamp: '4 May',
    category: 'Announcement',
    content: 'Friendly announcement for those still "searching for resources" 😅\n\nThe DBMS full question bank answer key is now available on Cohort.\nSo before asking "Does anyone have answers?" in every group chat, maybe check Cohort first 🌚',
    tags: ['DBMS', 'Resource', 'ExamPrep'],
    likesCount: 15,
    commentsCount: 3,
    isLiked: false,
  },
  {
    id: 'post_3',
    author: {
      name: 'Ananya Roy',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      branch: 'Computer Engg',
      year: 'BE',
      badge: 'OWASP Lead',
    },
    timestamp: '20 mins ago',
    category: 'Club Announcement',
    content: '🚨 OWASP PCCOE is hosting a 24-hour CTF Challenge next weekend! Categories: Web Exploitation, Reverse Engineering, Cryptography, and OSINT. Cash prizes up to ₹25,000 + certificates for top 10 finalists. Registrations open on the portal!',
    tags: ['Cybersecurity', 'CTF', 'OWASP', 'Hackathon'],
    likesCount: 68,
    commentsCount: 14,
    isLiked: true,
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'post_4',
    author: {
      name: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      branch: 'AI & DS',
      year: 'BE',
      badge: 'ML Enthusiast',
    },
    timestamp: '2 hours ago',
    category: 'Hackathon',
    content: 'Looking for 1 frontend dev (React + Tailwind) and 1 IoT developer for the Smart India Hackathon (SIH 2026) internal college round. Our problem statement revolves around AI-assisted energy grid optimization. Ping me if interested!',
    tags: ['SIH2026', 'TeamFormation', 'React', 'IoT'],
    likesCount: 42,
    commentsCount: 9,
    isLiked: false,
  },
];

export const MOCK_COMMUNITIES: Club[] = [
  {
    id: 'higher-studies-upsc',
    name: 'Higher Studies Club for UPSC / MPSC ...',
    acronym: 'HSC',
    logo: 'https://api.iconify.design/lucide:book-open.svg?color=%23818cf8',
    tagline: 'UPSC & MPSC Preparation',
    membersCount: 320,
    category: 'Academic',
    description: 'UPSC & MPSC preparation community',
    leads: ['Priya K.'],
  },
  {
    id: 'gdgc',
    name: 'Google Developer Groups PCCOE',
    acronym: 'GDGC',
    logo: '/assets/clubs/gdgc.png',
    tagline: 'Building with Google Tech',
    membersCount: 680,
    category: 'Technical',
    description: 'Google Developer Groups on Campus PCCOE',
    leads: ['Rohan P.'],
  },
  {
    id: 'higher-studies-cat',
    name: 'Higher Studies Club for CAT / GMAT ...',
    acronym: 'HSC-B',
    logo: 'https://api.iconify.design/lucide:graduation-cap.svg?color=%23f59e0b',
    tagline: 'CAT & GMAT Prep Group',
    membersCount: 180,
    category: 'Academic',
    description: 'CAT & GMAT preparation community',
    leads: ['Alok V.'],
  },
];

export const MOCK_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'C157_Shravan Kolhe',
    username: '@shrevan24',
    initials: 'SK',
    color: 'bg-indigo-600',
    online: true,
  },
  {
    id: 'f2',
    name: 'FELINA MATHEW',
    username: '@felina22',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    initials: 'FM',
    color: 'bg-emerald-600',
    online: false,
  },
  {
    id: 'f3',
    name: 'Arnav Telang',
    username: '@arnav24',
    initials: 'AT',
    color: 'bg-rose-600',
    online: true,
  },
];

export const MOCK_HEADSUP: HeadsUp[] = [
  {
    id: 'h1',
    type: 'important',
    content: 'Full access will soon require PCCOE account login.',
    timestamp: 'Just now',
  },
];
