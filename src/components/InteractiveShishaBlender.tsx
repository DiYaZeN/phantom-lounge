import React, { useState } from 'react';
import { SHISHA_FLAVORS } from '../data/phantomData';
import { ShishaFlavor } from '../types';
import { MauriDivider, KoruIcon, MauriCornerFiligree } from './MauriPatterns';
import { Sparkles, Flame, Wind, Droplets, RefreshCw, CheckCircle2, Plus, Check } from 'lucide-react';

interface InteractiveShishaBlenderProps {
  onPreloadMixToBooking: (mixName: string) => void;
}

export const InteractiveShishaBlender: React.FC<InteractiveShishaBlenderProps> = ({
  onPreloadMixToBooking
}) => {
  const [selectedFlavors, setSelectedFlavors] = useState<ShishaFlavor[]>([
    SHISHA_FLAVORS[0], // Frozen Blueberry
    SHISHA_FLAVORS[1], // Love 66
  ]);
  const [activeIceTip, setActiveIceTip] = useState(true);
  const [customMixOrdered, setCustomMixOrdered] = useState(false);

  const toggleFlavor = (flavor: ShishaFlavor) => {
    const isSelected = selectedFlavors.some((f) => f.id === flavor.id);
    if (isSelected) {
      if (selectedFlavors.length > 1) {
        setSelectedFlavors(selectedFlavors.filter((f) => f.id !== flavor.id));
      }
    } else {
      if (selectedFlavors.length < 3) {
        setSelectedFlavors([...selectedFlavors, flavor]);
      } else {
        // Replace the last one
        setSelectedFlavors([selectedFlavors[0], selectedFlavors[1], flavor]);
      }
    }
    setCustomMixOrdered(false);
  };

  const handleRandomize = () => {
    const shuffled = [...SHISHA_FLAVORS].sort(() => 0.5 - Math.random());
    setSelectedFlavors(shuffled.slice(0, 2));
    setCustomMixOrdered(false);
  };

  // Calculations for composite meters
  const avgSweetness = Math.round(
    selectedFlavors.reduce((acc, f) => acc + f.sweetness, 0) / selectedFlavors.length
  );
  const avgCoolness = Math.round(
    selectedFlavors.reduce((acc, f) => acc + f.coolness, 0) / selectedFlavors.length + (activeIceTip ? 1 : 0)
  );
  const avgStrength = Math.round(
    selectedFlavors.reduce((acc, f) => acc + f.strength, 0) / selectedFlavors.length
  );

  const blendName = selectedFlavors.map((f) => f.name.split(' ')[0]).join(' & ') + ' Imperial Aura';

  const handleBookWithMix = () => {
    onPreloadMixToBooking(`${blendName} (${selectedFlavors.map(f => f.name).join(' + ')})${activeIceTip ? ' + Ice Tip' : ''}`);
    setCustomMixOrdered(true);
  };

  return (
    <section id="flavor-alchemy" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-obsidian-900/60">
      <MauriDivider label="VAPOR ALCHEMY LAB" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-mauri-gold text-xs uppercase tracking-[0.3em] font-display font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Shisha Mixer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Craft Your Signature <span className="text-gold-gradient">Mauri Blend</span>
          </h2>
          <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
            Mix up to three artisan flavors, watch the ethereal hookah flask react in real-time, and lock in your bespoke recipe for tonight’s session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Hookah Flask Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl glass-panel p-6 flex flex-col items-center justify-between border border-white/10 shadow-2xl relative overflow-hidden group">
              <MauriCornerFiligree position="top-left" />
              <MauriCornerFiligree position="top-right" />
              <MauriCornerFiligree position="bottom-left" />
              <MauriCornerFiligree position="bottom-right" />

              {/* Dynamic Aura Glow in Flask */}
              <div
                className="absolute inset-0 opacity-40 blur-3xl transition-all duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 65%, ${selectedFlavors[0]?.baseColor || '#e6af2e'} 0%, ${selectedFlavors[1]?.baseColor || '#10b981'} 50%, transparent 80%)`,
                }}
              />

              {/* Top Badge: Custom Mix Name */}
              <div className="w-full text-center z-10">
                <span className="text-xs uppercase font-display tracking-[0.2em] text-mauri-gold/90 font-semibold">Custom Vapor Profile</span>
                <h4 className="text-lg font-display font-bold text-white mt-1 truncate">{blendName}</h4>
              </div>

              {/* Center: Stylized Mauri Shisha SVG with Animated Vapor */}
              <div className="relative w-48 h-64 z-10 flex items-center justify-center">
                <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="hookahStem" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff3b0" />
                      <stop offset="50%" stopColor="#e6af2e" />
                      <stop offset="100%" stopColor="#8c6210" />
                    </linearGradient>

                    <linearGradient id="vaporLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={selectedFlavors[0]?.baseColor || '#e6af2e'} stopOpacity="0.85" />
                      <stop offset="50%" stopColor={selectedFlavors[1]?.baseColor || '#3b82f6'} stopOpacity="0.8" />
                      <stop offset="100%" stopColor={selectedFlavors[2]?.baseColor || selectedFlavors[0]?.baseColor || '#ec4899'} stopOpacity="0.9" />
                    </linearGradient>

                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Bowl & Charcoal Top */}
                  <rect x="85" y="25" width="30" height="20" rx="3" fill="#2d303e" stroke="#e6af2e" strokeWidth="1.5" />
                  {/* Glowing Charcoals */}
                  <circle cx="95" cy="22" r="5" fill="#f97316" filter="url(#glow)" className="animate-pulse" />
                  <circle cx="105" cy="22" r="5" fill="#ef4444" filter="url(#glow)" className="animate-pulse" />

                  {/* Stem Shaft */}
                  <line x1="100" y1="45" x2="100" y2="160" stroke="url(#hookahStem)" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="100" cy="80" r="10" fill="#1b1d2c" stroke="url(#hookahStem)" strokeWidth="2" />
                  <circle cx="100" cy="120" r="12" fill="#1b1d2c" stroke="url(#hookahStem)" strokeWidth="2" />

                  {/* Glass Base Flask */}
                  <path
                    d="M75 160 C50 200, 30 260, 50 280 C65 295, 135 295, 150 280 C170 260, 150 200, 125 160 Z"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                  />

                  {/* Liquid / Vapor in Flask */}
                  <path
                    d="M58 215 C45 250, 42 270, 55 278 C68 288, 132 288, 145 278 C158 270, 155 250, 142 215 Z"
                    fill="url(#vaporLiquid)"
                    filter="url(#glow)"
                    className="transition-all duration-700"
                  />

                  {/* Bubbling Steam Particles */}
                  <circle cx="90" cy="240" r="3" fill="#ffffff" opacity="0.6" className="animate-ping" />
                  <circle cx="110" cy="250" r="4" fill="#ffffff" opacity="0.5" className="animate-bounce" />
                  <circle cx="100" cy="230" r="2.5" fill="#ffffff" opacity="0.7" />

                  {/* Hose Connector & Pipe */}
                  <path
                    d="M100 135 C130 145, 175 170, 160 230"
                    fill="none"
                    stroke="#1e2230"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {activeIceTip && (
                    <rect x="150" y="220" width="18" height="28" rx="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" filter="url(#glow)" />
                  )}
                </svg>
              </div>

              {/* Bottom Blend Stats */}
              <div className="w-full z-10 bg-obsidian-950/90 rounded-2xl p-4 border border-white/10 space-y-2.5 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-300 font-sans font-medium">
                    <Droplets className="w-3.5 h-3.5 text-pink-400" /> Sweetness Profile
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`w-4 h-2 rounded-full transition-all duration-300 ${
                          i <= avgSweetness ? 'bg-gradient-to-r from-pink-500 to-rose-400 shadow-sm shadow-pink-500/50' : 'bg-slate-850 border border-white/5'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-300 font-sans font-medium">
                    <Wind className="w-3.5 h-3.5 text-cyan-400" /> Coolness / Frost
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`w-4 h-2 rounded-full transition-all duration-300 ${
                          i <= avgCoolness ? 'bg-gradient-to-r from-cyan-400 to-sky-300 shadow-sm shadow-cyan-400/50' : 'bg-slate-850 border border-white/5'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-300 font-sans font-medium">
                    <Flame className="w-3.5 h-3.5 text-amber-400" /> Cloud Density
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`w-4 h-2 rounded-full transition-all duration-300 ${
                          i <= avgStrength ? 'bg-gradient-to-r from-amber-400 to-orange-400 shadow-sm shadow-amber-400/50' : 'bg-slate-850 border border-white/5'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ice Tip Toggle */}
            <div className="mt-4 flex items-center justify-between w-full max-w-sm px-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-200 font-sans select-none hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={activeIceTip}
                  onChange={(e) => setActiveIceTip(e.target.checked)}
                  className="rounded text-mauri-gold focus:ring-mauri-gold/40 bg-obsidian-900 border-white/30 w-4 h-4 cursor-pointer accent-amber-500"
                />
                <span>Add Sub-Zero Ice Tip (Included Free)</span>
              </label>
              <button
                onClick={handleRandomize}
                className="text-xs text-mauri-gold hover:text-amber-300 flex items-center gap-1 font-display font-semibold transition-colors"
                title="Randomize Flavor Blend"
              >
                <RefreshCw className="w-3 h-3" /> Surprise Me
              </button>
            </div>
          </div>

          {/* Right Column: Flavor Selection Cards & Order Action */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-semibold text-white flex items-center gap-2">
                  <span>Selected Ingredients</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-mauri-gold/20 text-mauri-gold font-bold">
                    {selectedFlavors.length} / 3 Max
                  </span>
                </h3>
                <span className="text-xs text-slate-300 font-sans">Click any flavor to toggle</span>
              </div>

              {/* Flavor Palette Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {SHISHA_FLAVORS.map((flavor) => {
                  const isSelected = selectedFlavors.some((f) => f.id === flavor.id);
                  return (
                    <div
                      key={flavor.id}
                      onClick={() => toggleFlavor(flavor)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-300 flex items-start gap-3 relative ${
                        isSelected
                          ? 'glass-card border-mauri-gold bg-mauri-gold/15 shadow-glass-gold scale-[1.01]'
                          : 'glass-card border-white/10 hover:border-white/25 opacity-90 hover:opacity-100 hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Color Dot Indicator */}
                      <div
                        className="w-4 h-4 rounded-full mt-0.5 shrink-0 shadow-md ring-2 ring-white/10"
                        style={{ backgroundColor: flavor.baseColor }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-white truncate font-sans">{flavor.name}</h4>
                          {isSelected ? (
                            <Check className="w-4 h-4 text-mauri-gold shrink-0" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 truncate font-sans">
                          {flavor.notes.join(' • ')}
                        </p>
                        <span className="inline-block mt-1.5 text-[10px] uppercase font-display tracking-wider text-slate-300">
                          {flavor.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA: Preload into Reservation */}
            <div className="glass-panel rounded-2xl p-5 border border-mauri-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-widest text-mauri-gold font-display font-semibold">
                  VIP Session Preparation
                </span>
                <h4 className="text-white font-medium text-base mt-0.5 font-display">
                  Ready to experience this recipe at Phantom Lounge?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5 font-sans">
                  Pre-loads your recipe directly into your table reservation with zero delay.
                </p>
              </div>

              <button
                onClick={handleBookWithMix}
                className="w-full sm:w-auto shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-mauri-gold via-amber-400 to-mauri-gold text-obsidian-950 font-display font-bold text-xs uppercase tracking-widest shadow-neon-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {customMixOrdered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-obsidian-950" />
                    <span>Loaded to Booking!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-obsidian-950" />
                    <span>Lock In & Book Table</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
