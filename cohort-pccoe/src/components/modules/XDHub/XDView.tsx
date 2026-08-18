import React, { useState } from 'react';
import { XDProject } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import {
  ExternalLink,
  Github,
  ThumbsUp,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Palette,
  ShieldCheck
} from 'lucide-react';

interface XDViewProps {
  projects: XDProject[];
  onToggleUpvote: (projectId: string) => void;
  onOpenSubmitModal?: () => void;
}

export const XDView: React.FC<XDViewProps> = ({ projects, onToggleUpvote, onOpenSubmitModal }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'AI / ML', 'IoT / Embedded', 'UI / UX'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Full-Stack': return Code2;
      case 'AI / ML': return Sparkles;
      case 'IoT / Embedded': return Cpu;
      case 'UI / UX': return Palette;
      default: return Layers;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">PCCOE XD Showcase</h2>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/30">
              Innovation Hub
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Student-engineered products, AI models, design prototypes, and hardware innovations
          </p>
        </div>

        <button
          onClick={isAuthenticated ? onOpenSubmitModal : openAuthModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition"
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>Submit Project</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat);
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border border-white/[0.05]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-white/[0.08] flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent" />
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-200 border border-white/[0.1]">
                  {project.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4 font-normal">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0">
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs">
                {/* Author */}
                <div className="flex items-center gap-2">
                  <img
                    src={project.creator.avatar}
                    alt={project.creator.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-indigo-500/40"
                  />
                  <span className="text-zinc-300 font-medium text-[11px] truncate max-w-[100px]">
                    {project.creator.name}
                  </span>
                </div>

                {/* Upvote & Links */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleUpvote(project.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      project.hasUpvoted
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${project.hasUpvoted ? 'fill-indigo-400' : ''}`} />
                    <span>{project.upvotes}</span>
                  </button>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
