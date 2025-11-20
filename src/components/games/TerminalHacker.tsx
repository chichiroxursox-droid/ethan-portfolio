import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Difficulty = "easy" | "medium" | "hard" | null;

const EASY_COMMANDS = [
  "INITIALIZE_MAINFRAME",
  "DECRYPT_DATABASE",
  "BYPASS_FIREWALL",
  "ACCESS_GRANTED",
  "OVERRIDE_SECURITY",
  "CRACK_ENCRYPTION",
  "PENETRATE_NETWORK",
  "EXPLOIT_VULNERABILITY",
  "GAIN_ROOT_ACCESS",
  "DISABLE_PROTOCOLS"
];

const MEDIUM_COMMANDS = [
  ...EASY_COMMANDS,
  "HIJACK_SESSION",
  "TRACE_PACKETS",
  "SPOOF_ADDRESS",
  "INJECT_PAYLOAD",
  "ESCALATE_PRIVILEGES",
  "BACKDOOR_ACCESS",
  "BRUTE_FORCE_ATTACK",
  "SQL_INJECTION",
  "ZERO_DAY_EXPLOIT",
  "ROOTKIT_INSTALL"
];

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
  const [currentCommand, setCurrentCommand] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [streak, setStreak] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioContext = useRef<AudioContext | null>(null);

  const getTimeForDifficulty = (diff: Difficulty) => {
    switch (diff) {
      case "easy": return 45;
      case "medium": return 30;
      case "hard": return 20;
      default: return 30;
    }
  };

  const getCommandsForDifficulty = (diff: Difficulty) => {
    switch (diff) {
      case "easy": return EASY_COMMANDS;
      case "medium": return MEDIUM_COMMANDS;
      case "hard": return COMMANDS;
      default: return COMMANDS;
    }
  };

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

  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    setIsPlaying(true);
    setScore(0);
    setStreak(0);
    setTimeLeft(getTimeForDifficulty(diff));
    setUserInput("");
    setLogs(["> SYSTEM INITIATED", `> DIFFICULTY: ${diff?.toUpperCase()}`, "> ATTEMPTING BREACH..."]);
    generateNewCommand();
    inputRef.current?.focus();
  };

  const endGame = () => {
    setIsPlaying(false);
    setLogs(prev => [...prev, `> BREACH ${score > 5 ? "SUCCESSFUL" : "FAILED"}`, `> FINAL SCORE: ${score}`]);
  };

  const generateNewCommand = () => {
    const commandPool = getCommandsForDifficulty(difficulty);
    const newCommand = commandPool[Math.floor(Math.random() * commandPool.length)];
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

  return (
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
                className="w-full bg-black border border-[#00FF9F]/30 rounded p-4 pl-8 text-white text-xl tracking-wider uppercase focus:outline-none focus:border-[#00FF9F]"
                placeholder="TYPE HERE..."
                autoFocus
              />
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div className="text-[#00FF9F] text-center text-sm mb-4">
              {score > 0 ? `LAST SCORE: ${score} | SELECT DIFFICULTY` : "SELECT DIFFICULTY LEVEL"}
            </div>
            <Button
              onClick={() => startGame("easy")}
              className="w-full bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold text-lg py-6"
            >
              EASY (45s)
            </Button>
            <Button
              onClick={() => startGame("medium")}
              className="w-full bg-[#00D9FF] hover:bg-[#00D9FF]/80 text-black font-bold text-lg py-6"
            >
              MEDIUM (30s)
            </Button>
            <Button
              onClick={() => startGame("hard")}
              className="w-full bg-red-500 hover:bg-red-500/80 text-white font-bold text-lg py-6"
            >
              HARD (20s)
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
