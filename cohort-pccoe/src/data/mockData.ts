import type { Club, Post, XDProject, CampusSpot, User } from '../types';

export const CURRENT_USER_MOCK: User = {
  id: 'usr_pccoe_01',
  name: 'Siddhant Deshmukh',
  email: 'siddhant.deshmukh@pccoepune.org',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  branch: 'Computer Engineering',
  year: 'TE (3rd Year)',
  bio: 'Building full-stack apps & exploring GenAI workflows. Tech lead at WebSprint.',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Python'],
  github: 'https://github.com',
  linkedin: 'https://linkedin.com'
};

export const MOCK_STUDENTS: User[] = [
  {
    id: 'usr_02',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@pccoepune.org',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    branch: 'AI & Data Science',
    year: 'BE (Final Year)',
    bio: 'Deep learning researcher | Kaggle 2x Expert | Looking for hackathon teammates!',
    skills: ['PyTorch', 'LLMs', 'Computer Vision', 'LangChain', 'FastAPI'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'usr_03',
    name: 'Riya Patel',
    email: 'riya.patel@pccoepune.org',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    branch: 'Information Technology',
    year: 'TE (3rd Year)',
    bio: 'Product Designer & UI/UX enthusiast. GDGC Design Lead @ PCCOE.',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Next.js', 'CSS Motion'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'usr_04',
    name: 'Tanmay Joshi',
    email: 'tanmay.joshi@pccoepune.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    branch: 'Electronics & Telecommunication',
    year: 'SE (2nd Year)',
    bio: 'Robotics, IoT sensors, and autonomous rover dev. Member of PCCOE Team Kratos.',
    skills: ['ESP32', 'ROS2', 'C++', 'Circuit Design', 'Embedded Systems'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'usr_05',
    name: 'Ananya Roy',
    email: 'ananya.roy@pccoepune.org',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    branch: 'Computer Engineering',
    year: 'BE (Final Year)',
    bio: 'Cybersecurity Analyst | OWASP PCCOE Student Chapter Lead | Bug Bounty Hunter',
    skills: ['Network Security', 'Burp Suite', 'Web Penetration Testing', 'Cryptography', 'Go'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com'
  }
];

export const MOCK_CLUBS: Club[] = [
  {
    id: 'owasp',
    name: 'OWASP PCCOE Student Chapter',
    acronym: 'OWASP',
    category: 'Technical',
    logo: 'https://api.iconify.design/lucide:shield-alert.svg?color=%2338bdf8',
    tagline: 'Securing the Cyber Frontier with Offensive & Defensive Security',
    description: 'The premier cybersecurity student community at PCCOE. We organize hands-on CTFs, secure coding workshops, and bug bounty sessions.',
    membersCount: 420,
    featured: true,
    leads: ['Ananya Roy', 'Pratham K.'],
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    upcomingEvent: 'Capture The Flag 2026 (March 1)'
  },
  {
    id: 'gdgc',
    name: 'Google Developer Groups on Campus',
    acronym: 'GDGC',
    category: 'Technical',
    logo: 'https://api.iconify.design/logos:google-developers.svg',
    tagline: 'Building Solutions for Real-World Problems with Google Tech',
    description: 'GDGC PCCOE bridges the gap between theory and practice for students through Android, Cloud, AI, and Web tech bootcamps.',
    membersCount: 680,
    featured: true,
    leads: ['Rohan Patil', 'Sneha M.'],
    bannerUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    upcomingEvent: 'Solution Challenge Info Session'
  },
  {
    id: 'acm',
    name: 'ACM PCCOE Student Chapter',
    acronym: 'ACM',
    category: 'Technical',
    logo: 'https://api.iconify.design/lucide:terminal.svg?color=%23818cf8',
    tagline: 'Advancing Computing as a Science & Profession',
    description: 'Dedicated to competitive programming, algorithmic puzzles, and research publications. Host of the national-level Algorithma coding sprint.',
    membersCount: 510,
    featured: true,
    leads: ['Aditya Deshpande'],
    bannerUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
    upcomingEvent: 'Algorithma 2026 Intra-College Round'
  },
  {
    id: 'csi',
    name: 'Computer Society of India (CSI)',
    acronym: 'CSI',
    category: 'Technical',
    logo: 'https://api.iconify.design/lucide:cpu.svg?color=%2334d399',
    tagline: 'Fostering IT Knowledge & Software Innovation',
    description: 'Organizes tech conferences, hackathons, and industrial mentorship panels to elevate software engineering skills across departments.',
    membersCount: 390,
    leads: ['Devendra Shinde'],
    bannerUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    upcomingEvent: 'TechXpo 2026'
  },
  {
    id: 'ieee',
    name: 'IEEE PCCOE Student Branch',
    acronym: 'IEEE',
    category: 'Technical',
    logo: 'https://api.iconify.design/lucide:radio.svg?color=%23f43f5e',
    tagline: 'Innovating Technology for Humanity',
    description: 'Connecting engineers worldwide to publish papers, develop hardware systems, signal processing innovations, and robotics.',
    membersCount: 340,
    leads: ['Sagarika Kulkarni'],
    bannerUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    upcomingEvent: 'Signal Processing & IoT Summit'
  },
  {
    id: 'art-circle',
    name: 'PCCOE Art Circle',
    acronym: 'Art Circle',
    category: 'Cultural',
    logo: 'https://api.iconify.design/lucide:palette.svg?color=%23e879f9',
    tagline: 'Celebrating Drama, Music, Dance & Fine Arts',
    description: 'The heartbeat of cultural expression at PCCOE. Winners of Purushottam Karandak and Firodiya Karandak theatrics.',
    membersCount: 280,
    leads: ['Mihir Joshi'],
    bannerUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop&q=80',
    upcomingEvent: 'Swarangam Drama Auditions'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post_1',
    author: {
      name: 'Ananya Roy',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      branch: 'Computer Engg',
      year: 'BE',
      badge: 'OWASP Lead'
    },
    timestamp: '20 mins ago',
    category: 'Club Announcement',
    content: '🚨 OWASP PCCOE is hosting a 24-hour CTF Challenge next weekend! Categories: Web Exploitation, Reverse Engineering, Cryptography, and OSINT. Cash prizes up to ₹25,000 + certificates for top 10 finalists. Registrations open on the portal!',
    tags: ['Cybersecurity', 'CTF', 'OWASP', 'Hackathon'],
    likesCount: 68,
    commentsCount: 14,
    isLiked: false,
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'post_2',
    author: {
      name: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      branch: 'AI & DS',
      year: 'BE',
      badge: 'ML Enthusiast'
    },
    timestamp: '2 hours ago',
    category: 'Hackathon',
    content: 'Looking for 1 frontend dev (React + Tailwind) and 1 IoT developer for the Smart India Hackathon (SIH 2026) internal college round. Our problem statement revolves around AI-assisted energy grid optimization. Ping me if interested!',
    tags: ['SIH2026', 'TeamFormation', 'React', 'IoT'],
    likesCount: 42,
    commentsCount: 9,
    isLiked: true
  },
  {
    id: 'post_3',
    author: {
      name: 'Riya Patel',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      branch: 'IT',
      year: 'TE',
      badge: 'GDGC Lead'
    },
    timestamp: '5 hours ago',
    category: 'Resource',
    content: 'Just uploaded our PCCOE Open Source Design System UI Kit on Figma! Free access for all student projects with dark mode tokens, button variants, and navigation bars ready to copy-paste. Check the XD hub tab!',
    tags: ['Figma', 'UIUX', 'DesignSystem', 'CohortXD'],
    likesCount: 115,
    commentsCount: 22,
    isLiked: false,
    mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80'
  }
];

export const MOCK_XD_PROJECTS: XDProject[] = [
  {
    id: 'xd_1',
    title: 'PCCOE Smart Campus Transit & Parking AI',
    description: 'Real-time computer vision system using CCTV feeds to monitor 4-wheeler and 2-wheeler parking availability with navigation cues on campus.',
    category: 'AI / ML',
    creator: {
      name: 'Aarav Sharma',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      branch: 'AI & Data Science'
    },
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    tags: ['YOLOv8', 'FastAPI', 'OpenCV', 'React'],
    upvotes: 142,
    thumbnail: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'xd_2',
    title: 'Pulse: Peer Doubt Resolver & Notes Exchanger',
    description: 'Decentralized peer study network tailored for SPPU syllabus where students earn karma points by answering junior branch queries.',
    category: 'Full-Stack',
    creator: {
      name: 'Siddhant Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      branch: 'Computer Engg'
    },
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    tags: ['Next.js 15', 'Supabase', 'Tailwind', 'tRPC'],
    upvotes: 98,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'xd_3',
    title: 'Automated Solar Tracker Rover',
    description: 'Dual-axis photodiode tracker with autonomous obstacle avoidance rover built for the PCCOE Renewable Energy Lab.',
    category: 'IoT / Embedded',
    creator: {
      name: 'Tanmay Joshi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      branch: 'E&TC'
    },
    demoUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    tags: ['ESP32', 'C++', 'FreeRTOS', 'MQTT'],
    upvotes: 76,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
  }
];

export const MOCK_CAMPUS_SPOTS: CampusSpot[] = [
  {
    id: 'spot_1',
    name: 'Central Computing Facility (CCF Labs)',
    category: 'Labs',
    building: 'Computer & IT Building',
    floor: '2nd & 3rd Floor',
    description: 'High-performance GPU workstations with Linux & Windows environments for machine learning, competitive coding, and lab practicals.',
    timing: '8:00 AM - 8:00 PM (Mon-Sat)',
    amenities: ['Gigabit LAN', 'Air Conditioned', 'NVIDIA GPUs', 'Uninterrupted Power'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    coordinates: { x: 38, y: 35 }
  },
  {
    id: 'spot_2',
    name: 'Central Library & Digital Knowledge Center',
    category: 'Library',
    building: 'Main Administrative Wing',
    floor: '1st & 2nd Floor',
    description: 'Over 50,000 reference books, IEEE / Springer journals, quiet reading zones, and digital terminal access.',
    timing: '7:30 AM - 10:00 PM',
    amenities: ['Silent Study Zone', 'IEEE Access', 'Book Lending Machine', 'Wi-Fi 6'],
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
    coordinates: { x: 55, y: 25 }
  },
  {
    id: 'spot_3',
    name: 'Main Canteen & Nescafe Courtyard',
    category: 'Canteen',
    building: 'Campus Center Ground',
    floor: 'Ground Level',
    description: 'Popular student hangout hub offering snacks, south indian delicacies, meals, juices, and coffee bar.',
    timing: '8:00 AM - 7:00 PM',
    amenities: ['Outdoor Seating', 'UPI Enabled', 'Fast Food & Meals', 'Clean Drinking Water'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    coordinates: { x: 62, y: 65 }
  },
  {
    id: 'spot_4',
    name: 'Pimpri Chinchwad Auditorium (LRDC)',
    category: 'Auditorium',
    building: 'LRDC Building',
    floor: 'Ground & 1st Floor',
    description: '800-seat state of the art air conditioned auditorium for guest lectures, TEDxPCCOE, cultural fests, and hackathons.',
    timing: 'Events based schedule',
    amenities: ['Dolby Surround', 'Stage Lighting Rig', 'Green Rooms', 'Dual Projectors'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    coordinates: { x: 22, y: 50 }
  }
];
