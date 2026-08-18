import React, { useState } from 'react';
import { User, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';

interface GoogleAccountChooserPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: { name: string; email: string; avatar?: string }) => void;
}

export const GoogleAccountChooserPopup: React.FC<GoogleAccountChooserPopupProps> = ({
  isOpen,
  onClose,
  onSelectAccount,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const defaultAccounts = [
    {
      name: 'Siddhant Sharma',
      email: 'siddhant.sharma@pccoepune.org',
      role: 'PCCOE Student • Computer Engineering',
      initials: 'SS',
      color: 'bg-indigo-600',
    },
    {
      name: 'Rohan Deshmukh',
      email: 'rohan.deshmukh@pccoepune.org',
      role: 'PCCOE Student • AI & Data Science',
      initials: 'RD',
      color: 'bg-emerald-600',
    },
  ];

  const handleChoose = async (acc: { name: string; email: string }) => {
    setSelected(acc.email);
    setIsVerifying(true);
    setErrorMsg('');

    // Simulate authentic Google token exchange
    await new Promise((res) => setTimeout(res, 900));
    setIsVerifying(false);
    onSelectAccount(acc);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) {
      setErrorMsg('Please enter your PCCOE email');
      return;
    }
    if (!customEmail.toLowerCase().endsWith('@pccoepune.org')) {
      setErrorMsg('Only @pccoepune.org domain addresses are allowed.');
      return;
    }
    const name = customName.trim() || customEmail.split('@')[0];
    handleChoose({ name, email: customEmail.trim() });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
      {/* Google Popup Card Window */}
      <div className="w-full max-w-[420px] bg-white text-zinc-800 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 animate-[scaleIn_0.2s_ease-out] font-sans">
        {/* Header Bar */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-100 flex items-start justify-between">
          <div className="flex flex-col">
            {/* Google Logo */}
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
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
              <span className="text-base font-medium text-zinc-600">Google</span>
            </div>

            <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">Choose an account</h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              to continue to <strong className="text-zinc-700">Cohort PCCOE</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-full hover:bg-zinc-100 transition cursor-pointer"
            aria-label="Cancel"
          >
            ✕
          </button>
        </div>

        {/* Account List */}
        <div className="p-4 space-y-1.5">
          {defaultAccounts.map((acc) => {
            const isCurrent = selected === acc.email;
            return (
              <button
                key={acc.email}
                onClick={() => handleChoose(acc)}
                disabled={isVerifying}
                className="w-full flex items-center gap-3.5 p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all text-left cursor-pointer group disabled:opacity-60"
              >
                {/* Initials Avatar */}
                <div
                  className={`w-10 h-10 rounded-full ${acc.color} text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0`}
                >
                  {acc.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-zinc-900 truncate">
                      {acc.name}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  </div>
                  <div className="text-xs text-zinc-500 truncate font-mono">{acc.email}</div>
                  <div className="text-[11px] text-zinc-400 truncate mt-0.5">{acc.role}</div>
                </div>

                {isCurrent && isVerifying ? (
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                )}
              </button>
            );
          })}

          {/* Use Another Account Button / Form */}
          {!showCustomInput ? (
            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full flex items-center gap-3.5 p-3 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all text-left cursor-pointer text-zinc-700 font-medium text-xs mt-2"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center shrink-0 border border-zinc-200">
                <User className="w-5 h-5" />
              </div>
              <span className="text-sm text-zinc-700 font-medium">Use another PCCOE account</span>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="pt-2 px-2 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Patel"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  PCCOE Google Email
                </label>
                <input
                  type="email"
                  placeholder="name.branch@pccoepune.org"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-mono"
                />
              </div>

              {errorMsg && <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="px-3 py-2 border border-zinc-300 text-zinc-600 rounded-lg text-xs hover:bg-zinc-100 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Disclaimer */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 text-[11px] text-zinc-500 leading-relaxed">
          To continue, Google will share your name, email address, and profile picture with Cohort PCCOE.
        </div>
      </div>
    </div>
  );
};
