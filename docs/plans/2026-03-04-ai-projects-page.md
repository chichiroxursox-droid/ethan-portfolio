# Building with AI — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a new `/ai-projects` page to the portfolio showcasing CULTIVaITE, ClassBot, The Lamppost, and AI Reality Check — framed as a personal narrative in a dark purple/violet visual theme.

**Architecture:** New React page component following the same pattern as `Engineering.tsx` — dark background hardcoded on the wrapper div, reusing `SparklesCore`, `useScrollReveal`, and `useSectionTheme`. Three file changes (route, nav, theme hook) plus one new file.

**Tech Stack:** React, TypeScript, Tailwind CSS, lucide-react, framer-motion, SparklesCore (tsparticles)

---

### Task 1: Add the route to App.tsx

**Files:**
- Modify: `src/App.tsx`

**Step 1: Import the new page component**

Add this import alongside the existing page imports (after the `Games` import on line 14):

```tsx
import AIProjects from "./pages/AIProjects";
```

**Step 2: Add the route**

Add inside `<Routes>`, before the catch-all `*` route (after line 34):

```tsx
<Route path="/ai-projects" element={<AIProjects />} />
```

**Step 3: Verify the file looks correct**

The routes section should now have:
```tsx
<Route path="/" element={<Start />} />
<Route path="/home" element={<Index />} />
<Route path="/chat" element={<Chat />} />
<Route path="/contact" element={<Contact />} />
<Route path="/engineering" element={<Engineering />} />
<Route path="/athletics" element={<Athletics />} />
<Route path="/games" element={<Games />} />
<Route path="/ai-projects" element={<AIProjects />} />
<Route path="*" element={<NotFound />} />
```

**Step 4: Commit**

```bash
cd /tmp/ethan-portfolio
git add src/App.tsx
git commit -m "feat: add /ai-projects route"
```

---

### Task 2: Add nav link to Navigation.tsx

**Files:**
- Modify: `src/components/Navigation.tsx`

**Step 1: Add the Brain icon import**

In the lucide-react import on line 2, add `Brain`:

```tsx
import { MessageSquare, User, Mail, Wrench, Trophy, Gamepad2, LogOut, Brain } from "lucide-react";
```

**Step 2: Add isAIPage detection**

After line 20 (`const isActivismPage = ...`), add:

```tsx
const isAIPage = location.pathname === "/ai-projects";
```

**Step 3: Update getNavStyle() to handle /ai-projects**

In the `getNavStyle` function, add a condition for AI page. After the `isActivismPage` check:

```tsx
} else if (isAIPage) {
  return 'bg-[#0A0820]/80 backdrop-blur-md border-[#8B5CF6]/20';
}
```

**Step 4: Add the nav button**

Add this link block after the Engineering button (after the closing `</Link>` for `/engineering`, around line 88). Place it between Engineering and Athletics:

```tsx
<Link to="/ai-projects">
  <Button
    variant={location.pathname === "/ai-projects" ? "default" : "ghost"}
    size="sm"
    className={`gap-2 ${
      isAIPage && location.pathname === "/ai-projects"
        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white hover:opacity-90'
        : isAIPage
        ? 'text-gray-300 hover:text-white hover:bg-[#8B5CF6]/10'
        : isEngineeringPage
        ? 'text-gray-300 hover:text-white hover:bg-[#00FF9F]/10'
        : ''
    }`}
  >
    <Brain className="w-4 h-4" />
    AI
  </Button>
</Link>
```

**Step 5: Update logo circle to handle AI page**

In the logo avatar div (around line 40), extend the conditional to include the AI page:

```tsx
: isAIPage
? 'bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white'
```

Insert this between the `isEngineeringPage` and `isAthleticsPage` checks.

**Step 6: Update logo text color**

In the `<span>` for "Ethan Hauger" (around line 53), extend the condition:

```tsx
className={`font-semibold text-lg transition-all duration-500 ${
  isEngineeringPage ? 'text-white font-mono' : isAIPage ? 'text-white' : ''
}`}
```

**Step 7: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: add AI Projects nav link with violet theme"
```

---

### Task 3: Register /ai-projects in useSectionTheme hook

**Files:**
- Modify: `src/hooks/use-section-theme.tsx`

**Step 1: Add the ai-projects theme class**

In the `body.classList.remove(...)` call on line 11, add `'theme-ai'`:

```tsx
body.classList.remove('theme-engineering', 'theme-athletics', 'theme-music', 'theme-activism', 'theme-ai');
```

**Step 2: Add the conditional**

After the activism condition, add:

```tsx
} else if (location.pathname === '/ai-projects') {
  body.classList.add('theme-ai');
}
```

**Step 3: Commit**

```bash
git add src/hooks/use-section-theme.tsx
git commit -m "feat: register theme-ai for /ai-projects route"
```

---

### Task 4: Create the AIProjects page

**Files:**
- Create: `src/pages/AIProjects.tsx`

**Step 1: Create the file with this complete content**

```tsx
import Navigation from "@/components/Navigation";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSectionTheme } from "@/hooks/use-section-theme";
import { SparklesCore } from "@/components/ui/sparkles";
import { Brain, ExternalLink, Bot, Globe, Mic, Video } from "lucide-react";

