import React, { useState, useEffect } from 'react';
import { LOCATIONS } from '../data/phantomData';
import { MauriDivider, MauriCornerFiligree, KoruIcon } from './MauriPatterns';
import { Calendar, Clock, Users, Flame, CheckCircle2, Sparkles, MapPin, Phone, Mail, Check, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationSectionProps {
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
  preloadedFlavorMix: string;
  onClearPreloadedMix: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  selectedCity,
  onSelectCity,
  preloadedFlavorMix,
  onClearPreloadedMix,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    experience: 'ludo-booth',
    specialNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  useEffect(() => {
    if (preloadedFlavorMix && !formData.specialNotes.includes(preloadedFlavorMix)) {
      setFormData((prev) => ({
        ...prev,
        specialNotes: prev.specialNotes
          ? `${prev.specialNotes} | Pre-selected: ${preloadedFlavorMix}`
          : `Pre-selected Recipe: ${preloadedFlavorMix}`,
      }));
    }
  }, [preloadedFlavorMix]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `PL-${selectedCity.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(code);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e6af2e', '#10b981', '#f59e0b', '#ffffff'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const currentCityObj = LOCATIONS.find((l) => l.id === selectedCity) || LOCATIONS[0];

  return (
    <section id="reservations" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-900/60 overflow-hidden">
      <MauriDivider label="VIP ACCESS & TABLE BOOKING" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-mauri-gold font-bold">
            Guaranteed Booth & Ludo Table
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-2">
            Reserve Your <span className="text-gold-gradient">Sanctuary Table</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Zero booking deposit required. Select your city, choose your table vibe, and we'll have your coals glowing and personal Ludo board set upon your arrival.
          </p>
        </div>

        {isSubmitted ? (
          /* Confirmation Success Card */
          <div className="max-w-xl mx-auto glass-panel rounded-3xl p-8 sm:p-10 border border-mauri-gold/50 shadow-glass-gold text-center relative overflow-hidden animate-in zoom-in-95 duration-300">
            <MauriCornerFiligree position="top-left" />
            <MauriCornerFiligree position="top-right" />

            <div className="w-16 h-16 rounded-full bg-mauri-gold/20 border border-mauri-gold text-mauri-gold flex items-center justify-center mx-auto mb-6 shadow-neon-gold">
              <PartyPopper className="w-8 h-8" />
            </div>

            <span className="text-xs font-display uppercase tracking-[0.3em] text-mauri-pounamu font-bold">
              VIP Reservation Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Welcome to the Circle
            </h3>

            {/* Booking Details Ticket */}
            <div className="my-6 p-5 rounded-2xl bg-obsidian-950/80 border border-white/10 text-left space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs text-slate-400 font-sans">Booking Reference:</span>
                <span className="font-mono font-bold text-mauri-gold text-sm tracking-wider">{bookingCode}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 block">Guest:</span>
                  <span className="font-medium text-white">{formData.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Venue:</span>
                  <span className="font-medium text-white">{currentCityObj.city} Lounge</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Date & Time:</span>
                  <span className="font-medium text-white">{formData.date} at {formData.time}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Party Size:</span>
                  <span className="font-medium text-white">{formData.guests} Guests</span>
                </div>
              </div>
              {formData.specialNotes && (
                <div className="pt-2 border-t border-white/5 text-xs text-mauri-amber">
                  <span className="text-slate-500 block">Selected Recipe / Notes:</span>
                  <span>{formData.specialNotes}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              A text confirmation has been dispatched. Please arrive within 15 minutes of your booking time. Free personal Ludo boards and coals will be ready.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${currentCityObj.phone.replace(/\s+/g, '')}`}
                className="px-5 py-3 rounded-full glass-pill text-xs font-semibold text-white hover:text-mauri-gold transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-mauri-gold" />
                Call Venue ({currentCityObj.phone})
              </a>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClearPreloadedMix();
                }}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-mauri-gold to-mauri-amber text-obsidian-950 font-display font-bold text-xs uppercase tracking-wider"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Fields */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative"
            >
              <MauriCornerFiligree position="top-left" />
              <MauriCornerFiligree position="top-right" />

              {/* Step 1: Destination Selection */}
              <div className="mb-8">
                <label className="block text-xs uppercase font-display tracking-widest text-mauri-gold font-bold mb-3">
                  1. Select Destination Lounge
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => onSelectCity(loc.id)}
                      className={`p-3 sm:p-4 rounded-2xl border text-center transition-all ${
                        selectedCity === loc.id
                          ? 'border-mauri-gold bg-mauri-gold/15 text-white shadow-glass-gold'
                          : 'border-white/10 glass-pill text-slate-400 hover:text-white'
                      }`}
                    >
                      <h4 className="font-display font-bold text-sm sm:text-base">{loc.city}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5 truncate hidden sm:block">
                        {loc.hours.weekdays.split('–')[1]?.trim()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Experience / Booth Type */}
              <div className="mb-8">
                <label className="block text-xs uppercase font-display tracking-widest text-mauri-gold font-bold mb-3">
                  2. Choose Experience Setting
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'ludo-booth', name: 'VIP Ludo Booth', desc: 'Private velvet booth + personal game board' },
                    { id: 'chill-lounge', name: 'Chill Shisha Lounge', desc: 'Low-light ambient seating & music' },
                    { id: 'master-group', name: 'Master Celebration', desc: 'Large booth for 6–12 guests' },
                  ].map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: exp.id })}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        formData.experience === exp.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white'
                          : 'border-white/10 glass-pill text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-xs text-white">{exp.name}</span>
                        {formData.experience === exp.id && (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-1 leading-snug">
                        {exp.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Date, Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="block text-xs sm:text-sm text-slate-200 font-medium mb-1.5 flex items-center gap-1.5 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-mauri-gold" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white font-sans [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-slate-200 font-medium mb-1.5 flex items-center gap-1.5 font-sans">
                    <Clock className="w-3.5 h-3.5 text-mauri-gold" /> Time Slot
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white bg-obsidian-950 font-sans cursor-pointer"
                  >
                    {['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00'].map(
                      (t) => (
                        <option key={t} value={t} className="bg-obsidian-950 text-white font-sans">
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-slate-200 font-medium mb-1.5 flex items-center gap-1.5 font-sans">
                    <Users className="w-3.5 h-3.5 text-mauri-gold" /> Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white bg-obsidian-950 font-sans cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                      <option key={num} value={num} className="bg-obsidian-950 text-white font-sans">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 4: Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs sm:text-sm text-slate-200 font-medium mb-1.5 font-sans">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samira Khan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-400 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm text-slate-200 font-medium mb-1.5 font-sans">Phone Number (For SMS Confirmation)</label>
                  <input
                    type="tel"
                    required
                    placeholder="07459 199723"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-400 font-sans"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs sm:text-sm text-slate-200 font-medium mb-1.5 font-sans">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-400 font-sans"
                />
              </div>

              {/* Preloaded Flavor / Special Requests */}
              <div className="mb-8">
                <label className="block text-xs sm:text-sm text-slate-200 font-medium mb-1.5 font-sans">
                  Flavor Pre-Selection or Special Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday celebration, want extra ice tips, specific tobacco mix..."
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-400 font-sans resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-mauri-gold via-amber-400 to-mauri-gold text-obsidian-950 font-display font-bold text-xs uppercase tracking-widest shadow-neon-gold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-obsidian-950" />
                <span>Confirm VIP Table Reservation (No Deposit)</span>
              </button>
            </form>

            {/* Right Side: Lounge Perks & Immediate Callout */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-card rounded-3xl p-6 border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-mauri-gold/20 flex items-center justify-center text-mauri-gold">
                    <KoruIcon size={22} className="text-mauri-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-bold text-white">The Phantom Promise</h4>
                    <span className="text-[11px] text-slate-400">Pure Hospitality Guarantee</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-300 border-t border-white/5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-mauri-pounamu shrink-0 mt-0.5" />
                    <span>Free personal Ludo board on every table</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-mauri-pounamu shrink-0 mt-0.5" />
                    <span>Continuous natural coconut coal refresh</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-mauri-pounamu shrink-0 mt-0.5" />
                    <span>Strictly alcohol-free, family & friend friendly</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-mauri-pounamu shrink-0 mt-0.5" />
                    <span>150+ premium shisha flavors available</span>
                  </div>
                </div>
              </div>

              {/* Direct Assistance Card */}
              <div className="glass-card rounded-3xl p-6 border border-white/5 text-center">
                <span className="text-[10px] uppercase font-display tracking-widest text-slate-400 font-semibold">
                  Prefer To Speak With Our Host?
                </span>
                <p className="text-xs text-slate-300 mt-2">
                  Call directly for large party bookings or urgent table questions:
                </p>
                <a
                  href="tel:07459199723"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-mauri-gold font-bold text-xs border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  07459 199723
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
