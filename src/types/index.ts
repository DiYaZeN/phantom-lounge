export interface MenuItem {
  id: string;
  name: string;
  category: 'shisha' | 'hot-drinks' | 'cold-drinks' | 'desserts' | 'bites';
  price: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
  image?: string;
  tags?: string[];
  specs?: {
    sweetness?: number; // 1-5
    coolness?: number;  // 1-5
    intensity?: number; // 1-5
    smokeDensity?: string;
  };
}

export interface ShishaFlavor {
  id: string;
  name: string;
  baseColor: string; // hex for vapor glow
  category: 'Fruity' | 'Mint & Ice' | 'Creamy & Sweet' | 'Spiced & Exotic';
  notes: string[];
  sweetness: number;
  coolness: number;
  strength: number;
}

export interface LoungeLocation {
  id: string;
  city: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  features: string[];
  isFlagship?: boolean;
  mapQuery: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  city: string;
  text: string;
  avatarLetter: string;
  verified: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'lounge' | 'shisha' | 'ludo' | 'drinks' | 'vibe';
  src: string;
  alt: string;
}

export interface VideoShort {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  duration?: string;
}
