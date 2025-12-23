# Prince Alwaleed bin Talal - Official Website

Official personal brand website for HRH Prince Alwaleed bin Talal, showcasing investments, philanthropy, and legacy. Built with a Saudi Royal aesthetic featuring Arabic-inspired geometric patterns and elegant animations.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP (ScrollTrigger) + Framer Motion
- **i18n**: next-intl (English/Arabic with RTL support)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Smooth Scroll**: Lenis

## Key Features

### Design & Aesthetics
- **Saudi Royal Green** color palette with regal gold accents
- **Arabic-inspired geometric patterns** - EightPointStar decorations with varied rotations for visual interest
- **ArabesqueCorner** decorative elements throughout
- **Custom cursor** with magnetic interactions
- **Responsive design** with mobile-first approach (header switches to mobile menu at 1200px)

### Animations
- **GSAP ScrollTrigger** for scroll-based animations
- **Stacking cards** feature on Accomplishments page - full-height cards that stack with offset as you scroll
- **Parallax effects** on decorative elements
- **Text reveal animations** with character-by-character effects
- **Animated counters** for statistics
- **Smooth page transitions**

### Sections
- **Hero sections** with immersive full-screen layouts and floating star decorations
- **Sectors of Excellence** - Interactive stacking cards showcasing investment sectors (desktop) / scrollable cards (mobile)
- **Timeline layouts** for biography with alternating card designs
- **Recognition categories** with award listings
- **Stats sections** with animated counters

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `npm run dev`        | Start development server      |
| `npm run build`      | Build for production          |
| `npm run start`      | Start production server       |
| `npm run lint`       | Run ESLint                    |
| `npm run lint:fix`   | Fix ESLint issues             |
| `npm run type-check` | Run TypeScript compiler check |

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Locale-based routing
│   │   ├── page.tsx           # Home
│   │   ├── biography/         # Biography section
│   │   ├── accomplishments/   # KHC Portfolio
│   │   ├── achievements/      # Awards & Recognition
│   │   ├── family/            # Royal Lineage
│   │   ├── philanthropy/      # Alwaleed Philanthropies
│   │   ├── gallery/           # Photo Gallery
│   │   ├── news/              # News & Media
│   │   └── contact/           # Contact & Guestbook
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Base UI components
│   ├── layout/                # Header, Footer
│   ├── sections/              # Reusable page sections
│   └── features/              # Complex feature components
├── i18n/                      # Internationalization config
├── lib/                       # Utilities and constants
├── messages/                  # Translation files (en.json, ar.json)
└── types/                     # TypeScript type definitions
```

## 9 Core Sections

1. **Home** - Hero, stats, featured areas
2. **Biography** - Life story and journey
3. **Accomplishments** - Kingdom Holding Company portfolio
4. **Achievements** - Global recognition and awards
5. **Family** - Royal lineage and heritage
6. **Philanthropy** - Alwaleed Philanthropies impact
7. **Gallery** - Visual journey and photos
8. **News & Media** - Latest updates and press
9. **Contact** - Guestbook and contact information

## Internationalization

The site supports full bilingual content:

- **English**: `/en/*` routes
- **Arabic**: `/ar/*` routes with RTL layout

Language toggle is available in the header.

## Color Palette

| Color            | Hex       | Usage                     |
| ---------------- | --------- | ------------------------- |
| Regal Gold       | `#C5A059` | Primary accent            |
| Deep Green       | `#004D2C` | Saudi Royal Green headers |
| Cream            | `#F8F6F2` | Card backgrounds          |
| Off White        | `#FFFFFF` | Page backgrounds          |
| Charcoal         | `#1A1A1A` | Text                      |

## Deployment

The site is optimized for deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## External Resources

- [Kingdom Holding Company](https://kingdom.com.sa)
- [Alwaleed Philanthropies](https://alwaleedphilanthropies.org)
- [Giving Pledge](https://givingpledge.org/pledger/hrh-prince-alwaleed-bin-talal)

## Sponsor

Site managed by **Alpha International Group / Twaik Holding Group**

---

© 2025 Prince Alwaleed bin Talal. All rights reserved.
