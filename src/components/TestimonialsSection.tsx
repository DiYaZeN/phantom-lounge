import React from 'react';
import { REVIEWS } from '../data/phantomData';
import { MauriDivider, MauriCornerFiligree } from './MauriPatterns';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-950 overflow-hidden">
      <MauriDivider label="PATRON COMMENDATIONS" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-amber-400 text-xs font-semibold mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-white ml-1.5 font-bold">5.0 Out of 5 Stars</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Loved Across <span className="text-gold-gradient">The North</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Over hundreds of verified guest reviews celebrate the smooth shisha, cozy booths, and spirited Ludo battles across Leeds, Manchester & Bradford.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-white/5 flex flex-col justify-between relative group"
            >
              <MauriCornerFiligree position="top-left" />
              <MauriCornerFiligree position="bottom-right" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating */}
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <Quote className="w-5 h-5 text-mauri-gold/30 group-hover:text-mauri-gold/60 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-mauri-gold to-mauri-amber text-obsidian-950 font-display font-bold text-xs flex items-center justify-center shadow-md">
                  {review.avatarLetter}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-display font-bold text-white">
                      {review.author}
                    </h4>
                    {review.verified && (
                      <span title="Verified Customer">
                        <ShieldCheck className="w-3.5 h-3.5 text-mauri-pounamu" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">
                    {review.city} Patron • {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
