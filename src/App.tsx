import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveShishaBlender } from './components/InteractiveShishaBlender';
import { LudoExperienceSection } from './components/LudoExperienceSection';
import { MenuSection } from './components/MenuSection';
import { LocationsSection } from './components/LocationsSection';
import { GallerySection } from './components/GallerySection';
import { VideoSection } from './components/VideoSection';
import { ReservationSection } from './components/ReservationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AmbientAudio } from './components/AmbientAudio';
import { BasicAuthModal } from './components/BasicAuthModal';

export function App() {
  const [selectedCity, setSelectedCity] = useState<string>('leeds');
  const [preloadedFlavorMix, setPreloadedFlavorMix] = useState<string>('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('phantom_vip_auth') === 'unlocked';
  });

  const handleOpenBooking = () => {
    const elem = document.getElementById('reservations');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreloadMix = (mixName: string) => {
    setPreloadedFlavorMix(mixName);
    const elem = document.getElementById('reservations');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('phantom_vip_auth', 'unlocked');
  };

  const handleLock = () => {
    setIsUnlocked(false);
    localStorage.removeItem('phantom_vip_auth');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-200 flex flex-col font-sans selection:bg-mauri-gold selection:text-obsidian-950">
      {/* Modern Compact Floating Capsule Dock */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
        />

        {/* Interactive Shisha Flavor Alchemy Lab */}
        <InteractiveShishaBlender onPreloadMixToBooking={handlePreloadMix} />

        {/* Ludo Gaming Experience & 3D Dice Roller */}
        <LudoExperienceSection onOpenBooking={handleOpenBooking} />

        {/* Complete Sensory Gastronomy & Drinks Menu */}
        <MenuSection onPreloadMixToBooking={handlePreloadMix} />

        {/* Three Great Locations: Leeds, Manchester, Bradford */}
        <LocationsSection
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          onOpenBooking={handleOpenBooking}
        />

        {/* Photo Gallery with Lightbox */}
        <GallerySection />

        {/* Video Vault & YouTube Shorts */}
        <VideoSection />

        {/* VIP Table Reservation System */}
        <ReservationSection
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          preloadedFlavorMix={preloadedFlavorMix}
          onClearPreloadedMix={() => setPreloadedFlavorMix('')}
        />

        {/* Patron Reviews */}
        <TestimonialsSection />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Ambient Lounge Sound Controller */}
      <AmbientAudio />

      {/* Netlify Basic Auth & VIP Protection Modal */}
      <BasicAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        isUnlocked={isUnlocked}
        onUnlock={handleUnlock}
        onLock={handleLock}
      />
    </div>
  );
}

export default App;
