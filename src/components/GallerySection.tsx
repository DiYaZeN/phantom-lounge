import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/phantomData';
import { GalleryPhoto } from '../types';
import { MauriDivider, MauriCornerFiligree } from './MauriPatterns';
import { Eye, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'lounge', label: 'Velvet Lounge' },
    { id: 'shisha', label: 'Artisan Shisha' },
    { id: 'ludo', label: 'Ludo Gaming' },
    { id: 'drinks', label: 'Elixirs & Mocktails' },
  ];

  const filteredPhotos = GALLERY_ITEMS.filter(
    (photo) => filter === 'all' || photo.category === filter
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(activePhotoIndex > 0 ? activePhotoIndex - 1 : filteredPhotos.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(activePhotoIndex < filteredPhotos.length - 1 ? activePhotoIndex + 1 : 0);
    }
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-900/40">
      <MauriDivider label="VISUAL SPLENDOR" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-mauri-gold font-bold">
            Immersive Atmosphere
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-2">
            The Ambiance <span className="text-gold-gradient">Gallery</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Glimpse into the warmth, moody neon architecture, and captivating social atmosphere that define every evening at Phantom Lounge.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setFilter(tab.id);
                setActivePhotoIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-display uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-mauri-gold text-obsidian-950 font-bold shadow-neon-gold'
                  : 'glass-pill text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative rounded-3xl overflow-hidden glass-card cursor-pointer border border-white/5 aspect-[4/3] sm:aspect-square flex flex-col justify-end p-5"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Hover Glow Ring */}
              <div className="absolute inset-0 border border-mauri-gold/0 group-hover:border-mauri-gold/40 rounded-3xl transition-colors duration-300 pointer-events-none" />

              {/* Overlay Content */}
              <div className="relative z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-display uppercase tracking-widest text-mauri-gold font-semibold">
                  {photo.category}
                </span>
                <h4 className="text-sm font-display font-bold text-white mt-0.5">
                  {photo.title}
                </h4>
              </div>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <Eye className="w-4 h-4 text-mauri-gold" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full glass-panel text-slate-300 hover:text-white hover:border-mauri-gold transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full glass-panel text-white hover:text-mauri-gold hover:border-mauri-gold transition-colors z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full glass-panel text-white hover:text-mauri-gold hover:border-mauri-gold transition-colors z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden flex items-center justify-center bg-obsidian-950">
              <img
                src={filteredPhotos[activePhotoIndex].src}
                alt={filteredPhotos[activePhotoIndex].alt}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-obsidian-950/90 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-display tracking-widest text-mauri-gold">
                  {filteredPhotos[activePhotoIndex].category}
                </span>
                <h3 className="text-lg font-display font-bold text-white">
                  {filteredPhotos[activePhotoIndex].title}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-sans">
                {activePhotoIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
