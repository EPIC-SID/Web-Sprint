import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

export const ContactUsPage: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`space-y-6 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      <div>
        <div className="flex items-center gap-2">
          <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>c/contact</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30">
            Support
          </span>
        </div>
        <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Have feedback, bugs, or feature suggestions for Cohort? Reach out to the student dev team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`border rounded-2xl p-6 shadow-xl ${
          darkMode ? 'bg-[#0e0e13] border-white/[0.08] shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <h2 className={`text-sm font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Send a Message</h2>
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#2dd4bf] mx-auto" />
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Message Received!</h3>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Thanks for helping make Cohort better for everyone at PCCOE.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-1.5 rounded-xl bg-[#2dd4bf] text-black text-xs font-bold"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className={`block mb-1 font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddhant Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 border outline-none ${
                    darkMode ? 'bg-[#121217] border-white/[0.08] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>PCCOE Email</label>
                <input
                  type="email"
                  required
                  placeholder="name.roll@pccoepune.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 border outline-none ${
                    darkMode ? 'bg-[#121217] border-white/[0.08] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Message / Bug Report</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your issue or suggestion..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 border outline-none resize-none ${
                    darkMode ? 'bg-[#121217] border-white/[0.08] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2dd4bf] text-black font-bold text-xs hover:bg-[#20c997] transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-[#2dd4bf]/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>

        <div className={`border rounded-2xl p-6 shadow-xl space-y-5 ${
          darkMode ? 'bg-[#0e0e13] border-white/[0.08] shadow-black/40' : 'bg-white border-slate-200 shadow-slate-200/50'
        }`}>
          <h2 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Campus Contact Info</h2>
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#2dd4bf] shrink-0 mt-0.5" />
              <div>
                <strong className={`block ${darkMode ? 'text-white' : 'text-slate-900'}`}>Pimpri Chinchwad College of Engineering</strong>
                <span className={darkMode ? 'text-zinc-400' : 'text-slate-600'}>Sector - 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Pune - 411044</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#2dd4bf] shrink-0" />
              <div>
                <strong className={`block ${darkMode ? 'text-white' : 'text-slate-900'}`}>Email Support</strong>
                <span className={darkMode ? 'text-zinc-400' : 'text-slate-600'}>support@cohortpccoe.in</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#2dd4bf] shrink-0" />
              <div>
                <strong className={`block ${darkMode ? 'text-white' : 'text-slate-900'}`}>Student Helpline</strong>
                <span className={darkMode ? 'text-zinc-400' : 'text-slate-600'}>+91 (020) 2765-3168</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
