import React, { useState } from 'react';
import {
  Home, Users, MessageSquare, Zap, Map, CalendarDays, User, Search,
  Heart, MessageCircle, Send, Paperclip, ChevronRight, Bell, MoreHorizontal,
  Hash, Radio,
} from 'lucide-react';
import type { Post } from '../types';
import { MOCK_POSTS, MOCK_COMMUNITIES, MOCK_FRIENDS, MOCK_HEADSUP } from '../data/mockData';

interface HomeFeedProps {
  currentUser: { name: string; email: string; avatar?: string };
  onSignOut?: () => void;
}

const CATEGORIES = ['All', 'Hackathon', 'Club Announcement', 'Resource', 'Announcement', 'Opportunity'];

const categoryColors: Record<string, string> = {
  'Club Announcement': 'bg-indigo-500/15 text-indigo-500',
  'Hackathon': 'bg-orange-500/15 text-orange-500',
  'Resource': 'bg-emerald-500/15 text-emerald-500',
  'Announcement': 'bg-sky-500/15 text-sky-500',
  'Opportunity': 'bg-violet-500/15 text-violet-500',
};

// Single Post Card Component
const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');

  const initials = post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  const avatarColors = ['bg-indigo-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600', 'bg-sky-600'];
  const colorIndex = post.author.name.charCodeAt(0) % avatarColors.length;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all hover:shadow-md hover:shadow-black/5">
      {/* Post Header */}
      <div className="p-4 pb-3 flex items-start gap-3">
        {post.author.avatar ? (
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-border"
          />
        ) : (
          <div className={`w-9 h-9 rounded-full ${avatarColors[colorIndex]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-foreground truncate">{post.author.name}</span>
            {post.author.badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-medium">
                {post.author.badge}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              @{post.author.name.toLowerCase().replace(/\s/g, '')} • {post.timestamp}
            </span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            {post.author.branch} • {post.author.year}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[post.category] || 'bg-secondary text-muted-foreground'}`}>
            {post.category}
          </span>
          <button className="p-1 rounded-lg hover:bg-secondary transition text-muted-foreground cursor-pointer">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{post.content}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-[11px] text-primary font-medium cursor-pointer hover:underline">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media Image */}
      {post.mediaUrl && (
        <div className="mx-4 mb-3 rounded-xl overflow-hidden border border-border">
          <img
            src={post.mediaUrl}
            alt="Post media"
            className="w-full h-40 object-cover"
          />
        </div>
      )}

      {/* Link Preview (for post_1) */}
      {post.id === 'post_1' && (
        <div className="mx-4 mb-3 flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-secondary/50 cursor-pointer hover:bg-secondary transition">
          <div className="w-7 h-7 rounded bg-blue-500/20 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-foreground truncate">https://drive.google.com/drive/folders/1Vk-5y...</div>
            <div className="text-[10px] text-muted-foreground">drive.google.com</div>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="px-4 pb-3 flex items-center gap-4">
        <button
          onClick={() => { setLiked(!liked); setLikesCount(c => liked ? c - 1 : c + 1); }}
          className={`flex items-center gap-1.5 text-xs font-medium transition cursor-pointer ${liked ? 'text-rose-500' : 'text-muted-foreground hover:text-rose-500'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} />
          <span>{likesCount}</span>
        </button>

        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.commentsCount}</span>
        </button>

        {post.replies && post.replies.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-xs text-primary font-medium hover:underline cursor-pointer"
          >
            {showReplies ? 'Hide' : `${post.replies.length} Reply`}
          </button>
        )}
      </div>

      {/* Replies */}
      {showReplies && post.replies && (
        <div className="px-4 pb-2 space-y-2 border-t border-border pt-3">
          {post.replies.map(reply => {
            const replyInitials = reply.author.name.split(' ').map(n => n[0]).join('').slice(0, 2);
            return (
              <div key={reply.id} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-foreground shrink-0">
                  {replyInitials}
                </div>
                <div className="flex-1 bg-secondary/60 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-semibold text-foreground">{reply.author.name}</span>
                    <span className="text-[10px] text-muted-foreground">{reply.timestamp}</span>
                  </div>
                  <p className="text-xs text-foreground">{reply.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reply Input Box */}
      {showReplyBox && (
        <div className="px-4 pb-4 border-t border-border pt-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">SD</div>
            <div className="flex-1 flex items-center gap-2 bg-secondary/60 rounded-xl px-3 py-2 border border-border">
              <input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Write a reply... Type @ to tag someone"
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button className="p-1 rounded-lg hover:bg-secondary transition text-muted-foreground cursor-pointer">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Home Feed Layout
export const HomeFeed: React.FC<HomeFeedProps> = ({ currentUser }) => {
  const [postText, setPostText] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState(MOCK_POSTS);

  const userInitials = currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: `post_${Date.now()}`,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        branch: 'Computer Engineering',
        year: 'TE',
        badge: 'Student',
      },
      timestamp: 'Just now',
      category: 'Announcement',
      content: postText,
      tags: [],
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
    };
    setPosts([newPost, ...posts]);
    setPostText('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Sidebar: Icon Navigation */}
      <aside className="hidden md:flex flex-col items-center w-16 lg:w-64 shrink-0 h-screen sticky top-0 border-r border-border bg-background/90 backdrop-blur-sm py-4 px-3">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-1 w-full">
          <img
            src="https://res.cloudinary.com/dgd5sfnrq/image/upload/v1771391844/cohort-logo_g04wy2.png"
            alt="Cohort"
            className="w-9 h-9 rounded-lg shrink-0"
          />
          <span className="hidden lg:block font-heading font-bold text-xl text-foreground tracking-tight">c/home</span>
          <img
            src="https://www.cohortpccoe.in/assets/light1-CvHQPJnb.svg"
            alt=""
            className="hidden lg:block w-7 h-7 ml-auto opacity-70"
          />
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 w-full flex-1">
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: MessageSquare, label: 'Messages', active: false },
            { icon: Search, label: 'Search', active: false },
            { icon: Zap, label: 'XD (Exchange)', active: false },
            { icon: Users, label: 'Communities', active: false },
            { icon: Map, label: 'Campus Maps', active: false },
            { icon: CalendarDays, label: 'Calendar', active: false },
            { icon: User, label: 'Profile', active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer w-full ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden lg:block">{label}</span>
            </button>
          ))}
        </nav>

        {/* User Avatar at Bottom */}
        <div className="mt-auto pt-4 border-t border-border w-full">
          <div className="flex items-center gap-3 px-2 py-2">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-border shrink-0" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {userInitials}
              </div>
            )}
            <div className="hidden lg:block min-w-0">
              <div className="text-sm font-semibold text-foreground truncate">{currentUser.name}</div>
              <div className="text-[11px] text-muted-foreground truncate">{currentUser.email}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Center: Feed */}
      <main className="flex-1 min-w-0 max-w-2xl mx-auto px-4 py-6">
        {/* Post Composer */}
        <div className="bg-card border border-border rounded-2xl p-4 mb-5">
          <div className="flex items-start gap-3">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-border shrink-0" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {userInitials}
              </div>
            )}
            <textarea
              value={postText}
              onChange={e => setPostText(e.target.value)}
              placeholder="What's on your mind? Type @ to tag users or communities"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none min-h-[64px]"
              rows={3}
            />
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition px-3 py-1.5 rounded-lg hover:bg-secondary cursor-pointer">
              <Paperclip className="w-4 h-4" />
              <span>Attach</span>
            </button>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs rounded-lg text-muted-foreground hover:bg-secondary transition cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={!postText.trim()}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  postText.trim()
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-72 shrink-0 h-screen sticky top-0 border-l border-border bg-background/90 backdrop-blur-sm py-6 px-4 overflow-y-auto gap-6">
        {/* Search */}
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5 border border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search cohort..."
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
          />
          <span className="text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">⌘K</span>
        </div>

        {/* C/Communities */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">C/Communities</h3>
            <button className="text-[11px] text-primary hover:underline cursor-pointer flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {MOCK_COMMUNITIES.map(club => (
              <div
                key={club.id}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-secondary transition cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center overflow-hidden shrink-0">
                  {club.logo.startsWith('http') && !club.logo.includes('iconify') ? (
                    <img src={club.logo} alt={club.acronym} className="w-full h-full object-cover" />
                  ) : (
                    <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
                <span className="text-xs font-medium text-foreground group-hover:text-primary transition truncate">
                  {club.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* C/Friends */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">C/Friends</h3>
            <button className="text-[11px] text-primary hover:underline cursor-pointer flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {MOCK_FRIENDS.map(friend => (
              <div
                key={friend.id}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-secondary transition cursor-pointer group"
              >
                <div className="relative shrink-0">
                  {friend.avatar ? (
                    <img src={friend.avatar} alt={friend.name} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className={`w-7 h-7 rounded-full ${friend.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                      {friend.initials}
                    </div>
                  )}
                  {friend.online && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-background" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-foreground group-hover:text-primary transition truncate">{friend.name}</div>
                  <div className="text-[10px] text-muted-foreground">{friend.username}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C/Connect */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">C/Connect</h3>
            <button className="text-[11px] text-primary hover:underline cursor-pointer flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {MOCK_FRIENDS.map(friend => (
              <div
                key={friend.id}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-secondary transition cursor-pointer"
              >
                <div className={`w-7 h-7 rounded-full ${friend.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                  {friend.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-foreground truncate">{friend.name}</div>
                  <div className="text-[10px] text-muted-foreground">{friend.username}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* C/Calendar */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">C/Calendar</h3>
            <button className="text-[11px] text-primary hover:underline cursor-pointer flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="text-xs text-muted-foreground px-1">No upcoming events</div>
        </section>

        {/* C/HeadsUp */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">C/HeadsUp</h3>
          </div>
          <div className="space-y-2">
            {MOCK_HEADSUP.map(item => (
              <div key={item.id} className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
                <div className="text-[10px] font-bold text-amber-500 uppercase mb-1">Important</div>
                <p className="text-xs text-foreground leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
};
