import type { Locale } from '@/i18n/routing';
import type { ProcessedNewsItem, ProcessedGalleryItem } from '@/types';
import websiteContent from '@/content/websiteContent.json';

// Category mappings for news articles
const NEWS_CATEGORY_MAP: Record<string, 'investments' | 'philanthropy' | 'awards' | 'media'> = {
  business_investments: 'investments',
  philanthropy: 'philanthropy',
  recognition_awards: 'awards',
  biography_profiles: 'media',
};

// Category mappings for gallery images
const IMAGE_CATEGORY_MAP: Record<string, string> = {
  professional_portraits: 'professional',
  business_events: 'business',
  diplomatic_meetings: 'diplomatic',
  philanthropic_activities: 'philanthropy',
  historical_personal: 'family',
  assets_properties: 'assets',
};

// Category mappings for videos
const VIDEO_CATEGORY_MAP: Record<string, string> = {
  major_interviews: 'interviews',
  conference_appearances: 'conferences',
  audio_content: 'audio',
};

/**
 * Get all news articles, flattened and processed for display
 */
export function getAllNewsArticles(locale: Locale = 'en'): ProcessedNewsItem[] {
  const articles: ProcessedNewsItem[] = [];
  const newsArticles = websiteContent.news_articles as Record<string, Array<{
    id: string;
    date: string;
    title: string;
    title_ar?: string;
    summary: string;
    summary_ar?: string;
    source: string;
    url?: string;
    image: string | null;
    category: string;
  }>>;

  Object.entries(newsArticles).forEach(([sourceCategory, items]) => {
    const pageCategory = NEWS_CATEGORY_MAP[sourceCategory];
    if (!pageCategory || !Array.isArray(items)) return;

    items.forEach((item, index) => {
      articles.push({
        id: item.id || `${sourceCategory}-${index}`,
        date: item.date,
        title: locale === 'ar' && item.title_ar && item.title_ar !== 'الترجمة قيد الإعداد'
          ? item.title_ar
          : item.title,
        description: locale === 'ar' && item.summary_ar && item.summary_ar !== 'الترجمة قيد الإعداد'
          ? item.summary_ar
          : item.summary,
        source: item.source,
        url: item.url,
        image: item.image,
        category: pageCategory,
        featured: index === 0 && sourceCategory === 'business_investments',
      });
    });
  });

  return articles;
}

/**
 * Get news articles sorted by date (newest first)
 */
export function getNewsSortedByDate(locale: Locale = 'en', limit?: number): ProcessedNewsItem[] {
  const articles = getAllNewsArticles(locale);

  const sorted = articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get category counts for news
 */
export function getNewsCategoryCounts(): Record<string, number> {
  const articles = getAllNewsArticles('en');
  const counts: Record<string, number> = { all: articles.length };

  articles.forEach((article) => {
    counts[article.category] = (counts[article.category] || 0) + 1;
  });

  return counts;
}

/**
 * Get all gallery items (images + videos), flattened and processed
 */
export function getAllGalleryItems(locale: Locale = 'en'): ProcessedGalleryItem[] {
  const items: ProcessedGalleryItem[] = [];

  // Process images
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageGallery = websiteContent.image_gallery as Record<string, any[]>;

  Object.entries(imageGallery).forEach(([sourceCategory, categoryItems]) => {
    // Skip image_archives as it has a different structure
    if (sourceCategory === 'image_archives' || !Array.isArray(categoryItems)) return;

    // Type guard to ensure items have required properties
    const isImageItem = (item: unknown): item is {
      id: string;
      date: string;
      description: string;
      description_ar?: string;
      source: string;
      url: string;
      context: string;
      context_ar?: string;
      image: string;
    } => {
      return typeof item === 'object' && item !== null && 'id' in item && 'date' in item;
    };

    const mappedCategory = IMAGE_CATEGORY_MAP[sourceCategory] || sourceCategory;

    categoryItems.forEach((item, index) => {
      if (!isImageItem(item)) return;

      const description = locale === 'ar' && item.description_ar && item.description_ar !== 'الترجمة قيد الإعداد'
        ? item.description_ar
        : item.description;

      const context = locale === 'ar' && item.context_ar && item.context_ar !== 'الترجمة قيد الإعداد'
        ? item.context_ar
        : item.context;

      items.push({
        id: item.id || `img-${sourceCategory}-${index}`,
        title: context || `Image from ${sourceCategory.replace(/_/g, ' ')}`,
        description: description,
        type: 'image',
        image: item.image || '/images/placeholder.jpg',
        category: mappedCategory,
        year: item.date.substring(0, 4),
        source: item.source,
        url: item.url,
      });
    });
  });

  // Process videos
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videoGallery = websiteContent.video_gallery as Record<string, any[]>;

  Object.entries(videoGallery).forEach(([sourceCategory, categoryItems]) => {
    // Skip video_platforms as it has a different structure
    if (sourceCategory === 'video_platforms' || !Array.isArray(categoryItems)) return;

    // Type guard to ensure items have required properties
    const isVideoItem = (item: unknown): item is {
      id: string;
      date: string;
      title: string;
      title_ar?: string;
      description: string;
      description_ar?: string;
      platform: string;
      url: string;
      duration?: string;
      thumbnail: string;
    } => {
      return typeof item === 'object' && item !== null && 'id' in item && 'date' in item && 'title' in item;
    };

    const mappedCategory = VIDEO_CATEGORY_MAP[sourceCategory] || sourceCategory;

    categoryItems.forEach((item, index) => {
      if (!isVideoItem(item)) return;

      const title = locale === 'ar' && item.title_ar && item.title_ar !== 'الترجمة قيد الإعداد'
        ? item.title_ar
        : item.title;

      const description = locale === 'ar' && item.description_ar && item.description_ar !== 'الترجمة قيد الإعداد'
        ? item.description_ar
        : item.description;

      items.push({
        id: item.id || `vid-${sourceCategory}-${index}`,
        title: title,
        description: description,
        type: 'video',
        image: item.thumbnail || '/images/video-placeholder.jpg',
        category: mappedCategory,
        year: item.date.substring(0, 4),
        source: item.platform,
        url: item.url,
      });
    });
  });

  return items;
}

/**
 * Get gallery items sorted by date (newest first)
 */
export function getGallerySortedByDate(locale: Locale = 'en', limit?: number): ProcessedGalleryItem[] {
  const items = getAllGalleryItems(locale);

  const sorted = items.sort((a, b) =>
    parseInt(b.year) - parseInt(a.year)
  );

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get type counts for gallery (images vs videos)
 */
export function getGalleryTypeCounts(): { images: number; videos: number; all: number } {
  const items = getAllGalleryItems('en');
  return {
    all: items.length,
    images: items.filter((i) => i.type === 'image').length,
    videos: items.filter((i) => i.type === 'video').length,
  };
}

/**
 * Get category counts for gallery
 */
export function getGalleryCategoryCounts(): Record<string, number> {
  const items = getAllGalleryItems('en');
  const counts: Record<string, number> = { all: items.length };

  items.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });

  return counts;
}

/**
 * Get unique gallery categories
 */
export function getGalleryCategories(): string[] {
  const items = getAllGalleryItems('en');
  return [...new Set(items.map((item) => item.category))];
}

/**
 * Get key statistics
 */
export function getKeyStatistics() {
  return websiteContent.key_statistics;
}

/**
 * Get metadata
 */
export function getMetadata() {
  return websiteContent.metadata;
}
