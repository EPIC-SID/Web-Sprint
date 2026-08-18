import { supabase, isSupabaseConfigured } from './supabase';
import type { Post, Club } from '../types';
import { MOCK_POSTS, MOCK_COMMUNITIES } from '../data/mockData';

// -----------------------------------------------------------------------------
// POSTS API
// -----------------------------------------------------------------------------
export async function fetchPosts(currentUserId?: string): Promise<Post[]> {
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_POSTS;
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        author_id,
        category,
        content,
        tags,
        media_url,
        created_at,
        profiles (
          name,
          avatar_url,
          branch,
          year,
          role
        ),
        post_likes (
          user_id
        ),
        post_comments (
          id,
          content,
          created_at,
          author_id,
          profiles (
            name,
            avatar_url
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_POSTS;
    }

    return data.map((item: any) => {
      const isLiked = currentUserId
        ? item.post_likes?.some((l: any) => l.user_id === currentUserId)
        : false;

      return {
        id: item.id,
        author: {
          name: item.profiles?.name || 'PCCOE Student',
          avatar: item.profiles?.avatar_url || undefined,
          branch: item.profiles?.branch || 'Computer Engg',
          year: item.profiles?.year || 'TE',
          badge: item.profiles?.role !== 'student' ? item.profiles?.role : undefined,
        },
        timestamp: formatTimestamp(item.created_at),
        category: item.category || 'Announcement',
        content: item.content,
        tags: item.tags || [],
        likesCount: item.post_likes?.length || 0,
        commentsCount: item.post_comments?.length || 0,
        isLiked,
        mediaUrl: item.media_url || undefined,
        replies: item.post_comments?.map((c: any) => ({
          id: c.id,
          author: {
            name: c.profiles?.name || 'Student',
            avatar: c.profiles?.avatar_url || undefined,
          },
          content: c.content,
          timestamp: formatTimestamp(c.created_at),
        })),
      };
    });
  } catch (err) {
    console.error('Fetch posts failed:', err);
    return MOCK_POSTS;
  }
}

export async function createPost(
  authorId: string,
  content: string,
  category = 'Announcement',
  tags: string[] = [],
  mediaUrl?: string
) {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        author_id: authorId,
        content,
        category,
        tags,
        media_url: mediaUrl,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Create post error:', error);
    throw error;
  }
  return data;
}

export async function toggleLikePost(postId: string, userId: string, isCurrentlyLiked: boolean) {
  if (!isSupabaseConfigured || !supabase) return;

  if (isCurrentlyLiked) {
    await supabase
      .from('post_likes')
      .delete()
      .match({ post_id: postId, user_id: userId });
  } else {
    await supabase
      .from('post_likes')
      .insert([{ post_id: postId, user_id: userId }]);
  }
}

