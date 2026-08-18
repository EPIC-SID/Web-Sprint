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
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import './index.css';

interface AppUser {
  name: string;
  email: string;
  avatar?: string;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToast = useCallback(
    (message: string, type: ToastMessage['type'] = 'info') => {
      const id = Math.random().toString(36).slice(2);
      setToasts(prev => [...prev.slice(-2), { id, message, type }]);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: AppUser) => {
    setCurrentUser(user);
    addToast(`Welcome ${user.name}! 🎉`, 'success');
  };

  // If user is logged in → show Home Feed
  if (currentUser) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="landing-theme min-h-screen bg-background text-foreground font-body">
          <HomeFeed
            currentUser={currentUser}
            onSignOut={() => setCurrentUser(null)}
          />
          <Toast toasts={toasts} onDismiss={dismissToast} />
        </div>
      </div>
    );
  }

  // Otherwise → Landing Page
  return (
    <div className="landing-theme min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground transition-colors duration-300 relative">
      <SpiderManOverlay />

      <LandingNavbar
        darkMode={darkMode}
        currentUser={currentUser}
        onToggleTheme={() => setDarkMode(!darkMode)}
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
