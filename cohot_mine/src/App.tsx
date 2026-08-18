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
import { Toast } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import './index.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

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
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignIn = () => {
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    addToast('Signed in successfully with @pccoepune.org account!', 'success');
  };

  return (
    <div className="landing-theme min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground transition-colors duration-300 relative">
      {/* Spider-Man Floating Doodles Overlay */}
      <SpiderManOverlay />

      {/* Sticky Navigation Bar */}
      <LandingNavbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onSignIn={handleSignIn}
      />

      {/* Main Page Content */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onGetStarted={handleSignIn}
          onExplore={scrollToFeatures}
        />

        {/* 2. Connecting Communities Scrolling Marquee */}
        <CommunityMarquee />

        {/* 3. Curved Loop SVG Banner */}
        <CurvedTextBanner />

        {/* 4. Explore Platform Features 8-Grid */}
        <PlatformFeatures />

        {/* 5. About Cohort PCCOE */}
        <AboutSection />
      </main>

      {/* 6. Landing Footer */}
      <LandingFooter onSignIn={handleSignIn} />

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Toast Notification System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
