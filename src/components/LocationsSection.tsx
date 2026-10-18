import React from 'react';
import { LOCATIONS } from '../data/phantomData';
import { MauriDivider, MauriCornerFiligree } from './MauriPatterns';
import { MapPin, Clock, Phone, Mail, CheckCircle, Navigation, ExternalLink, Sparkles } from 'lucide-react';

interface LocationsSectionProps {
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  onOpenBooking: () => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  selectedCity,
  onSelectCity,
  onOpenBooking,
}) => {
  return (
    <section id="locations" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-950 overflow-hidden">
      <MauriDivider label="THREE PREMIER DESTINATIONS" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-mauri-gold font-bold">
            West Yorkshire & Greater Manchester
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-2">
            Visit Our <span className="text-gold-gradient">Sanctuaries</span>
          </h2>
          <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
            Three distinct atmospheres united by identical standards of excellence: lavish velvet booth seating, complimentary Ludo boards, and the UK’s most celebrated shisha craft.
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {LOCATIONS.map((loc) => {
            const isCurrent = selectedCity === loc.id;
            return (
              <div
                key={loc.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 group ${
                  isCurrent
                    ? 'glass-panel border-mauri-gold/80 shadow-glass-gold scale-[1.02]'
                    : 'glass-card border-white/10 hover:border-white/30'
                }`}
              >
                <MauriCornerFiligree position="top-left" />
                <MauriCornerFiligree position="top-right" />

                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-display uppercase tracking-widest font-bold bg-white/10 text-mauri-gold border border-white/15">
                      {loc.isFlagship ? '★ Flagship Lounge' : 'Premier Lounge'}
                    </span>

                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[11px] font-display uppercase tracking-wider text-mauri-pounamu font-semibold">
                        <Sparkles className="w-3.5 h-3.5" /> Selected City
                      </span>
                    )}
                  </div>

                  {/* City Name & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-mauri-gold transition-colors">
                    {loc.city}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium font-sans">
                    {loc.tagline}
                  </p>

                  <div className="my-6 space-y-3.5 text-xs sm:text-sm text-slate-200 border-y border-white/10 py-5 font-sans">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-mauri-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-white">{loc.address}</span>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-white">Weekdays: {loc.hours.weekdays}</div>
                        <div className="text-slate-300">Weekends: {loc.hours.weekends}</div>
                      </div>
                    </div>

                    {/* Direct Contact */}
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                      <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="hover:text-mauri-gold transition-colors font-medium text-white">
                        {loc.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                      <a href={`mailto:${loc.email}`} className="hover:text-mauri-gold transition-colors text-slate-200">
                        {loc.email}
                      </a>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] uppercase font-display tracking-widest text-slate-300 font-semibold">
                      Featured Amenities
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {loc.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-1.5 text-xs text-slate-200 font-sans">
                          <CheckCircle className="w-3.5 h-3.5 text-mauri-pounamu shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      onSelectCity(loc.id);
                      onOpenBooking();
                    }}
                    className={`flex-1 py-3 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-mauri-gold to-mauri-amber text-obsidian-950 shadow-neon-gold hover:scale-[1.02]'
                        : 'glass-pill hover:bg-white/10 text-white'
                    }`}
                  >
                    <span>Reserve in {loc.city}</span>
                  </button>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.city + ' Phantom Lounge UK')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-pill text-slate-400 hover:text-white hover:border-white/30 transition-colors"
                    title={`Directions to ${loc.city}`}
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
