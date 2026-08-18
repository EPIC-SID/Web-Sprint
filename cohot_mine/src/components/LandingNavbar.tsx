import React from 'react';
import { Moon, Sun, CheckCircle2 } from 'lucide-react';

interface LandingNavbarProps {
  darkMode: boolean;
  currentUser?: { name: string; email: string } | null;
  onToggleTheme: () => void;
  onSignIn: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  darkMode,
  currentUser,
  onToggleTheme,
  onSignIn,
}) => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-background/60 backdrop-blur-md border-b border-subtle">
      {/* Brand Logo */}
      <div className="flex items-center gap-8">
        <a href="/" className="font-semibold text-2xl tracking-tight flex items-center gap-4 group">
          <img
            src="/assets/cohort-logo.png"
            alt="Cohort"
            className="w-11 h-11 rounded-[6px] shadow-sm transition-transform group-hover:scale-105"
          />
          <span className="text-foreground font-heading">Cohort</span>
        </a>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-700" />
          )}
        </button>

        {/* User Badge or Google Sign In Button */}
        {currentUser ? (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{currentUser.name}</span>
          </div>
        ) : (
          <button
            onClick={onSignIn}
            className="flex items-center px-4 py-2 text-[13px] font-semibold bg-secondary/70 text-foreground border border-border rounded-lg hover:bg-secondary/90 transition-all hover:scale-[1.01] cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        )}
      </div>
    </nav>
  );
};
