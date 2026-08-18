import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Loader2, ShieldCheck } from 'lucide-react';

export const GoogleAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'idle' | 'signing'>('idle');

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setStep('signing');
    await loginWithGoogle();
    setLoading(false);
    setStep('idle');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 z-[9000] bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9001] flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm glass-panel border border-white/[0.12] rounded-3xl p-8 shadow-2xl shadow-black/60">
          {/* Close */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo Mark */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1.5px] mb-4 shadow-xl shadow-indigo-600/30">
              <div className="w-full h-full rounded-[14px] bg-[#0d0d12] flex items-center justify-center">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                  C
                </span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Join Cohort PCCOE</h2>
            <p className="text-xs text-zinc-400 text-center">
              Sign in with your official PCCOE Google account
            </p>
          </div>

          {/* Eligibility Note */}
          <div className="flex items-start gap-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3.5 mb-6">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-300 leading-relaxed">
              Access is restricted to <strong className="text-white">@pccoepune.org</strong> email addresses. This ensures our community stays authentic and student-only.
            </p>
          </div>

          {/* Sign-In Button */}
          {step === 'signing' ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
              <span className="text-sm text-zinc-300">Authenticating with Google...</span>
              <span className="text-xs text-zinc-500">Verifying @pccoepune.org account</span>
            </div>
          ) : (
            <button
              id="google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-800 font-semibold text-sm shadow-lg transition-all hover:scale-[1.01] active:scale-95"
            >
              {/* Google logo SVG */}
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

          {/* Footer note */}
          <p className="text-center text-[11px] text-zinc-500 mt-5 leading-relaxed">
            By signing in, you agree to the Cohort PCCOE{' '}
            <span className="text-indigo-400 cursor-pointer hover:underline">Terms of Use</span>{' '}
            and{' '}
            <span className="text-indigo-400 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </>
  );
};
