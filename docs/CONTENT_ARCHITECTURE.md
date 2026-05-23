# Content Architecture

This document describes where content lives, how translations work, and how to maintain content consistency across the site.

## Content Locations

### UI & Page Text — `src/messages/*.json`

All user-facing UI strings (headings, labels, descriptions, CTAs) live in locale-specific JSON files:

- `src/messages/en.json` — English
- `src/messages/ar.json` — Arabic

These files are consumed by `next-intl` via `useTranslations()`. Each top-level key maps to a page or concern:

| Key | Purpose |
|-----|---------|
| `metadata` | Page title and meta description |
| `navigation` | Header nav items, logo text, menu labels |
| `common` | Shared strings (Read More, Learn More, CTA cursor labels, footer) |
| `home` | Homepage sections (hero, welcome, stats, focus, impact, CTA) |
| `biography` | Biography page (hero, timeline, legacy) |
| `accomplishments` | Accomplishments page (hero, sectors, stats) |
| `achievements` | Achievements page (hero, categories, awards) |
| `family` | Family page (hero, legacy, members, values) |
| `philanthropy` | Philanthropy page (hero, pillars, stats, initiatives) |
| `gallery` | Gallery page (hero, filters, lightbox labels) |
| `news` | News page (hero, filters, article labels) |
| `contact` | Contact page (hero, form fields, info) |

### Data Content — `src/content/websiteContent.json`

Structured data for content-heavy sections (news articles, gallery images, video items). This is a single JSON file with these top-level sections:

| Section | Description |
|---------|-------------|
| `metadata` | Subject biographical metadata (name, birth, titles) |
| `news_articles` | News organized by category: `business_investments`, `philanthropy`, `recognition_awards`, `biography_profiles` |
| `image_gallery` | Photo collections: `professional_portraits`, `business_events`, `diplomatic_meetings`, `philanthropic_activities`, `historical_personal`, `assets_properties`, `image_archives` |
| `video_gallery` | Video content: `major_interviews`, `conference_appearances`, `audio_content`, `video_platforms` |
| `key_statistics` | Numerical data for stats sections |

#### Bilingual Pattern

Each content item in `websiteContent.json` uses a `_ar` suffix for Arabic translations:

```json
{
  "title": "English title",
  "title_ar": "العنوان بالعربية",
  "summary": "English summary",
  "summary_ar": "الملخص بالعربية"
}
```

The `_ar` suffix applies to: `title`, `summary`, `description`, `caption`, and `category`.

## Translation Workflow

### Adding a New Page

1. Add English strings under a new top-level key in `src/messages/en.json`
2. Add corresponding Arabic strings in `src/messages/ar.json`
3. Run `npm run validate:translations` to verify parity

### Updating Existing Translations

1. Edit the relevant key in both `en.json` and `ar.json`
2. Run `npm run validate:translations` to confirm no keys were accidentally added or removed

### Adding Content Data

For news articles, gallery items, or videos in `websiteContent.json`:

1. Add the item with English fields (`title`, `summary`, etc.)
2. Add `_ar` suffixed fields for Arabic translations (`title_ar`, `summary_ar`, etc.)
3. Use the locale-aware content helper in `src/lib/content.ts` to access the correct translation at runtime

## Validation

### Translation Parity Check

```bash
npm run validate:translations
```

This script (`scripts/validate-translations.mjs`) recursively compares all nested key paths between `en.json` and `ar.json`. It reports:

- Keys present in English but missing from Arabic
- Keys present in Arabic but missing from English

Exits with code 1 on mismatches, making it suitable for CI pipelines.

## Key Files Reference

| File | Role |
|------|------|
| `src/messages/en.json` | English UI translations |
| `src/messages/ar.json` | Arabic UI translations |
| `src/content/websiteContent.json` | News, gallery, video data (bilingual) |
| `src/lib/content.ts` | Content loading and locale-aware accessors |
| `src/lib/constants.ts` | Site-wide constants (stats, nav items, contact info) |
| `scripts/validate-translations.mjs` | Translation parity validation |
