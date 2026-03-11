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
                Just for Fun
                <br />
                <span className="bg-gradient-to-r from-[#00FF9F] to-[#00D9FF] bg-clip-text text-transparent">Fun</span>
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
            <p className="text-xl text-gray-400 max-w-2xl font-light">Test your typing speed with Terminal Hacker</p>
          </div>

          <div className="mt-8">
            <TerminalHacker />
          </div>

          {/* Humanium Game Section */}
          <div className="mt-16 space-y-4">
            <div className="inline-block">
              <span className="font-mono text-xs tracking-wider text-[#FFD700] uppercase bg-[#FFD700]/10 px-3 py-1 rounded-full border border-[#FFD700]/20">
                Humanium Metal Game
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              The Humanium Metal Game
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Game</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl font-light">
              An interactive experience exploring the Humanium Metal initiative — turning weapons into peace.
            </p>

            <div className="mt-8 rounded-xl overflow-hidden border border-white/10 bg-black/50">
              <iframe
                src="https://icampwcu.org/games/Humanium/"
                title="Humanium Game"
                className="w-full aspect-video"
                allow="fullscreen"
                style={{ minHeight: "600px" }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Built with Construct 3 • Part of the{" "}
              <a
                href="https://reforgeproject.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD700] hover:underline"
              >
                Humanium Metal Project
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Games;
