import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRefs = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gainNode: GainNode; noiseGain: GainNode } | null>(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      startAmbientSound();
      setIsPlaying(true);
    } else {
      stopAmbientSound();
      setIsPlaying(false);
    }
  };

  const startAmbientSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft subtle lounge level
      masterGain.connect(ctx.destination);

      // Low soothing ambient drone (warm F# minor lounge chord)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220.00, ctx.currentTime); // A3

      // Warm low-pass filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.4, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(masterGain);

      // Gentle vinyl lounge warmth (pink noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.02;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(800, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.015, ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      osc1.start();
      osc2.start();
      whiteNoise.start();

      oscillatorRefs.current = { osc1, osc2, gainNode: masterGain, noiseGain };
    } catch {
      // Audio not permitted yet
    }
  };

  const stopAmbientSound = () => {
    if (audioCtxRef.current && oscillatorRefs.current) {
      try {
        const { gainNode } = oscillatorRefs.current;
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 900);
      } catch {
        // Closed
      }
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full transition-all duration-300 ${
        isPlaying
          ? 'glass-panel border-mauri-gold text-mauri-gold shadow-neon-gold'
          : 'glass-panel border-white/10 text-slate-400 hover:text-white hover:border-white/30'
      }`}
      aria-label="Toggle Lounge Audio Atmosphere"
      title={isPlaying ? "Mute Lounge Atmosphere" : "Experience Lounge Soundscape"}
    >
      <div className="relative">
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-mauri-gold animate-bounce" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-mauri-pounamu animate-ping" />
        )}
      </div>
      <span className="text-xs font-medium tracking-wider uppercase font-display hidden sm:inline">
        {isPlaying ? 'Lounge Audio: On' : 'Lounge Vibes'}
      </span>
      {isPlaying && (
        <div className="flex items-center gap-0.5 h-3">
          <span className="w-0.5 bg-mauri-gold rounded-full h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
          <span className="w-0.5 bg-mauri-gold rounded-full h-2 animate-[pulse_0.8s_ease-in-out_infinite]" />
          <span className="w-0.5 bg-mauri-gold rounded-full h-3.5 animate-[pulse_0.5s_ease-in-out_infinite]" />
        </div>
      )}
    </button>
  );
};