const projects = [
  {
    name: "CULTIVaITE",
    brand: "fAIthful.ly",
    tagline: "AI-powered communications for small nonprofits",
    description:
      "Co-founded an AI startup to help churches, Christian schools, and rescue missions automate repetitive communications — newsletters, donor emails, social posts, and board updates. Currently piloting with a real client.",
    tech: ["HTML", "CSS", "JavaScript", "GSAP"],
    status: "Active",
    statusColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: Globe,
    accentColor: "from-violet-500 to-purple-600",
  },
  {
    name: "ClassBot",
    brand: null,
    tagline: "Python bot that auto-joins and transcribes Google Meet",
    description:
      "A headless Python bot that automatically joins Google Meet sessions, records audio using sounddevice, and transcribes + responds via the Groq API. Runs entirely through Playwright browser automation.",
    tech: ["Python", "Playwright", "Groq API", "sounddevice"],
    status: "In Development",
    statusColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    icon: Mic,
    accentColor: "from-purple-500 to-violet-600",
  },
  {
    name: "The Lamppost",
    brand: null,
    tagline: "Full-stack family web platform with auth and community features",
    description:
      "Built a complete web app for a family member with user authentication, a donation page, community stories section, prayer/promise wall, and email signup. Lovable for the frontend, Supabase handling all backend logic.",
    tech: ["React", "Vite", "Supabase", "TypeScript", "Tailwind"],
    status: "Complete",
    statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: Bot,
    accentColor: "from-fuchsia-500 to-purple-600",
  },
  {
    name: "AI Reality Check",
    brand: null,
    tagline: "Educational YouTube/TikTok series about AI for students",
    description:
      "A planned content series with three pillars: AI awareness, practical tool demos, and student preparation for an AI-shaped future. Full scripts, content calendar, and b-roll shot lists already written.",
    tech: ["Content Creation", "Scripting", "Video Production"],
    status: "In Production",
    statusColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: Video,
    accentColor: "from-violet-600 to-indigo-600",
  },
];

const AIProjects = () => {
  useSectionTheme();
  const heroReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-[#0A0820] font-inter transition-all duration-500">
      <Navigation />

      <main className="container mx-auto px-6 pt-32 pb-24 relative">
        {/* Background glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(139, 92, 246, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(139, 92, 246, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              maskImage:
                "radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)",
            }}
          />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-[120px] animate-pulse" />
          <div
            className="absolute top-20 right-1/4 w-96 h-96 bg-[#C084FC]/15 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Hero Section */}
        <div
          ref={heroReveal.ref}
          className={`max-w-4xl mx-auto mb-20 text-center relative z-10 transition-all duration-700 ${
            heroReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Sparkles */}
          <div className="w-full h-32 relative mb-4">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={60}
              className="w-full h-full"
              particleColor="#A78BFA"
            />
          </div>

          {/* Label chip */}
          <div className="inline-block mb-6">
            <span className="font-mono text-xs tracking-wider text-[#A78BFA] uppercase bg-[#8B5CF6]/10 px-3 py-1 rounded-full border border-[#8B5CF6]/20 flex items-center gap-2 w-fit mx-auto">
              <Brain className="w-3 h-3" />
              Claude Code Projects
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Building</span>{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C084FC] bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Real products, real code — built by a high school senior using
            Claude Code.
          </p>

          {/* Narrative intro */}
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            I'm a senior at SLA Beeber who's been using Claude Code as a
            development partner to ship real products. Since late 2025, I've
            launched a full-stack web app, co-founded an AI startup, built a
            Python automation bot, and created educational AI content — all
            using Claude Code.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div
          ref={cardsReveal.ref}
          className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 transition-all duration-700 delay-150 ${
            cardsReveal.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.name}
                className="group relative bg-white/[0.03] border border-[#8B5CF6]/20 rounded-2xl p-6 hover:border-[#8B5CF6]/50 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top row: icon + status */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.accentColor} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${project.statusColor}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Name + brand */}
                <div className="mb-1">
                  <h3 className="text-xl font-bold text-white">
                    {project.name}
                  </h3>
                  {project.brand && (
                    <p className="text-sm text-[#A78BFA] font-mono">
                      {project.brand}
                    </p>
                  )}
                </div>

                {/* Tagline */}
                <p className="text-sm text-gray-400 mb-3 font-medium">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech stack chips */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-md bg-[#8B5CF6]/10 text-[#A78BFA] border border-[#8B5CF6]/20 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-600 text-xs font-mono mt-16 relative z-10">
          This portfolio was also built with Claude Code.
        </p>
      </main>
    </div>
  );
};

export default AIProjects;
```

**Step 2: Commit**

```bash
git add src/pages/AIProjects.tsx
git commit -m "feat: add Building with AI page (/ai-projects)"
```

---

### Task 5: Push to GitHub

**Step 1: Push all commits**

```bash
cd /tmp/ethan-portfolio
git push origin main
```

**Step 2: Verify on GitHub**

Check `https://github.com/chichiroxursox-droid/ethan-portfolio` that:
- `src/pages/AIProjects.tsx` is visible
- `src/App.tsx` shows the new import and route
- `src/components/Navigation.tsx` shows the AI nav link

---

## Testing Checklist

After deploying (or running locally with `bun run dev`):

- [ ] Navigate to `/ai-projects` — page loads with dark purple background
- [ ] Sparkles animate in the hero section
- [ ] "AI" button appears in the nav bar with Brain icon
- [ ] Clicking "AI" nav button from other pages navigates correctly
- [ ] All 4 project cards render with correct names, status badges, and tech chips
- [ ] Cards have hover lift effect (translate-y -1)
- [ ] Nav bar shows violet styling when on `/ai-projects`
- [ ] Page is responsive on mobile (cards stack to 1 column)
- [ ] Background grid and glow orbs are visible
- [ ] Footer note "This portfolio was also built with Claude Code." appears
