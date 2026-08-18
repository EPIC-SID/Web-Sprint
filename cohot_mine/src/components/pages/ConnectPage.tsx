import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Send,
  Lock,
  Paperclip,
  Smile,
  Circle,
} from 'lucide-react';

interface ChatUser {
  id: string;
  name: string;
  handle: string;
  avatarText?: string;
  avatarColor: string;
  isOnline?: boolean;
}

const MEMBERS: ChatUser[] = [
  {
    id: 'u1',
    name: '004_Aaryan_Bhujang',
    handle: '@aaryan23',
    avatarText: '🙂',
    avatarColor: 'bg-rose-500',
    isOnline: true,
  },
  {
    id: 'u2',
    name: '005_nisha Devatwal',
    handle: '@nisha24',
    avatarText: 'D',
    avatarColor: 'bg-amber-700',
    isOnline: false,
  },
  {
    id: 'u3',
    name: '005_Rudraksh_Charhate',
    handle: '@rudraksh23',
    avatarText: '🙂',
    avatarColor: 'bg-rose-500',
    isOnline: true,
  },
  {
    id: 'u4',
    name: '007_Aboli Jadhav',
    handle: '@aboli25',
    avatarText: 'A',
    avatarColor: 'bg-sky-500',
    isOnline: false,
  },
  {
    id: 'u5',
    name: '021-Shreyash_Desai',
    handle: '@shreyash23',
    avatarText: '🌙',
    avatarColor: 'bg-indigo-900',
    isOnline: true,
  },
  {
    id: 'u6',
    name: '027 - MANASVI PATIL',
    handle: '@manasvi24',
    avatarText: 'P',
    avatarColor: 'bg-blue-600',
    isOnline: false,
  },
  {
    id: 'u7',
    name: '030_Swaraj Matre',
    handle: '@swaraj24',
    avatarText: 'D',
    avatarColor: 'bg-emerald-600',
    isOnline: true,
  },
  {
    id: 'u8',
    name: '035_Vaibhav Nimbole',
    handle: '@vaibhav251',
    avatarText: 'N',
    avatarColor: 'bg-stone-600',
    isOnline: false,
  },
  {
    id: 'u9',
    name: '046_Shubhang_Doley',
    handle: '@shubhang24',
    avatarText: '🙂',
    avatarColor: 'bg-amber-400',
    isOnline: true,
  },
  {
    id: 'u10',
    name: '047_Aaryan Nerkar',
    handle: '@aaryan24',
    avatarText: 'N',
    avatarColor: 'bg-teal-600',
    isOnline: true,
  },
];

interface MessageItem {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export const ConnectPage: React.FC<{
  currentUserId?: string;
  currentUser?: { name: string; email: string };
  darkMode?: boolean;
}> = ({ darkMode = false }) => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Record<string, MessageItem[]>>({
    u1: [
      { id: 'm1', sender: 'them', text: 'Hey, are you participating in SIH 2026?', time: '10:30 AM' },
      { id: 'm2', sender: 'me', text: 'Yes! Finalizing the team structure right now on Cohort.', time: '10:32 AM' },
    ],
  });
  const [inputText, setInputText] = useState('');

