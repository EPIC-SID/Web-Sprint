import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, ArrowRight, Code2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreConnect: () => void;
  onExploreXD: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreConnect, onExploreXD }) => {
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background Glowing Blobs */}
      <div className="hero-glow-blob w-[500px] h-[500px] bg-indigo-600 -top-24 -left-20" />
      <div className="hero-glow-blob w-[450px] h-[450px] bg-cyan-600 top-1/3 -right-24" />
      <div className="hero-glow-blob w-[350px] h-[350px] bg-pink-600 -bottom-20 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-semibold text-zinc-300 mb-6 backdrop-blur-md hover:border-indigo-500/40 transition-colors cursor-default shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Pimpri Chinchwad College of Engineering</span>
            <span className="text-zinc-500">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 font-bold">
              Cohort 2026 Hub
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Where PCCOE Minds{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              Connect & Build
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8">
            Discover student chapters like OWASP, GDGC, and ACM, team up for national hackathons, explore peer-built XD projects, and navigate PCCOE campus in real time.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
            {isAuthenticated ? (
              <button
                onClick={onExploreConnect}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Find Teammates on Connect</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Join with Google (@pccoepune.org)</span>
              </button>
            )}

            <button
              onClick={onExploreXD}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] transition-all"
            >
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Explore XD Showcases</span>
            </button>
          </div>

          {/* Live Platform Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full pt-8 border-t border-white/[0.06]">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">1,850+</span>
              <span className="text-xs text-zinc-500 mt-0.5">PCCOE Students</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">18+</span>
              <span className="text-xs text-zinc-500 mt-0.5">Clubs & Chapters</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">140+</span>
              <span className="text-xs text-zinc-500 mt-0.5">Student Projects</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹12L+</span>
              <span className="text-xs text-zinc-500 mt-0.5">Hackathon Winnings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
