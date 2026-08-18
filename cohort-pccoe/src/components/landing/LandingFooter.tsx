import React from 'react';
import { Mail } from 'lucide-react';

const GithubIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
  </svg>
);

interface LandingFooterProps {
  onSignIn: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onSignIn }) => {
  return (
    <footer className="border-t border-subtle bg-secondary/20 pt-16 pb-8 mt-16">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Upper 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-subtle pb-16">
          {/* Column 1: Product */}
          <div className="md:border-r border-subtle md:pr-12">
            <div className="animated-gradient-text font-[700] text-[22px] mb-8 tracking-tight">
              <div
                className="text-content"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgb(30, 58, 138), rgb(82, 39, 255), rgb(30, 58, 138), rgb(30, 58, 138))',
                  backgroundSize: '300% 100%',
                  backgroundRepeat: 'repeat',
                }}
              >
                Product
              </div>
            </div>
            <ul className="space-y-4 text-[15px] font-[500] text-muted-foreground">
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  Connect
                </button>
              </li>
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  Maps
                </button>
              </li>
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="md:px-12 pt-10 md:pt-0">
            <div className="animated-gradient-text font-[700] text-[22px] mb-8 tracking-tight">
              <div
                className="text-content"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgb(192, 38, 211), rgb(124, 58, 237), rgb(192, 38, 211), rgb(192, 38, 211))',
                  backgroundSize: '300% 100%',
                  backgroundRepeat: 'repeat',
                }}
              >
                Company
              </div>
            </div>
            <ul className="space-y-4 text-[15px] font-[500] text-muted-foreground">
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  Communities
                </button>
              </li>
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  Friends
                </button>
              </li>
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  XD
                </button>
              </li>
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  Maps
                </button>
              </li>
              <li>
                <button onClick={onSignIn} className="hover:text-foreground transition">
                  Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="md:border-l border-subtle md:pl-12 pt-10 md:pt-0 flex md:justify-end items-start">
            <div className="flex gap-6 text-foreground items-center">
              <a
                href="https://github.com/chiragferwani"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
                title="GitHub"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/chiragferwani/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
              <a
                href="mailto:chiragferwani@gmail.com"
                className="opacity-70 hover:opacity-100 transition-opacity"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Disclaimer & Big Cohort Logo */}
        <div className="pt-16 pb-12 flex flex-col md:flex-row justify-between border-b border-subtle items-center">
          <div className="max-w-sm mb-10 md:mb-0">
            <div className="animated-gradient-text text-[14px] font-[700] mb-3">
              <div
                className="text-content"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgb(30, 58, 138), rgb(82, 39, 255), rgb(30, 58, 138), rgb(30, 58, 138))',
                  backgroundSize: '300% 100%',
                  backgroundRepeat: 'repeat',
                }}
              >
                Regulatory disclaimer
              </div>
            </div>
            <div className="text-[12px] font-medium text-muted-foreground leading-relaxed">
              Cohort is a community platform, not a bank. Services are provided by partner
              organizations across the campus up to applicable limits.
            </div>
          </div>

          <div className="flex items-center gap-6">
            <img
              src="https://res.cloudinary.com/dgd5sfnrq/image/upload/v1771391844/cohort-logo_g04wy2.png"
              alt="Cohort"
              className="w-20 h-20 rounded-[8px] shadow-sm"
            />
            <div className="animated-gradient-text text-[64px] md:text-[88px] font-[800] tracking-tighter">
              <div
                className="text-content"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgb(30, 58, 138), rgb(192, 38, 211), rgb(67, 56, 202), rgb(30, 58, 138))',
                  backgroundSize: '300% 100%',
                  backgroundRepeat: 'repeat',
                }}
              >
                Cohort
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between text-[12px] font-medium text-muted-foreground">
          <div>©2026 Cohort Social Inc.</div>
          <div className="space-x-6 mt-4 md:mt-0">
            <a className="hover:text-foreground underline transition" href="/privacy-policy">
              Privacy Policy
            </a>
            <a className="hover:text-foreground underline transition" href="/terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
