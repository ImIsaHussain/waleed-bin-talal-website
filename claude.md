# Prince Alwaleed bin Talal Digital Platform - Development Plan

**Project:** walidbintalal.com
**Version:** 1.0
**Date:** December 22, 2025
**Status:** Planning Phase

---

## A. Project Overview

### Purpose

Build a world-class personal brand website for Prince Alwaleed bin Talal that serves as a **first-person narrative platform** (not a third-party biography). The site will showcase his investments, philanthropy, and legacy while functioning as a strategic communication tool for his ongoing business and humanitarian interests.

### Target Audience

- **Primary:** Business leaders, investors, and financial professionals worldwide
- **Secondary:** Philanthropists, scholars, and policy makers
- **Regional Focus:** MENA region (Arabic-speaking audience - 40%+ expected traffic)
- **Global Reach:** International media, diplomatic community, general public

### Success Criteria

- All 9 sections fully functional and navigable
- Full bilingual support (English/Arabic) with flawless RTL
- Lighthouse scores 90+ on all metrics
- WCAG 2.1 AA accessibility compliance
- Page load < 3 seconds on 4G mobile
- Mobile-first responsive design working across all devices

### Design Philosophy

**"Minimalist Corporate Royalty"** - Combining the content-driven engagement of GatesNotes with the minimalist primary-source authority of the Steve Jobs Archive.

---

## B. Technical Architecture

### Chosen Tech Stack

| Layer               | Technology                       | Rationale                                                                |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| **Framework**       | Next.js 14+ (App Router)         | SSR/SSG for SEO, excellent i18n support, optimized performance           |
| **Language**        | TypeScript (strict mode)         | Type safety, better DX, fewer runtime errors                             |
| **Styling**         | Tailwind CSS                     | Utility-first, built-in RTL support via `rtl:` prefix, rapid development |
| **Animation**       | Framer Motion                    | Smooth, performant animations for timeline and galleries                 |
| **i18n**            | next-intl                        | Seamless Next.js integration, message-based translations                 |
| **Forms**           | React Hook Form + Zod            | Type-safe validation, excellent performance                              |
| **Content**         | MDX (static) + JSON (structured) | Version-controlled content, easy updates                                 |
| **Icons**           | Lucide React                     | Lightweight, consistent icon set                                         |
| **Deployment**      | Vercel                           | Native Next.js support, global CDN, automatic SSL                        |
| **Analytics**       | Vercel Analytics + Plausible     | Privacy-friendly, GDPR compliant                                         |
| **Version Control** | GitHub                           | Industry standard, CI/CD integration                                     |

### Why Next.js 14?

1. **App Router** with React Server Components reduces client-side JS
2. **Built-in i18n routing** via `[locale]` dynamic segments
3. **Automatic image optimization** with `next/image`
4. **Incremental Static Regeneration** for news/RSS content
5. **Edge Runtime** support for faster MENA region delivery
6. **Native font optimization** with `next/font`

### RTL Strategy

- Tailwind CSS `rtl:` variant for directional styles
- CSS logical properties (`margin-inline-start` vs `margin-left`)
- `dir="rtl"` on `<html>` element for Arabic locale
- Mirrored layouts automatically handled by logical properties
- Arabic-optimized typography (Noto Sans Arabic for body text)

---

## C. Visual Identity

### Color Palette

| Name            | Hex       | Usage                             |
| --------------- | --------- | --------------------------------- |
| **Regal Gold**  | `#C5A059` | Primary accent, CTAs, highlights  |
| **Deep Navy**   | `#002366` | Secondary accent, headers, footer |
| **Royal White** | `#F9F9F9` | Section backgrounds               |
| **Off White**   | `#FFFFFF` | Primary background                |
| **Charcoal**    | `#121212` | Body text                         |

### Typography

| Type        | English                  | Arabic                  |
| ----------- | ------------------------ | ----------------------- |
| **Headers** | Playfair Display (serif) | Noto Naskh Arabic       |
| **Body**    | Inter (sans-serif)       | Noto Sans Arabic        |
| **Accent**  | Inter Medium             | Noto Sans Arabic Medium |

### Design Principles

1. **Generous white space** - Editorial clarity
2. **High-contrast professional photography** - Cinematic hero images
3. **Artifact cards** - Digital scans of documents with soft shadows
4. **Subtle gold accents** - Royal heritage indicators
5. **Sticky navigation** - Always accessible, thin geometric typography

---

## D. Development Phases

### Phase 1: Foundation & Setup (Days 1-2)

- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up RTL support configuration
- [ ] Configure next-intl for i18n
- [ ] Create base layout structure
- [ ] Set up ESLint, Prettier, and code quality tools
- [ ] Initialize Git repository with proper .gitignore
- [ ] Create GitHub Actions CI workflow

### Phase 2: Design System & Core Components (Days 3-5)

- [ ] Implement color palette in Tailwind config
- [ ] Set up typography system with next/font
- [ ] Build base UI components:
  - Button (primary, secondary, outline, ghost variants)
  - Container (responsive max-widths)
  - Card (with hover states)
  - Section (consistent padding/margins)
  - Badge/Tag components
