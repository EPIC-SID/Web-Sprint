import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onExplore }) => {
  const [viewCount, setViewCount] = useState(11564);
  const barHeights = [40, 25, 45, 60, 30, 80, 50, 65, 45, 90];

  // Subtle real-time live pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-subtle pt-12 pb-24 md:pb-32 mb-16 md:mb-20">
      {/* Background Soft Glow Mesh Blobs */}
      <div className="absolute -top-10 left-1/3 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24 items-center">
        {/* Left Column: Headline & Action */}
        <div className="flex flex-col gap-6 md:gap-8 max-w-xl">
          <h1 className="animated-gradient-text text-[52px] sm:text-[64px] lg:text-[76px] leading-[1.0] font-[700] tracking-[-0.04em]">
            <div
              className="text-content"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgb(30, 58, 138), rgb(67, 56, 202), rgb(82, 39, 255), rgb(30, 58, 138))',
                backgroundSize: '300% 100%',
                backgroundRepeat: 'repeat',
              }}
            >
              A Social Platform for PCCOE
            </div>
          </h1>

          <p className="text-[17px] md:text-[19px] text-muted-foreground leading-[1.6]">
            Aggregate discussions, campus navigation, and encrypted messaging in real time. Monitor
            events and track opportunities—all without juggling multiple logins.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={onGetStarted}
              className="px-8 py-3.5 rounded-xl bg-foreground text-background font-semibold text-[15px] hover:opacity-90 transition-all hover:scale-[1.02] flex items-center justify-center border border-transparent shadow-sm"
            >
              Get Started
            </button>
            <button
              onClick={onExplore}
              className="px-6 py-3.5 rounded-xl bg-background/50 border border-border text-foreground font-semibold text-[15px] hover:bg-secondary transition-all hover:scale-[1.02] flex items-center justify-center backdrop-blur-sm"
            >
              Explore platform
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Analytics Mac-style Card */}
        <div className="relative w-full h-[380px] md:h-[480px] rounded-[24px] bg-background/40 backdrop-blur-md border border-border/60 shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 mb-8 md:mb-10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Metric Card */}
          <div className="grid grid-cols-1 gap-5 flex-1 h-full min-h-0">
            <div className="bg-background/80 rounded-xl p-6 md:p-10 flex flex-col justify-between border border-subtle shadow-sm relative overflow-hidden group h-full backdrop-blur-sm">
              <div>
                <div className="text-muted-foreground text-[12px] md:text-[13px] font-medium tracking-wide uppercase mb-3">
                  Total Project Views
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2.5 text-foreground text-[40px] md:text-[56px] font-[700] tracking-tighter">
                    <Eye className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground opacity-50" />
                    <span>{viewCount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-green-500/10 text-green-500 text-[12px] font-bold px-3 py-1.5 rounded-full border border-green-500/20">
                    <TrendingUp className="w-4 h-4" />
                    <span>+4.2%</span>
                  </div>
                </div>

                <div className="text-muted-foreground text-[13px] md:text-[14px] mt-4 font-medium">
                  Updating in realtime
                </div>
              </div>

              {/* Dynamic Animated Bars */}
              <div className="w-full h-28 md:h-32 flex items-end gap-2.5 md:gap-3 mt-8 md:mt-12 pb-2">
                {barHeights.map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-md animate-grow"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${idx * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
