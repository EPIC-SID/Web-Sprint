import React from 'react';
import {
  Radio,
  LayoutGrid,
  Heart,
  MessageSquare,
  Sparkles,
  Map,
  CalendarDays,
  User,
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  iconColor: string;
  gradient: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Home Feed',
    description:
      'Stay updated with a personalized feed of posts, announcements, and discussions from your subscribed communities and friends across campus.',
    icon: Radio,
    iconColor: 'rgb(82, 39, 255)',
    gradient:
      'linear-gradient(to right, rgb(30, 58, 138), rgb(67, 56, 202), rgb(30, 58, 138), rgb(30, 58, 138))',
  },
  {
    title: 'Communities',
    description:
      'Discover and join 30+ student-run clubs and organizations at PCCOE — from OWASP and GDGC to Art Circle and NSS.',
    icon: LayoutGrid,
    iconColor: 'rgb(255, 159, 252)',
    gradient:
      'linear-gradient(to right, rgb(192, 38, 211), rgb(112, 26, 117), rgb(192, 38, 211), rgb(192, 38, 211))',
  },
  {
    title: 'Friends',
    description:
      'Build your campus network by adding friends, viewing their activity, and staying connected through shared communities.',
    icon: Heart,
    iconColor: 'rgb(177, 158, 239)',
    gradient:
      'linear-gradient(to right, rgb(109, 40, 217), rgb(67, 56, 202), rgb(109, 40, 217), rgb(109, 40, 217))',
  },
  {
    title: 'Connect',
    description:
      'Real-time encrypted messaging with end-to-end privacy. Chat one-on-one or in group conversations with fellow students.',
    icon: MessageSquare,
    iconColor: 'rgb(82, 39, 255)',
    gradient:
      'linear-gradient(to right, rgb(30, 58, 138), rgb(67, 56, 202), rgb(30, 58, 138), rgb(30, 58, 138))',
  },
  {
    title: 'XD (Exchange)',
    description:
      'An anonymous exchange board where students share honest thoughts, campus tips, and creative ideas freely.',
    icon: Sparkles,
    iconColor: 'rgb(255, 159, 252)',
    gradient:
      'linear-gradient(to right, rgb(192, 38, 211), rgb(112, 26, 117), rgb(192, 38, 211), rgb(192, 38, 211))',
  },
  {
    title: 'Campus Maps',
    description:
      'Interactive 3D campus navigation powered by TomTom — find classrooms, labs, cafeterias, and event venues instantly.',
    icon: Map,
    iconColor: 'rgb(177, 158, 239)',
    gradient:
      'linear-gradient(to right, rgb(109, 40, 217), rgb(67, 56, 202), rgb(109, 40, 217), rgb(109, 40, 217))',
  },
  {
    title: 'Academic Calendar',
    description:
      'Never miss an exam, holiday, or submission deadline. Sync your academic schedule and get timely reminders.',
    icon: CalendarDays,
    iconColor: 'rgb(82, 39, 255)',
    gradient:
      'linear-gradient(to right, rgb(30, 58, 138), rgb(67, 56, 202), rgb(30, 58, 138), rgb(30, 58, 138))',
  },
  {
    title: 'Student Profile',
    description:
      'Showcase your achievements, certifications, and hackathon wins. Build a professional portfolio visible to peers and faculty.',
    icon: User,
    iconColor: 'rgb(255, 159, 252)',
    gradient:
      'linear-gradient(to right, rgb(192, 38, 211), rgb(112, 26, 117), rgb(192, 38, 211), rgb(192, 38, 211))',
  },
];

export const PlatformFeatures: React.FC = () => {
  return (
    <section className="py-20">
      {/* Header */}
      <div className="mt-16 mb-16 flex flex-col items-center px-6 text-center">
        <h2 className="animated-gradient-text text-[32px] md:text-[52px] tracking-[-0.03em] font-[700] mb-6">
          <div
            className="text-content"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgb(30, 58, 138), rgb(67, 56, 202), rgb(30, 58, 138), rgb(30, 58, 138))',
              backgroundSize: '300% 100%',
              backgroundRepeat: 'repeat',
            }}
          >
            Explore Platform Features
          </div>
        </h2>
        <p className="text-[17px] text-muted-foreground text-center max-w-xl leading-relaxed">
          From encrypted messaging to real-time campus navigation, discover all the tools designed to empower your social experience.
        </p>
      </div>

      {/* 8-Grid Container matching exact gap-[1px] border design */}
      <div
        id="features"
        className="max-w-[1280px] mx-auto bg-border/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[1px] border border-border/40 overflow-hidden relative z-10 rounded-2xl shadow-sm"
      >
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="px-8 py-10 bg-background group hover:bg-secondary/40 transition-all duration-500 cursor-default relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-start gap-3.5">
                {/* Icon wrapper */}
                <div className="p-3 rounded-lg bg-secondary/50 group-hover:bg-secondary transition-colors duration-300">
                  <Icon
                    className="w-6 h-6 grayscale group-hover:grayscale-0 animate-float transition-all duration-300"
                    style={{ color: feature.iconColor }}
                  />
                </div>

                {/* Animated Gradient Title */}
                <div className="animated-gradient-text font-bold text-[19px] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  <div
                    className="text-content"
                    style={{
                      backgroundImage: feature.gradient,
                      backgroundSize: '300% 100%',
                      backgroundRepeat: 'repeat',
                    }}
                  >
                    {feature.title}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
