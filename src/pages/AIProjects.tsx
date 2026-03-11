import Navigation from "@/components/Navigation";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useSectionTheme } from "@/hooks/use-section-theme";
import { SparklesCore } from "@/components/ui/sparkles";
import { Brain, Bot, Globe, Mic, Mail } from "lucide-react";

const projects = [
  {
    name: "CULTIVaITE",
    brand: null,
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
    name: "Gmail Inbox Organizer",
    brand: null,
    tagline: "AI-powered email classification and auto-reply drafting",
    description:
      "A Python pipeline that connects to Gmail via OAuth, fetches unread emails, and classifies them using Claude AI to auto-apply labels. It also drafts replies in your voice by learning your tone and phrasing from sent emails. Runs end-to-end with a single command.",
    tech: ["Python", "Gmail API", "Claude API", "OAuth"],
    status: "In Development",
    statusColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    icon: Mail,
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
              maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 40%, transparent 100%)",
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
            heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
            <span className="text-white">Building</span> <span className="text-[#C084FC]">with AI</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Real products, real code — built by a high school senior using Claude Code.
          </p>

          {/* Narrative intro */}
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            I'm a senior at SLA Beeber who's been using Claude Code as a development partner to ship real products.
            Since late 2025, I've launched a full-stack web app, co-founded an AI startup, and built a Python automation
            bot — all using Claude Code.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div
          ref={cardsReveal.ref}
          className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 transition-all duration-700 delay-150 ${
            cardsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.name}
                className="group relative bg-white/[0.03] border border-[#8B5CF6]/20 rounded-2xl p-6 hover:border-[#8B5CF6]/50 hover:bg-white/[0.06] transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1"
              >
                {/* Top row: icon + status */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.accentColor} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>

                {/* Name + brand */}
                <div className="mb-1">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  {project.brand && <p className="text-sm text-[#A78BFA] font-mono">{project.brand}</p>}
                </div>

                {/* Tagline */}
                <p className="text-sm text-gray-400 mb-3 font-medium">{project.tagline}</p>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{project.description}</p>

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
          This page of the portfolio was also built with Claude Code.
        </p>
      </main>
    </div>
  );
};

export default AIProjects;
