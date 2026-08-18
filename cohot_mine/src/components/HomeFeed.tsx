import React, { useState, useEffect } from 'react';
import {
  Home,
  Users,
  Heart,
  MessageSquare,
  Zap,
  MapPin,
  Calendar,
  Gamepad2,
  Bell,
  Mail,
  User,
  Search,
  Send,
  Paperclip,
  ChevronRight,
  Sun,
  Moon,
  ExternalLink,
} from 'lucide-react';
import type { Club } from '../types';
import {
  fetchCommunities,
  fetchPosts,
  createPost,
  toggleLikePost,
  createComment,
} from '../lib/api';
import { MOCK_COMMUNITIES } from '../data/mockData';

// Sub-pages
import { CommunitiesPage } from './pages/CommunitiesPage';
import { FriendsPage } from './pages/FriendsPage';
import { ConnectPage } from './pages/ConnectPage';
import { XDPage } from './pages/XDPage';
import { MapPage } from './pages/MapPage';
import { CalendarPage } from './pages/CalendarPage';
import { ArcadePage } from './pages/ArcadePage';
import { HeadsUpPage } from './pages/HeadsUpPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { ProfilePage } from './pages/ProfilePage';

interface HomeFeedProps {
  currentUser: {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    branch?: string;
    year?: string;
  };
  onSignOut?: () => void;
  darkMode?: boolean;
  onToggleTheme?: () => void;
}

type ActiveTab =
  | 'home'
  | 'communities'
  | 'friends'
  | 'connect'
  | 'xd'
  | 'map'
  | 'calendar'
  | 'arcade'
  | 'headsup'
  | 'contact'
  | 'profile';

interface FeedPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar?: string;
    initials: string;
    avatarColor: string;
  };
  date: string;
  content: string;
  linkCard?: {
    url: string;
    domain: string;
  };
  likes: number;
  isLiked?: boolean;
  replies: {
    id: string;
    author: {
      name: string;
      handle: string;
      initials: string;
      avatarColor: string;
    };
    content: string;
    date: string;
  }[];
}

const INITIAL_POSTS: FeedPost[] = [
  {
    id: 'p1',
    author: {
      name: 'Vrushabh Hirap',
      handle: '@vrushabhhirap',
      initials: 'VH',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      avatarColor: 'bg-indigo-600',
    },
    date: '6 May',
    content:
      'TOC solutions are up on Cohort 📖\nhave a look whenever you want... panic studying before the exam is still an option 🤫',
    linkCard: {
      url: 'https://drive.google.com/drive/folders/1vK-5yOIEpuYwEnlvyUx_n_JXfj...',
      domain: 'drive.google.com',
    },
    likes: 4,
    replies: [
      {
        id: 'r1',
        author: {
          name: 'SOHAM ZAGARE',
          handle: '@soham24',
          initials: 'S',
          avatarColor: 'bg-emerald-600',
        },
        content: 'Cohort goated ngl',
        date: '6 May',
      },
    ],
  },
  {
    id: 'p2',
    author: {
      name: 'Anushka Shinde',
      handle: '@anushkashinde',
      initials: 'AS',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      avatarColor: 'bg-pink-600',
    },
    date: '4 May',
    content:
      'Friendly announcement for those still "searching for resources" 🧐\n\nThe DBMS full question bank answer key is now available on Cohort.\nSo before asking "Does anyone have answers?" in every group chat, maybe check Cohort first 😎\n\nHere you go: https://drive.google.com/file/d/1uiy3jr-alX54_ZaWD34d8j0gOyW8ktQ u/view?usp=sharing',
    likes: 16,
    replies: [
      {
        id: 'r2',
        author: {
          name: 'Nupur Deore',
          handle: '@nupur24',
          initials: 'N',
          avatarColor: 'bg-slate-600',
        },
        content: "Requesting one for TOC n MOT as well 🤌 y'all my only hope 🙏",
        date: '6 May',
      },
    ],
  },
];

