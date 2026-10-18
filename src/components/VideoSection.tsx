import React, { useState } from 'react';
import { VIDEO_SHORTS } from '../data/phantomData';
import { VideoShort } from '../types';
import { MauriDivider, MauriCornerFiligree } from './MauriPatterns';
import { Play, X, Sparkles, Film, Eye, Flame, Compass } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoShort>(VIDEO_SHORTS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const handleSelectVideo = (video: VideoShort) => {
    setSelectedVideo(video);
    setIsPlayingInline(true);
  };

  return (
    <section id="videos" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-950 overflow-hidden">
      <MauriDivider label="CINEMATIC MOTION VAULT" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-amber-500/30 text-mauri-gold text-xs font-display tracking-widest uppercase font-semibold mb-3">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Behind The Smoke & Velvet</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            The Phantom <span className="text-gold-gradient">Motion Vault</span>
          </h2>
          <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
            Witness the artisan craft behind our fresh fruit shisha bowls, the electric drama of high-stakes weekend Ludo tables, and the late-night social energy across our venues.
          </p>
        </div>

        {/* Featured Theater Spotlight Player */}
        <div className="relative mb-14 max-w-5xl mx-auto">
          {/* Ambient Glow Backdrop */}
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-purple-500/15 rounded-3xl blur-2xl pointer-events-none opacity-60" />

          <div className="relative rounded-3xl glass-panel p-3 sm:p-5 border border-white/15 shadow-2xl overflow-hidden group">
            <MauriCornerFiligree position="top-left" />
            <MauriCornerFiligree position="top-right" />
            <MauriCornerFiligree position="bottom-left" />
            <MauriCornerFiligree position="bottom-right" />

            {/* Viewport Box */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-obsidian-950 shadow-inner">
              {isPlayingInline ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer group/player"
                  onClick={() => setIsPlayingInline(true)}
                >
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/player:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

                  {/* Top Bar with Live Indicator */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md text-[11px] font-display uppercase tracking-widest text-mauri-gold border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      Featured Reel
                    </span>
                    {selectedVideo.duration && (
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-slate-200 border border-white/10">
                        {selectedVideo.duration}
                      </span>
                    )}
                  </div>

                  {/* Center Play Beacon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-mauri-gold via-amber-400 to-mauri-gold text-obsidian-950 flex items-center justify-center shadow-neon-gold group-hover/player:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-obsidian-950 translate-x-1" />
                      </div>
                      <div className="absolute inset-0 rounded-full border-2 border-mauri-gold animate-ping opacity-30" />
                    </div>
                  </div>

                  {/* Bottom Title Bar Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-mauri-gold font-display font-semibold">
                        Now Previewing
                      </span>
                      <h3 className="text-lg sm:text-2xl font-display font-bold text-white drop-shadow-md">
                        {selectedVideo.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-xs font-display uppercase tracking-wider text-white border border-white/10 group-hover/player:bg-mauri-gold group-hover/player:text-obsidian-950 transition-colors shrink-0">
                      <Play className="w-3.5 h-3.5" /> Start Playback
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Reel Playlist Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-mauri-gold" />
              <span>Explore Motion Archive ({VIDEO_SHORTS.length} Chapters)</span>
            </h4>
            <span className="text-xs text-slate-300 font-sans">Click to stream above</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VIDEO_SHORTS.map((video) => {
              const isSelected = selectedVideo.id === video.id;
              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`group rounded-2xl overflow-hidden p-3 transition-all duration-300 cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'glass-card border-mauri-gold bg-mauri-gold/15 shadow-glass-gold ring-1 ring-mauri-gold/50'
                      : 'glass-card border-white/10 hover:border-white/25 hover:bg-white/5'
                  }`}
                >
                  {/* Micro Thumbnail */}
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-obsidian-900 shrink-0 border border-white/10">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                        isSelected ? 'bg-mauri-gold text-obsidian-950 scale-110 shadow-neon-gold' : 'bg-black/70 text-white group-hover:scale-110'
                      }`}>
                        <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {video.duration && (
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-200">
                        {video.duration}
                      </span>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`text-[10px] uppercase font-display font-bold tracking-wider ${
                        isSelected ? 'text-mauri-gold' : 'text-slate-400 group-hover:text-mauri-gold transition-colors'
                      }`}>
                        {isSelected ? '● Playing' : 'Story Short'}
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-display font-semibold text-white line-clamp-2 group-hover:text-amber-200 transition-colors leading-snug">
                      {video.title}
                    </h5>
                    <span className="mt-1 text-[11px] text-slate-400 font-sans block">
                      Watch in 4K
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
