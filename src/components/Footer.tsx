import React, { useState } from 'react';
import { PhantomCrest, KoruIcon } from './MauriPatterns';
import { Phone, Mail, MapPin, ArrowUp, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { LOCATIONS } from '../data/phantomData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-obsidian-950 border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-400">
      {/* Subtle Mauri glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-mauri-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <PhantomCrest size={48} className="text-mauri-gold" />
              <div>
                <span className="font-display font-extrabold text-xl tracking-[0.2em] text-white flex items-center gap-1.5">
                  PHANTOM
                  <span className="text-mauri-gold font-light tracking-[0.3em] text-sm">LOUNGE</span>
                </span>
                <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-slate-500 block">
                  Kings of Shisha & Ludo
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              The United Kingdom's premier alcohol-free shisha sanctuary. Bringing together hand-crafted shisha blends, personal Ludo tournament boards, and royal hospitality across Leeds, Manchester, and Bradford.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Alcohol-Free & Halal
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-mauri-gold transition-colors">
                  Sensory Menu
                </a>
              </li>
              <li>
                <a href="#flavor-alchemy" className="hover:text-mauri-gold transition-colors">
                  Flavor Alchemy Lab
                </a>
              </li>
              <li>
                <a href="#ludo-lounge" className="hover:text-mauri-gold transition-colors">
                  Ludo Gaming Sanctuary
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-mauri-gold transition-colors">
                  Our 3 Locations
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-mauri-gold transition-colors">
                  Ambiance Gallery
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-mauri-gold transition-colors">
                  Motion Vault
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-mauri-gold transition-colors">
                  Reserve VIP Table
                </a>
              </li>
            </ul>
          </div>

          {/* Locations & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              Our Locations
            </h4>
            <div className="space-y-3 text-xs">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-white font-semibold">
                    <span>{loc.city} Lounge</span>
                    <span className="text-[10px] text-mauri-gold uppercase font-mono">{loc.isFlagship ? 'Flagship' : 'Premier'}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{loc.address}</div>
                </div>
              ))}
              <div className="pt-1 flex items-center gap-2 text-xs text-white">
                <Phone className="w-3.5 h-3.5 text-mauri-gold" />
                <a href="tel:07459199723" className="hover:text-mauri-gold transition-colors">
                  07459 199723
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="w-3.5 h-3.5 text-mauri-gold" />
                <a href="mailto:info@phantomlounge.co.uk" className="hover:text-mauri-gold transition-colors">
                  info@phantomlounge.co.uk
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter / Circle Drops */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
              The Phantom Circle
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive secret menu invites, weekend Ludo bracket releases, and seasonal tobacco flavor drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-mauri-gold text-obsidian-950 hover:bg-amber-400 transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="text-xs text-mauri-pounamu flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome to the circle! Check your inbox soon.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <KoruIcon size={16} className="text-mauri-gold" />
            <span>© 2025 Phantom Lounge UK. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Redesigned with Mauri Vital Essence & Glassmorphism</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full glass-pill text-slate-400 hover:text-mauri-gold hover:border-mauri-gold transition-colors flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
