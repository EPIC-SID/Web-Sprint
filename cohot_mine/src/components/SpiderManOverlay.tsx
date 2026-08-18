import React, { useState, useEffect } from 'react';

export const SpiderManOverlay: React.FC = () => {
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

  // Map each Spider-Man slot to its exact light or dark asset
  const getAsset = (num: number) => {
    if (isDark) {
      if (num === 2 || num === 5 || num === 6) {
        return `/assets/dark${num}.png`;
      }
      return `/assets/dark${num}.svg`;
    }
    return `/assets/light${num}.svg`;
  };

  return (
    <div className="spiderman-overlay-container pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      <style>{`
        @keyframes spideyFloat6 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .spidey-anim-6 {
          animation: spideyFloat6 5s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Spider-Man 1 (Top Left) */}
      <div
        className="absolute pointer-events-none select-none spidey-anim-6 transition-all duration-500"
        style={{
          top: '12px',
          left: '180px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '0s',
          transform: 'scale(0.85) rotate(10deg)',
        }}
      >
        <img
          src={getAsset(1)}
          alt="Spider-Man 1"
          className="w-16 h-16 md:w-22 md:h-22 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 2. Spider-Man 2 (Top Right) */}
      <div
        className="absolute pointer-events-none select-none spidey-anim-6 transition-all duration-500"
        style={{
          top: '12px',
          right: '120px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '0.6s',
          transform: 'scale(0.85) rotate(-14deg) scaleX(-1)',
        }}
      >
        <img
          src={getAsset(2)}
          alt="Spider-Man 2"
          className="w-16 h-16 md:w-22 md:h-22 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 3. Spider-Man 3 (Mid Right) */}
      <div
        className="absolute pointer-events-none select-none spidey-anim-6 transition-all duration-500"
        style={{
          top: '35%',
          right: '16px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '1.2s',
          transform: 'scale(0.85) rotate(18deg)',
        }}
      >
        <img
          src={getAsset(3)}
          alt="Spider-Man 3"
          className="w-16 h-16 md:w-22 md:h-22 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 4. Spider-Man 4 (Bottom Right) */}
      <div
        className="absolute pointer-events-none select-none spidey-anim-6 transition-all duration-500"
        style={{
          bottom: '24px',
          right: '140px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '1.8s',
          transform: 'scale(0.85) rotate(-22deg) scaleX(-1)',
        }}
      >
        <img
          src={getAsset(4)}
          alt="Spider-Man 4"
          className="w-16 h-16 md:w-22 md:h-22 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 5. Spider-Man 5 (Mid Left) */}
      <div
        className="absolute pointer-events-none select-none spidey-anim-6 transition-all duration-500"
        style={{
          top: '52%',
          left: '85px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '2.4s',
          transform: 'scale(0.85) rotate(26deg)',
        }}
      >
        <img
          src={getAsset(5)}
          alt="Spider-Man 5"
          className="w-16 h-16 md:w-22 md:h-22 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 6. Spider-Man 6 (Bottom Left) */}
      <div
        className="absolute pointer-events-none select-none spidey-anim-6 transition-all duration-500"
        style={{
          bottom: '80px',
          left: '100px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '3s',
          transform: 'scale(0.85) rotate(-30deg) scaleX(-1)',
        }}
      >
        <img
          src={getAsset(6)}
          alt="Spider-Man 6"
          className="w-16 h-16 md:w-22 md:h-22 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>
    </div>
  );
};
