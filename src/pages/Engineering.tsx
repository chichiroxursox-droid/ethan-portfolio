import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Youtube } from "lucide-react";
import miniHouse1 from "@/assets/mini-house-1.jpg";
import miniHouse2 from "@/assets/mini-house-2.jpg";
import miniHouse3 from "@/assets/mini-house-3.jpg";
import miniHouse4 from "@/assets/mini-house-4.jpg";
import miniHouse5 from "@/assets/mini-house-5.jpg";
import miniHouse6 from "@/assets/mini-house-6.jpg";

const Engineering = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Engineering Projects</h1>
            <p className="text-lg text-muted-foreground">
              Building solutions that combine creativity with purpose
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Apocalypse Survival Mini House</CardTitle>
                    <CardDescription className="text-base">
                      16' x 16' Sustainable Shelter Design Project
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-foreground leading-relaxed">
                  Designed and built a 16' by 16' mini house engineered to survive a hypothetical apocalypse scenario. 
                  This hands-on project combined structural engineering, sustainable design principles, and practical 
                  construction skills to create a fully functional shelter from the ground up.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <img src={miniHouse1} alt="Mini house foundation and frame construction" className="rounded-lg w-full h-48 object-cover" />
                  <img src={miniHouse2} alt="Mini house platform stage" className="rounded-lg w-full h-48 object-cover" />
                  <img src={miniHouse3} alt="Mini house with roof framing" className="rounded-lg w-full h-48 object-cover" />
                  <img src={miniHouse4} alt="Mini house wall framing progress" className="rounded-lg w-full h-48 object-cover" />
                  <img src={miniHouse5} alt="Completed mini house exterior" className="rounded-lg w-full h-48 object-cover" />
                  <img src={miniHouse6} alt="Finished mini house with roofing" className="rounded-lg w-full h-48 object-cover" />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Project Highlights:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Designed structural foundation and frame using engineering principles</li>
                    <li>Implemented weatherproofing and insulation techniques</li>
                    <li>Applied carpentry and construction skills throughout the build process</li>
                    <li>Incorporated sustainable design elements for long-term durability</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Youtube className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Rube Goldberg Machine</CardTitle>
                    <CardDescription className="text-base">
                      10th Grade Engineering Challenge
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  Collaborated with a team to design and build a complex Rube Goldberg machine as part of a 10th grade 
                  engineering project. My group was responsible for creating the very first section, which set the entire 
                  chain reaction in motion.
                </p>
                
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/l9VnBqaSKGw" 
                    title="Rube Goldberg Machine Project" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Engineering Skills Applied:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Physics and mechanics principles for chain reaction design</li>
                    <li>Precision timing and trigger mechanism development</li>
                    <li>Collaborative problem-solving with team members</li>
                    <li>Iterative testing and refinement process</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Engineering;
