import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, Zap, Heart, Shield, Crosshair, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Leaderboard } from "./Leaderboard";
import { AuthDialog } from "./AuthDialog";
import { useAuth } from "@/contexts/AuthContext";

type Enemy = {
  id: number;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  speed: number;
  type: "basic" | "strong" | "fast" | "tank";
};

type Upgrade = {
  id: string;
  name: string;
  cost: number;
  description: string;
  effect: () => void;
};

type Tower = {
  id: number;
  x: number;
  y: number;
  cooldown: number;
  type: "basic" | "sniper" | "flame";
};

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
};

type Projectile = {
  id: number;
  x: number;
  y: number;
  targetId: number;
  type: "basic" | "sniper" | "flame";
};

type DefenseType = {
  type: "basic" | "sniper" | "flame";
  cost: number;
  icon: typeof Zap;
  color: string;
  name: string;
  range: number;
  damage: number;
  cooldown: number;
};

const DEFENSES: DefenseType[] = [
  { type: "basic", cost: 50, icon: Zap, color: "#00FF9F", name: "Basic Tower", range: 150, damage: 1, cooldown: 30 },
  { type: "sniper", cost: 200, icon: Crosshair, color: "#FF0000", name: "Sniper Tower", range: 250, damage: 3, cooldown: 90 },
  { type: "flame", cost: 75, icon: Flame, color: "#FF6600", name: "Flame Tower", range: 100, damage: 2, cooldown: 20 }
];

