import React, { useState } from 'react';
import { MapPin, Send, CheckCircle2, Heart } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out] max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Contact & Student Support</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Have feedback, found a bug, or want your club listed on Cohort? Reach out to us!
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-muted-foreground mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Siddhant Deshmukh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary rounded-xl px-3.5 py-2.5 border border-border text-foreground outline-none"
                />
              </div>
              <div>
                <label className="block text-muted-foreground mb-1 font-medium">Your College Email</label>
                <input
                  type="email"
                  required
                  placeholder="student@pccoepune.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary rounded-xl px-3.5 py-2.5 border border-border text-foreground outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-muted-foreground mb-1 font-medium">Message / Feedback</label>
              <textarea
                rows={4}
                required
                placeholder="Share your thoughts, suggestions, or issues..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full bg-secondary rounded-xl px-3.5 py-2.5 border border-border text-foreground outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-foreground">Message Received!</h3>
            <p className="text-xs text-muted-foreground">
              Thank you for helping improve Cohort PCCOE. Our team will review your feedback.
            </p>
          </div>
        )}
      </div>

      {/* College Info Box */}
      <div className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">PCCOE Campus</div>
            <div className="text-[11px] text-muted-foreground">
              Sector 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Pune - 411044
            </div>
          </div>
        </div>

        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
          Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for PCCOE students
        </div>
      </div>
    </div>
  );
};
