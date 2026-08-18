import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send, Sparkles, Check, CheckCircle2 } from 'lucide-react';

interface ContactUsPageProps {
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
  };
  darkMode?: boolean;
}

const TEAM_MEMBERS = [
  {
    id: 't1',
    name: 'Vrushabh Hirap',
    role: 'Systems Dev',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    handle: 'vrushabhhirap',
  },
  {
    id: 't2',
    name: 'Chirag Ferwani',
    role: 'Product Dev',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    handle: 'chiragf',
  },
  {
    id: 't3',
    name: 'Anushka Shinde',
    role: 'UI dev',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    handle: 'anushkashinde',
  },
];

export const ContactUsPage: React.FC<ContactUsPageProps> = ({
  currentUser,
  darkMode = false,
}) => {
  const [message, setMessage] = useState('');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [connectedMap, setConnectedMap] = useState<Record<string, boolean>>({});

  const name = currentUser?.name || '278_SiddhantVerma';
  const email = currentUser?.email || 'siddhant.verma25@pccoepune.org';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSubmitted(true);
  };

  const toggleConnect = (id: string) => {
    setConnectedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`space-y-8 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      {/* Header */}
      <div>
        <div className="relative inline-flex items-center">
          <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            c/contact
          </h1>
          <img
            src={darkMode ? '/assets/dark1.svg' : '/assets/light1.svg'}
            alt=""
            className="absolute -top-3.5 left-[14px] w-6 h-6 pointer-events-none z-10"
          />
        </div>
        <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Have a question, suggestion, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      {/* Main Contact Form Card */}
      <div className={`border rounded-[24px] p-6 sm:p-8 shadow-sm transition-colors ${
        darkMode ? 'bg-[#0e0e13] border-white/[0.08] shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        {isSubmitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#2dd4bf]/20 text-[#2dd4bf] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Message Sent Successfully!</h3>
            <p className={`text-xs max-w-sm mx-auto ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
              Thanks for reaching out to the Cohort developer team. We will review your message and get back to you shortly.
            </p>
            <button
              onClick={() => {
                setMessage('');
                setIsSubmitted(false);
              }}
              className="px-5 py-2 rounded-xl bg-[#2dd4bf] text-black font-bold text-xs hover:bg-[#20c997] transition cursor-pointer"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-2 ${
                  darkMode ? 'text-zinc-400' : 'text-slate-500'
                }`}>
                  <User className="w-3.5 h-3.5" />
                  <span>NAME</span>
                </label>
                <input
                  type="text"
                  readOnly
                  value={name}
                  className={`w-full rounded-xl px-4 py-2.5 border outline-none font-medium ${
                    darkMode
                      ? 'bg-[#121217] border-white/[0.08] text-zinc-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-2 ${
                  darkMode ? 'text-zinc-400' : 'text-slate-500'
                }`}>
                  <Mail className="w-3.5 h-3.5" />
                  <span>EMAIL</span>
                </label>
                <input
                  type="email"
                  readOnly
                  value={email}
                  className={`w-full rounded-xl px-4 py-2.5 border outline-none font-medium ${
                    darkMode
                      ? 'bg-[#121217] border-white/[0.08] text-zinc-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                />
              </div>
            </div>

            {/* Row 2: Message Textarea */}
            <div>
              <label className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-2 ${
                darkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}>
                <MessageSquare className="w-3.5 h-3.5" />
                <span>MESSAGE</span>
              </label>
              <div className="relative">
                <textarea
                  rows={5}
                  required
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  className={`w-full rounded-xl p-4 border outline-none resize-none transition ${
                    darkMode
                      ? 'bg-[#121217] border-white/[0.08] text-white focus:border-blue-500'
                      : 'bg-white border-2 border-blue-500 text-slate-900 focus:border-blue-600'
                  }`}
                />
                <span className={`absolute bottom-3 right-3 text-[10px] ${
                  darkMode ? 'text-zinc-500' : 'text-slate-400'
                }`}>
                  {message.length}/1000
                </span>
              </div>
            </div>

            {/* Row 3: hCaptcha Box Mockup */}
            <div className="flex justify-center py-1">
              <div className={`flex items-center justify-between gap-6 px-4 py-2.5 rounded-xl border ${
                darkMode ? 'bg-[#121217] border-white/[0.08]' : 'bg-slate-50/80 border-slate-200 shadow-sm'
              }`}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isCaptchaChecked}
                    onChange={(e) => setIsCaptchaChecked(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer accent-[#2dd4bf]"
                  />
                  <span className={`text-xs font-medium ${darkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                    I am human
                  </span>
                </label>

                {/* hCaptcha Badge */}
                <div className="flex flex-col items-center pl-4 border-l border-slate-200 dark:border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-500 flex items-center justify-center text-white text-[9px] font-black">
                    h
                  </div>
                  <span className="text-[9px] text-zinc-400 font-bold tracking-tight mt-0.5">hCaptcha</span>
                  <span className="text-[8px] text-zinc-400">Privacy - Terms</span>
                </div>
              </div>
            </div>

            {/* Row 4: Send Message Submit Button */}
            <button
              type="submit"
              disabled={!isCaptchaChecked || !message.trim()}
              className={`w-full py-3 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                !isCaptchaChecked || !message.trim()
                  ? 'bg-[#2dd4bf]/50 text-slate-700 cursor-not-allowed'
                  : 'bg-[#2dd4bf] hover:bg-[#20c997] text-black shadow-[#2dd4bf]/20'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>

      {/* Section 2: MEET THE TEAM */}
      <div className="space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-[#2dd4bf]">
          <Sparkles className="w-4 h-4" />
          <span>MEET THE TEAM</span>
        </div>

        {/* 3 Developer Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEAM_MEMBERS.map((member) => {
            const isConn = connectedMap[member.id];
            return (
              <div
                key={member.id}
                className={`border rounded-[20px] p-5 text-center transition flex flex-col items-center justify-between shadow-sm ${
                  darkMode ? 'bg-[#0e0e13] border-white/[0.08]' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover shadow-md mb-3 ring-2 ring-slate-100 dark:ring-white/10"
                  />
                  <h3 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {member.name}
                  </h3>
                  <div className={`text-[11px] mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    {member.role}
                  </div>
                </div>

                <button
                  onClick={() => toggleConnect(member.id)}
                  className={`mt-4 px-4 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                    isConn
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                      : 'bg-[#0284c7] hover:bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  }`}
                >
                  {isConn ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <span>Connect</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
