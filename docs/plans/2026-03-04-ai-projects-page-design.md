# Design: "Building with AI" Page

**Date:** 2026-03-04
**Route:** `/ai-projects`
**File:** `src/pages/AIProjects.tsx`

## Goal

Add a new portfolio page showcasing Ethan's notable Claude Code projects. Framed as a personal narrative ("Building with AI") rather than a formal portfolio grid — shows he's using AI as a real development partner to ship products.

## Visual Identity

- **Background:** `#0A0820` (deep dark purple/navy)
- **Primary accent:** `#8B5CF6` (violet)
- **Secondary accent:** `#A78BFA` (lighter violet)
- **Highlight:** `#C084FC` (lavender)
- **Text:** white / light gray
- **Card background:** `rgba(139, 92, 246, 0.08)` with border `rgba(139, 92, 246, 0.3)`
- **Sparkles:** Reuse `SparklesCore` component with violet particle colors

## Page Sections

### Section 1 — Hero
- Dark purple background with `SparklesCore` particles in violet/lavender
- Title: "Building with AI" — gradient text (violet → lavender)
- Tagline: "Real products, real code — built by a high school senior using Claude Code."

### Section 2 — Narrative Intro
- 2–3 sentences in first person
- Content: "I'm a senior at SLA Beeber who's been using Claude Code as a development partner to ship real products. Since late 2025, I've launched a full-stack web app, co-founded an AI startup, built a Python automation bot, and created educational AI content — all using Claude Code."

### Section 3 — Project Cards (2×2 grid)
Each card contains:
- Project name (bold)
- One-line pitch
- Tech stack chips (small pill badges)
- Color-coded status badge (green = Active, blue = Complete, orange = In Development, yellow = In Production)
- Short "what I built" description (2–3 sentences)

| Project | Status | Tech Stack |
|---------|--------|------------|
| CULTIVaITE / fAIthful.ly | Active | HTML, CSS, JS, GSAP |
| ClassBot | In Development | Python, Playwright, Groq API, sounddevice |
| The Lamppost | Complete | React, Vite, Supabase, TypeScript, Tailwind |
| AI Reality Check | In Production | Content Creation |

**Card descriptions:**
- **CULTIVaITE:** AI startup co-founded to help small nonprofits (churches, Christian schools, rescue missions) automate communications — newsletters, donor emails, social posts, board updates. Piloting with first real client.
- **ClassBot:** Python bot that auto-joins Google Meet sessions, records audio, transcribes in real time, and responds using the Groq API. Runs headlessly via Playwright.
- **The Lamppost:** Full-stack web platform for a family member with user auth, a donation page, community stories section, prayer/promise wall, and email signup. Built with Supabase on the backend.
- **AI Reality Check:** Planned educational YouTube/TikTok series with 3 content pillars: AI awareness, practical tool demos, and student preparation. Full scripts and content calendar written.

## Navigation Changes

- Add new nav link "AI" (or "AI Projects") to `Navigation.tsx`
- Icon: `Brain` or `Bot` from lucide-react
- Apply the same nav style conditional logic for the `/ai-projects` route (violet text/hover states when on Engineering's dark background)

## Files to Create/Modify

| Action | File |
|--------|------|
| Create | `src/pages/AIProjects.tsx` |
| Modify | `src/App.tsx` — add `/ai-projects` route |
| Modify | `src/components/Navigation.tsx` — add nav link + style |

## Reused Components

- `SparklesCore` — from `@/components/ui/sparkles`
- `useScrollReveal` — from `@/hooks/use-scroll-reveal`
- `useSectionTheme` — from `@/hooks/use-section-theme`
- `Navigation` — shared nav component
- `Card` — from `@/components/ui/card`
