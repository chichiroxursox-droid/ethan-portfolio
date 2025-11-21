import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { MessageSquare, User, Mail, Wrench, Trophy, Gamepad2 } from "lucide-react";
import { Theme } from "./ui/theme";

const Navigation = () => {
  const location = useLocation();
  const isEngineeringPage = location.pathname === "/engineering";
  const isAthleticsPage = location.pathname === "/athletics";
  const isMusicPage = location.pathname === "/chat";
  const isActivismPage = location.pathname === "/contact";
  
  const getNavStyle = () => {
    if (isEngineeringPage) {
      return 'bg-[#0A0A0A]/80 backdrop-blur-md border-[#00FF9F]/20';
    } else if (isAthleticsPage) {
      return 'bg-background/80 backdrop-blur-md border-athletics/30';
    } else if (isMusicPage) {
      return 'bg-background/80 backdrop-blur-md border-music/30';
    } else if (isActivismPage) {
      return 'bg-background/80 backdrop-blur-md border-activism/30';
    }
    return 'bg-background/80 backdrop-blur-md border-border';
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${getNavStyle()}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
              isEngineeringPage
                ? 'bg-gradient-to-r from-[#00FF9F] to-[#00D9FF] text-black'
                : isAthleticsPage
                ? 'bg-gradient-to-r from-athletics to-athletics-accent text-white'
                : isMusicPage
                ? 'bg-gradient-to-r from-music to-music-accent text-white'
                : isActivismPage
                ? 'bg-gradient-to-r from-activism to-activism-accent text-white'
                : 'bg-gradient-primary text-primary-foreground'
            }`}>
              EH
            </div>
            <span className={`font-semibold text-lg transition-all duration-500 ${
              isEngineeringPage ? 'text-white font-mono' : ''
            }`}>Ethan Hauger</span>
          </Link>
          
          <div className="flex gap-2 flex-wrap">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                size="sm"
                className={`gap-2 ${
                  isEngineeringPage && location.pathname !== "/" 
                    ? 'text-gray-300 hover:text-white hover:bg-[#00FF9F]/10' 
                    : ''
                }`}
              >
                <User className="w-4 h-4" />
                About
              </Button>
            </Link>
            <Link to="/engineering">
              <Button 
                variant={location.pathname === "/engineering" ? "default" : "ghost"}
                size="sm"
                className={`gap-2 ${
                  isEngineeringPage && location.pathname === "/engineering"
                    ? 'bg-gradient-to-r from-[#00FF9F] to-[#00D9FF] text-black hover:opacity-90'
                    : isEngineeringPage
                    ? 'text-gray-300 hover:text-white hover:bg-[#00FF9F]/10'
                    : ''
                }`}
              >
                <Wrench className="w-4 h-4" />
                Engineering
              </Button>
            </Link>
            <Link to="/athletics">
              <Button 
                variant={location.pathname === "/athletics" ? "default" : "ghost"}
                size="sm"
                className={`gap-2 ${
                  isEngineeringPage && location.pathname !== "/athletics" 
                    ? 'text-gray-300 hover:text-white hover:bg-[#00FF9F]/10' 
                    : ''
                }`}
              >
                <Trophy className="w-4 h-4" />
                Athletics
              </Button>
            </Link>
            <Link to="/games">
              <Button 
                variant={location.pathname === "/games" ? "default" : "ghost"}
                size="sm"
                className={`gap-2 ${
                  isEngineeringPage && location.pathname !== "/games" 
                    ? 'text-gray-300 hover:text-white hover:bg-[#00FF9F]/10' 
                    : ''
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                Games
              </Button>
            </Link>
            <Link to="/chat">
              <Button 
                variant={location.pathname === "/chat" ? "default" : "ghost"}
                size="sm"
                className={`gap-2 ${
                  isEngineeringPage && location.pathname !== "/chat" 
                    ? 'text-gray-300 hover:text-white hover:bg-[#00FF9F]/10' 
                    : ''
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant={location.pathname === "/contact" ? "default" : "ghost"}
                size="sm"
                className={`gap-2 ${
                  isEngineeringPage && location.pathname !== "/contact" 
                    ? 'text-gray-300 hover:text-white hover:bg-[#00FF9F]/10' 
                    : ''
                }`}
              >
                <Mail className="w-4 h-4" />
                Contact
              </Button>
            </Link>
            <Theme variant="switch" size="sm" className="ml-2" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