export const HomeFeed: React.FC<HomeFeedProps> = ({
  currentUser,
  onSignOut,
  darkMode = true,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [communities, setCommunities] = useState<Club[]>(MOCK_COMMUNITIES);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({
    p1: true,
    p2: true,
  });

  useEffect(() => {
    fetchCommunities().then((clubs) => {
      if (clubs && clubs.length > 0) setCommunities(clubs);
    });

    fetchPosts(currentUser.id).then((livePosts) => {
      if (livePosts && livePosts.length > 0) {
        setPosts(
          livePosts.map((p) => ({
            id: p.id,
            author: {
              name: p.author.name,
              handle: `@${p.author.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
              initials: (p.author.name || 'S')[0].toUpperCase(),
              avatar: p.author.avatar,
              avatarColor: 'bg-indigo-600',
            },
            date: p.timestamp,
            content: p.content,
            linkCard: p.mediaUrl
              ? {
                  url: p.mediaUrl,
                  domain: p.mediaUrl.includes('drive.google.com')
                    ? 'drive.google.com'
                    : 'cohortpccoe.in',
                }
              : undefined,
            likes: p.likesCount,
            isLiked: p.isLiked,
            replies: (p.replies || []).map((r) => ({
              id: r.id,
              author: {
                name: r.author.name,
                handle: `@${r.author.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
                initials: (r.author.name || 'S')[0].toUpperCase(),
                avatarColor: 'bg-emerald-600',
              },
              content: r.content,
              date: r.timestamp,
            })),
          }))
        );
      }
    });
  }, [currentUser.id]);

  const handleToggleLike = async (postId: string) => {
    const target = posts.find((p) => p.id === postId);
    if (!target) return;
    const isCurrentlyLiked = Boolean(target.isLiked);

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            isLiked: !isCurrentlyLiked,
            likes: !isCurrentlyLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );

    if (currentUser.id) {
      try {
        await toggleLikePost(postId, currentUser.id, isCurrentlyLiked);
      } catch (err) {
        console.warn('Like toggle error:', err);
      }
    }
  };

  const handleAddReply = async (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;

    const newReply = {
      id: `r_${Date.now()}`,
      author: {
        name: currentUser.name || 'Student',
        handle: `@${(currentUser.name || 'student').toLowerCase().replace(/\s/g, '')}`,
        initials: (currentUser.name || 'S')[0].toUpperCase(),
        avatarColor: 'bg-indigo-600',
      },
      content: text.trim(),
      date: 'Just now',
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: [...p.replies, newReply],
          };
        }
        return p;
      })
    );

    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
    setOpenReplies((prev) => ({ ...prev, [postId]: true }));

    if (currentUser.id) {
      try {
        await createComment(postId, currentUser.id, text.trim());
      } catch (err) {
        console.warn('Create comment error:', err);
      }
    }
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;

    const contentToPost = newPostText.trim();
    const newP: FeedPost = {
      id: `p_${Date.now()}`,
      author: {
        name: currentUser.name || 'Siddhant Verma',
        handle: `@${(currentUser.name || 'siddhant').toLowerCase().replace(/\s/g, '')}`,
        initials: (currentUser.name || 'S')[0].toUpperCase(),
        avatar: currentUser.avatar,
        avatarColor: 'bg-indigo-600',
      },
      date: 'Just now',
      content: contentToPost,
      likes: 0,
      replies: [],
    };

    setPosts([newP, ...posts]);
    setNewPostText('');

    if (currentUser.id) {
      try {
        await createPost(currentUser.id, contentToPost, 'Announcement', ['Cohort', 'PCCOE']);
      } catch (err) {
        console.warn('Create post error:', err);
      }
    }
  };

  const navItems: { id: ActiveTab; icon: any; label: string; badge?: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'communities', icon: Users, label: 'Communities', badge: '2' },
    { id: 'friends', icon: Heart, label: 'Friends' },
    { id: 'connect', icon: MessageSquare, label: 'Connect' },
    { id: 'xd', icon: Zap, label: 'XD' },
    { id: 'map', icon: MapPin, label: 'Map' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'arcade', icon: Gamepad2, label: 'Arcade' },
    { id: 'headsup', icon: Bell, label: 'HeadsUp', badge: '2' },
    { id: 'contact', icon: Mail, label: 'Contact Us' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const spiderPrefix = darkMode ? '/assets/dark' : '/assets/light';

  return (
    <div
      className={`min-h-screen flex relative font-sans transition-colors duration-300 ${
        darkMode
          ? 'bg-[#050507] text-[#e4e4e7] selection:bg-[#2dd4bf] selection:text-black'
          : 'bg-[#fafafa] text-[#0f172a] selection:bg-[#2dd4bf] selection:text-black'
      }`}
    >
      {/* Background Geometric Doodle Grid */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
          darkMode ? 'opacity-[0.04]' : 'opacity-[0.035]'
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15h10v10H15z M45 20l5-10 5 10z M80 15a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M15 50l10 10-10 10z M50 50h10v10H50z M85 55l-5 10h10z M15 90a5 5 0 1 0 10 0 5 5 0 0 0-10 0z M50 90h10v10H50z M85 85l5 10 5-10z M105 15h10v10h-10z M105 50h10v10h-10z M105 85h10v10h-10z' stroke='${
            darkMode ? '%23ffffff' : '%23000000'
          }' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Spider-Man Stickers (Dynamic Light vs Dark Assets) */}
      <img
        src={`${spiderPrefix}1.svg`}
        alt=""
        className="fixed top-2 left-24 w-9 h-9 pointer-events-none z-30 opacity-90"
      />
      <img
        src={`${spiderPrefix}5.${darkMode ? 'png' : 'svg'}`}
        alt=""
        className="fixed bottom-24 left-10 w-10 h-10 pointer-events-none z-30 opacity-90 rotate-12"
      />
      <img
        src={`${spiderPrefix}4.svg`}
        alt=""
        className="fixed top-3 right-64 w-8 h-8 pointer-events-none z-30 opacity-95"
      />
      <img
        src={`${spiderPrefix}3.svg`}
        alt=""
        className="fixed top-80 right-2 w-9 h-9 pointer-events-none z-30 opacity-90"
      />
      <img
        src={`${spiderPrefix}6.${darkMode ? 'png' : 'svg'}`}
        alt=""
        className="fixed bottom-12 right-20 w-8 h-8 pointer-events-none z-30 opacity-90"
      />

      {/* ========================================================================= */}
      {/* LEFT SIDEBAR: Collapsed by Default (w-[68px]), Expands on Cursor Hover (w-60) */}
      {/* ========================================================================= */}
      <aside
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`shrink-0 h-screen sticky top-0 border-r flex flex-col py-4 z-40 transition-all duration-300 ease-in-out ${
          darkMode
            ? 'border-white/[0.08] bg-[#07070a]/95 backdrop-blur-md'
            : 'border-slate-200 bg-white/95 backdrop-blur-md shadow-sm'
        } ${isSidebarHovered ? 'w-60 px-3' : 'w-[68px] px-2 items-center'}`}
      >
        {/* Logo */}
        <div
          className={`flex items-center mb-6 transition-all duration-300 ${
            isSidebarHovered ? 'gap-2.5 px-2 justify-start' : 'justify-center w-full'
          }`}
        >
          <img
            src="/assets/cohort-logo.png"
            alt="Cohort"
            className="w-7 h-7 rounded-lg shrink-0"
          />
          {isSidebarHovered && (
            <span
              className={`font-heading font-black text-xl tracking-tight lowercase animate-[fadeIn_0.15s_ease-out] ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              cohort
            </span>
          )}
        </div>

        {/* Nav List */}
        <nav
          className={`flex flex-col gap-2 w-full flex-1 overflow-y-auto scrollbar-hide ${
            isSidebarHovered ? 'pr-1' : 'items-center'
          }`}
        >
          {navItems.map(({ id, icon: Icon, label, badge }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                title={!isSidebarHovered ? label : undefined}
                className={`relative flex items-center rounded-2xl text-xs transition-all duration-200 cursor-pointer ${
                  isSidebarHovered
                    ? 'justify-between px-3.5 py-2.5 w-full'
                    : 'justify-center w-11 h-11 p-0'
                } ${
                  isActive
                    ? darkMode
                      ? 'bg-[#2dd4bf] text-black shadow-lg shadow-[#2dd4bf]/20 font-bold'
                      : 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/20 font-semibold'
                    : darkMode
                    ? 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className={`flex items-center ${isSidebarHovered ? 'gap-3' : 'justify-center'}`}>
                  <Icon
                    className={`w-5 h-5 shrink-0 ${
                      isActive
                        ? darkMode
                          ? 'text-black stroke-[2.3]'
                          : 'text-white stroke-[2.3]'
                        : darkMode
                        ? 'text-zinc-400'
                        : 'text-slate-500'
                    }`}
                  />
                  {isSidebarHovered && (
                    <span className="truncate font-semibold">{label}</span>
                  )}
                </div>

                {/* Badge Notification */}
                {badge && (
                  <span
                    className={`inline-flex items-center justify-center text-[10px] font-black rounded-full ${
                      isSidebarHovered
                        ? 'w-4 h-4 bg-rose-500 text-white'
                        : darkMode
                        ? 'absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white ring-2 ring-[#07070a]'
                        : 'absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white ring-2 ring-white'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Wordmark & Theme Switch */}
        <div
          className={`mt-auto pt-3 border-t flex flex-col ${
            darkMode ? 'border-white/[0.08]' : 'border-slate-200'
          } ${isSidebarHovered ? 'w-full space-y-3' : 'items-center space-y-2'}`}
        >
          {/* SPIDER-MAN Red Wordmark (Visible when expanded) */}
          {isSidebarHovered && (
            <div className="px-3 pt-1 text-red-600 font-extrabold tracking-widest text-[11px] font-mono select-none opacity-85 animate-[fadeIn_0.15s_ease-out]">
              SPIDER-MAN
            </div>
          )}

          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              title={darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
              className={`flex items-center rounded-xl text-xs transition cursor-pointer ${
                darkMode
                  ? 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              } ${
                isSidebarHovered
                  ? 'gap-2.5 px-3 py-2 w-full justify-start'
                  : 'justify-center w-11 h-11'
              }`}
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5 text-amber-400 shrink-0" />
                  {isSidebarHovered && <span className="font-medium">Light mode</span>}
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-indigo-500 shrink-0" />
                  {isSidebarHovered && <span className="font-medium">Dark mode</span>}
                </>
              )}
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* CENTER STAGE */}
      {/* ========================================================================= */}
      <main
        className={`flex-1 min-w-0 px-6 py-5 z-10 transition-all duration-300 ${
          activeTab === 'home' ? 'max-w-2xl mx-auto' : 'max-w-5xl mx-auto'
        }`}
      >
        {/* Top Header for Home tab only */}
        {activeTab === 'home' && (
          <div className="flex items-center gap-2 mb-6">
            <h1
              className={`font-heading text-lg font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              c/home
            </h1>
          </div>
        )}

        {/* Route Renderers */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Post Composer Card */}
            <div
              className={`border rounded-2xl p-4 shadow-xl transition-colors ${
                darkMode
                  ? 'bg-[#0e0e13] border-white/[0.08] shadow-black/40'
                  : 'bg-white border-slate-200 shadow-slate-200/50'
              }`}
            >
              <div className="flex items-start gap-3">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                  />
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-black shrink-0 ${
                      darkMode
                        ? 'bg-black border-white/20 text-white'
                        : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  >
                    {(currentUser.name || 'S')[0].toUpperCase()}
                  </div>
                )}
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="What's on your mind? Type @ to tag users or communities"
                  rows={2}
                  className={`flex-1 bg-transparent text-xs outline-none resize-none pt-1 ${
                    darkMode
                      ? 'text-white placeholder:text-zinc-500'
                      : 'text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div
                className={`flex items-center justify-between mt-3 pt-3 border-t ${
                  darkMode ? 'border-white/[0.06]' : 'border-slate-100'
                }`}
              >
                <button
                  className={`flex items-center gap-1.5 text-xs transition px-2 py-1 rounded-lg cursor-pointer ${
                    darkMode
                      ? 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attach</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNewPostText('')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition cursor-pointer ${
                      darkMode
                        ? 'text-zinc-400 hover:text-white'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPostText.trim()}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                      newPostText.trim()
                        ? 'bg-[#3b82f6] text-white hover:bg-blue-600'
                        : darkMode
                        ? 'bg-[#1f2937] text-zinc-500 cursor-not-allowed'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-3 h-3" />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Stream */}
            <div className="space-y-5">
              {posts.map((post) => {
                const isRepliesOpen = openReplies[post.id];
                return (
                  <div
                    key={post.id}
                    className={`border rounded-2xl p-4 shadow-xl transition-colors ${
                      darkMode
                        ? 'bg-[#0e0e13] border-white/[0.08] shadow-black/30'
                        : 'bg-white border-slate-200 shadow-slate-200/50'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        {post.author.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                          />
                        ) : (
                          <div
                            className={`w-8 h-8 rounded-full ${post.author.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                          >
                            {post.author.initials}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-xs font-bold ${
                                darkMode ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {post.author.name}
                            </span>
                            <span
                              className={`text-[11px] ${
                                darkMode ? 'text-zinc-400' : 'text-slate-500'
                              }`}
                            >
                              {post.author.handle}
                            </span>
                            <span
                              className={`text-[11px] ${
                                darkMode ? 'text-zinc-500' : 'text-slate-400'
                              }`}
                            >
                              • {post.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Heart Pill */}
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition cursor-pointer ${
                          post.isLiked
                            ? 'bg-rose-500/10 border-rose-500/40 text-rose-500'
                            : darkMode
                            ? 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-950'
                        }`}
                      >
                        <Heart
                          className={`w-3 h-3 ${post.isLiked ? 'fill-rose-500' : ''}`}
                        />
                        <span>{post.likes}</span>
                      </button>
                    </div>

                    {/* Content */}
                    <div
                      className={`text-xs leading-relaxed whitespace-pre-line mb-3 ${
                        darkMode ? 'text-zinc-200' : 'text-slate-800'
                      }`}
                    >
                      {post.content}
                    </div>

                    {/* Link Card Attachment */}
                    {post.linkCard && (
                      <a
                        href={post.linkCard.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center gap-3 p-2.5 mb-3 rounded-xl border transition group ${
                          darkMode
                            ? 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-blue-500 font-medium truncate group-hover:underline">
                            {post.linkCard.url}
                          </div>
                          <div
                            className={`text-[10px] ${
                              darkMode ? 'text-zinc-500' : 'text-slate-400'
                            }`}
                          >
                            {post.linkCard.domain}
                          </div>
                        </div>
                      </a>
                    )}

                    {/* Reply Toggle Button */}
                    <button
                      onClick={() =>
                        setOpenReplies((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer mb-3 border ${
                        darkMode
                          ? 'bg-[#1e293b]/70 hover:bg-[#1e293b] text-blue-400 border-blue-500/20'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200'
                      }`}
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>{post.replies.length} Reply</span>
                    </button>

                    {/* Reply List */}
                    {isRepliesOpen && post.replies.length > 0 && (
                      <div
                        className={`space-y-2.5 pt-2 border-t mb-3 ${
                          darkMode ? 'border-white/[0.06]' : 'border-slate-100'
                        }`}
                      >
                        {post.replies.map((r) => (
                          <div key={r.id} className="flex items-start gap-2.5">
                            <div
                              className={`w-6 h-6 rounded-full ${r.author.avatarColor} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
                            >
                              {r.author.initials}
                            </div>
                            <div
                              className={`flex-1 rounded-xl px-3 py-2 border ${
                                darkMode
                                  ? 'bg-white/[0.03] border-white/[0.06]'
                                  : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span
                                  className={`text-[11px] font-bold ${
                                    darkMode ? 'text-white' : 'text-slate-900'
                                  }`}
                                >
                                  {r.author.name}
                                </span>
                                <span
                                  className={`text-[10px] ${
                                    darkMode ? 'text-zinc-500' : 'text-slate-400'
                                  }`}
                                >
                                  {r.author.handle}
                                </span>
                              </div>
                              <p
                                className={`text-xs ${
                                  darkMode ? 'text-zinc-300' : 'text-slate-700'
                                }`}
                              >
                                {r.content}
                              </p>
                              <span
                                className={`text-[9px] block mt-1 ${
                                  darkMode ? 'text-zinc-500' : 'text-slate-400'
                                }`}
                              >
                                {r.date}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input Box */}
                    <div
                      className={`flex items-center gap-2 pt-2 border-t ${
                        darkMode ? 'border-white/[0.06]' : 'border-slate-100'
                      }`}
                    >
                      {currentUser.avatar ? (
                        <img
                          src={currentUser.avatar}
                          alt=""
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                        />
                      ) : (
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-black shrink-0 ${
                            darkMode
                              ? 'bg-black border-white/20 text-white'
                              : 'bg-slate-900 border-slate-700 text-white'
                          }`}
                        >
                          {(currentUser.name || 'S')[0].toUpperCase()}
                        </div>
                      )}
                      <div
                        className={`flex-1 flex items-center gap-2 rounded-xl px-3 py-1.5 border ${
                          darkMode
                            ? 'bg-white/[0.03] border-white/[0.08]'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <input
                          type="text"
                          value={replyInputs[post.id] || ''}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && handleAddReply(post.id)}
                          placeholder="Write a reply... Type @ to tag someone"
                          className={`flex-1 bg-transparent text-xs outline-none ${
                            darkMode
                              ? 'text-white placeholder:text-zinc-500'
                              : 'text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                        <button
                          onClick={() => handleAddReply(post.id)}
                          className={`p-1 rounded-lg transition cursor-pointer ${
                            darkMode
                              ? 'text-zinc-400 hover:text-blue-400'
                              : 'text-slate-500 hover:text-blue-600'
                          }`}
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sub-Pages Renderers */}
        {activeTab === 'communities' && (
          <CommunitiesPage communities={communities} darkMode={darkMode} />
        )}
        {activeTab === 'friends' && (
          <FriendsPage currentUserId={currentUser.id} darkMode={darkMode} />
        )}
        {activeTab === 'connect' && (
          <ConnectPage
            currentUserId={currentUser.id}
            currentUser={currentUser}
            darkMode={darkMode}
          />
        )}
        {activeTab === 'xd' && <XDPage darkMode={darkMode} />}
        {activeTab === 'map' && <MapPage />}
        {activeTab === 'calendar' && <CalendarPage darkMode={darkMode} />}
        {activeTab === 'arcade' && <ArcadePage darkMode={darkMode} />}
        {activeTab === 'headsup' && <HeadsUpPage darkMode={darkMode} />}
        {activeTab === 'contact' && (
          <ContactUsPage currentUser={currentUser} darkMode={darkMode} />
        )}
        {activeTab === 'profile' && (
          <ProfilePage
            currentUser={currentUser}
            darkMode={darkMode}
            onSignOut={onSignOut}
          />
        )}
      </main>

      {/* ========================================================================= */}
      {/* RIGHT SIDEBAR */}
      {/* ========================================================================= */}
      <aside
        className={`w-72 shrink-0 h-screen sticky top-0 border-l py-5 px-4 overflow-y-auto gap-5 flex flex-col z-20 text-xs transition-colors duration-300 ${
          darkMode
            ? 'border-white/[0.08] bg-[#07070a]/90 backdrop-blur-md'
            : 'border-slate-200 bg-white/90 backdrop-blur-md'
        }`}
      >
        {/* Search */}
        <div
          className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${
            darkMode
              ? 'bg-[#121217] border-white/[0.08]'
              : 'bg-slate-100 border-slate-200'
          }`}
        >
          <Search
            className={`w-3.5 h-3.5 shrink-0 ${
              darkMode ? 'text-zinc-400' : 'text-slate-500'
            }`}
          />
          <input
            type="text"
            placeholder="Search cohort..."
            className={`flex-1 bg-transparent text-xs outline-none ${
              darkMode
                ? 'text-white placeholder:text-zinc-500'
                : 'text-slate-900 placeholder:text-slate-400'
            }`}
          />
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded border ${
              darkMode
                ? 'text-zinc-400 bg-white/[0.05] border-white/[0.08]'
                : 'text-slate-500 bg-white border-slate-200'
            }`}
          >
            ⌘K
          </span>
        </div>

        {/* C/COMMUNITIES */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h3
              className={`text-[11px] font-bold uppercase tracking-wider ${
                darkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              C/COMMUNITIES
            </h3>
            <button
              onClick={() => setActiveTab('communities')}
              className={`transition cursor-pointer ${
                darkMode ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {[
              'Higher Studies Club for UPSC / MPSC -...',
              'Google Developer Groups PCCOE',
              'Higher Studies Club for CAT / GMAT -...',
            ].map((name, i) => (
              <div
                key={i}
                onClick={() => setActiveTab('communities')}
                className={`flex items-center gap-2.5 p-1.5 rounded-xl transition cursor-pointer group ${
                  darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-100'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0 overflow-hidden">
                  <img
                    src={
                      i === 1
                        ? '/assets/clubs/gdgc.png'
                        : '/assets/cohort-logo.png'
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`text-xs transition truncate ${
                    darkMode
                      ? 'text-zinc-300 group-hover:text-white'
                      : 'text-slate-700 group-hover:text-slate-950 font-medium'
                  }`}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* C/FRIENDS */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h3
              className={`text-[11px] font-bold uppercase tracking-wider ${
                darkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              C/FRIENDS
            </h3>
            <button
              onClick={() => setActiveTab('friends')}
              className={`transition cursor-pointer ${
                darkMode ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'C157_Shravan Kolhe', user: '@shravan24', color: 'bg-purple-600', init: 'C' },
              { name: 'FELINA MATHEW', user: '@felina22', color: 'bg-emerald-600', init: 'F' },
              { name: 'Arnav Telangi', user: '@arnav24', color: 'bg-indigo-600', init: 'A' },
            ].map((f, i) => (
              <div
                key={i}
                onClick={() => setActiveTab('friends')}
                className={`flex items-center gap-2.5 p-1.5 rounded-xl transition cursor-pointer group ${
                  darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${f.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
                >
                  {f.init}
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-xs font-semibold transition truncate ${
                      darkMode
                        ? 'text-zinc-200 group-hover:text-white'
                        : 'text-slate-800 group-hover:text-slate-950'
                    }`}
                  >
                    {f.name}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      darkMode ? 'text-zinc-500' : 'text-slate-400'
                    }`}
                  >
                    {f.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C/CONNECT */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h3
              className={`text-[11px] font-bold uppercase tracking-wider ${
                darkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              C/CONNECT
            </h3>
            <button
              onClick={() => setActiveTab('connect')}
              className={`transition cursor-pointer ${
                darkMode ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'C157_Shravan Kolhe', user: '@shravan24', color: 'bg-purple-600', init: 'C' },
              { name: 'FELINA MATHEW', user: '@felina22', color: 'bg-emerald-600', init: 'F' },
              { name: 'Arnav Telangi', user: '@arnav24', color: 'bg-indigo-600', init: 'A' },
            ].map((f, i) => (
              <div
                key={i}
                onClick={() => setActiveTab('connect')}
                className={`flex items-center gap-2.5 p-1.5 rounded-xl transition cursor-pointer group ${
                  darkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full ${f.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}
                >
                  {f.init}
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-xs font-semibold transition truncate ${
                      darkMode
                        ? 'text-zinc-200 group-hover:text-white'
                        : 'text-slate-800 group-hover:text-slate-950'
                    }`}
                  >
                    {f.name}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      darkMode ? 'text-zinc-500' : 'text-slate-400'
                    }`}
                  >
                    {f.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C/CALENDAR */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`text-[11px] font-bold uppercase tracking-wider ${
                darkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              C/CALENDAR
            </h3>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`transition cursor-pointer ${
                darkMode ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div
            className={`text-[11px] px-1 ${
              darkMode ? 'text-zinc-500' : 'text-slate-400'
            }`}
          >
            No upcoming events
          </div>
        </section>

        {/* C/HEADSUP */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`text-[11px] font-bold uppercase tracking-wider ${
                darkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              C/HEADSUP
            </h3>
            <button
              onClick={() => setActiveTab('headsup')}
              className={`transition cursor-pointer ${
                darkMode ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div
            onClick={() => setActiveTab('headsup')}
            className={`p-2.5 rounded-xl border cursor-pointer transition ${
              darkMode
                ? 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10'
                : 'bg-amber-50 border-amber-200 hover:bg-amber-100/70'
            }`}
          >
            <div className="text-[10px] font-bold text-amber-500 uppercase mb-0.5">Important</div>
            <p
              className={`text-[11px] leading-relaxed ${
                darkMode ? 'text-zinc-300' : 'text-amber-950'
              }`}
            >
              Full access will soon require PCCOE account login
            </p>
          </div>
        </section>
      </aside>

      {/* Floating Messenger Icon */}
      <button
        onClick={() => setActiveTab('connect')}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-2xl hover:scale-110 transition cursor-pointer z-30 flex items-center justify-center ring-2 ${
          darkMode
            ? 'bg-black text-white shadow-purple-500/30 ring-indigo-500/60'
            : 'bg-slate-900 text-white shadow-slate-900/30 ring-indigo-500/40'
        }`}
        title="Open Campus Chat"
      >
        <MessageSquare className="w-5 h-5 text-indigo-400" />
      </button>
    </div>
  );
};
