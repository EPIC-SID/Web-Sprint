import React from 'react';

interface ClubItem {
  name: string;
  logo: string;
}

const CLUBS: ClubItem[] = [
  {
    name: 'OWASP',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470346/owasp_rulccu.png',
  },
  {
    name: 'GDGC',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470337/gdgc_euo0ky.png',
  },
  {
    name: 'ACM',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470338/acm_dhgbaa.png',
  },
  {
    name: 'LFDT',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470346/lfdt_rueakn.png',
  },
  {
    name: 'IOT Club',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470343/iotclub_jkzjbs.png',
  },
  {
    name: 'Geeks For Geeks',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470338/gfg_kqw753.png',
  },
  {
    name: 'AIMSA',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470338/aimsa_fza2sz.png',
  },
  {
    name: 'ISR',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470346/isr_ms6a3y.png',
  },
  {
    name: 'NSS',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470347/nss_zl4tv7.png',
  },
  {
    name: 'Art Circle',
    logo: 'https://res.cloudinary.com/dgd5sfnrq/image/upload/v1770470340/artcircle_ubeulk.png',
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
