import React, { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { MarqueeBanner } from './components/hero/MarqueeBanner';
import { FeedView } from './components/modules/HomeFeed/FeedView';
import { ConnectView } from './components/modules/Connect/ConnectView';
import { XDView } from './components/modules/XDHub/XDView';
import { CampusMapView } from './components/modules/CampusMaps/CampusMapView';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';
import { Toast, ToastMessage } from './components/ui/Toast';
import { MOCK_POSTS, MOCK_XD_PROJECTS } from './data/mockData';
import { Post, XDProject } from './types';
import './index.css';

// ── Inner app with access to auth context ──────────────────────────────────
function CohortApp() {
  const { isAuthenticated, user } = useAuth();

  // Tab routing
  const [activeTab, setActiveTab] = useState<'feed' | 'connect' | 'xd' | 'maps'>('feed');

  // Feed state
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  // XD Projects state
  const [xdProjects, setXdProjects] = useState<XDProject[]>(MOCK_XD_PROJECTS);

  // Toast system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Feed interactions
  const handleToggleLike = (postId: string) => {
    if (!isAuthenticated) {
      addToast('Sign in with your PCCOE Google account to like posts', 'info');
      return;
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
          : p
      )
    );
  };

  const handleAddComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p
      )
    );
    addToast('Reply posted successfully!', 'success');
  };

  // XD upvote
  const handleToggleUpvote = (projectId: string) => {
    if (!isAuthenticated) {
      addToast('Sign in to upvote student projects', 'info');
      return;
    }
    setXdProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, hasUpvoted: !p.hasUpvoted, upvotes: p.hasUpvoted ? p.upvotes - 1 : p.upvotes + 1 }
          : p
      )
    );
  };

  // Show hero + marquee only on feed tab and when not scrolled past
  const showLanding = activeTab === 'feed';

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans">
      {/* Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as typeof activeTab)}
        onOpenCreatePost={isAuthenticated ? () => addToast('Create post coming soon!', 'info') : undefined}
      />

      {/* Landing Hero (only on Home Feed) */}
      {showLanding && (
        <>
          <HeroSection
            onExploreConnect={() => setActiveTab('connect')}
            onExploreXD={() => setActiveTab('xd')}
          />
          <MarqueeBanner onSelectClub={(name) => addToast(`Viewing ${name}`, 'info')} />
        </>
      )}

      {/* Main Module Tabs */}
      <main className="w-full">
        {activeTab === 'feed' && (
          <FeedView
            posts={posts}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
            onOpenCreateModal={() =>
              isAuthenticated
                ? addToast('Create post modal coming soon!', 'info')
                : addToast('Sign in first to create a post', 'info')
            }
          />
        )}

        {activeTab === 'connect' && (
          <ConnectView onNotify={(msg) => addToast(msg, 'success')} />
        )}

        {activeTab === 'xd' && (
          <XDView
            projects={xdProjects}
            onToggleUpvote={handleToggleUpvote}
            onOpenSubmitModal={() => addToast('Project submission portal coming soon!', 'info')}
          />
        )}

        {activeTab === 'maps' && <CampusMapView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] mt-16 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-xs">
              C
            </div>
            <span className="font-semibold text-zinc-400">Cohort PCCOE</span>
            <span>•</span>
            <span>Official Student Platform</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-600">
            <span>Built with ❤️ at PCCOE Hackathon 2026</span>
            <span>•</span>
            <span>React 19 + Vite + Tailwind</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <GoogleAuthModal />

      {/* Toast Notification System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

// ── Root wrapper with AuthProvider ─────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <CohortApp />
    </AuthProvider>
  );
}
