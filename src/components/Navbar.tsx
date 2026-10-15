import React, { useState, useEffect } from 'react';
import { PhantomCrest, KoruIcon } from './MauriPatterns';
import { Menu, X, Calendar, Phone, MapPin, ShieldCheck, Flame, Dices } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAuth: () => void;
  isUnlocked: boolean;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAuth,
  isUnlocked,
  selectedCity,
  onSelectCity
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-obsidian-950/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80'
            : 'py-5 bg-gradient-to-b from-obsidian-950/90 via-obsidian-950/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Brand */}
            <a href="#" className="flex items-center gap-3 group">
              <PhantomCrest size={46} className="text-mauri-gold transition-transform duration-500 group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-[0.2em] text-white flex items-center gap-1.5">
                  PHANTOM
                  <span className="text-mauri-gold font-light tracking-[0.3em] text-sm">LOUNGE</span>
                </span>
                <span className="text-[10px] uppercase font-sans tracking-[0.35em] text-slate-400 group-hover:text-mauri-gold transition-colors">
                  Kings of Shisha & Ludo
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-slate-300 hover:text-mauri-gold transition-colors duration-200 flex items-center gap-1.5 relative group"
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5 text-mauri-amber opacity-70 group-hover:opacity-100" />}
                  {link.label}
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-mauri-gold to-mauri-pounamu scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </nav>

            {/* Right Side: City Selector, Auth Badge & Reserve CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* City quick switch */}
              <div className="flex items-center p-1 rounded-full bg-obsidian-900/80 border border-white/10 text-xs font-medium">
                {(['leeds', 'manchester', 'bradford'] as const).map((city) => (
                  <button
                    key={city}
                    onClick={() => onSelectCity(city)}
                    className={`px-3 py-1 rounded-full transition-all duration-200 uppercase tracking-wider text-[11px] ${
                      selectedCity === city
                        ? 'bg-gradient-to-r from-mauri-gold/30 to-mauri-amber/20 text-mauri-gold font-bold border border-mauri-gold/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* VIP Auth / Lock button */}
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 glass-pill hover:border-mauri-gold/50 transition-colors"
                title="VIP Gate Authentication"
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${isUnlocked ? 'text-mauri-pounamu' : 'text-mauri-gold'}`} />
                <span className="hidden xl:inline">{isUnlocked ? 'VIP Active' : 'Basic Auth'}</span>
              </button>

              {/* Reserve CTA */}
              <button
                onClick={onOpenBooking}
                className="relative group overflow-hidden px-5 py-2 rounded-full font-display text-xs font-bold uppercase tracking-widest text-obsidian-950 bg-gradient-to-r from-mauri-gold via-amber-300 to-mauri-gold shadow-lg shadow-mauri-gold/25 hover:shadow-neon-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Calendar className="w-3.5 h-3.5" />
                Reserve Booth
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenBooking}
                className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-mauri-gold text-obsidian-950 flex items-center gap-1 font-display"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl glass-panel text-slate-200 hover:text-mauri-gold"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-obsidian-950/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 lg:hidden animate-in fade-in duration-300 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-display">Select Destination</span>
            <div className="flex gap-2">
              {(['leeds', 'manchester', 'bradford'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onSelectCity(city);
                  }}
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                    selectedCity === city
                      ? 'bg-mauri-gold text-obsidian-950 font-bold'
                      : 'glass-pill text-slate-300'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-2 mt-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-lg font-display tracking-wider text-slate-100"
              >
                <span className="flex items-center gap-3">
                  {link.icon ? <link.icon className="w-5 h-5 text-mauri-gold" /> : <KoruIcon size={18} className="text-mauri-gold" />}
                  {link.label}
                </span>
                <span className="text-xs text-slate-500">→</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-6 flex flex-col gap-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-mauri-gold to-mauri-amber text-obsidian-950 font-display font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-neon-gold"
            >
              <Calendar className="w-4 h-4" />
              Book Shisha & Ludo Table
            </button>
            <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-400">
              <a href="tel:07459199723" className="flex items-center gap-1.5 hover:text-mauri-gold">
                <Phone className="w-3.5 h-3.5 text-mauri-gold" />
                07459 199723
              </a>
              <button onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }} className="flex items-center gap-1 text-slate-400 hover:text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-mauri-pounamu" />
                VIP Auth Gate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
