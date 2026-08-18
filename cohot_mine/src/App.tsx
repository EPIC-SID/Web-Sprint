import { useState, useEffect, useCallback } from 'react';
import { LandingNavbar } from './components/LandingNavbar';
import { HeroSection } from './components/HeroSection';
import { CommunityMarquee } from './components/CommunityMarquee';
import { CurvedTextBanner } from './components/CurvedTextBanner';
import { PlatformFeatures } from './components/PlatformFeatures';
import { AboutSection } from './components/AboutSection';
import { LandingFooter } from './components/LandingFooter';
import { SpiderManOverlay } from './components/SpiderManOverlay';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { HomeFeed } from './components/HomeFeed';
import { SiteLoader } from './components/SiteLoader';
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import './index.css';

interface AppUser {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  branch?: string;
  year?: string;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
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

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Listen to Supabase Live Session
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    const checkSession = async () => {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          // Fetch profile details
          const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setCurrentUser({
            id: session.user.id,
            name: profile?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'PCCOE Student',
            email: session.user.email || '',
            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url,
            branch: profile?.branch || 'Computer Engineering',
            year: profile?.year || 'TE',
          });
        }
      } catch (err) {
        console.warn('Session check error:', err);
      }
    };

    checkSession();

    const { data: { subscription } } = client.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await client
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setCurrentUser({
          id: session.user.id,
          name: profile?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'PCCOE Student',
          email: session.user.email || '',
          avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url,
          branch: profile?.branch || 'Computer Engineering',
          year: profile?.year || 'TE',
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Apply dark mode class to root HTML & persist in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('cohort-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('cohort-theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastMessage['type'] = 'info') => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: AppUser) => {
    setCurrentUser(user);
    addToast(`Welcome ${user.name}! 🎉`, 'success');
  };

  const handleSignOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    addToast('Signed out successfully', 'info');
  };

  // If user is logged in → show Home Feed
  if (currentUser) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        {loading && <SiteLoader onComplete={() => setLoading(false)} />}
        <div className="landing-theme min-h-screen bg-background text-foreground font-body">
          <HomeFeed
            currentUser={currentUser}
            onSignOut={handleSignOut}
            darkMode={darkMode}
            onToggleTheme={toggleTheme}
          />
          <Toast toasts={toasts} onDismiss={dismissToast} />
        </div>
      </div>
    );
  }

  // Otherwise → Landing Page
  return (
    <div className="landing-theme min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground transition-colors duration-300 relative">
      {loading && <SiteLoader onComplete={() => setLoading(false)} />}
      <SpiderManOverlay />

      <LandingNavbar
        darkMode={darkMode}
        currentUser={currentUser}
        onToggleTheme={toggleTheme}
        onSignIn={() => setIsAuthOpen(true)}
      />

      <main className="relative z-10">
        <HeroSection
          onGetStarted={() => setIsAuthOpen(true)}
          onExplore={scrollToFeatures}
        />
        <CommunityMarquee />
        <CurvedTextBanner />
        <PlatformFeatures />
        <AboutSection />
      </main>

      <LandingFooter onSignIn={() => setIsAuthOpen(true)} />

      <GoogleAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
