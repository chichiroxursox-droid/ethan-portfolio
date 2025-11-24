import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { GraduationCap, Award, Briefcase, Code, MessageSquare, MapPin, Mail, Phone, Trophy, Users, Globe } from "lucide-react";
import educationProtest from "@/assets/education-protest.png";
import unSpeaking from "@/assets/un-speaking.png";
import { useSectionTheme } from "@/hooks/use-section-theme";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { AuroraBackground } from "@/components/ui/aurora-background";
const Index = () => {
  useSectionTheme();
  
  return <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <AuroraBackground className="h-full" showRadialGradient={false}>
          <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        </AuroraBackground>
      </div>
      <AnimatedShaderBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <AnimatedHero 
              titles={[
                "Ethan Hauger",
                "Student Leader",
                "Athlete",
                "Innovator",
                "Engineer",
                "Activist"
              ]} 
            />
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto md:text-xl"> Current 12th grader at Science Leadership Academy, dedicated to making a difference through leadership, service, and innovation.</p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Philadelphia, PA</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>chichiroxursox@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>267-235-3890</span>
              </div>
            </div>
            
            <div className="pt-6">
              <Link to="/chat">
                <Button size="lg" className="gap-2 shadow-glow">
                  <MessageSquare className="w-5 h-5" />
                  Ask Me Anything
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              About Me
            </h2>
            
            {/* Images Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <img 
                  src={educationProtest} 
                  alt="Ethan Hauger speaking at Stand Up for Philly Schools education protest, featured on front page of Philadelphia Inquirer" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted-foreground italic">
                  Speaking at Stand Up for Philly Schools event - Featured on front page of Philadelphia Inquirer (Tyger Williams / Staff Photographer)
                </p>
              </div>
              <div className="space-y-3">
                <img 
                  src={unSpeaking} 
                  alt="Ethan Hauger presenting at United Nations on gun violence prevention" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted-foreground italic">
                  Presenting at the United Nations on gun violence prevention
                </p>
              </div>
            </div>
            
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                I'm a student-athlete and current 12th grader at SLA@Beeber with a passion for leadership and service. As captain of my varsity basketball team and NHS treasurer, I strive to inspire and support those around me.
              </p>
              <p>
                One of my proudest achievements was presenting on gun violence at the United Nations with my classmates, advocating for safer communities. Through projects like the Microphone for Peace—a 3D-printed microphone made from{" "}
                <a 
                  href="https://reforge-phl-vision.lovable.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  humanium metal
                </a>
                {" "}(recycled illegal firearms)—I've learned that making a difference doesn't require being powerful; it requires showing up and being willing to use whatever gifts you have. Visit our{" "}
                <a 
                  href="https://reforge-phl-vision.lovable.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Reforge PHL Vision website
                </a>
                {" "}to learn more about this project.
              </p>
              <p>
                When I'm not studying or playing basketball, I enjoy reading, working out, playing piano, playing video games, and spending time with my pitbull-mix, Honey. I'm a follower of Christianity and strive to reflect my faith in everything I do.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            Education
          </h2>
          
          <Card className="p-8">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-semibold">Science Leadership Academy at Beeber</h3>
                  <p className="text-muted-foreground">Philadelphia, PA</p>
                </div>
                <Badge variant="secondary" className="w-fit">Class of 2026</Badge>
              </div>
              
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-semibold">4.0/4.0 GPA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Distinguished Honor Roll every semester</span>
                </div>
              </div>

              <div className="pt-6">
                <h4 className="font-semibold mb-3">Activities & Leadership</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["NHS Treasurer", "Varsity Basketball Captain", "Humanium Co-leader", "Book Club Member", "Track & Cross-Country"].map(activity => <div key={activity} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{activity}</span>
                    </div>)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-primary" />
            Experience
          </h2>
          
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">IANSA Ambassador & UN Student Presenter</h3>
                  <p className="text-muted-foreground">New York, NY</p>
                </div>
                <Badge variant="outline">June 2024</Badge>
              </div>
              <p className="text-muted-foreground">
                Presented a speech at the United Nations with classmates, speaking out against illegal firearms and gun violence. Led the creation of the Microphone for Peace, a 3D-printed microphone made from{" "}
                <a 
                  href="https://reforge-phl-vision.lovable.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  humanium metal
                </a>
                {" "}(recycled illegal firearms).
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">NHS Treasurer</h3>
                  <p className="text-muted-foreground">Science Leadership Academy at Beeber</p>
                </div>
                <Badge variant="outline">May 2024 - Present</Badge>
              </div>
              <p className="text-muted-foreground">
                Elected NHS Officer, managing chapter finances and organizing community service events including the school's first student vs. staff basketball game.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Basketball Tutor</h3>
                  <p className="text-muted-foreground">Self-Employed</p>
                </div>
                <Badge variant="outline">April 2024 - Present</Badge>
              </div>
              <p className="text-muted-foreground">
                Launched self-run basketball coaching business. Created marketing materials, marketed locally, and currently coaching 7 beginner clients.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Summer Programs</h3>
                  <p className="text-muted-foreground">Math Corps • Penn RSSA • C2L</p>
                </div>
                <Badge variant="outline">Summers 2023-2025</Badge>
              </div>
              <p className="text-muted-foreground">
                Tutored younger students in math, participated in University of Pennsylvania research program, and worked with engineering teacher to design, construct, and install goat houses.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Code className="w-8 h-8 text-primary" />
            Skills & Interests
          </h2>
          
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Athletics</h3>
                <div className="flex flex-wrap gap-2">
                  {["Varsity Basketball", "Track", "Cross-Country"].map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Fusion 360", "Adobe Illustrator", "DaVinci Resolve", "3D Printing", "Laser Cutting"].map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg">Creative & Leadership</h3>
                <div className="flex flex-wrap gap-2">
                  {["Piano", "Chess", "Public Speaking", "Team Leadership", "Problem-Solving", "Collaboration"].map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-12 bg-gradient-primary text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Want to know more?</h2>
            <p className="text-lg mb-8 opacity-90">
              Chat with my AI assistant to learn more about my experiences, projects, and goals.
            </p>
            <Link to="/chat">
              <Button size="lg" variant="secondary" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Start a Conversation
              </Button>
            </Link>
          </Card>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>© 2025 Ethan Hauger. All rights reserved.</p>
        </div>
      </footer>
    </div>;
};
export default Index;