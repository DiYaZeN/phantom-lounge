import React from 'react';
import { KoruIcon, PhantomCrest, MauriDivider } from './MauriPatterns';
import { Calendar, Flame, Dices, Award, MapPin, ChevronDown, Sparkles, Clock } from 'lucide-react';
import { LOCATIONS } from '../data/phantomData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  selectedCity,
  onSelectCity,
}) => {
  const currentCity = LOCATIONS.find((l) => l.id === selectedCity) || LOCATIONS[0];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden mauri-mesh-bg">
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft background luxury image with dark vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transition-transform duration-10000"
          style={{ backgroundImage: `url('https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Yan1z9MaZ2f94RpQ/photo-2023-01-30-13-26-48-dWxv0W5nZOh10qyo.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-950/80 to-obsidian-950" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-obsidian-950/60 to-obsidian-950" />

        {/* Ethereal Animated Smoke Waves */}
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-mauri-gold/10 blur-[130px] animate-smoke-1" />
        <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] rounded-full bg-mauri-pounamu/10 blur-[140px] animate-smoke-2" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full bg-mauri-smoke/10 blur-[150px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Mauri Life Force Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-mauri-gold/30 mb-8 animate-float shadow-glass-gold">
          <KoruIcon size={16} className="text-mauri-gold animate-spin" />
          <span className="text-[11px] sm:text-xs font-display tracking-[0.25em] uppercase font-bold text-slate-200">
            MAURI ESSENCE • ALCOHOL-FREE PREMIER LOUNGE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-mauri-pounamu animate-ping" />
        </div>

        {/* Main Headline with Mauri Vitality */}
        <div className="relative mb-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-mauri-gold" />
            <span className="text-xs sm:text-sm uppercase font-display tracking-[0.4em] text-mauri-gold font-semibold">
              KINGS OF SHISHA & SOCIAL GAMING
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-mauri-gold" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-none">
            PHANTOM <span className="text-gold-gradient drop-shadow-2xl">LOUNGE</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed">
            Where ethereal shisha mastercraft meets personal Ludo gaming tables, velvety Karak chai, and unforgettable late-night luxury across{' '}
            <span className="text-white font-semibold underline decoration-mauri-gold underline-offset-4">
              Leeds, Manchester & Bradford
            </span>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-12">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-display text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-mauri-gold via-amber-400 to-mauri-gold text-obsidian-950 shadow-neon-gold hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-4 h-4 text-obsidian-950" />
            <span>Reserve VIP Table</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>

          <a
            href="#flavor-alchemy"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-display text-sm font-bold tracking-widest uppercase glass-card hover:border-mauri-gold text-white hover:text-mauri-gold transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Flame className="w-4 h-4 text-mauri-gold" />
            <span>Interactive Flavor Lab</span>
          </a>

          <a
            href="#menu"
            className="w-full sm:w-auto px-6 py-4 rounded-full font-display text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-white glass-pill hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>View Full Menu</span>
            <span className="text-xs">↓</span>
          </a>
        </div>

        {/* Live Lounge Status Card */}
        <div className="w-full max-w-3xl glass-panel rounded-3xl p-5 sm:p-6 border border-white/15 shadow-glass">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center text-center p-2">
              <div className="flex items-center gap-1.5 text-mauri-gold font-display font-bold text-2xl sm:text-3xl">
                <span>150+</span>
                <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              </div>
              <span className="text-xs text-slate-300 uppercase tracking-wider mt-1 font-medium font-sans">Shisha Flavors</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center text-center p-2">
              <div className="flex items-center gap-1.5 text-mauri-pounamu font-display font-bold text-2xl sm:text-3xl">
                <span>FREE</span>
                <Dices className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs text-slate-300 uppercase tracking-wider mt-1 font-medium font-sans">Personal Ludo Boards</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center text-center p-2">
              <div className="flex items-center gap-1.5 text-white font-display font-bold text-2xl sm:text-3xl">
                <span>3</span>
                <MapPin className="w-4 h-4 text-mauri-gold" />
              </div>
              <span className="text-xs text-slate-300 uppercase tracking-wider mt-1 font-medium font-sans">Prime Locations</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center text-center p-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-display font-bold text-2xl sm:text-3xl">
                <span>5.0★</span>
                <Award className="w-4 h-4 text-mauri-gold" />
              </div>
              <span className="text-xs text-slate-300 uppercase tracking-wider mt-1 font-medium font-sans">Customer Rated</span>
            </div>
          </div>

          {/* Current City Highlight Strip */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 px-2 font-sans">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">Tonight at {currentCity.city}:</span>
              <span>Open until {currentCity.hours.weekends.split('–')[1]?.trim() || '3:30 AM'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Switch Hub:</span>
              {(['leeds', 'manchester', 'bradford'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => onSelectCity(city)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedCity === city
                      ? 'bg-mauri-gold text-obsidian-950 font-bold shadow-sm'
                      : 'bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 animate-bounce">
          <a href="#flavor-alchemy" className="text-slate-400 hover:text-mauri-gold transition-colors flex flex-col items-center gap-1">
            <span className="text-[10px] tracking-widest uppercase font-display">Experience The Vibe</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
