import React, { useState, useEffect } from 'react';
import { PhantomCrest, KoruIcon } from './MauriPatterns';
import { Menu, X, Calendar, Flame, Dices, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAuth?: () => void;
  isUnlocked?: boolean;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  selectedCity,
  onSelectCity
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Flavor Lab', href: '#flavor-alchemy', icon: Flame },
    { label: 'Ludo Gaming', href: '#ludo-lounge', icon: Dices },
    { label: 'Locations', href: '#locations' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Videos', href: '#videos' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Modern Centered Floating Capsule Dock */}
      <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <div
          className={`w-full max-w-6xl pointer-events-auto rounded-full transition-all duration-300 flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 ${
            scrolled
              ? 'backdrop-blur-2xl bg-obsidian-950/90 border border-white/15 shadow-2xl shadow-black/80'
              : 'backdrop-blur-xl bg-obsidian-950/75 border border-white/10 shadow-xl shadow-black/50'
          }`}
        >
          {/* Logo Brand Emblem */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-mauri-gold/30 via-white/[0.05] to-mauri-gold/15 border border-mauri-gold/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-neon-gold">
              <PhantomCrest size={22} className="text-mauri-gold" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-sm sm:text-base tracking-[0.2em] text-white">
                PHANTOM
              </span>
              <span className="text-mauri-gold font-display font-light text-xs tracking-[0.25em] hidden xs:inline">
                LOUNGE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 text-xs font-sans font-medium tracking-wide text-slate-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200 flex items-center gap-1.5"
              >
                {link.icon && <link.icon className="w-3 h-3 text-mauri-gold opacity-80" />}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Side: City Selector & Compact Book CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimalist City Pill Segment */}
            <div className="hidden sm:flex items-center p-0.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
              {(['leeds', 'manchester', 'bradford'] as const).map((city) => {
                const isActive = selectedCity === city;
                return (
                  <button
                    key={city}
                    onClick={() => onSelectCity(city)}
                    className={`relative px-2.5 py-1 rounded-full text-[11px] font-sans uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-mauri-gold via-amber-300 to-mauri-gold text-obsidian-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>

            {/* Compact CTA Pill Button */}
            <button
              onClick={onOpenBooking}
              className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-mauri-gold via-amber-300 to-mauri-gold text-obsidian-950 font-sans font-bold text-xs tracking-wider uppercase shadow-neon-gold hover:shadow-neon-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-obsidian-950 shrink-0" />
              <span>Book Table</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-slate-300 hover:text-white hover:border-mauri-gold transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Modern Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed top-20 inset-x-4 z-40 max-w-lg mx-auto p-5 rounded-3xl backdrop-blur-2xl bg-obsidian-950/95 border border-white/[0.14] shadow-2xl lg:hidden flex flex-col space-y-4 animate-in fade-in duration-200">
          {/* City Selector for Mobile */}
          <div>
            <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-slate-400 block mb-2 font-semibold">
              Select Your Lounge
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(['leeds', 'manchester', 'bradford'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => onSelectCity(city)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all text-center ${
                    selectedCity === city
                      ? 'bg-mauri-gold text-obsidian-950 font-bold shadow-neon-gold'
                      : 'bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="divide-y divide-white/[0.06] pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-sans font-medium tracking-wide text-slate-200 hover:text-mauri-gold transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  {link.icon ? <link.icon className="w-4 h-4 text-mauri-gold" /> : <KoruIcon size={16} className="text-mauri-gold" />}
                  <span>{link.label}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          {/* Mobile Book CTA */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-mauri-gold via-amber-300 to-mauri-gold text-obsidian-950 font-sans font-bold text-xs tracking-widest uppercase shadow-neon-gold flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-obsidian-950" />
            <span>Reserve a Table</span>
          </button>
        </div>
      )}
    </>
  );
};