export const MiniHouseDefense = () => {
  const { user, profile } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [houseHealth, setHouseHealth] = useState(100);
  const [wave, setWave] = useState(0);
  const [money, setMoney] = useState(100);
  const [nextEnemyId, setNextEnemyId] = useState(1);
  const [nextTowerId, setNextTowerId] = useState(1);
  const [nextProjectileId, setNextProjectileId] = useState(1);
  const [nextParticleId, setNextParticleId] = useState(1);
  const [draggedDefense, setDraggedDefense] = useState<"basic" | "sniper" | "flame" | null>(null);
  const [waveActive, setWaveActive] = useState(false);
  const [enemiesToSpawn, setEnemiesToSpawn] = useState(0);
  const [enemiesRemaining, setEnemiesRemaining] = useState(0);
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [damageMultiplier, setDamageMultiplier] = useState(1);
  const [hasShield, setHasShield] = useState(false);
  const [speedBoost, setSpeedBoost] = useState(1);
  const [screenShake, setScreenShake] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);

  const HOUSE_X = 400;
  const HOUSE_Y = 200;

  const playSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'sawtooth' = 'sine') => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration);
  };

  const isBossWave = (waveNum: number) => waveNum > 0 && waveNum % 5 === 0;

  const getEnemyType = (waveNum: number): Enemy["type"] => {
    if (isBossWave(waveNum)) return "tank";
    if (waveNum < 3) return "basic";
    if (waveNum < 5) return Math.random() > 0.5 ? "basic" : "fast";
    if (waveNum < 8) return Math.random() > 0.7 ? "basic" : Math.random() > 0.5 ? "fast" : "strong";
    return ["basic", "fast", "strong", "tank"][Math.floor(Math.random() * 4)] as Enemy["type"];
  };

  const getEnemyStats = (type: Enemy["type"], waveNum: number) => {
    const baseHealth = 3 + Math.floor(waveNum * 0.8);
    const baseSpeed = 1 + waveNum * 0.12;
    const isBoss = isBossWave(waveNum);
    
    switch (type) {
      case "fast":
        return { health: baseHealth, speed: baseSpeed * 1.8, color: "#FFD700" };
      case "strong":
        return { health: baseHealth * 2.5, speed: baseSpeed * 0.7, color: "#FF4500" };
      case "tank":
        return { 
          health: isBoss ? baseHealth * 8 : baseHealth * 4, 
          speed: baseSpeed * 0.5, 
          color: isBoss ? "#FF00FF" : "#8B0000" 
        };
      default:
        return { health: baseHealth, speed: baseSpeed, color: "#FF0000" };
    }
  };

  const createExplosion = (x: number, y: number, color: string) => {
    const particleCount = 12;
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 2 + Math.random() * 2;
      newParticles.push({
        id: nextParticleId + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 1
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
    setNextParticleId(id => id + particleCount);
  };

  const createMuzzleFlash = (x: number, y: number) => {
    const flashParticles: Particle[] = [];
    for (let i = 0; i < 3; i++) {
      flashParticles.push({
        id: nextParticleId + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: "#FFFF00",
        life: 0.5
      });
    }
    setParticles(prev => [...prev, ...flashParticles]);
    setNextParticleId(id => id + 3);
  };

  const triggerScreenShake = () => {
    setScreenShake(10);
    setTimeout(() => setScreenShake(0), 200);
  };

  const upgrades: Upgrade[] = [
    {
      id: "damage",
      name: "Increase Damage",
      cost: 100,
      description: "+5% damage to all towers",
      effect: () => setDamageMultiplier(m => m + 0.05)
    },
    {
      id: "shield",
      name: "House Shield",
      cost: 150,
      description: "Blocks next 3 hits",
      effect: () => setHasShield(true)
    },
    {
      id: "speed",
      name: "Tower Speed",
      cost: 75,
      description: "Towers shoot 5% faster",
      effect: () => setSpeedBoost(s => s + 0.05)
    }
  ];

  const spawnEnemy = useCallback(() => {
    const enemyType = getEnemyType(wave);
    const stats = getEnemyStats(enemyType, wave);
    const newEnemy: Enemy = {
      id: nextEnemyId,
      x: 50,
      y: 150 + Math.random() * 100,
      health: stats.health,
      maxHealth: stats.health,
      speed: stats.speed,
      type: enemyType
    };
    setEnemies(prev => [...prev, newEnemy]);
    setNextEnemyId(id => id + 1);
    setEnemiesToSpawn(prev => prev - 1);
  }, [nextEnemyId, wave]);

  const getBaseTowerCost = (type: "basic" | "sniper" | "flame") => {
    const baseCosts = { basic: 50, sniper: 200, flame: 75 };
    return baseCosts[type] + Math.floor(wave / 3) * 10;
  };

  const startNextWave = () => {
    playSound(600, 0.2, 'square');
    const nextWave = wave + 1;
    setWave(nextWave);
    const enemyCount = isBossWave(nextWave) ? 1 : 6 + wave * 3;
    setEnemiesToSpawn(enemyCount);
    setEnemiesRemaining(enemyCount);
    setWaveActive(true);
    setShowUpgrades(false);
    setMoney(m => m + (isBossWave(nextWave) ? 100 : 40));
  };

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      // Update particles
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.1,
        life: p.life - 0.02
      })).filter(p => p.life > 0));

      // Move enemies
      setEnemies(prev => {
        const updated = prev.map(enemy => ({
          ...enemy,
          x: enemy.x + enemy.speed
        })).filter(enemy => {
          if (enemy.x >= HOUSE_X - 20) {
            if (hasShield) {
              setHasShield(false);
              playSound(300, 0.2, 'square');
            } else {
              setHouseHealth(h => Math.max(0, h - 10));
              triggerScreenShake();
            }
            setEnemiesRemaining(r => Math.max(0, r - 1));
            return false;
          }
          if (enemy.health <= 0) {
            const stats = getEnemyStats(enemy.type, wave);
            createExplosion(enemy.x, enemy.y, stats.color);
            setEnemiesRemaining(r => Math.max(0, r - 1));
            playSound(200, 0.1, 'sawtooth');
            return false;
          }
          return true;
        });
        return updated;
      });

      // Tower shooting
      setTowers(prev => prev.map(tower => {
        if (tower.cooldown > 0) {
          return { ...tower, cooldown: tower.cooldown - 1 };
        }

        const defense = DEFENSES.find(d => d.type === tower.type)!;
        const adjustedCooldown = Math.floor(defense.cooldown / speedBoost);
        let nearest: Enemy | null = null;
        let minDist = defense.range;
        
        enemies.forEach(enemy => {
          const dx = enemy.x - tower.x;
          const dy = enemy.y - tower.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            nearest = enemy;
          }
        });

        if (nearest) {
          setProjectiles(p => [...p, {
            id: nextProjectileId,
            x: tower.x,
            y: tower.y,
            targetId: nearest!.id,
            type: tower.type
          }]);
          createMuzzleFlash(tower.x, tower.y);
          playSound(600 + Math.random() * 200, 0.05);
          setNextProjectileId(id => id + 1);
          return { ...tower, cooldown: adjustedCooldown };
        }

        return tower;
      }));

      // Move projectiles
      setProjectiles(prev => {
        const updated: Projectile[] = [];
        prev.forEach(proj => {
          const target = enemies.find(e => e.id === proj.targetId);
          if (!target) return;

          const dx = target.x - proj.x;
          const dy = target.y - proj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 10) {
            const defense = DEFENSES.find(d => d.type === proj.type)!;
            const actualDamage = defense.damage * damageMultiplier;
            setEnemies(e => e.map(enemy => 
              enemy.id === proj.targetId 
                ? { ...enemy, health: enemy.health - actualDamage }
                : enemy
            ));
            if (target.health <= actualDamage) {
              setMoney(m => m + 25);
            }
          } else {
            updated.push({
              ...proj,
              x: proj.x + (dx / dist) * 8,
              y: proj.y + (dy / dist) * 8
            });
          }
        });
        return updated;
      });
    }, 1000 / 60);

      return () => clearInterval(gameLoop);
  }, [isPlaying, enemies, nextProjectileId, nextParticleId, towers, wave, hasShield, damageMultiplier]);

  useEffect(() => {
    if (!isPlaying || !waveActive || enemiesToSpawn <= 0) return;
    
    const spawnInterval = setInterval(() => {
      if (enemiesToSpawn > 0) {
        spawnEnemy();
      }
    }, 1500 - Math.min(wave * 80, 1200));

    return () => clearInterval(spawnInterval);
  }, [isPlaying, waveActive, enemiesToSpawn, wave, spawnEnemy]);

  useEffect(() => {
    if (waveActive && enemiesRemaining === 0 && enemies.length === 0 && enemiesToSpawn === 0) {
      setWaveActive(false);
      setShowUpgrades(true);
      playSound(800, 0.3);
    }
  }, [waveActive, enemiesRemaining, enemies.length, enemiesToSpawn]);

  useEffect(() => {
    if (houseHealth <= 0 && isPlaying) {
      setIsPlaying(false);
      setWaveActive(false);
      setGameOver(true);
      setFinalScore(wave * 100 + money);
      if (!user) {
        setShowAuthDialog(true);
      } else {
        submitScore();
      }
    }
  }, [houseHealth, isPlaying, wave, money, user]);

  const submitScore = async () => {
    if (!user || !profile) return;

    try {
      await supabase.from("game_leaderboards").insert({
        game_name: "Mini House Defense",
        player_name: profile.username || "Anonymous",
        score: finalScore,
        wave: wave,
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
    submitScore();
  };

  const startGame = () => {
    setIsPlaying(true);
    setEnemies([]);
    setTowers([]);
    setProjectiles([]);
    setParticles([]);
    setHouseHealth(100);
    setWave(0);
    setMoney(100);
    setWaveActive(false);
    setEnemiesToSpawn(0);
    setEnemiesRemaining(0);
    setShowUpgrades(false);
    setDamageMultiplier(1);
    setHasShield(false);
    setSpeedBoost(1);
    setScreenShake(0);
    setGameOver(false);
    setShowAuthDialog(false);
    setScoreSubmitted(false);
  };

  const handleDragStart = (e: React.DragEvent, defenseType: "basic" | "sniper" | "flame") => {
    const defense = DEFENSES.find(d => d.type === defenseType)!;
    const cost = getBaseTowerCost(defenseType);
    if (money >= cost && isPlaying) {
      setDraggedDefense(defenseType);
      
      // Create custom drag image (just the icon)
      const canvas = document.createElement('canvas');
      canvas.width = 40;
      canvas.height = 40;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = defense.color;
        ctx.beginPath();
        ctx.arc(20, 20, 15, 0, Math.PI * 2);
        ctx.fill();
      }
      e.dataTransfer.setDragImage(canvas, 20, 20);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedDefense) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cost = getBaseTowerCost(draggedDefense);
    
    const newTower: Tower = {
      id: nextTowerId,
      x,
      y,
      cooldown: 0,
      type: draggedDefense
    };
    setTowers(prev => [...prev, newTower]);
    setMoney(money - cost);
    setNextTowerId(id => id + 1);
    setDraggedDefense(null);
  };

  const getProjectileColor = (type: string) => {
    switch (type) {
      case "sniper": return "#FF0000";
      case "flame": return "#FF6600";
      default: return "#FFFF00";
    }
  };

  const purchaseUpgrade = (upgrade: Upgrade) => {
    if (money >= upgrade.cost) {
      setMoney(m => m - upgrade.cost);
      upgrade.effect();
      playSound(900, 0.2);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="bg-[#0D0D0D] border-[#00FF9F]/30 p-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm font-mono flex-wrap gap-4">
          <div className="flex items-center gap-2 text-red-500">
            <Heart className="w-5 h-5" />
            <span>HOUSE: {houseHealth}%</span>
            {hasShield && <Shield className="w-4 h-4 text-blue-400 animate-pulse" />}
          </div>
          <div className="text-[#00FF9F]">WAVE: {wave}</div>
          {waveActive && (
            <div className="text-orange-500">ENEMIES: {enemiesRemaining}</div>
          )}
          <div className="text-yellow-500">MONEY: ${money}</div>
          {damageMultiplier > 1 && (
            <div className="text-red-400">DMG: x{damageMultiplier.toFixed(1)}</div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {DEFENSES.map(defense => {
            const cost = getBaseTowerCost(defense.type);
            return (
              <div
                key={defense.type}
                draggable={money >= cost && isPlaying}
                onDragStart={(e) => handleDragStart(e, defense.type)}
                className={`bg-black border rounded p-3 text-center cursor-move transition-all ${
                  money >= cost && isPlaying
                    ? 'border-gray-700 hover:border-[#00FF9F]/50 hover:bg-[#00FF9F]/5'
                    : 'border-gray-800 opacity-50 cursor-not-allowed'
                }`}
              >
                <defense.icon className="w-6 h-6 mx-auto mb-2" style={{ color: defense.color }} />
                <div className="text-white text-xs font-bold mb-1">{defense.name}</div>
                <div className="text-yellow-500 text-xs">${cost}</div>
                <div className="text-gray-500 text-xs mt-1">
                  Dmg: {defense.damage} | Rng: {defense.range}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="relative bg-black border border-[#00FF9F]/20 rounded h-[400px] overflow-hidden transition-transform"
          style={{ transform: `translate(${Math.random() * screenShake - screenShake/2}px, ${Math.random() * screenShake - screenShake/2}px)` }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* House - centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Home className="w-12 h-12 text-[#00D9FF]" />
          </div>

          {/* Towers */}
          {towers.map(tower => {
            const defense = DEFENSES.find(d => d.type === tower.type)!;
            return (
              <div
                key={tower.id}
                className="absolute"
                style={{ left: `${tower.x}px`, top: `${tower.y}px`, transform: 'translate(-50%, -50%)' }}
              >
                <defense.icon className="w-6 h-6" style={{ color: defense.color }} />
                {tower.cooldown > 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                )}
              </div>
            );
          })}

          {/* Enemies */}
          {enemies.map(enemy => {
            const stats = getEnemyStats(enemy.type, wave);
            return (
              <div
                key={enemy.id}
                className="absolute transition-all duration-100"
                style={{ left: `${enemy.x}px`, top: `${enemy.y}px`, transform: 'translate(-50%, -50%)' }}
              >
                <div 
                  className="w-6 h-6 rounded-full relative"
                  style={{ 
                    backgroundColor: stats.color,
                    transform: enemy.type === "tank" ? "scale(1.3)" : enemy.type === "fast" ? "scale(0.8)" : "scale(1)"
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-700 rounded">
                    <div 
                      className="h-full rounded transition-all"
                      style={{ 
                        width: `${(enemy.health / enemy.maxHealth) * 100}%`,
                        backgroundColor: stats.color
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Particles */}
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ 
                left: `${particle.x}px`, 
                top: `${particle.y}px`,
                backgroundColor: particle.color,
                opacity: particle.life
              }}
            />
          ))}

          {/* Projectiles */}
          {projectiles.map(proj => (
            <div
              key={proj.id}
              className="absolute w-2 h-2 rounded-full"
              style={{ 
                left: `${proj.x}px`, 
                top: `${proj.y}px`,
                backgroundColor: getProjectileColor(proj.type)
              }}
            />
          ))}

          {!waveActive && isPlaying && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="space-y-4">
                {showUpgrades && wave > 0 && (
                  <div className="bg-black/90 border border-[#00FF9F]/30 rounded p-4 mb-4 space-y-3">
                    <div className="text-[#00FF9F] text-center font-bold mb-2">UPGRADES AVAILABLE</div>
                    {upgrades.map(upgrade => (
                      <button
                        key={upgrade.id}
                        onClick={() => purchaseUpgrade(upgrade)}
                        disabled={money < upgrade.cost}
                        className={`w-full text-left p-3 rounded border transition-all ${
                          money >= upgrade.cost
                            ? 'border-[#00FF9F]/50 hover:bg-[#00FF9F]/10 cursor-pointer'
                            : 'border-gray-700 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold text-sm">{upgrade.name}</span>
                          <span className="text-yellow-500 text-sm">${upgrade.cost}</span>
                        </div>
                        <div className="text-gray-400 text-xs">{upgrade.description}</div>
                      </button>
                    ))}
                  </div>
                )}
                <Button
                  onClick={startNextWave}
                  className="bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold text-lg px-8 py-4 w-full"
                >
                  START WAVE {wave + 1}
                </Button>
              </div>
            </div>
          )}
        </div>

        {!isPlaying ? (
          <>
            <Button
              onClick={startGame}
              className="w-full bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold"
            >
              {gameOver ? "PLAY AGAIN" : "START DEFENSE"}
            </Button>
          </>
        ) : (
          <div className="text-gray-500 text-sm text-center font-mono">
            {isBossWave(wave) && waveActive && (
              <span className="text-[#FF00FF] font-bold animate-pulse mr-2">⚠️ BOSS WAVE ⚠️</span>
            )}
            Drag defenses onto the field to protect the house!
          </div>
        )}
        </div>
      </Card>
      </div>
      <div className="lg:col-span-1">
        <Leaderboard gameName="Mini House Defense" currentScore={scoreSubmitted ? finalScore : undefined} showWave />
      </div>

      <AuthDialog
        open={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={handleAuthSuccess}
        score={finalScore}
        gameTitle="Mini House Defense"
      />
    </div>
  );
};
