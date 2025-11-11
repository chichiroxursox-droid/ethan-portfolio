import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Ethan's AI assistant. I can answer any questions you have about Ethan's experiences, projects, skills, or goals. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Simulated AI response - in production, this would call an actual AI API
      // For now, we'll create a contextual response based on the portfolio information
      
      const response = await generateResponse(userMessage);
      
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = async (question: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const lowerQuestion = question.toLowerCase();

    // Context-based responses
    if (lowerQuestion.includes("gpa") || lowerQuestion.includes("grades")) {
      return "Ethan maintains a perfect 4.0 GPA and has been on the Distinguished Honor Roll every semester since starting high school in 2022.";
    }
    
    if (lowerQuestion.includes("basketball")) {
      return "Ethan is the captain of his varsity basketball team. He was named JV Basketball MVP during his freshman year (2022-23). He also runs his own basketball coaching business, where he currently coaches 7 beginner clients. Basketball is a big part of his life, both as a player and a mentor.";
    }
    
    if (lowerQuestion.includes("united nations") || lowerQuestion.includes("un ") || lowerQuestion.includes("gun")) {
      return "In June 2024, Ethan presented at the United Nations in New York with two of his classmates as an IANSA Ambassador. He spoke out against illegal firearms and gun violence. He also co-led the creation of the 'Microphone for Peace'—a custom microphone 3D-printed using recycled illegal firearms. This microphone is now used by activists in Philadelphia. This experience taught him that making a difference doesn't require power, just showing up and using whatever gifts you have.";
    }
    
    if (lowerQuestion.includes("nhs") || lowerQuestion.includes("national honor")) {
      return "Ethan was elected as NHS Treasurer in May 2024. One of his notable achievements was hosting the school's first student vs. staff basketball game, which brought the community together in a fun and meaningful way.";
    }
    
    if (lowerQuestion.includes("skills") || lowerQuestion.includes("technical")) {
      return "Ethan has a diverse skill set. He's proficient in Python, Fusion 360, Adobe Illustrator, and DaVinci Resolve. He also has experience with 3D printing (like the Microphone for Peace project). Beyond technical skills, he plays piano, chess, and excels at public speaking, team leadership, and collaboration.";
    }
    
    if (lowerQuestion.includes("future") || lowerQuestion.includes("career") || lowerQuestion.includes("goals")) {
      return "Ethan is still figuring out exactly what he wants to do, but he knows he wants to use his talents to help the world. He's interested in economics and politics, and is deeply committed to his Christian faith. He strives to be a walking reflection of what it means to know and love Jesus, and wants to continue growing as a person who makes a positive impact on his community.";
    }
    
    if (lowerQuestion.includes("hobbies") || lowerQuestion.includes("interests") || lowerQuestion.includes("free time")) {
      return "In his free time, Ethan enjoys reading, working out, playing video games, and playing piano. He's a homebody who loves spending time at his house in West Philadelphia. He also has a pitbull-mix named Honey who he absolutely adores. His favorite color is turquoise, and his favorite foods are buffalo wings and bacon!";
    }
    
    if (lowerQuestion.includes("leadership") || lowerQuestion.includes("leader")) {
      return "Ethan has demonstrated strong leadership across multiple roles. As varsity basketball captain, he's learned that leadership isn't about being the loudest voice, but about staying calm under pressure and helping teammates find their confidence. He's also NHS Treasurer and Humanium co-leader. Through his basketball coaching business and volunteer tutoring, he's discovered that patient encouragement can unlock potential people didn't know they had.";
    }
    
    if (lowerQuestion.includes("school") || lowerQuestion.includes("sla") || lowerQuestion.includes("beeber")) {
      return "Ethan attends Science Leadership Academy at Beeber (SLA@Beeber) in Philadelphia, PA. He's set to graduate in Spring 2026. The school is located at 5925 Malvern Avenue. At SLA@Beeber, he's involved in numerous activities including NHS, Humanium, Book Club, Track, and Cross-Country, in addition to being varsity basketball captain.";
    }
    
    if (lowerQuestion.includes("summer") || lowerQuestion.includes("job")) {
      return "Ethan has participated in several summer programs: Math Corps where he tutored younger students in math, Penn RSSA (University of Pennsylvania research program), and C2L where he worked with an engineering teacher to design, construct, and install goat houses. Yes, there is a farm in Philadelphia! These experiences taught him the value of hard work and patience.";
    }
    
    if (lowerQuestion.includes("faith") || lowerQuestion.includes("christian") || lowerQuestion.includes("religion")) {
      return "Ethan is a follower of Christianity and his faith is very important to him. He strives to grow in his faith every day and hopes to be a walking reflection of what it means to know and love Jesus. His faith influences how he approaches leadership, service, and his interactions with others.";
    }

    if (lowerQuestion.includes("contact") || lowerQuestion.includes("email") || lowerQuestion.includes("phone")) {
      return "You can reach Ethan at ehauger26@slabeeber.org or call him at 267-235-3890. He lives in Philadelphia, PA.";
    }

    // Default response for questions we don't have specific answers for
    return "That's a great question! While I don't have specific information about that, I can tell you that Ethan is a dedicated student-athlete with a 4.0 GPA, varsity basketball captain, NHS Treasurer, and passionate advocate for gun violence prevention. He's presented at the UN, runs a basketball coaching business, and is deeply committed to his Christian faith and making a positive impact. Is there something specific about his experiences, skills, or goals you'd like to know more about?";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Chat with Ethan's AI</h1>
            <p className="text-muted-foreground text-lg">
              Ask me anything about Ethan's experiences, projects, and goals
            </p>
          </div>

          <Card className="flex flex-col h-[calc(100vh-20rem)] bg-card/50 backdrop-blur">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    <div
                      className={`flex-1 rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex-1 rounded-2xl p-4 bg-secondary">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Ethan..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim() || isLoading} className="gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
