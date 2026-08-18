import React, { useEffect, useState } from 'react';

export const CurvedTextBanner: React.FC = () => {
  const textPattern = 'COHORT SOCIAL ✦ CONNECT ✦ DISCOVER ✦ NAVIGATE ✦ ';
  const repeatedText = Array(12).fill(textPattern).join('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setOffset((prev) => (prev <= -2500 ? 0 : prev - 1.2));
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="mt-16 -mb-6 w-full flex justify-center opacity-70 dark:opacity-40 overflow-hidden select-none">
      <div className="curved-loop-jacket w-full max-w-[1440px]">
        <svg
          className="curved-loop-svg w-full"
          viewBox="0 0 1440 220"
          style={{ height: '140px' }}
        >
          <defs>
            <path
              id="curve-path"
              d="M-100,60 Q720,240 1540,60"
              fill="none"
              stroke="transparent"
            />
          </defs>
          <text
            fontWeight="800"
            className="text-foreground tracking-widest fill-current text-[32px] sm:text-[42px]"
          >
            <textPath href="#curve-path" startOffset={`${offset}px`}>
              {repeatedText}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
};
