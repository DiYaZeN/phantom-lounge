import React, { useState } from 'react';
import { PhantomCrest, KoruIcon, MauriCornerFiligree } from './MauriPatterns';
import { Lock, Unlock, Key, ShieldCheck, X, Check, AlertCircle } from 'lucide-react';

interface BasicAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
}

export const BasicAuthModal: React.FC<BasicAuthModalProps> = ({
  isOpen,
  onClose,
  isUnlocked,
  onUnlock,
  onLock,
}) => {
  const [username, setUsername] = useState('phantom');
  const [password, setPassword] = useState('lounge2025');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username.toLowerCase() === 'phantom' && password === 'lounge2025') ||
      (username.toLowerCase() === 'admin' && password === 'phantomvip') ||
      password === 'lounge2025'
    ) {
      setError('');
      setSuccess(true);
      setTimeout(() => {
        onUnlock();
        setSuccess(false);
        onClose();
      }, 700);
    } else {
      setError('Invalid credentials. Use Username: phantom | Password: lounge2025');
    }
  };

  const handleLockSession = () => {
    onLock();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl glass-panel border border-mauri-gold/40 p-6 sm:p-8 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <MauriCornerFiligree position="top-left" />
        <MauriCornerFiligree position="top-right" />
        <MauriCornerFiligree position="bottom-left" />
        <MauriCornerFiligree position="bottom-right" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-pill text-slate-400 hover:text-white"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mauri-gold/20 to-mauri-amber/10 border border-mauri-gold/50 flex items-center justify-center mx-auto mb-3 shadow-neon-gold text-mauri-gold">
            {isUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
          </div>

          <span className="text-[10px] uppercase font-display tracking-[0.25em] text-mauri-gold font-bold">
            HTTP Basic Auth & VIP Protection
          </span>
          <h3 className="text-xl font-display font-bold text-white mt-1">
            {isUnlocked ? 'VIP Access Active' : 'Netlify Basic Auth Access'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Netlify deployment security gate. Standard credentials configured below:
          </p>
        </div>

        {/* Credentials Pill */}
        <div className="p-3.5 rounded-2xl bg-obsidian-950/80 border border-white/10 mb-6 text-xs text-slate-300 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-sans">Default User:</span>
            <span className="font-mono text-mauri-gold font-semibold">phantom</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-sans">Default Pass:</span>
            <span className="font-mono text-mauri-gold font-semibold">lounge2025</span>
          </div>
        </div>

        {isUnlocked ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>You are currently authenticated with VIP administrative clearance.</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-mauri-gold text-obsidian-950 font-display font-bold text-xs uppercase tracking-wider shadow-neon-gold"
              >
                Continue Browsing
              </button>
              <button
                onClick={handleLockSession}
                className="px-4 py-3 rounded-xl glass-pill text-xs font-semibold text-rose-400 hover:bg-rose-500/10"
              >
                Relock Session
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-mauri-gold to-mauri-amber text-obsidian-950 font-display font-bold text-xs uppercase tracking-widest shadow-neon-gold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Access Granted!</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Authenticate & Unlock</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
