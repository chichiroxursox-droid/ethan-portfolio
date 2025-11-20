import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TerminalHacker } from "@/components/games/TerminalHacker";
import { MiniHouseDefense } from "@/components/games/MiniHouseDefense";

const Games = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-inter">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-12">
            <div className="inline-block">
              <span className="font-mono text-xs tracking-wider text-[#00FF9F] uppercase bg-[#00FF9F]/10 px-3 py-1 rounded-full border border-[#00FF9F]/20">
                Mini Games
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Just for<br />
              <span className="bg-gradient-to-r from-[#00FF9F] to-[#00D9FF] bg-clip-text text-transparent">
                Fun
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-light">
              Two interactive games to pass the time
            </p>
          </div>

          <Tabs defaultValue="terminal" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-[#111111] border border-gray-800">
              <TabsTrigger value="terminal" className="data-[state=active]:bg-[#00FF9F]/10 data-[state=active]:text-[#00FF9F]">
                Terminal Hacker
              </TabsTrigger>
              <TabsTrigger value="defense" className="data-[state=active]:bg-[#00FF9F]/10 data-[state=active]:text-[#00FF9F]">
                House Defense
              </TabsTrigger>
            </TabsList>

            <TabsContent value="terminal" className="mt-8">
              <TerminalHacker />
            </TabsContent>

            <TabsContent value="defense" className="mt-8">
              <MiniHouseDefense />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Games;
