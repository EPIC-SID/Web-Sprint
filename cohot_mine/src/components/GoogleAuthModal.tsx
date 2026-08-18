import React, { useState } from 'react';
import { X, Loader2, ShieldCheck } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    // Simulate brief network delay
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9000] bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9001] flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm bg-background border border-border rounded-3xl p-8 shadow-2xl shadow-black/40 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo Mark */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://res.cloudinary.com/dgd5sfnrq/image/upload/v1771391844/cohort-logo_g04wy2.png"
              alt="Cohort"
              className="w-16 h-16 rounded-xl shadow-md mb-3"
            />
            <h2 className="text-xl font-bold text-foreground mb-1">Join Cohort PCCOE</h2>
            <p className="text-xs text-muted-foreground text-center">
              Sign in with your official PCCOE Google account
            </p>
          </div>

          {/* Note */}
          <div className="flex items-start gap-2.5 bg-secondary/70 border border-border rounded-xl p-3.5 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Access is restricted to <strong className="text-foreground">@pccoepune.org</strong> email addresses.
            </p>
          </div>

          {/* Sign In Button */}
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="text-sm text-foreground">Signing in...</span>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-sm border border-border shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
            </button>
          )}

          <p className="text-center text-[11px] text-muted-foreground mt-4">
            By signing in, you agree to the Cohort PCCOE Terms & Privacy.
          </p>
        </div>
      </div>
    </>
  );
};