- [ ] Build layout components:
  - Header (sticky, language toggle, mobile menu)
  - Footer (3-column layout)
  - Navigation (desktop + mobile)
- [ ] Create translation files (en.json, ar.json)
- [ ] Test all components in both LTR and RTL

### Phase 3: Page Development (Days 6-12)

Build all 9 core sections:

1. **Home** - Hero section, stats, featured areas, CTA
2. **Biography** - Timeline of life stages, "In My Own Words" quotes
3. **Accomplishments** - KHC portfolio, sector breakdown, investment map
4. **Achievements** - Awards grid, recognition timeline
5. **Family** - Royal lineage tree, notable family members
6. **Philanthropy** - Four pillars, impact stats, partner logos
7. **Gallery** - Photo grid, category filters, lightbox
8. **News & Media** - RSS feed integration, category filters
9. **Contact & Guestbook** - Contact form, digital guestbook

### Phase 4: Content Integration (Days 13-15)

- [ ] Structure all content in JSON/MDX format
- [ ] Create English content from provided documents
- [ ] Mark Arabic translations (placeholders or real)
- [ ] Optimize and prepare images
- [ ] Set up image placeholders where needed
- [ ] Configure SEO metadata for all pages

### Phase 5: Advanced Features (Days 16-20)

- [ ] Interactive Timeline component (Framer Motion)
- [ ] RSS feed aggregation (KHC + Alwaleed Philanthropies)
- [ ] Positive news filtering logic
- [ ] Photo Gallery with lightbox
- [ ] Guestbook with form validation
- [ ] Newsletter signup component
- [ ] Search functionality (optional)

### Phase 6: Performance & Accessibility (Days 21-23)

- [ ] Image optimization (WebP, lazy loading)
- [ ] Core Web Vitals optimization
- [ ] WCAG 2.1 AA audit and fixes
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Color contrast verification
- [ ] Focus indicators

### Phase 7: Testing & QA (Days 24-26)

- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] RTL layout verification on all pages
- [ ] Lighthouse audit (target: 90+ all metrics)
- [ ] Form validation testing
- [ ] Navigation flow testing
- [ ] Content review

### Phase 8: Deployment & Documentation (Days 27-30)

- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Set up Vercel Analytics
- [ ] Create README.md
- [ ] Document content update process
- [ ] Create deployment guide
- [ ] Final review and sign-off

---

## E. File Structure

```
waleed-bin-talal-website/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── gallery/
│   │   ├── family/
│   │   └── logos/
│   ├── videos/
│   └── documents/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx                 # Home
│   │   │   ├── biography/
│   │   │   │   └── page.tsx
│   │   │   ├── accomplishments/
│   │   │   │   └── page.tsx
│   │   │   ├── achievements/
│   │   │   │   └── page.tsx
│   │   │   ├── family/
│   │   │   │   └── page.tsx
│   │   │   ├── philanthropy/
│   │   │   │   └── page.tsx
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── news/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   ├── layout.tsx                   # Root layout
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── FeaturedAreas.tsx
│   │   │   └── CTA.tsx
│   │   └── features/
│   │       ├── Timeline.tsx
│   │       ├── Gallery.tsx
│   │       ├── NewsFeed.tsx
│   │       ├── Guestbook.tsx
│   │       └── NewsletterSignup.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── api/
│   │       ├── news.ts
│   │       └── guestbook.ts
│   ├── content/
│   │   ├── biography.json
│   │   ├── accomplishments.json
│   │   ├── achievements.json
│   │   ├── family.json
│   │   ├── philanthropy.json
│   │   └── timeline.json
│   ├── messages/
│   │   ├── en.json
│   │   └── ar.json
│   └── types/
│       └── index.ts
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
├── claude.md                            # This file
└── README.md
```

---

## F. Key Technical Decisions

### 1. Bilingual Content Strategy

- **URL Structure:** `/en/biography` and `/ar/biography`
- **Default Locale:** English (with redirect from `/` to `/en`)
- **Translation Files:** Structured JSON with nested keys for sections
- **Content:** Separate content files for structured data (timeline, accomplishments)
- **Approach:** Full parallel translation, not excerpted

### 2. Interactive Timeline Implementation

- **Library:** Custom implementation with Framer Motion
- **Layout:** Vertical timeline with alternating left/right cards
- **Features:**
  - Filter by category (Business, Philanthropy, Personal, Family)
  - Scroll-triggered animations
  - Click to expand details
  - Year markers with gold accent circles
- **Data Source:** `timeline.json` with bilingual entries

### 3. RSS News Feed Strategy

- **Sources:**
  - Kingdom Holding Company: `kingdom.com.sa/media/press-releases-news`
  - Alwaleed Philanthropies: `alwaleedphilanthropies.org/en/news`
  - Giving Pledge updates
