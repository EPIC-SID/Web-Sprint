import React from 'react';
import { MOCK_CLUBS } from '../../data/mockData';
import { Users, ChevronRight } from 'lucide-react';

interface MarqueeBannerProps {
  onSelectClub?: (clubName: string) => void;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({ onSelectClub }) => {
  // Duplicate array for seamless infinite looping
  const marqueeItems = [...MOCK_CLUBS, ...MOCK_CLUBS];

  return (
    <div className="w-full py-8 border-y border-white/[0.06] bg-black/40 relative overflow-hidden backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Active Student Chapters & Communities
          </span>
        </div>
        <span className="text-xs text-zinc-500 hidden sm:inline">
          Hover to pause • Click to explore
        </span>
      </div>

      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Strip */}
      <div className="animate-marquee gap-4 px-4 flex items-center">
        {marqueeItems.map((club, idx) => (
          <div
            key={`${club.id}-${idx}`}
            onClick={() => onSelectClub && onSelectClub(club.name)}
            className="flex items-center gap-3.5 px-4 py-2.5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-white/[0.08] min-w-[280px] max-w-[320px] select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] p-2 flex items-center justify-center border border-white/[0.06] group-hover:border-indigo-500/50 transition-colors">
              <img
                src={club.logo}
                alt={club.acronym}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex items-center justify-between gap-1">
                <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                  {club.acronym}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {club.category}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                {club.tagline}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-indigo-400" />
                  {club.membersCount}+
                </span>
                <span>•</span>
                <span className="truncate text-emerald-400/90 font-medium">
                  {club.upcomingEvent || 'Active Chapter'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};
