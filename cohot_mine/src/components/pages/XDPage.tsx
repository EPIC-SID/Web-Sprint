import React, { useState } from 'react';
import { Heart, ExternalLink, Plus } from 'lucide-react';

interface XDProject {
  id: string;
  title: string;
  author: string;
  avatar: string;
  description: string;
  tech: string[];
  banner: string;
  likes: number;
  isLiked?: boolean;
  demoUrl?: string;
  githubUrl?: string;
}

const MOCK_XD_PROJECTS: XDProject[] = [
  {
    id: 'xd1',
    title: 'PCCOE Campus Navigation AR',
    author: 'Siddhant Verma',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    description: 'Augmented reality indoor waypoint finding for freshers & visitors across all 4 department wings.',
    tech: ['Three.js', 'WebXR', 'React', 'Tailwind'],
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    likes: 42,
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/example/ar-nav',
  },
  {
    id: 'xd2',
    title: 'Automated Timetable & Attendance Forecaster',
    author: 'Shravan Kolhe',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    description: 'ERP data scraper and predictor helping students maintain 75% attendance threshold effortlessly.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js'],
    banner: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    likes: 38,
    githubUrl: 'https://github.com/example/erp-tracker',
  },
];

export const XDPage: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  const [projects, setProjects] = useState(MOCK_XD_PROJECTS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const toggleLike = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  return (
    <div className={`space-y-6 animate-[fadeIn_0.2s_ease-out] ${darkMode ? 'text-[#e4e4e7]' : 'text-slate-800'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`font-heading text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>c/xd</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-500 border border-purple-500/30">
              Exchange
            </span>
          </div>
          <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Showcase student side-projects, hackathon builds, and open-source contributions.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2 rounded-xl bg-[#2dd4bf] text-black text-xs font-bold hover:bg-[#20c997] transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-lg shadow-[#2dd4bf]/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Submit Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`border rounded-2xl overflow-hidden shadow-xl transition-all flex flex-col justify-between group ${
              darkMode
                ? 'bg-[#0e0e13] border-white/[0.08] hover:border-white/20 shadow-black/40'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-slate-200/50'
            }`}
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-black">
                <img
                  src={proj.banner}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <button
                  onClick={() => toggleLike(proj.id)}
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border transition cursor-pointer flex items-center gap-1.5 ${
                    proj.isLiked
                      ? 'bg-rose-500/80 border-rose-400 text-white'
                      : 'bg-black/60 border-white/20 text-white hover:bg-black/80'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${proj.isLiked ? 'fill-white' : ''}`} />
                  <span>{proj.likes}</span>
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img src={proj.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                  <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{proj.author}</span>
                </div>
                <h3 className={`text-sm font-bold mb-2 group-hover:text-[#2dd4bf] transition ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {proj.title}
                </h3>
                <p className={`text-xs leading-relaxed line-clamp-2 mb-3 ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                        darkMode ? 'bg-white/[0.04] text-zinc-300 border-white/[0.06]' : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-4 border-t flex items-center justify-between ${darkMode ? 'border-white/[0.06]' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2">
                {proj.demoUrl && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#2dd4bf] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-xs hover:underline flex items-center gap-1 ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-md w-full p-6 shadow-2xl animate-[scaleIn_0.2s_ease-out] ${
            darkMode ? 'bg-[#0e0e13] border-white/[0.1]' : 'bg-white border-slate-200'
          }`}>
            <h2 className={`text-base font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Submit Project to XD</h2>
            <p className={`text-xs mb-4 ${darkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Share your latest engineering project with the PCCOE developer community.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className={`px-4 py-2 rounded-xl text-xs ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Project submitted for review!');
                  setShowSubmitModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#2dd4bf] text-black font-bold text-xs"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
