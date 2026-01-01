import Navigation from "@/components/Navigation";
import { TerminalHacker } from "@/components/games/TerminalHacker";
import { useSectionTheme } from "@/hooks/use-section-theme";
import { SparklesCore } from "@/components/ui/sparkles";

const Games = () => {
  useSectionTheme();
  
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-inter transition-all duration-500">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-12">
            <div className="inline-block">
              <span className="font-mono text-xs tracking-wider text-[#00FF9F] uppercase bg-[#00FF9F]/10 px-3 py-1 rounded-full border border-[#00FF9F]/20">
                Mini Games
              </span>
            </div>
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight relative z-20">
                Just for<br />
                <span className="bg-gradient-to-r from-[#00FF9F] to-[#00D9FF] bg-clip-text text-transparent">
                  Fun
                </span>
              </h1>
              <div className="absolute inset-0 w-full h-full z-10">
                <SparklesCore
                  id="gamesSparkles"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={80}
                  className="w-full h-full"
                  particleColor="#00D9FF"
                  speed={0.5}
                />
              </div>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl font-light">
              Test your typing speed with Terminal Hacker
            </p>
          </div>

          <div className="mt-8">
            <TerminalHacker />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Games;