  const filteredMembers = MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.handle.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !inputText.trim()) return;

    const userMsgs = messages[selectedUser.id] || [];
    const newMsg: MessageItem = {
      id: `msg_${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages({
      ...messages,
      [selectedUser.id]: [...userMsgs, newMsg],
    });
    setInputText('');

    // Simulate auto-reply after 800ms
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: [
          ...(prev[selectedUser.id] || []),
          {
            id: `msg_rep_${Date.now()}`,
            sender: 'them',
            text: 'Got it! Let’s collaborate and build this.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
      }));
    }, 800);
  };

  return (
    <div className={`space-y-6 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      {/* Header */}
      <div>
        <div className="relative inline-flex items-center">
          <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            c/connect
          </h1>
          <img
            src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
            alt=""
            className="absolute -top-3.5 left-[14px] w-6 h-6 pointer-events-none z-10"
          />
        </div>
        <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Encrypted chats for cohort users.
        </p>
      </div>

      {/* Main Split Chat Card */}
      <div className={`border rounded-[24px] overflow-hidden shadow-sm flex flex-col md:flex-row h-[620px] transition-colors ${
        darkMode ? 'bg-[#0e0e13] border-white/[0.08]' : 'bg-white border-slate-200'
      }`}>
        {/* =================================================================== */}
        {/* LEFT PANEL: User Directory */}
        {/* =================================================================== */}
        <div className={`w-full md:w-80 shrink-0 border-b md:border-b-0 md:border-r flex flex-col ${
          darkMode ? 'border-white/[0.08] bg-[#07070a]/60' : 'border-slate-200 bg-white'
        }`}>
          {/* Search Input */}
          <div className="p-4">
            <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${
              darkMode ? 'bg-[#121217] border-white/[0.08]' : 'bg-slate-100/80 border-slate-200'
            }`}>
              <Search className={`w-3.5 h-3.5 shrink-0 ${darkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className={`flex-1 bg-transparent text-xs outline-none ${
                  darkMode ? 'text-white placeholder:text-zinc-500' : 'text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Directory Sections */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 scrollbar-hide text-xs">
            {/* RECENTS */}
            <div>
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                darkMode ? 'text-zinc-500' : 'text-slate-400'
              }`}>
                RECENTS
              </div>
              <div className={`text-xs italic ${darkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
                No users
              </div>
            </div>

            {/* FOLLOWERS */}
            <div>
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                darkMode ? 'text-zinc-500' : 'text-slate-400'
              }`}>
                FOLLOWERS
              </div>
              <div className={`text-xs italic ${darkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
                No users
              </div>
            </div>

            {/* MEMBERS */}
            <div>
              <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-zinc-500' : 'text-slate-400'
              }`}>
                MEMBERS
              </div>
              <div className="space-y-1">
                {filteredMembers.map((user) => {
                  const isSelected = selectedUser?.id === user.id;
                  return (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`flex items-center gap-3 p-2 rounded-xl transition cursor-pointer ${
                        isSelected
                          ? darkMode
                            ? 'bg-white/[0.08]'
                            : 'bg-slate-100'
                          : darkMode
                          ? 'hover:bg-white/[0.04]'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-full ${user.avatarColor} text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm`}>
                        {user.avatarText}
                      </div>

                      {/* Name & Handle */}
                      <div className="min-w-0 flex-1">
                        <div className={`text-xs font-semibold truncate ${
                          darkMode ? 'text-zinc-200' : 'text-slate-800'
                        }`}>
                          {user.name}
                        </div>
                        <div className={`text-[11px] font-mono truncate ${
                          darkMode ? 'text-zinc-500' : 'text-slate-400'
                        }`}>
                          {user.handle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT PANEL: Active Encrypted Chat / Empty State */}
        {/* =================================================================== */}
        <div className={`flex-1 flex flex-col justify-between ${
          darkMode ? 'bg-[#0e0e13]' : 'bg-[#fafafa]'
        }`}>
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className={`px-6 py-4 border-b flex items-center justify-between ${
                darkMode ? 'border-white/[0.08] bg-[#0e0e13]' : 'border-slate-200 bg-white'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${selectedUser.avatarColor} text-white flex items-center justify-center text-xs font-bold`}>
                    {selectedUser.avatarText}
                  </div>
                  <div>
                    <h3 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {selectedUser.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                      <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                        <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500" />
                        Online
                      </span>
                      <span>•</span>
                      <span className="font-mono">{selectedUser.handle}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  <Lock className="w-3 h-3" />
                  <span>E2E Encrypted</span>
                </div>
              </div>

              {/* Message History */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="text-center my-2">
                  <span className={`text-[10px] px-3 py-1 rounded-full border ${
                    darkMode
                      ? 'bg-white/[0.03] border-white/[0.08] text-zinc-500'
                      : 'bg-white border-slate-200 text-slate-400 shadow-sm'
                  }`}>
                    Messages auto-disappear 30 seconds after read
                  </span>
                </div>

                {(messages[selectedUser.id] || []).map((msg) => {
                  const isMe = msg.sender === 'me';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-sm px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-[#2563eb] text-white rounded-br-none'
                            : darkMode
                            ? 'bg-[#1a1a24] text-zinc-200 rounded-bl-none border border-white/[0.06]'
                            : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className={`text-[9px] mt-1 px-1 ${
                        darkMode ? 'text-zinc-500' : 'text-slate-400'
                      }`}>
                        {msg.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className={`p-4 border-t flex items-center gap-2 ${
                darkMode ? 'border-white/[0.08] bg-[#0e0e13]' : 'border-slate-200 bg-white'
              }`}>
                <button
                  type="button"
                  className={`p-2 rounded-xl transition ${
                    darkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type an encrypted message..."
                  className={`flex-1 rounded-xl px-4 py-2.5 text-xs outline-none border ${
                    darkMode
                      ? 'bg-[#121217] border-white/[0.08] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />

                <button
                  type="button"
                  className={`p-2 rounded-xl transition ${
                    darkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Smile className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2.5 rounded-xl text-white transition ${
                    inputText.trim()
                      ? 'bg-[#2563eb] hover:bg-blue-600 cursor-pointer shadow-md shadow-blue-500/20'
                      : 'bg-slate-300 dark:bg-zinc-700 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            /* Empty State Shield Card (Matching Screenshot 1:1) */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 mb-3">
                <ShieldCheck className="w-10 h-10 stroke-[1.8]" />
              </div>
              <h2 className={`text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Start a secure conversation
              </h2>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Pick any cohort user from the left to open an encrypted chat. Messages auto-disappear 30 seconds after read.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
