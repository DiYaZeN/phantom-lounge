import React, { useState } from 'react';
import { VIDEO_SHORTS } from '../data/phantomData';
import { VideoShort } from '../types';
import { MauriDivider, MauriCornerFiligree } from './MauriPatterns';
import { Play, X, Sparkles, Film } from 'lucide-react';

export const VideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoShort | null>(null);

  return (
    <section id="videos" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-950 overflow-hidden">
      <MauriDivider label="CINEMATIC GLIMPSES" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-display uppercase tracking-[0.3em] text-mauri-gold font-bold">
            Real Stories & Behind The Scenes
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-2">
            The Phantom <span className="text-gold-gradient">Motion Vault</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Watch the craft behind our signature fruit heads, the electric energy of weekend Ludo games, and the chill late-night crowd in action.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEO_SHORTS.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group glass-card rounded-3xl overflow-hidden border border-white/5 cursor-pointer relative flex flex-col justify-between"
            >
              <MauriCornerFiligree position="top-left" />
              <MauriCornerFiligree position="top-right" />

              {/* Video Thumbnail with Play Button */}
              <div className="relative aspect-video overflow-hidden bg-obsidian-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-obsidian-950/40 group-hover:bg-obsidian-950/20 transition-colors" />

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md glass-panel text-[11px] font-mono text-white border border-white/10">
                    {video.duration}
                  </div>
                )}

                {/* Center Play Button with Pulsing Mauri Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-mauri-gold/90 text-obsidian-950 flex items-center justify-center shadow-neon-gold group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-obsidian-950 translate-x-0.5" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-mauri-gold animate-ping opacity-30" />
                  </div>
                </div>
              </div>

              {/* Card Title */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-display font-bold text-white group-hover:text-mauri-gold transition-colors">
                    {video.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 mt-1 inline-flex items-center gap-1">
                    <Film className="w-3.5 h-3.5 text-red-500" /> Watch Experience
                  </span>
                </div>
                <span className="text-xs text-mauri-gold font-display font-semibold">
                  Play →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-obsidian-950">
              <h3 className="text-sm sm:text-base font-display font-bold text-white truncate pr-4">
                {activeVideo.title}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-full glass-pill text-slate-300 hover:text-white"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive Iframe Container */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
