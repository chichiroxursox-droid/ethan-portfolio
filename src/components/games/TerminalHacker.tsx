import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Leaderboard } from "./Leaderboard";
import { AuthDialog } from "./AuthDialog";
import { useAuth } from "@/contexts/AuthContext";

const COMMANDS = [
  "INITIALIZE_MAINFRAME",
  "DECRYPT_DATABASE",
  "BYPASS_FIREWALL",
  "ACCESS_GRANTED",
  "OVERRIDE_SECURITY",
  "CRACK_ENCRYPTION",
  "PENETRATE_NETWORK",
  "EXPLOIT_VULNERABILITY",
  "GAIN_ROOT_ACCESS",
  "DISABLE_PROTOCOLS",
  "HIJACK_SESSION",
  "TRACE_PACKETS",
  "SPOOF_ADDRESS",
  "INJECT_PAYLOAD",
  "ESCALATE_PRIVILEGES",
  "BACKDOOR_ACCESS",
  "BRUTE_FORCE_ATTACK",
  "SQL_INJECTION",
  "ZERO_DAY_EXPLOIT",
  "ROOTKIT_INSTALL",
  "SNIFF_TRAFFIC",
  "MAN_IN_THE_MIDDLE",
  "DENIAL_OF_SERVICE",
  "PHISHING_CAMPAIGN",
  "SOCIAL_ENGINEERING",
  "KEYLOGGER_DEPLOY",
  "REVERSE_SHELL",
  "PRIVILEGE_ESCALATION",
  "BUFFER_OVERFLOW",
  "CROSS_SITE_SCRIPTING"
];

export const TerminalHacker = () => {
  const { user, profile } = useAuth();
  const [currentCommand, setCurrentCommand] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streak, setStreak] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [pendingScore, setPendingScore] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioContext = useRef<AudioContext | null>(null);

  const playSound = (frequency: number, duration: number) => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [timeLeft, isPlaying]);

  // Submit pending score when user authenticates
  useEffect(() => {
    if (user && profile && pendingScore !== null) {
      submitScore();
      setPendingScore(null);
    }
  }, [user, profile, pendingScore]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setStreak(0);
    setTimeLeft(20);
    setUserInput("");
    setScoreSubmitted(false);
    setPendingScore(null);
    setLogs(["> SYSTEM INITIATED", "> DIFFICULTY: HARD", "> ATTEMPTING BREACH..."]);
    generateNewCommand();
    inputRef.current?.focus();
  };

  const endGame = () => {
    setIsPlaying(false);
    setLogs(prev => [...prev, `> BREACH ${score > 5 ? "SUCCESSFUL" : "FAILED"}`, `> FINAL SCORE: ${score}`]);
    if (score > 0 && !user) {
      setPendingScore(score);
      setShowAuthDialog(true);
    } else if (score > 0 && user) {
      submitScore();
    }
  };

  const submitScore = async () => {
    if (!user || !profile) return;

    const scoreToSubmit = pendingScore || score;

    try {
      await supabase.from("game_leaderboards").insert({
        game_name: "Terminal Hacker",
        player_name: profile.username || "Anonymous",
        score: scoreToSubmit,
        difficulty: "hard",
        user_id: user.id,
        guest_id: profile.guest_id,
      });
      setScoreSubmitted(true);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthDialog(false);
    // Score will be submitted via useEffect when user/profile updates
  };

  const generateNewCommand = () => {
    const newCommand = COMMANDS[Math.floor(Math.random() * COMMANDS.length)];
    setCurrentCommand(newCommand);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);

    if (value === currentCommand) {
      const points = Math.floor(10 + streak * 2);
      setScore(score + points);
      setStreak(streak + 1);
      setLogs(prev => [...prev.slice(-5), `> ${currentCommand} - SUCCESS +${points}`]);
      playSound(800, 0.1);
      setUserInput("");
      generateNewCommand();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput && userInput !== currentCommand) {
      // Wrong input on Enter
      const newScore = Math.max(0, score - 5);
      setScore(newScore);
      setStreak(0);
      setLogs(prev => [...prev.slice(-5), `> ${userInput} - FAILED -5 (STREAK RESET)`]);
      playSound(200, 0.2);
      setUserInput("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="bg-[#0D0D0D] border-[#00FF9F]/30 p-8 font-mono">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-[#00FF9F]">
                <div className="text-sm opacity-70">SCORE</div>
                <div className="text-3xl font-bold">{score}</div>
              </div>
              <div className="text-[#00D9FF]">
                <div className="text-sm opacity-70">TIME</div>
                <div className="text-3xl font-bold">{timeLeft}s</div>
              </div>
              <div className="text-white">
                <div className="text-sm opacity-70">STREAK</div>
                <div className="text-3xl font-bold">x{streak}</div>
              </div>
            </div>

            <div className="bg-black border border-[#00FF9F]/20 rounded p-4 h-48 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="text-[#00FF9F] text-sm mb-1 animate-fade-in">
                  {log}
                </div>
              ))}
            </div>

            {isPlaying ? (
              <>
                <div className="bg-black border border-[#00D9FF]/30 rounded p-4">
                  <div className="text-[#00D9FF] text-sm mb-2">TARGET COMMAND:</div>
                  <div className="text-white text-2xl tracking-wider">{currentCommand}</div>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00FF9F]">{'>'}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-black border border-[#00FF9F]/30 rounded p-4 pl-8 text-white text-xl tracking-wider uppercase focus:outline-none focus:border-[#00FF9F]"
                    placeholder="TYPE HERE..."
                    autoFocus
                  />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="text-[#00FF9F] text-center text-sm mb-4">
                  {score > 0 ? `LAST SCORE: ${score}` : "READY TO START"}
                </div>
                <Button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-[#00FF9F] to-[#00D9FF] hover:opacity-90 text-black font-bold text-lg py-6"
                >
                  START GAME (20s)
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Leaderboard gameName="Terminal Hacker" currentScore={scoreSubmitted ? score : undefined} showDifficulty />
      </div>

      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={handleAuthSuccess}
        score={pendingScore || score}
        gameTitle="Terminal Hacker"
      />
    </div>
  );
};
