import React from 'react';

// Hand-crafted Koru (Mauri life force / unfurling spiral) SVG
export const KoruIcon: React.FC<{ className?: string; size?: number }> = ({ className = "text-mauri-gold", size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 10 C72 10 90 28 90 50 C90 72 72 90 50 90 C32 90 18 78 14 62 C10 46 20 30 36 24 C50 18 64 26 68 40 C71 52 64 64 52 66 C42 68 34 60 36 50 C38 42 44 38 50 40 C54 41 56 46 54 49"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
  </svg>
);

// Phantom Lounge Mauri Crest: Crown + Koru Spiral + Ethereal Smoke
export const PhantomCrest: React.FC<{ className?: string; size?: number }> = ({ className = "text-mauri-gold", size = 44 }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="50%" stopColor="#e6af2e" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <linearGradient id="crestJadeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      
      {/* Outer Halo */}
      <circle cx="60" cy="60" r="54" stroke="url(#crestGoldGrad)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.6" />
      <circle cx="60" cy="60" r="48" stroke="url(#crestJadeGrad)" strokeWidth="1" opacity="0.3" />

      {/* Royal Crown / King of Shisha motif */}
      <path
        d="M38 42 L46 54 L60 36 L74 54 L82 42 L80 62 L40 62 Z"
        fill="url(#crestGoldGrad)"
        opacity="0.85"
      />
      
      {/* Koru Spirals intertwining beneath the crown */}
      <path
        d="M60 62 C50 62 44 70 44 78 C44 86 52 92 60 92 C68 92 76 86 76 78 C76 72 72 68 66 68 C62 68 58 72 60 76 C61 78 63 79 65 78"
        stroke="url(#crestGoldGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="34" r="2.5" fill="#fff" />
      <circle cx="38" cy="40" r="2.5" fill="url(#crestGoldGrad)" />
      <circle cx="82" cy="40" r="2.5" fill="url(#crestGoldGrad)" />
    </svg>
  </div>
);

// Mauri Section Divider: Polynesian organic wave with Koru center
export const MauriDivider: React.FC<{ className?: string; label?: string }> = ({ className = "", label }) => (
  <div className={`w-full flex flex-col items-center justify-center my-8 ${className}`}>
    <div className="flex items-center justify-center gap-4 w-full max-w-xl px-4">
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-mauri-gold/40 to-mauri-gold" />
      <div className="flex items-center gap-2 text-mauri-gold">
        <KoruIcon size={20} className="text-mauri-gold animate-pulse" />
        {label && (
          <span className="font-display tracking-[0.25em] text-xs uppercase text-mauri-gold/90 font-semibold px-2">
            {label}
          </span>
        )}
        <div className="rotate-180">
          <KoruIcon size={20} className="text-mauri-gold animate-pulse" />
        </div>
      </div>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-mauri-gold/40 to-mauri-gold" />
    </div>
  </div>
);

// Mauri Corner Filigree for Cards
export const MauriCornerFiligree: React.FC<{ position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  position = 'top-left'
}) => {
  const getRotation = () => {
    switch (position) {
      case 'top-right': return 'rotate-90 right-0 top-0';
      case 'bottom-right': return 'rotate-180 right-0 bottom-0';
      case 'bottom-left': return '-rotate-90 left-0 bottom-0';
      default: return 'left-0 top-0';
    }
  };

  return (
    <div className={`absolute pointer-events-none p-2 opacity-30 group-hover:opacity-80 transition-opacity duration-300 ${getRotation()}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2 22 V6 C2 3.79 3.79 2 6 2 H22" stroke="#e6af2e" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6" cy="6" r="2" fill="#e6af2e" />
      </svg>
    </div>
  );
};
