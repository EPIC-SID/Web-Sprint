import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Edit3,
  Check,
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
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser }) => {
  const [bio, setBio] = useState(
    'Computer Engineering student at PCCOE. Full-stack developer, interested in GenAI systems, distributed apps, and hackathons.'
  );
  const [skills, setSkills] = useState([
    'React',
    'TypeScript',
    'Next.js',
    'Supabase',
    'TailwindCSS',
    'Python',
    'Node.js',
  ]);
  const branch = currentUser.branch || 'Computer Engineering';
  const year = currentUser.year || 'TE (3rd Year)';
  const github = 'https://github.com';
  const linkedin = 'https://linkedin.com';

  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(bio);
  const [newSkillsStr, setNewSkillsStr] = useState(skills.join(', '));

  const handleSave = () => {
    setBio(newBio);
    setSkills(newSkillsStr.split(',').map((s) => s.trim()).filter(Boolean));
    setIsEditing(false);
  };

  const userInitials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="space-y-6 animate-[fadeIn_0.2s_ease-out] max-w-3xl mx-auto">
      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Banner Pattern */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90" />

        <div className="relative z-10 pt-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-card bg-secondary shadow-lg shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-black ring-4 ring-card shadow-lg shrink-0">
                {userInitials}
              </div>
            )}

            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">{currentUser.name}</h1>
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{currentUser.email}</div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Profile Info Details */}
        <div className="mt-8 space-y-6">
          {/* Branch & Year info */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-foreground font-medium border border-border">
              <GraduationCap className="w-4 h-4 text-primary" />
              {branch}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-foreground font-medium border border-border">
              Year: {year}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[11px] border border-emerald-500/20">
              Verified PCCOE Student ✓
            </span>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              About
            </h3>
            {!isEditing ? (
              <p className="text-sm text-foreground/90 leading-relaxed">{bio}</p>
            ) : (
              <textarea
                rows={3}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="w-full bg-secondary rounded-xl p-3 border border-border text-xs text-foreground outline-none resize-none"
              />
            )}
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Skills & Tech Stack
            </h3>
            {!isEditing ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium text-xs border border-primary/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={newSkillsStr}
                onChange={(e) => setNewSkillsStr(e.target.value)}
                placeholder="Comma separated skills..."
                className="w-full bg-secondary rounded-xl p-3 border border-border text-xs text-foreground outline-none"
              />
            )}
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Profiles & Socials
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium border border-border transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium border border-border transition"
              >
                <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Save Button if Editing */}
          {isEditing && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
