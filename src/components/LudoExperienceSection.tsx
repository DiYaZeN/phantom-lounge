import React, { useState } from 'react';
import { MauriDivider, MauriCornerFiligree } from './MauriPatterns';
import { Dices, Trophy, Users, ShieldCheck, Sparkles, Gift } from 'lucide-react';

interface LudoExperienceSectionProps {
  onOpenBooking: () => void;
  onClaimPerk?: (perk: string) => void;
}

export const LudoExperienceSection: React.FC<LudoExperienceSectionProps> = ({
  onOpenBooking,
  onClaimPerk,
}) => {
  const [diceValue, setDiceValue] = useState<number>(6);
  const [isRolling, setIsRolling] = useState(false);
  const [perkClaimed, setPerkClaimed] = useState(false);
  const [luckyReward, setLuckyReward] = useState<string | null>(
    'Rolled a 6! Perk unlocked: Complimentary Sub-Zero Ice Tip on your next visit!'
  );

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setPerkClaimed(false);
    let count = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalVal);
        setIsRolling(false);

        // Assign fun perk based on roll
        switch (finalVal) {
          case 6:
            setLuckyReward('★ Rolled a 6! VIP Reward: Complimentary Sub-Zero Ice Tip Upgrade!');
            break;
          case 5:
            setLuckyReward('★ Rolled a 5! Sweet Perk: Free Belgian Gold Marshmallows on any Hot Drink!');
            break;
          case 4:
            setLuckyReward('★ Rolled a 4! Table Perk: Reserved Priority Ludo Tournament Corner Booth!');
            break;
          case 3:
            setLuckyReward('★ Rolled a 3! Chai Perk: Free Saffron Refill on your Royal Karak Chai!');
            break;
          case 2:
            setLuckyReward('★ Rolled a 2! Refresh Perk: 10% off any Handcrafted Signature Mocktail!');
            break;
          default:
            setLuckyReward('★ Rolled a 1! Game Starter: Claim your complimentary table Ludo board!');
            break;
        }
      }
    }, 80);
  };

  const handleApplyReward = () => {
    if (luckyReward && onClaimPerk) {
      onClaimPerk(luckyReward);
      setPerkClaimed(true);
    } else {
      onOpenBooking();
    }
  };

  return (
    <section id="ludo-lounge" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-950 overflow-hidden">
      <MauriDivider label="ANCIENT ROOTS • MODERN NIGHTLIFE" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Story & Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-emerald-500/40 text-emerald-400 text-xs font-display tracking-widest uppercase font-semibold">
              <Dices className="w-4 h-4" />
              <span>Complimentary At Every Booth</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              The Famous <span className="text-jade-gradient">Phantom Ludo</span> Sanctuary
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
              Nothing brings people together like the thrill of rolling a six. At Phantom Lounge, we designed every private velvet booth with its own custom-built, luxury wooden Ludo gaming board.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-card rounded-2xl p-4 border border-white/10 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-mauri-pounamu/20 flex items-center justify-center text-mauri-pounamu mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm sm:text-base">Social Connection</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans leading-relaxed">
                  Step away from phone screens and engage in electric, high-stakes friendly competition.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-4 border border-white/10 hover:border-mauri-gold/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-mauri-gold/20 flex items-center justify-center text-mauri-gold mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm sm:text-base">100% Free Forever</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans leading-relaxed">
                  Zero hire fees or timers. The board is yours for the entire evening while you lounge.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-4 border border-white/10 hover:border-amber-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm sm:text-base">Monthly Tournaments</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans leading-relaxed">
                  Participate in our friendly weekend city showdowns across Leeds, Manchester and Bradford.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-4 border border-white/10 hover:border-purple-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-white font-display font-semibold text-sm sm:text-base">Pure Chill Vibes</h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans leading-relaxed">
                  Pair your game moves with hot saffron Karak chai, waffle platters, and smooth shisha.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-display font-bold text-xs uppercase tracking-widest shadow-neon-jade hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Dices className="w-4 h-4" />
                <span>Reserve A Ludo Table Tonight</span>
              </button>
            </div>
          </div>

          {/* Right Side: Interactive Ludo Dice Roller Experience */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-3xl glass-panel p-8 border border-white/10 shadow-2xl flex flex-col items-center text-center overflow-hidden">
              <MauriCornerFiligree position="top-left" />
              <MauriCornerFiligree position="top-right" />
              <MauriCornerFiligree position="bottom-left" />
              <MauriCornerFiligree position="bottom-right" />

              {/* Ambient Green Aura */}
              <div className="absolute inset-0 bg-gradient-to-b from-mauri-pounamu/10 via-transparent to-mauri-gold/10 pointer-events-none" />

              <span className="text-[11px] font-display uppercase tracking-[0.25em] text-slate-400 mb-2">
                Interactive Table Mini-Game
              </span>
              <h3 className="text-xl font-display font-bold text-white mb-6">
                Roll For Your Tonight Perk
              </h3>

              {/* 3D Dice Graphic */}
              <div
                onClick={rollDice}
                className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-slate-900 via-obsidian-850 to-obsidian-950 border-2 border-mauri-gold/60 shadow-2xl shadow-mauri-gold/30 flex items-center justify-center cursor-pointer select-none transition-transform duration-300 group ${
                  isRolling ? 'animate-spin scale-90' : 'hover:scale-105 hover:rotate-3'
                }`}
                title="Click to roll the Ludo dice!"
              >
                <div className="absolute inset-1 rounded-2xl border border-white/10" />

                {/* Render Pips according to value */}
                <div className="grid grid-cols-3 grid-rows-3 gap-2 w-16 h-16 sm:w-20 sm:h-20 p-1 pointer-events-none">
                  {diceValue === 1 && (
                    <div className="col-start-2 row-start-2 w-4 h-4 rounded-full bg-mauri-gold mx-auto my-auto shadow-neon-gold" />
                  )}
                  {diceValue === 2 && (
                    <>
                      <div className="col-start-1 row-start-1 w-3.5 h-3.5 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-3 w-3.5 h-3.5 rounded-full bg-mauri-gold mx-auto my-auto" />
                    </>
                  )}
                  {diceValue === 3 && (
                    <>
                      <div className="col-start-1 row-start-1 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-2 row-start-2 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-3 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                    </>
                  )}
                  {diceValue === 4 && (
                    <>
                      <div className="col-start-1 row-start-1 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-1 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-1 row-start-3 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-3 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                    </>
                  )}
                  {diceValue === 5 && (
                    <>
                      <div className="col-start-1 row-start-1 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-1 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-2 row-start-2 w-3.5 h-3.5 rounded-full bg-mauri-pounamu mx-auto my-auto shadow-neon-jade" />
                      <div className="col-start-1 row-start-3 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-3 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                    </>
                  )}
                  {diceValue === 6 && (
                    <>
                      <div className="col-start-1 row-start-1 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-1 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-1 row-start-2 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-2 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-1 row-start-3 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                      <div className="col-start-3 row-start-3 w-3 h-3 rounded-full bg-mauri-gold mx-auto my-auto" />
                    </>
                  )}
                </div>
              </div>

              {/* Click to Roll Prompt */}
              <button
                onClick={rollDice}
                disabled={isRolling}
                className="mt-6 px-5 py-2 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-mauri-gold hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <Dices className="w-3.5 h-3.5 text-mauri-gold" />
                <span>{isRolling ? 'Rolling...' : 'Click Dice to Roll Again'}</span>
              </button>

              {/* Reward Box */}
              {luckyReward && (
                <div className="mt-6 w-full p-4 rounded-2xl bg-obsidian-950/95 border border-emerald-500/40 text-left shadow-lg relative overflow-hidden group">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 border border-emerald-500/30">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase font-display font-bold tracking-widest text-emerald-400">
                          Exclusive Ludo Perk
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">Show Waiter or Pre-load</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium mt-1 leading-snug font-sans">
                        {luckyReward}
                      </p>

                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-400 font-sans">
                          Valid for tonight's session
                        </span>
                        <button
                          onClick={handleApplyReward}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-obsidian-950 font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border border-emerald-500/40"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{perkClaimed ? 'Perk Applied! ✓' : 'Add to Reservation'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
