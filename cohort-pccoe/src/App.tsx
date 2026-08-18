import { useState, useCallback, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LandingNavbar } from './components/landing/LandingNavbar';
import { HeroSection } from './components/landing/HeroSection';
import { CommunityMarquee } from './components/landing/CommunityMarquee';
import { CurvedTextBanner } from './components/landing/CurvedTextBanner';
import { PlatformFeatures } from './components/landing/PlatformFeatures';
import { AboutSection } from './components/landing/AboutSection';
import { LandingFooter } from './components/landing/LandingFooter';
import { SpiderManOverlay } from './components/landing/SpiderManOverlay';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';
import { Toast } from './components/ui/Toast';
import type { ToastMessage } from './components/ui/Toast';
import { useAuth } from './context/AuthContext';
import './index.css';

function CohortLandingApp() {
  const { openAuthModal } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
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

  const handleSignIn = () => {
    openAuthModal();
    addToast('Opening Google Sign-In for @pccoepune.org...', 'info');
  };

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-theme min-h-screen bg-background text-foreground font-body font-inter selection:bg-primary selection:text-primary-foreground transition-colors duration-300 relative">
      {/* Floating Spider-Man Illustration Doodles */}
      <SpiderManOverlay />

      {/* Sticky Navigation Bar */}
      <LandingNavbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onSignIn={handleSignIn}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onGetStarted={handleSignIn}
          onExplore={scrollToFeatures}
        />

        {/* 2. Connecting Communities Marquee Strip */}
        <CommunityMarquee />

        {/* 3. Curved Loop SVG Banner */}
        <CurvedTextBanner />

        {/* 4. Explore Platform Features (8-Grid) */}
        <PlatformFeatures />

        {/* 5. About Cohort PCCOE */}
        <AboutSection />
      </main>

      {/* 6. Landing Footer */}
      <LandingFooter onSignIn={openAuthModal} />

      {/* Interactive Google Sign-In Simulation Modal */}
      <GoogleAuthModal />

      {/* Notification Toast System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CohortLandingApp />
    </AuthProvider>
  );
}
