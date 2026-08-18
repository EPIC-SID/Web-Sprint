import React, { useEffect, useRef, useState } from 'react';

interface SiteLoaderProps {
  onComplete: () => void;
}

export const SiteLoader: React.FC<SiteLoaderProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);
  const [isDark] = useState(() => {
    try {
      const saved = localStorage.getItem('cohort-theme');
      if (saved) return saved === 'dark';
      return (
        document.documentElement.classList.contains('dark') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Snappy playback speed matching original site (1.65x)
    video.playbackRate = 1.65;

    const handlePlay = () => {
      if (video) video.playbackRate = 1.65;
    };

    const handleEnd = () => {
      setFading(true);
      setTimeout(onComplete, 350);
    };

    // Safety fallback
    const fallback = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 350);
    }, 2200);

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnd);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnd);
      clearTimeout(fallback);
    };
  }, [onComplete]);

  const videoSrc = isDark
    ? '/assets/coh-loader-dark.mp4'
    : '/assets/coh-loader-light.mp4';

  const bgColor = isDark ? 'bg-black' : 'bg-white';

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${bgColor} transition-opacity duration-300 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <div className="w-full max-w-md aspect-square flex items-center justify-center">
        <video
          key={videoSrc}
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-contain"
          aria-hidden="true"
          onLoadedMetadata={(e) => {
            (e.target as HTMLVideoElement).playbackRate = 1.65;
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
