// Navigation item type
export interface NavigationItem {
  key: string;
  href: string;
}

// Timeline event type
export interface TimelineEvent {
  id: string;
  year: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  category: 'business' | 'philanthropy' | 'personal' | 'family';
  image?: string;
}

// News item type
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: 'investments' | 'philanthropy' | 'media' | 'awards';
  image?: string;
}

// Guestbook entry type
export interface GuestbookEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  category: 'impact' | 'business' | 'inspiration' | 'general';
  createdAt: string;
  approved: boolean;
}

// Gallery item type
export interface GalleryItem {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  image: string;
  category: 'business' | 'philanthropy' | 'family' | 'diplomatic';
  year?: string;
}

// Achievement type
export interface Achievement {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  year: string;
  category: 'influence' | 'humanitarian' | 'business';
}

// Sector investment type
export interface SectorInvestment {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  companies: string[];
  icon: string;
}

// Family member type
export interface FamilyMember {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  role: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  image?: string;
}

// Philanthropy pillar type
export interface PhilanthropyPillar {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  icon: string;
}