export async function createComment(postId: string, authorId: string, content: string) {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('post_comments')
    .insert([
      {
        post_id: postId,
        author_id: authorId,
        content,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Create comment error:', error);
    throw error;
  }
  return data;
}

// -----------------------------------------------------------------------------
// COMMUNITIES API
// -----------------------------------------------------------------------------
export async function fetchCommunities(): Promise<Club[]> {
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_COMMUNITIES;
  }

  try {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .order('members_count', { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_COMMUNITIES;
    }

    return data.map((c: any) => ({
      id: c.id,
      name: c.name,
      acronym: c.acronym,
      logo: c.logo_url,
      tagline: c.tagline || '',
      membersCount: c.members_count || 0,
      category: c.category,
      description: c.description || '',
      leads: c.leads || [],
      bannerUrl: c.banner_url || undefined,
    }));
  } catch (err) {
    console.error('Fetch communities error:', err);
    return MOCK_COMMUNITIES;
  }
}

// -----------------------------------------------------------------------------
// FRIENDS / PROFILES API
// -----------------------------------------------------------------------------
export interface PeerStudent {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  branch: string;
  year: string;
  bio?: string;
  skills: string[];
  initials: string;
  color: string;
  online: boolean;
  status: 'connected' | 'none';
}

const AVATAR_COLORS = [
  'bg-purple-600',
  'bg-emerald-600',
  'bg-indigo-600',
  'bg-rose-600',
  'bg-amber-600',
  'bg-sky-600',
];

export async function fetchFriends(currentUserId?: string): Promise<PeerStudent[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getFallbackPeers();
  }

  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('name', { ascending: true });

    if (error || !profiles || profiles.length === 0) {
      return getFallbackPeers();
    }

    // Fetch user connections if logged in
    let connectedFriendIds = new Set<string>();
    if (currentUserId) {
      const { data: conns } = await supabase
        .from('connections')
        .select('friend_id')
        .eq('user_id', currentUserId);
      if (conns) {
        conns.forEach((c: any) => connectedFriendIds.add(c.friend_id));
      }
    }

    return profiles
      .filter((p: any) => p.id !== currentUserId)
      .map((p: any, i: number) => {
        const initials = p.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();

        const username = `@${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

        return {
          id: p.id,
          name: p.name,
          username,
          email: p.email,
          avatar: p.avatar_url || undefined,
          branch: p.branch || 'Computer Engineering',
          year: p.year || 'TE',
          bio: p.bio || 'PCCOE Student passionate about engineering and technology.',
          skills: p.skills || [],
          initials,
          color: AVATAR_COLORS[i % AVATAR_COLORS.length],
          online: i % 2 === 0,
          status: connectedFriendIds.has(p.id) ? 'connected' : 'none',
        };
      });
  } catch (err) {
    console.error('Fetch friends failed:', err);
    return getFallbackPeers();
  }
}

export async function toggleFriendConnection(
  userId: string,
  friendId: string,
  isCurrentlyConnected: boolean
) {
  if (!isSupabaseConfigured || !supabase) return;

  if (isCurrentlyConnected) {
    await supabase
      .from('connections')
      .delete()
      .match({ user_id: userId, friend_id: friendId });
  } else {
    await supabase
      .from('connections')
      .insert([{ user_id: userId, friend_id: friendId, status: 'accepted' }]);
  }
}

// -----------------------------------------------------------------------------
// CONNECT / HACKATHON TEAM FINDER API
// -----------------------------------------------------------------------------
export interface ConnectTeammateRequest {
  id: string;
  hackathon: string;
  title: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    branch: string;
    year: string;
  };
  description: string;
  requiredSkills: string[];
  teamSize: string;
  deadline: string;
  isOpen: boolean;
}

export async function fetchConnectRequests(): Promise<ConnectTeammateRequest[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getFallbackConnectRequests();
  }

  try {
    const { data, error } = await supabase
      .from('connect_requests')
      .select(`
        id,
        hackathon,
        title,
        description,
        required_skills,
        team_size,
        deadline,
        is_open,
        created_at,
        profiles (
          id,
          name,
          avatar_url,
          branch,
          year
        )
      `)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return getFallbackConnectRequests();
    }

    return data.map((item: any) => ({
      id: item.id,
      hackathon: item.hackathon,
      title: item.title,
      description: item.description,
      requiredSkills: item.required_skills || [],
      teamSize: item.team_size || '1 / 4 Members',
      deadline: item.deadline || 'Open',
      isOpen: item.is_open ?? true,
      author: {
        id: item.profiles?.id || '',
        name: item.profiles?.name || 'PCCOE Student',
        avatar: item.profiles?.avatar_url || undefined,
        branch: item.profiles?.branch || 'Computer Engineering',
        year: item.profiles?.year || 'TE',
      },
    }));
  } catch (err) {
    console.error('Fetch connect requests error:', err);
    return getFallbackConnectRequests();
  }
}

export async function createConnectRequest(
  authorId: string,
  hackathon: string,
  title: string,
  description: string,
  requiredSkills: string[],
  teamSize = '1 / 4 Members',
  deadline = 'Open'
) {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('connect_requests')
    .insert([
      {
        author_id: authorId,
        hackathon,
        title,
        description,
        required_skills: requiredSkills,
        team_size: teamSize,
        deadline,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Create connect request error:', error);
    throw error;
  }
  return data;
}

// -----------------------------------------------------------------------------
// Fallbacks
// -----------------------------------------------------------------------------
function getFallbackPeers(): PeerStudent[] {
  return [
    {
      id: 'p1',
      name: 'C157_Shravan Kolhe',
      username: '@shravan24',
      email: 'shravan.kolhe@pccoepune.org',
      branch: 'Computer Engineering',
      year: 'TE',
      initials: 'C',
      color: 'bg-purple-600',
      online: true,
      skills: ['C++', 'Rust', 'Docker', 'FastAPI'],
      status: 'connected',
    },
    {
      id: 'p2',
      name: 'FELINA MATHEW',
      username: '@felina22',
      email: 'felina.mathew@pccoepune.org',
      branch: 'Information Technology',
      year: 'TE',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      initials: 'F',
      color: 'bg-emerald-600',
      online: true,
      skills: ['Figma', 'React', 'Tailwind', 'Next.js'],
      status: 'connected',
    },
    {
      id: 'p3',
      name: 'Arnav Telangi',
      username: '@arnav24',
      email: 'arnav.telangi@pccoepune.org',
      branch: 'AI & Data Science',
      year: 'SE',
      initials: 'A',
      color: 'bg-indigo-600',
      online: false,
      skills: ['PyTorch', 'TensorFlow', 'NLP', 'Python'],
      status: 'connected',
    },
    {
      id: 'p4',
      name: 'Tanmay Joshi',
      username: '@tanmay_j',
      email: 'tanmay.joshi@pccoepune.org',
      branch: 'E&TC',
      year: 'SE',
      initials: 'T',
      color: 'bg-amber-600',
      online: true,
      skills: ['ESP32', 'FreeRTOS', 'C++', 'IoT'],
      status: 'none',
    },
    {
      id: 'p5',
      name: 'Ananya Roy',
      username: '@ananya_sec',
      email: 'ananya.roy@pccoepune.org',
      branch: 'Computer Engineering',
      year: 'BE',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
      initials: 'A',
      color: 'bg-rose-600',
      online: true,
      skills: ['Burp Suite', 'Ghidra', 'Cryptography', 'Python'],
      status: 'none',
    },
  ];
}

function getFallbackConnectRequests(): ConnectTeammateRequest[] {
  return [
    {
      id: 'req_1',
      hackathon: 'Smart India Hackathon (SIH 2026)',
      title: 'AI-assisted Smart Grid Energy Optimizer',
      author: {
        id: 'usr_1',
        name: 'Aarav Sharma',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        branch: 'AI & DS',
        year: 'BE',
      },
      description:
        'Building an edge-AI optimization platform for decentralized micro-grids. Looking for 1 React frontend dev and 1 embedded specialist.',
      requiredSkills: ['React', 'Tailwind', 'ESP32', 'FastAPI'],
      teamSize: '4 / 6 Members',
      deadline: 'Registration closes March 15',
      isOpen: true,
    },
    {
      id: 'req_2',
      hackathon: 'OWASP PCCOE CTF 2026',
      title: 'Cyber Warfare & Reverse Engineering Squad',
      author: {
        id: 'usr_2',
        name: 'Ananya Roy',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150',
        branch: 'Computer Engg',
        year: 'BE',
      },
      description:
        'Forming a competitive 4-member squad for the upcoming national CTF. Seeking students experienced with Web Exploitation or Ghidra binary analysis.',
      requiredSkills: ['Burp Suite', 'Ghidra', 'Cryptography', 'Python'],
      teamSize: '2 / 4 Members',
      deadline: 'CTF starts March 1st',
      isOpen: true,
    },
  ];
}

function formatTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hrs ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}