- **Implementation:**
  - Server-side fetch with ISR (revalidate: 3600)
  - Positive keyword filtering
  - Category tagging
  - Cached responses
- **Fallback:** Pre-populated JSON for initial content

### 4. Guestbook Implementation

- **Form Fields:** Name, Email, Category, Message
- **Categories:**
  - Philanthropic Impact
  - Business Partnership
  - Inspiration
  - General Message
- **Moderation:** All submissions require approval before display
- **Storage:** JSON file initially, upgradeable to database
- **Spam Prevention:** Honeypot field + rate limiting

### 5. RTL Layout Approach

- Use CSS logical properties throughout
- Tailwind `rtl:` variant for direction-specific styles
- Test every component in both directions
- Arabic font stack with proper fallbacks
- Icon mirroring where semantically appropriate

### 6. Placeholder vs. Real Content

- **Real Content:** All text from provided documents
- **Placeholder Images:** Professional stock images tagged for replacement
- **Arabic Translation:** English content with Arabic placeholders marked `[AR: ...]`
- **News Feed:** Initial mock data, ready for RSS integration

---

## G. Development Standards

### Code Quality

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Prettier for consistent formatting
- Husky pre-commit hooks for quality gates

### Component Guidelines

- Functional components with TypeScript interfaces
- Props destructuring with defaults
- forwardRef for interactive elements
- Composition over inheritance
- Co-located styles (Tailwind classes in component)

### Naming Conventions

- **Components:** PascalCase (`Button.tsx`, `HeroSection.tsx`)
- **Functions:** camelCase (`formatDate`, `fetchNews`)
- **Constants:** SCREAMING_SNAKE_CASE (`API_ENDPOINTS`, `COLORS`)
- **Files:** kebab-case for routes, PascalCase for components

### Git Workflow

- Conventional Commits format
- Feature branches from `main`
- PR reviews before merge
- Squash merge to keep history clean

### Commit Message Examples

```
feat: add interactive timeline component
fix: resolve RTL layout issue in header
style: improve mobile responsiveness on gallery
docs: update README with deployment steps
chore: configure ESLint and Prettier
```

---

## H. Risk Mitigation

| Risk                         | Likelihood | Impact | Mitigation                                       |
| ---------------------------- | ---------- | ------ | ------------------------------------------------ |
| RTL layout complexity        | High       | High   | Test early and often, use CSS logical properties |
| Content volume               | Medium     | Medium | Implement pagination, lazy loading               |
| Bilingual content management | High       | High   | Clear content structure from day 1               |
| Mobile performance in MENA   | Medium     | High   | Mobile-first development, edge CDN               |
| Timeline feature complexity  | Medium     | Medium | Use proven animation patterns                    |
| RSS feed reliability         | Medium     | Low    | Fallback to cached/static content                |
| Image optimization           | Low        | Medium | Next.js Image component handles this             |

---

## I. 9 Core Sections Summary

| Section             | Primary Purpose                     | Key Features                                                    |
| ------------------- | ----------------------------------- | --------------------------------------------------------------- |
| **Home**            | Visionary gateway, first impression | Hero video, stats, featured areas, CTA                          |
| **Biography**       | Life narrative in first person      | Timeline, "In My Own Words" quotes, formative moments           |
| **Accomplishments** | KHC portfolio showcase              | Sector breakdown, investment map, "Behind the Decision" stories |
| **Achievements**    | Recognition & responsibility        | Awards grid, milestones, acceptance speech excerpts             |
| **Family**          | Heritage & values                   | Royal lineage, Solh legacy, next generation spotlight           |
| **Philanthropy**    | Impact demonstration                | Four pillars, impact stats, partner testimonials, Giving Pledge |
| **Gallery**         | Visual journey                      | Photo grid, video gallery, interactive timeline, artifact cards |
| **News & Media**    | Real-time relevance                 | RSS feed, category filters, media appearances                   |
| **Contact**         | Engagement & collaboration          | Guestbook, contact paths, Alpha International info              |

---

## J. External Resources & References

### Official Sources for Content

- Kingdom Holding Company: https://kingdom.com.sa
- Alwaleed Philanthropies: https://alwaleedphilanthropies.org
- Giving Pledge Profile: https://givingpledge.org/pledger/hrh-prince-alwaleed-bin-talal

### Design Inspiration

- GatesNotes: https://gatesnotes.com
- Steve Jobs Archive: https://stevejobsarchive.com
- Richard Branson: https://richardbranson.com

### Sponsor Contact (Alpha International)

- Address: Prince Turki Bin Abdulaziz AlAwwal Rd, King Saud University District, Riyadh
- Phone: (+966) 11-263-4444
- Email: Info@twaik.com / Info@ais-sa.com

---

## K. Next Steps

1. **Review this plan** - Ensure alignment with project goals
2. **Approve tech stack** - Confirm Next.js + Tailwind approach
3. **Begin Phase 1** - Initialize project and foundation
4. **Iterative development** - Build, test, get feedback, iterate

---

**Ready for approval to proceed with Phase 1: Foundation & Setup**
