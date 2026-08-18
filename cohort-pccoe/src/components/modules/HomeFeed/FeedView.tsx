import React, { useState } from 'react';
import { Post } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Send,
  Sparkles,
  Tag,
  Filter,
  Plus
} from 'lucide-react';

interface FeedViewProps {
  posts: Post[];
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onOpenCreateModal: () => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  posts,
  onToggleLike,
  onAddComment,
  onOpenCreateModal
}) => {
  const { isAuthenticated, user, openAuthModal } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [activeCommentsDrawer, setActiveCommentsDrawer] = useState<string | null>(null);

  const categories = ['All', 'Club Announcement', 'Hackathon', 'Resource', 'General'];

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Feed Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Campus Feed</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Real-time pulses, discussions, and updates from PCCOE students</p>
        </div>

        {/* Action Button */}
        <button
          onClick={isAuthenticated ? onOpenCreateModal : openAuthModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/25 transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-zinc-500 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-white/[0.05]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/[0.08] transition-all hover:border-white/[0.14]"
          >
            {/* Header / Author */}
            <div className="flex items-start justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full ring-2 ring-indigo-500/30 object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{post.author.name}</span>
                    {post.author.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {post.author.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span>{post.author.branch} • {post.author.year}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line mb-4 font-normal">
              {post.content}
            </p>

            {/* Attached Media */}
            {post.mediaUrl && (
              <div className="mb-4 rounded-xl overflow-hidden border border-white/[0.08] max-h-96">
                <img
                  src={post.mediaUrl}
                  alt="Post visual"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] text-indigo-300/90 hover:text-indigo-200 border border-white/[0.05] flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5 text-indigo-400" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Interaction Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs text-zinc-400">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleLike(post.id)}
                  className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
                    post.isLiked
                      ? 'text-rose-400 bg-rose-500/10'
                      : 'hover:text-rose-400 hover:bg-white/[0.04]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                  <span className="font-semibold">{post.likesCount}</span>
                </button>

                <button
                  onClick={() =>
                    setActiveCommentsDrawer(
                      activeCommentsDrawer === post.id ? null : post.id
                    )
                  }
                  className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-indigo-400 hover:bg-white/[0.04] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-semibold">{post.commentsCount}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.04] transition">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:text-white hover:bg-white/[0.04] transition">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Comment Drawer */}
            {activeCommentsDrawer === post.id && (
              <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={isAuthenticated ? "Write a quick reply..." : "Sign in with Google to reply..."}
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                    disabled={!isAuthenticated}
                    className="flex-1 bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    disabled={!isAuthenticated || !commentInputs[post.id]?.trim()}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
