import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Circle, Square, Triangle } from "lucide-react";

type GameObject = {
  id: number;
  type: "ball" | "domino" | "ramp";
  x: number;
  y: number;
  vx: number;
  vy: number;
  isActive: boolean;
};

const GRAVITY = 0.5;
const BOUNCE = 0.7;

export const RubeGoldbergBuilder = () => {
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setObjects(prev => {
        const updated = prev.map(obj => {
          if (!obj.isActive) return obj;

          let newX = obj.x + obj.vx;
          let newY = obj.y + obj.vy;
          let newVx = obj.vx;
          let newVy = obj.vy + GRAVITY;

          // Bottom collision
          if (newY > 400) {
            newY = 400;
            newVy = -newVy * BOUNCE;
            if (Math.abs(newVy) < 1) {
              newVy = 0;
              newVx *= 0.95;
            }
          }

          // Side collisions
          if (newX < 20 || newX > 580) {
            newVx = -newVx * BOUNCE;
            newX = Math.max(20, Math.min(580, newX));
          }

          // Check collisions with other objects
          prev.forEach(other => {
            if (other.id === obj.id || !other.isActive) return;
            const dx = newX - other.x;
            const dy = newY - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 40) {
              if (!other.isActive) {
                other.isActive = true;
                setScore(s => s + 10);
              }
            }
          });

          return { ...obj, x: newX, y: newY, vx: newVx, vy: newVy };
        });

        return updated;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isRunning]);

  const addObject = (type: GameObject["type"]) => {
    const newObj: GameObject = {
      id: nextId,
      type,
      x: Math.random() * 500 + 50,
      y: 50,
      vx: 0,
      vy: 0,
      isActive: false
    };
    setObjects([...objects, newObj]);
    setNextId(nextId + 1);
  };

  const startSimulation = () => {
    if (objects.length === 0) return;
    setIsRunning(true);
    setScore(0);
    setObjects(prev => prev.map((obj, i) => ({
      ...obj,
      isActive: i === 0,
      vx: i === 0 ? 5 : 0,
      vy: i === 0 ? -2 : 0
    })));
  };

  const reset = () => {
    setIsRunning(false);
    setObjects([]);
    setScore(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "ball": return Circle;
      case "domino": return Square;
      case "ramp": return Triangle;
      default: return Circle;
    }
  };

  return (
    <Card className="bg-[#0D0D0D] border-[#00FF9F]/30 p-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-[#00FF9F]">
            <div className="text-sm opacity-70">CHAIN REACTIONS</div>
            <div className="text-3xl font-bold">{score / 10}</div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => addObject("ball")}
              disabled={isRunning}
              className="bg-[#00D9FF] hover:bg-[#00D9FF]/80 text-black"
            >
              <Circle className="w-4 h-4 mr-2" />
              Ball
            </Button>
            <Button
              onClick={() => addObject("domino")}
              disabled={isRunning}
              className="bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black"
            >
              <Square className="w-4 h-4 mr-2" />
              Domino
            </Button>
            <Button
              onClick={() => addObject("ramp")}
              disabled={isRunning}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Triangle className="w-4 h-4 mr-2" />
              Ramp
            </Button>
          </div>
        </div>

        <div className="relative bg-black border border-[#00FF9F]/20 rounded h-[450px] overflow-hidden">
          {objects.map(obj => {
            const Icon = getIcon(obj.type);
            return (
              <div
                key={obj.id}
                className="absolute transition-colors"
                style={{
                  left: `${obj.x}px`,
                  top: `${obj.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Icon
                  className={`w-8 h-8 ${
                    obj.isActive
                      ? obj.type === "ball" ? "text-[#00D9FF]" : "text-[#00FF9F]"
                      : "text-gray-600"
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={startSimulation}
            disabled={isRunning || objects.length === 0}
            className="flex-1 bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold"
          >
            START CHAIN REACTION
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="border-gray-600 text-gray-400 hover:bg-gray-800"
          >
            RESET
          </Button>
        </div>

        <div className="text-gray-500 text-sm text-center font-mono">
          Add objects, then start to watch the chain reaction unfold!
        </div>
      </div>
    </Card>
  );
};
