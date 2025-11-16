import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { MessageSquare, User, Mail } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              EH
            </div>
            <span className="font-semibold text-lg">Ethan Hauger</span>
          </Link>
          
          <div className="flex gap-2">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <User className="w-4 h-4" />
                About
              </Button>
            </Link>
            <Link to="/chat">
              <Button 
                variant={location.pathname === "/chat" ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant={location.pathname === "/contact" ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
