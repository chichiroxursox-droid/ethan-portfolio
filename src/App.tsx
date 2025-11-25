import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Start from "./pages/Start";
import Chat from "./pages/Chat";
import Contact from "./pages/Contact";
import Engineering from "./pages/Engineering";
import Athletics from "./pages/Athletics";
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/home" element={<Index />} />
              <Route path="/intro" element={<Start />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/engineering" element={<Engineering />} />
              <Route path="/athletics" element={<Athletics />} />
              <Route path="/games" element={<Games />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
