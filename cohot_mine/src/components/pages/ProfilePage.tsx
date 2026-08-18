import React, { useState } from 'react';
import {
  Camera,
  Edit2,
  MessageSquare,
  Mail,
  LogOut,
} from 'lucide-react';

interface ProfilePageProps {
  currentUser: {
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    branch?: string;
    year?: string;
  };
  darkMode?: boolean;
  onSignOut?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  darkMode = false,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'replies'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [customName, setCustomName] = useState('278_SiddhantVerma');
  const [customHandle, setCustomHandle] = useState('@siddhant25');

  return (
    <div className={`space-y-6 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      {/* Top Profile Header Card with Gradient Banner */}
      <div className={`border rounded-[24px] overflow-hidden shadow-sm transition-colors ${
        darkMode ? 'bg-[#0e0e13] border-white/[0.08]' : 'bg-white border-slate-200'
      }`}>
        {/* Soft Pastel Gradient Banner */}
        <div className="relative h-48 w-full bg-gradient-to-r from-[#fbcfe8] via-[#e9d5ff] to-[#c7d2fe] overflow-hidden">
          {/* Spider-Man sticker on top-left of banner */}
          <img
            src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
            alt=""
            className="absolute top-4 left-10 w-9 h-9 pointer-events-none z-10 opacity-90"
          />

          {/* Cohort User Badge on top-right */}
          <div className="absolute top-4 right-5 z-10">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${
              darkMode
                ? 'bg-black/40 border-white/20 text-white'
                : 'bg-white/80 border-slate-200/80 text-slate-700 shadow-sm'
            }`}>
              <span>🎓 COHORT USER</span>
              <span className="text-blue-500 font-bold">✓</span>
            </div>
          </div>
        </div>

        {/* User Details & Action Bar */}
        <div className="px-8 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10">
            {/* Avatar & Name */}
            <div className="flex items-end gap-4">
              {/* Square Avatar with Google Gmail PFP or fallback S logo */}
              <div className="relative shrink-0">
                <div
                  className={`w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border-4 ${
                    darkMode
                      ? 'bg-[#0a0a0f] text-white border-[#0e0e13]'
                      : 'bg-[#0b0c10] text-white border-white'
                  }`}
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm0 2.18l6 3v4.82c0 4.54-3.14 8.78-6 9.87-2.86-1.09-6-5.33-6-9.87V7.18l6-3zM9.5 9h5a1 1 0 0 1 0 2h-3a1 1 0 0 0 0 2h3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5a1 1 0 0 0 0 2zm5 6h-5a1 1 0 0 1 0-2h3a1 1 0 0 0 0-2h-3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5a1 1 0 0 0 0-2z" />
                    </svg>
                  )}
                </div>

                {/* Camera upload button */}
                <button
                  onClick={() => alert('Profile photo upload dialog')}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-md hover:bg-blue-600 transition cursor-pointer"
                  title="Update profile picture"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Names */}
              <div className="mb-1">
                <h1 className={`font-heading text-lg font-bold tracking-tight ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {customName}
                </h1>
                <div className={`text-xs font-mono ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {customHandle}
                </div>
              </div>
            </div>

            {/* Action Bar (Edit, LinkedIn, Message, Email, Sign Out) */}
            <div className="flex items-center gap-1.5 flex-wrap pb-1">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  darkMode
                    ? 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Edit Profile"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  darkMode
                    ? 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.74a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
                </svg>
              </a>

              <button
                onClick={() => alert('Direct messages')}
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  darkMode
                    ? 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Messages"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>

              <a
                href={`mailto:${currentUser.email}`}
                className={`p-2 rounded-lg border transition cursor-pointer ${
                  darkMode
                    ? 'bg-white/[0.04] border-white/[0.08] text-zinc-300 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Send Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>

              {/* Sign Out Button */}
              <button
                onClick={onSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50/80 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition cursor-pointer ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>

          {/* Edit Inline Form */}
          {isEditing && (
            <div className={`mt-4 p-4 rounded-xl border space-y-3 ${
              darkMode ? 'bg-[#121217] border-white/[0.08]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className={`block mb-1 font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Display Name</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 border outline-none ${
                      darkMode ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block mb-1 font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Cohort Handle</label>
                  <input
                    type="text"
                    value={customHandle}
                    onChange={(e) => setCustomHandle(e.target.value)}
                    className={`w-full rounded-lg px-3 py-1.5 border outline-none ${
                      darkMode ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#2dd4bf] text-black font-bold text-xs"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4 Stats Cards Grid with Colorful Illustrations matching OG */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* COMMUNITIES */}
        <div className={`border rounded-2xl p-5 text-center transition shadow-sm flex flex-col items-center justify-between ${
          darkMode ? 'bg-[#0e0e13] border-white/[0.08]' : 'bg-white border-slate-200'
        }`}>
          {/* People working together illustration */}
          <div className="h-14 flex items-center justify-center mb-1">
            <svg className="w-16 h-12" viewBox="0 0 100 60" fill="none">
              <circle cx="30" cy="22" r="10" fill="#f97316" />
              <path d="M16 48c0-8 6-14 14-14s14 6 14 14" fill="#ea580c" />
              <circle cx="50" cy="18" r="11" fill="#3b82f6" />
              <path d="M34 48c0-9 7-16 16-16s16 7 16 16" fill="#2563eb" />
              <circle cx="70" cy="22" r="10" fill="#10b981" />
              <path d="M56 48c0-8 6-14 14-14s14 6 14 14" fill="#059669" />
            </svg>
          </div>
          <div>
            <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>5</div>
            <div className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              COMMUNITIES
            </div>
          </div>
        </div>

        {/* FOLLOWERS */}
        <div className={`border rounded-2xl p-5 text-center transition shadow-sm flex flex-col items-center justify-between ${
          darkMode ? 'bg-[#0e0e13] border-white/[0.08]' : 'bg-white border-slate-200'
        }`}>
          {/* Followers celebration illustration */}
          <div className="h-14 flex items-center justify-center mb-1">
            <svg className="w-16 h-12" viewBox="0 0 100 60" fill="none">
              <circle cx="50" cy="20" r="10" fill="#ec4899" />
              <path d="M36 48c0-8 6-14 14-14s14 6 14 14" fill="#db2777" />
              <circle cx="28" cy="26" r="7" fill="#a855f7" />
              <path d="M18 48c0-6 4-10 10-10s10 4 10 10" fill="#9333ea" />
              <circle cx="72" cy="26" r="7" fill="#8b5cf6" />
              <path d="M62 48c0-6 4-10 10-10s10 4 10 10" fill="#7c3aed" />
            </svg>
          </div>
          <div>
            <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>0</div>
            <div className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              FOLLOWERS
            </div>
          </div>
        </div>

        {/* FOLLOWING */}
        <div className={`border rounded-2xl p-5 text-center transition shadow-sm flex flex-col items-center justify-between ${
          darkMode ? 'bg-[#0e0e13] border-white/[0.08]' : 'bg-white border-slate-200'
        }`}>
          {/* Puzzle Pieces Illustration */}
          <div className="h-14 flex items-center justify-center mb-1">
            <svg className="w-14 h-12" viewBox="0 0 60 50" fill="none">
              <rect x="10" y="10" width="20" height="20" rx="3" fill="#38bdf8" />
              <circle cx="20" cy="8" r="4" fill="#38bdf8" />
              <circle cx="32" cy="20" r="4" fill="#0284c7" />
              <rect x="28" y="18" width="22" height="22" rx="3" fill="#0284c7" />
              <circle cx="39" cy="42" r="4" fill="#0284c7" />
            </svg>
          </div>
          <div>
            <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>3</div>
            <div className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              FOLLOWING
            </div>
          </div>
        </div>

        {/* FLEX */}
        <div className={`border rounded-2xl p-5 text-center transition shadow-sm flex flex-col items-center justify-between ${
          darkMode ? 'bg-[#0e0e13] border-white/[0.08]' : 'bg-white border-slate-200'
        }`}>
          {/* Flag milestone illustration */}
          <div className="h-14 flex items-center justify-center mb-1">
            <svg className="w-14 h-12" viewBox="0 0 60 50" fill="none">
              <path d="M22 8v34" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M22 10l18 6-18 6V10z" fill="#a855f7" />
              <circle cx="22" cy="42" r="4" fill="#cbd5e1" />
              <circle cx="34" cy="28" r="6" fill="#f43f5e" />
              <path d="M28 42c0-4 3-7 6-7s6 3 6 7" fill="#e11d48" />
            </svg>
          </div>
          <div>
            <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>0</div>
            <div className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              FLEX
            </div>
          </div>
        </div>
      </div>

      {/* Activity Stream */}
      <div className="space-y-4">
        <h2 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Activity</h2>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
              activeTab === 'posts'
                ? darkMode
                  ? 'bg-white/[0.08] text-white border-white/[0.1]'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
                : darkMode
                ? 'text-zinc-400 hover:text-white border-transparent'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <span>Posts</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              darkMode ? 'bg-white/10 text-zinc-300' : 'bg-slate-200/80 text-slate-600'
            }`}>
              0
            </span>
          </button>

          <button
            onClick={() => setActiveTab('replies')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
              activeTab === 'replies'
                ? darkMode
                  ? 'bg-white/[0.08] text-white border-white/[0.1]'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
                : darkMode
                ? 'text-zinc-400 hover:text-white border-transparent'
                : 'text-slate-500 hover:text-slate-900 border-transparent'
            }`}
          >
            <span>Replies</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              darkMode ? 'bg-white/10 text-zinc-300' : 'bg-slate-200/80 text-slate-600'
            }`}>
              0
            </span>
          </button>

          {/* Spider-Man sticker hanging above Replies tab */}
          <img
            src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
            alt=""
            className="absolute -top-3.5 left-28 w-6 h-6 pointer-events-none opacity-85"
          />
        </div>

        {/* Empty State Card */}
        <div className={`border rounded-[20px] py-20 text-center shadow-sm transition-colors ${
          darkMode ? 'bg-[#0e0e13] border-white/[0.06]' : 'bg-white border-slate-200'
        }`}>
          <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
            No posts yet.
          </p>
        </div>
      </div>
    </div>
  );
};
