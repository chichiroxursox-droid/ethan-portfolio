import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

const Engineering = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
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
                    <Wrench className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">Humanium Metal – Microphone for Peace</CardTitle>
                    <CardDescription className="text-base">
                      Collaborative project with IM Swedish Development Partner
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  I participated in a groundbreaking collaborative project between Humanium Metal by IM Swedish 
                  Development Partner and Science Leadership Academy to transform destroyed firearms into a working 
                  microphone. This "Microphone for Peace" symbolizes the powerful transformation of instruments of 
                  violence into tools for dialogue and positive change.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">My Contributions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Helped design and build the microphone structure</li>
                    <li>Collaborated with students and mentors on technical implementation</li>
                    <li>Shared the project's story to raise awareness about gun violence</li>
                    <li>Created educational materials about the intersection of engineering and social justice</li>
                  </ul>
                </div>
                <div className="pt-2">
                  <a 
                    href="https://reforge-phl-vision.lovable.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    Visit the Reforge PHL Vision website →
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Engineering Philosophy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  My approach to engineering is rooted in the belief that technology and design should serve 
                  communities and create positive social impact. Through project-based learning at Science 
                  Leadership Academy, I've learned to combine technical skills with creative problem-solving 
                  to address real-world challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Engineering;
