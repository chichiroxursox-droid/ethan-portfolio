import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSectionTheme } from "@/hooks/use-section-theme";
interface Message {
  role: "user" | "assistant";
  content: string;
}
const Chat = () => {
  useSectionTheme();
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Hey! I'm EthanGPT, basically an AI version of Ethan. I can answer questions about his experiences, interests, projects, or anything else. What do you want to know?"
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    const newMessages = [...messages, {
      role: "user" as const,
      content: userMessage
    }];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('chat-with-ethan', {
        body: {
          messages: newMessages
        }
      });
      if (error) throw error;
      const assistantMessage = data.choices[0].message.content;
      setMessages(prev => [...prev, {
        role: "assistant",
        content: assistantMessage
      }]);
    } catch (error) {
      console.error("Error calling chat function:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-hero transition-all duration-500">
      <Navigation />
      
      <div className="pt-24 pb-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Chat with EthanGPT</h1>
            <p className="text-muted-foreground text-lg">
              I trained an AI on information about me. Ask it whatever you want.
            </p>
          </div>

          <Card className="flex flex-col h-[calc(100vh-20rem)] bg-card/50 backdrop-blur">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message, index) => <div key={index} className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                      {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`flex-1 rounded-2xl p-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>)}
                
                {isLoading && <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex-1 rounded-2xl p-4 bg-secondary">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{
                      animationDelay: "0ms"
                    }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{
                      animationDelay: "150ms"
                    }} />
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{
                      animationDelay: "300ms"
                    }} />
                      </div>
                    </div>
                  </div>}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border">
              <form onSubmit={e => {
              e.preventDefault();
              handleSend();
            }} className="flex gap-2">
                <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me anything about Ethan..." disabled={isLoading} className="flex-1" />
                <Button type="submit" disabled={!input.trim() || isLoading} className="gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>;
};
export default Chat;