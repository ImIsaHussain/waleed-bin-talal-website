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

// ============================================
// Content JSON Types (websiteContent.json)
// ============================================

// News article from JSON
export interface ContentNewsArticle {
  id: string;
  date: string;
  title: string;
  title_ar?: string;
  summary: string;
  summary_ar: string;
  source: string;
  url?: string;
  image: string | null;
  category: string;
}

// Processed news item for page display
export interface ProcessedNewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  url?: string;
  image: string | null;
  category: 'investments' | 'philanthropy' | 'awards' | 'media';
  featured?: boolean;
}

// Image item from JSON
export interface ContentImageItem {
  id: string;
  date: string;
  description: string;
  description_ar: string;
  source: string;
  url: string;
  context: string;
  context_ar?: string;
  type: 'image';
  image: string;
}

// Video item from JSON
export interface ContentVideoItem {
  id: string;
  date: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  platform: string;
  url: string;
  duration?: string;
  type: 'video';
  thumbnail: string;
}

// Processed gallery item for page display
export interface ProcessedGalleryItem {
  id: string;
  title: string;
  description?: string;
  type: 'image' | 'video';
  image: string;
  category: string;
  year: string;
  source?: string;
  url?: string;
}

// Full content JSON structure
export interface WebsiteContent {
  metadata: {
    subject: string;
    born: string;
    birthplace: string;
    titles: string[];
    net_worth_estimate: string;
    last_updated: string;
  };
  news_articles: {
    business_investments: ContentNewsArticle[];
    philanthropy: ContentNewsArticle[];
    recognition_awards: ContentNewsArticle[];
    biography_profiles: ContentNewsArticle[];
  };
  image_gallery: {
    professional_portraits: ContentImageItem[];
    business_events: ContentImageItem[];
    diplomatic_meetings: ContentImageItem[];
    philanthropic_activities: ContentImageItem[];
    historical_personal: ContentImageItem[];
    assets_properties: ContentImageItem[];
    image_archives: Array<{ source: string; count?: string; url: string; description: string }>;
  };
  video_gallery: {
    major_interviews: ContentVideoItem[];
    conference_appearances: ContentVideoItem[];
    audio_content: ContentVideoItem[];
    video_platforms: Array<{ platform: string; description: string; url: string }>;
  };
  key_statistics: {
    business: Record<string, unknown>;
    philanthropy: Record<string, unknown>;
    recognition: Record<string, unknown>;
  };
}
