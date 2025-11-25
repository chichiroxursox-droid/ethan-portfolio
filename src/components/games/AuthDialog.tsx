import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail } from "lucide-react";

type AuthDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  score: number;
  gameTitle: string;
};

export const AuthDialog = ({ open, onClose, onSuccess, score, gameTitle }: AuthDialogProps) => {
  const { signIn, signUp, signInWithGoogle, signInAsGuest } = useAuth();
  const [mode, setMode] = useState<"choice" | "signin" | "signup" | "guest">("choice");
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      onSuccess();
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, username);
    
    if (!error) {
      await signIn(email, password);
      onSuccess();
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    // Will redirect, so no need to call onSuccess
    setLoading(false);
  };

  const handleGuestContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signInAsGuest(username);
    
    if (!error) {
      onSuccess();
    }
    
    setLoading(false);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setMode("choice");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#111111] border-[#00FF9F]/30 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#00FF9F] font-mono text-xl">
            {mode === "choice" ? "🎉 HIGH SCORE!" : "Authentication"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {mode === "choice" ? (
              <>Score: {score} in {gameTitle}<br />Save your score to the leaderboard!</>
            ) : (
              "Sign in or create an account to continue"
            )}
          </DialogDescription>
        </DialogHeader>

        {mode === "choice" && (
          <div className="space-y-3 mt-4">
            <Button
              onClick={() => setMode("signin")}
              className="w-full bg-gradient-to-r from-[#00FF9F] to-[#00D9FF] text-black font-bold"
            >
              Sign In
            </Button>
            
            <Button
              onClick={() => setMode("signup")}
              className="w-full bg-[#00D9FF] hover:bg-[#00D9FF]/80 text-black font-bold"
            >
              Create Account
            </Button>

            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full bg-white hover:bg-gray-100 text-black"
              disabled={loading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#111111] px-2 text-gray-500">Or</span>
              </div>
            </div>

            <Button
              onClick={() => setMode("guest")}
              variant="ghost"
              className="w-full text-gray-300 border border-gray-700"
            >
              Continue as Guest
            </Button>
          </div>
        )}

        {mode === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-[#00FF9F]/20 text-white"
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-[#00FF9F]/20 text-white"
                required
                disabled={loading}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={resetForm}
                className="flex-1"
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="signup-username" className="text-white">Username</Label>
              <Input
                id="signup-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black border-[#00FF9F]/20 text-white"
                required
                disabled={loading}
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-white">Email</Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-[#00FF9F]/20 text-white"
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-white">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-[#00FF9F]/20 text-white"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={resetForm}
                className="flex-1"
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </div>
          </form>
        )}

        {mode === "guest" && (
          <form onSubmit={handleGuestContinue} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="guest-username" className="text-white">Choose a Username</Label>
              <Input
                id="guest-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black border-[#00FF9F]/20 text-white"
                placeholder="Guest Player"
                required
                disabled={loading}
                maxLength={20}
              />
            </div>

            <p className="text-xs text-gray-400">
              Guest accounts are temporary. Create a full account to save your progress permanently.
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={resetForm}
                className="flex-1"
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Continue
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
