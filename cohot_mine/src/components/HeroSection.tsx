import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp } from 'lucide-react';
import { LiquidFlowBackground } from './LiquidFlowBackground';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onExplore }) => {
  const [viewCount, setViewCount] = useState(11656);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  // Subtle real-time live pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const barHeights = [40, 25, 45, 60, 30, 80, 50, 65, 45, 90];

  // Dynamic gradient: light mode (navy -> indigo -> purple) vs dark mode (ice blue -> lavender -> violet)
  const textGradient = isDark
    ? 'linear-gradient(to right, rgb(165, 180, 252), rgb(199, 210, 254), rgb(224, 231, 255), rgb(165, 180, 252))'
    : 'linear-gradient(to right, rgb(30, 58, 138), rgb(67, 56, 202), rgb(82, 39, 255), rgb(30, 58, 138))';

  return (
    <section className="relative overflow-hidden border-b border-subtle pt-12 pb-32 mb-20">
      {/* Interactive Liquid Flow Canvas */}
      <LiquidFlowBackground />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
        {/* Left Column: Exact Headline, Description & Actions */}
        <div className="flex flex-col gap-8 max-w-xl">
          <h1 className="animated-gradient-text text-[54px] lg:text-[76px] leading-[1.0] font-[700] tracking-[-0.04em]">
            <div
              className="text-content"
              style={{
                backgroundImage: textGradient,
                backgroundSize: '300% 100%',
                backgroundRepeat: 'repeat',
              }}
            >
              A Social Platform for PCCOE
            </div>
          </h1>

          <p className="text-[19px] text-muted-foreground leading-[1.6]">
            Aggregate discussions, campus navigation, and encrypted messaging in real time. Monitor
            events and track opportunities—all without juggling multiple logins.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={onGetStarted}
              className="px-8 py-3.5 rounded-xl bg-foreground text-background font-semibold text-[15px] hover:opacity-90 transition-opacity flex items-center justify-center border border-transparent shadow-sm cursor-pointer active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={onExplore}
              className="px-6 py-3.5 rounded-xl bg-background/50 border border-border text-foreground font-semibold text-[15px] hover:bg-secondary transition-colors flex items-center justify-center backdrop-blur-sm cursor-pointer active:scale-95"
            >
              Explore platform
            </button>
          </div>
        </div>

        {/* Right Column: Exact Glassmorphism Analytics Window */}
        <div className="relative w-full h-[400px] md:h-[480px] rounded-[24px] bg-background/40 backdrop-blur-md border border-border/60 shadow-2xl overflow-hidden p-6 md:p-8 flex flex-col">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
          </div>

          <div className="grid grid-cols-1 gap-5 flex-1 h-full min-h-0">
            <div className="bg-background/80 rounded-xl p-8 md:p-10 flex flex-col justify-between border border-subtle shadow-sm relative overflow-hidden group h-full backdrop-blur-sm">
              <div>
                <div className="text-muted-foreground text-[13px] font-medium tracking-wide uppercase mb-3">
                  Total Project Views
                </div>

                <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5 text-foreground text-[42px] md:text-[56px] font-[700] tracking-tighter">
                    <Eye className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground opacity-50 stroke-[1.5]" />
                    {viewCount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-500/10 text-green-500 text-[12px] font-bold px-3 py-1.5 rounded-full border border-green-500/20">
                    <TrendingUp className="w-4 h-4" />
                    +4.2%
                  </div>
                </div>

                <div className="text-muted-foreground text-[14px] mt-4 font-medium">
                  Updating in realtime
                </div>
              </div>

              {/* Bar Chart */}
              <div className="w-full h-32 flex items-end gap-3 mt-12 pb-4">
                {barHeights.map((h, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-md animate-grow"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${index * 100}ms`,
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
