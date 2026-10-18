import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/phantomData';
import { MenuItem } from '../types';
import { MauriDivider, MauriCornerFiligree } from './MauriPatterns';
import { Search, Flame, Coffee, GlassWater, Cake, Utensils, Sparkles, Plus, Check } from 'lucide-react';

interface MenuSectionProps {
  onPreloadMixToBooking: (itemName: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onPreloadMixToBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemModal, setSelectedItemModal] = useState<MenuItem | null>(null);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'Complete Menu', icon: Sparkles },
    { id: 'shisha', label: 'Kings of Shisha', icon: Flame },
    { id: 'hot-drinks', label: 'Artisan Hot Brews', icon: Coffee },
    { id: 'cold-drinks', label: 'Mocktails & Elixirs', icon: GlassWater },
    { id: 'desserts', label: 'Decadent Desserts', icon: Cake },
    { id: 'bites', label: 'Savory Platters', icon: Utensils },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onPreloadMixToBooking(`${item.name} (${item.price})`);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2500);
  };

  return (
    <section id="menu" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-900/80">
      <MauriDivider label="CURATED GASTRONOMY & SHISHA" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-mauri-gold font-bold">
            100% Halal & Alcohol-Free
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-2">
            The Phantom <span className="text-gold-gradient">Sensory Menu</span>
          </h2>
          <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
            From our hand-picked golden leaf tobacco blends to steaming saffron Karak and dry-ice mocktails, every creation is formulated for elevated comfort.
          </p>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-display uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-mauri-gold to-mauri-amber text-obsidian-950 font-bold shadow-neon-gold'
                      : 'glass-pill text-slate-200 hover:text-white hover:border-white/30'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-mauri-gold/80" />
            <input
              type="text"
              placeholder="Search flavors, drinks, tea..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full glass-input text-xs sm:text-sm text-white placeholder-slate-400 font-sans focus:border-mauri-gold/50"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItemModal(item)}
              className="group glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 cursor-pointer flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1"
            >
              <MauriCornerFiligree position="top-left" />
              <MauriCornerFiligree position="top-right" />

              {/* Image Preview with Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-850">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

                {/* Price Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-panel text-mauri-gold font-display font-bold text-xs border border-mauri-gold/40 shadow-lg">
                  {item.price}
                </div>

                {/* Feature / Bestseller Badge */}
                {item.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-mauri-pounamu/90 text-obsidian-950 font-display font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-mauri-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-2">
                    {item.description}
                  </p>

                  {/* Shisha specs preview if applicable */}
                  {item.specs && (
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-300 font-sans">
                      <span>Sweetness: {item.specs.sweetness}/5</span>
                      <span>•</span>
                      <span>Frost: {item.specs.coolness}/5</span>
                      <span>•</span>
                      <span>{item.specs.smokeDensity}</span>
                    </div>
                  )}

                  {/* Tags */}
                  {item.tags && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/10 font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Pre-Order / Booking action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-display text-slate-300 group-hover:text-white transition-colors">
                    View Details →
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-mauri-gold hover:bg-mauri-gold hover:text-obsidian-950 transition-all flex items-center gap-1.5"
                  >
                    {addedItems[item.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added!
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add to Booking
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 glass-card rounded-3xl border border-white/5">
            <p className="text-slate-400 text-sm font-display">
              No creations found matching "{searchQuery}". Try searching "shisha", "chai", or "nachos".
            </p>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItemModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedItemModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <MauriCornerFiligree position="top-left" />
            <MauriCornerFiligree position="top-right" />

            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedItemModal.image}
                alt={selectedItemModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-4 py-1.5 rounded-full bg-obsidian-950/90 text-mauri-gold font-display font-bold text-sm border border-mauri-gold/40">
                {selectedItemModal.price}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-mauri-gold font-display font-semibold">
                {selectedItemModal.category.toUpperCase()}
              </span>
              {selectedItemModal.badge && (
                <span className="px-2 py-0.5 rounded-full bg-mauri-pounamu/20 text-mauri-pounamu text-[10px] font-bold">
                  {selectedItemModal.badge}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-display font-bold text-white">
              {selectedItemModal.name}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              {selectedItemModal.description}
            </p>

            {selectedItemModal.specs && (
              <div className="mt-4 p-4 rounded-xl bg-obsidian-950/80 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-slate-200 font-sans">
                  <span>Sweetness Level:</span>
                  <span className="font-semibold text-mauri-gold">{selectedItemModal.specs.sweetness} / 5</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-slate-200 font-sans">
                  <span>Coolness Frost:</span>
                  <span className="font-semibold text-cyan-400">{selectedItemModal.specs.coolness} / 5</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-slate-200 font-sans">
                  <span>Smoke Cloud Texture:</span>
                  <span className="font-semibold text-white">{selectedItemModal.specs.smokeDensity}</span>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedItemModal(null)}
                className="px-5 py-2.5 rounded-xl glass-pill text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onPreloadMixToBooking(`${selectedItemModal.name} (${selectedItemModal.price})`);
                  setSelectedItemModal(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-mauri-gold to-mauri-amber text-obsidian-950 font-display font-bold text-xs uppercase tracking-widest shadow-neon-gold hover:scale-105 active:scale-95 transition-all"
              >
                Add To Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
