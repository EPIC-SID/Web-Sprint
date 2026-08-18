import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="mt-28 mb-20 max-w-3xl mx-auto px-6">
      <div className="flex justify-center mb-8">
        <h2 className="animated-gradient-text text-[28px] md:text-[40px] tracking-[-0.02em] font-[700] text-center">
          <div
            className="text-content"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgb(30, 58, 138), rgb(67, 56, 202), rgb(30, 58, 138), rgb(30, 58, 138))',
              backgroundSize: '300% 100%',
              backgroundRepeat: 'repeat',
            }}
          >
            About Cohort PCCOE
          </div>
        </h2>
      </div>

      <div className="space-y-6 text-[15px] text-muted-foreground leading-[1.8] text-justify">
        <p>
          Cohort is the official student social platform built exclusively for{' '}
          <strong className="text-foreground">Pimpri Chinchwad College of Engineering (PCCOE)</strong>,
          Pune. Designed and developed by students, for students, it serves as the central hub where
          over 350 active users connect, collaborate, and stay informed about everything happening on
          campus.
        </p>

        <p>
          Unlike generic social media platforms, Cohort is purpose-built for the college ecosystem.
          It aggregates more than 30 student-run communities and clubs — including technical
          organizations like{' '}
          <strong className="text-foreground">
            OWASP, Google Developer Groups on Campus (GDGC), ACM, and Geeks for Geeks
          </strong>
          , as well as creative and social clubs like{' '}
          <strong className="text-foreground">Art Circle, NSS, and ISR</strong>. Students can
          subscribe to communities, receive real-time post notifications, and participate in
          discussions without switching between multiple WhatsApp groups or Instagram pages.
        </p>

        <p>
          The platform features{' '}
          <strong className="text-foreground">end-to-end encrypted messaging</strong> through the
          Connect module, allowing students to chat privately with friends or in groups. The{' '}
          <strong className="text-foreground">XD (Exchange)</strong> board offers an anonymous
          space for campus-wide discussions, enabling students to share honest feedback, creative
          ideas, and study tips freely.
        </p>

        <p>
          Cohort also includes an{' '}
          <strong className="text-foreground">interactive campus map</strong> powered by TomTom,
          helping new students and visitors navigate PCCOE's sprawling campus. The integrated{' '}
          <strong className="text-foreground">academic calendar</strong> keeps everyone
          synchronized with exam schedules, holidays, and submission deadlines. Students can build
          their professional presence through{' '}
          <strong className="text-foreground">achievement profiles</strong>, showcasing
          certifications, hackathon wins, and project accomplishments to peers and faculty alike.
        </p>

        <p>
          Built with modern technologies including React, Supabase, and real-time WebSocket
          connections, Cohort delivers a fast, responsive experience across desktop and mobile
          devices. The platform prioritizes student privacy, data security, and a distraction-free
          environment designed to enhance — not replace — the on-campus college experience.
        </p>
      </div>
    </section>
  );
};
