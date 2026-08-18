import React from 'react';

export const SpiderManOverlay: React.FC = () => {
  return (
    <div className="spiderman-overlay-container pointer-events-none fixed inset-0 z-20 overflow-hidden select-none">
      {/* 1. Top Left */}
      <div
        className="absolute pointer-events-none select-none spidey-anim transition-all duration-500 hidden sm:block"
        style={{
          top: '24px',
          left: '180px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '0s',
          transform: 'scale(0.85) rotate(10deg)',
        }}
      >
        <img
          src="/assets/light1.svg"
          alt="Spider-Man 1"
          className="w-16 h-16 md:w-20 md:h-20 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 2. Top Right */}
      <div
        className="absolute pointer-events-none select-none spidey-anim transition-all duration-500 hidden sm:block"
        style={{
          top: '24px',
          right: '140px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '0.6s',
          transform: 'scale(0.85) rotate(-14deg) scaleX(-1)',
        }}
      >
        <img
          src="/assets/light2.svg"
          alt="Spider-Man 2"
          className="w-16 h-16 md:w-20 md:h-20 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 3. Mid Right */}
      <div
        className="absolute pointer-events-none select-none spidey-anim transition-all duration-500"
        style={{
          top: '38%',
          right: '16px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '1.2s',
          transform: 'scale(0.85) rotate(18deg)',
        }}
      >
        <img
          src="/assets/light3.svg"
          alt="Spider-Man 3"
          className="w-14 h-14 md:w-20 md:h-20 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 4. Bottom Right */}
      <div
        className="absolute pointer-events-none select-none spidey-anim transition-all duration-500 hidden sm:block"
        style={{
          bottom: '32px',
          right: '140px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '1.8s',
          transform: 'scale(0.85) rotate(-22deg) scaleX(-1)',
        }}
      >
        <img
          src="/assets/light4.svg"
          alt="Spider-Man 4"
          className="w-16 h-16 md:w-20 md:h-20 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 5. Mid Left */}
      <div
        className="absolute pointer-events-none select-none spidey-anim transition-all duration-500"
        style={{
          top: '52%',
          left: '20px',
          opacity: 0.88,
          zIndex: 20,
          animationDelay: '2.4s',
          transform: 'scale(0.85) rotate(26deg)',
        }}
      >
        <img
          src="/assets/light5.svg"
          alt="Spider-Man 5"
          className="w-14 h-14 md:w-20 md:h-20 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>

      {/* 6. Bottom Left */}
      <div
        className="absolute pointer-events-none select-none spidey-anim transition-all duration-500 hidden sm:block"
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
          src="/assets/light6.svg"
          alt="Spider-Man 6"
          className="w-16 h-16 md:w-20 md:h-20 object-contain filter drop-shadow-md select-none pointer-events-none"
        />
      </div>
    </div>
  );
};
