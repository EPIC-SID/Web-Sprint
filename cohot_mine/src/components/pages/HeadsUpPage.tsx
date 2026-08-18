import React, { useState } from 'react';
import { Users, Check, ArrowUpRight, Bell } from 'lucide-react';

interface NotificationItem {
  id: string;
  category: string;
  timestamp: string;
  isUnread: boolean;
  title: string;
  description: string;
  profileHandle: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    category: 'People',
    timestamp: '1h ago',
    isUnread: true,
    title: 'You may know @tanishq25',
    description: 'TANISHQ SURYAWANSHI is active on Cohort. Follow to stay updated.',
    profileHandle: 'tanishq25',
  },
  {
    id: 'n2',
    category: 'People',
    timestamp: '1h ago',
    isUnread: true,
    title: 'You may know @pratik241',
    description: '340-Pratik is active on Cohort. Follow to stay updated.',
    profileHandle: 'pratik241',
  },
];

export const HeadsUpPage: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <div className={`space-y-6 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="relative inline-flex items-center">
              <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                c/headsup
              </h1>
              <img
                src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
                alt=""
                className="absolute -top-3.5 left-[14px] w-6 h-6 pointer-events-none z-10"
              />
            </div>

            {unreadCount > 0 && (
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                darkMode
                  ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                  : 'bg-blue-50 text-blue-600 border-blue-200'
              }`}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Your personalized notifications, recommendations, and updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer self-start ${
              darkMode
                ? 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border-white/[0.08]'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`border rounded-[20px] p-5 transition-all shadow-sm flex items-start gap-4 group ${
              darkMode
                ? 'bg-[#0e0e13] border-white/[0.08] hover:border-white/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Left Icon */}
            <div className={`p-3 rounded-2xl shrink-0 ${
              darkMode ? 'bg-white/[0.04] text-zinc-400' : 'bg-slate-100 text-slate-500'
            }`}>
              <Users className="w-5 h-5" />
            </div>

            {/* Notification Content */}
            <div className="flex-1 min-w-0">
              {/* Category & Timestamp Row */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  darkMode
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-blue-50 text-blue-600 font-semibold'
                }`}>
                  {item.category}
                </span>
                <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  {item.timestamp}
                </span>
                {item.isUnread && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                )}
              </div>

              {/* Title & Description */}
              <h3 className={`text-sm font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                {item.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Opening profile for @${item.profileHandle}`)}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#2563eb] hover:bg-blue-600 text-white font-semibold text-xs transition cursor-pointer shadow-md shadow-blue-500/20"
                >
                  <span>View profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {item.isUnread && (
                  <button
                    onClick={() => handleMarkAsRead(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      darkMode
                        ? 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border-white/[0.08]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className={`border rounded-[20px] py-16 text-center shadow-sm ${
            darkMode ? 'bg-[#0e0e13] border-white/[0.06]' : 'bg-white border-slate-200'
          }`}>
            <Bell className="w-8 h-8 text-zinc-400 mx-auto mb-2 opacity-60" />
            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              No new notifications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
