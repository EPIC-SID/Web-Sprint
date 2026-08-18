import React from 'react';

interface ClubItem {
  name: string;
  logo: string;
}

const CLUBS: ClubItem[] = [
  {
    name: 'OWASP',
    logo: '/assets/clubs/owasp.png',
  },
  {
    name: 'GDGC',
    logo: '/assets/clubs/gdgc.png',
  },
  {
    name: 'ACM',
    logo: '/assets/clubs/acm.png',
  },
  {
    name: 'LFDT',
    logo: '/assets/clubs/lfdt.png',
  },
  {
    name: 'IOT Club',
    logo: '/assets/clubs/iotclub.png',
  },
  {
    name: 'Geeks For Geeks',
    logo: '/assets/clubs/gfg.png',
  },
  {
    name: 'AIMSA',
    logo: '/assets/clubs/aimsa.png',
  },
  {
    name: 'ISR',
    logo: '/assets/clubs/isr.png',
  },
  {
    name: 'NSS',
    logo: '/assets/clubs/nss.png',
  },
  {
    name: 'Art Circle',
    logo: '/assets/clubs/artcircle.png',
  },
];

export const CommunityMarquee: React.FC = () => {
  return (
    <div className="mt-28 md:mt-36 mb-24 flex flex-col items-center">
      {/* Animated Gradient Heading */}
      <h2 className="animated-gradient-text text-[32px] md:text-[44px] tracking-[-0.02em] font-[700] mb-12 text-center">
        <div
          className="text-content"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(192, 38, 211), rgb(124, 58, 237), rgb(192, 38, 211), rgb(192, 38, 211))',
            backgroundSize: '300% 100%',
            backgroundRepeat: 'repeat',
          }}
        >
          Connecting Communities
        </div>
      </h2>

      {/* Marquee Ticker with Mask */}
      <div
        className="w-full overflow-hidden marquee-container relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="marquee">
          {CLUBS.map((club, idx) => (
            <div key={`${club.name}-${idx}`} className="flex items-center gap-4 shrink-0 mx-4">
              <img
                src={club.logo}
                alt={club.name}
                className="w-12 h-12 object-contain rounded-full border border-subtle bg-white p-1 shadow-sm"
              />
              <span className="text-xl font-bold tracking-tight text-muted-foreground opacity-60 hover:opacity-100 transition-opacity">
                {club.name}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate loop for infinite seamless scroll */}
        <div className="marquee" aria-hidden="true">
          {CLUBS.map((club, idx) => (
            <div key={`dup-${club.name}-${idx}`} className="flex items-center gap-4 shrink-0 mx-4">
              <img
                src={club.logo}
                alt={club.name}
                className="w-12 h-12 object-contain rounded-full border border-subtle bg-white p-1 shadow-sm"
              />
              <span className="text-xl font-bold tracking-tight text-muted-foreground opacity-60 hover:opacity-100 transition-opacity">
                {club.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
