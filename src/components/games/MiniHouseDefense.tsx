import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Zap, Heart, Shield, Crosshair, Flame } from "lucide-react";

type Enemy = {
  id: number;
  x: number;
  y: number;
  health: number;
  speed: number;
};

type Tower = {
  id: number;
  x: number;
  y: number;
  cooldown: number;
  type: "basic" | "sniper" | "flame";
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
  { type: "sniper", cost: 100, icon: Crosshair, color: "#FF0000", name: "Sniper Tower", range: 250, damage: 3, cooldown: 60 },
  { type: "flame", cost: 75, icon: Flame, color: "#FF6600", name: "Flame Tower", range: 100, damage: 2, cooldown: 20 }
];

export const MiniHouseDefense = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [houseHealth, setHouseHealth] = useState(100);
  const [wave, setWave] = useState(0);
  const [money, setMoney] = useState(150);
  const [nextEnemyId, setNextEnemyId] = useState(1);
  const [nextTowerId, setNextTowerId] = useState(1);
  const [nextProjectileId, setNextProjectileId] = useState(1);
  const [draggedDefense, setDraggedDefense] = useState<"basic" | "sniper" | "flame" | null>(null);
  const [waveActive, setWaveActive] = useState(false);
  const [enemiesToSpawn, setEnemiesToSpawn] = useState(0);
  const [enemiesRemaining, setEnemiesRemaining] = useState(0);

  const HOUSE_X = 400;
  const HOUSE_Y = 200;

  const spawnEnemy = useCallback(() => {
    const newEnemy: Enemy = {
      id: nextEnemyId,
      x: 50,
      y: 150 + Math.random() * 100,
      health: 3 + Math.floor(wave / 2),
      speed: 1 + wave * 0.1
    };
    setEnemies(prev => [...prev, newEnemy]);
    setNextEnemyId(id => id + 1);
    setEnemiesToSpawn(prev => prev - 1);
  }, [nextEnemyId, wave]);

  const startNextWave = () => {
    setWave(prev => prev + 1);
    const enemyCount = 5 + wave * 2;
    setEnemiesToSpawn(enemyCount);
    setEnemiesRemaining(enemyCount);
    setWaveActive(true);
    setMoney(m => m + 50);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      // Move enemies
      setEnemies(prev => {
        const updated = prev.map(enemy => ({
          ...enemy,
          x: enemy.x + enemy.speed
        })).filter(enemy => {
          if (enemy.x >= HOUSE_X - 20) {
            setHouseHealth(h => Math.max(0, h - 10));
            setEnemiesRemaining(r => Math.max(0, r - 1));
            return false;
          }
          if (enemy.health <= 0) {
            setEnemiesRemaining(r => Math.max(0, r - 1));
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
          setNextProjectileId(id => id + 1);
          return { ...tower, cooldown: defense.cooldown };
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
            setEnemies(e => e.map(enemy => 
              enemy.id === proj.targetId 
                ? { ...enemy, health: enemy.health - defense.damage }
                : enemy
            ));
            if (target.health <= defense.damage) {
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
  }, [isPlaying, enemies, nextProjectileId, towers]);

  useEffect(() => {
    if (!isPlaying || !waveActive || enemiesToSpawn <= 0) return;
    
    const spawnInterval = setInterval(() => {
      if (enemiesToSpawn > 0) {
        spawnEnemy();
      }
    }, 2000 - Math.min(wave * 100, 1500));

    return () => clearInterval(spawnInterval);
  }, [isPlaying, waveActive, enemiesToSpawn, wave, spawnEnemy]);

  useEffect(() => {
    if (waveActive && enemiesRemaining === 0 && enemies.length === 0 && enemiesToSpawn === 0) {
      setWaveActive(false);
    }
  }, [waveActive, enemiesRemaining, enemies.length, enemiesToSpawn]);

  useEffect(() => {
    if (houseHealth <= 0 && isPlaying) {
      setIsPlaying(false);
      setWaveActive(false);
    }
  }, [houseHealth, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setEnemies([]);
    setTowers([]);
    setProjectiles([]);
    setHouseHealth(100);
    setWave(0);
    setMoney(150);
    setWaveActive(false);
    setEnemiesToSpawn(0);
    setEnemiesRemaining(0);
  };

  const handleDragStart = (defenseType: "basic" | "sniper" | "flame") => {
    const defense = DEFENSES.find(d => d.type === defenseType)!;
    if (money >= defense.cost && isPlaying) {
      setDraggedDefense(defenseType);
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

    const defense = DEFENSES.find(d => d.type === draggedDefense)!;
    
    const newTower: Tower = {
      id: nextTowerId,
      x,
      y,
      cooldown: 0,
      type: draggedDefense
    };
    setTowers(prev => [...prev, newTower]);
    setMoney(money - defense.cost);
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

  return (
    <Card className="bg-[#0D0D0D] border-[#00FF9F]/30 p-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm font-mono flex-wrap gap-4">
          <div className="flex items-center gap-2 text-red-500">
            <Heart className="w-5 h-5" />
            <span>HOUSE: {houseHealth}%</span>
          </div>
          <div className="text-[#00FF9F]">WAVE: {wave}</div>
          {waveActive && (
            <div className="text-orange-500">ENEMIES: {enemiesRemaining}</div>
          )}
          <div className="text-yellow-500">MONEY: ${money}</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {DEFENSES.map(defense => (
            <div
              key={defense.type}
              draggable={money >= defense.cost && isPlaying}
              onDragStart={() => handleDragStart(defense.type)}
              className={`bg-black border rounded p-3 text-center cursor-move transition-all ${
                money >= defense.cost && isPlaying
                  ? 'border-gray-700 hover:border-[#00FF9F]/50 hover:bg-[#00FF9F]/5'
                  : 'border-gray-800 opacity-50 cursor-not-allowed'
              }`}
            >
              <defense.icon className="w-6 h-6 mx-auto mb-2" style={{ color: defense.color }} />
              <div className="text-white text-xs font-bold mb-1">{defense.name}</div>
              <div className="text-yellow-500 text-xs">${defense.cost}</div>
              <div className="text-gray-500 text-xs mt-1">
                Dmg: {defense.damage} | Rng: {defense.range}
              </div>
            </div>
          ))}
        </div>

        <div
          className="relative bg-black border border-[#00FF9F]/20 rounded h-[400px] overflow-hidden"
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
          {enemies.map(enemy => (
            <div
              key={enemy.id}
              className="absolute transition-all duration-100"
              style={{ left: `${enemy.x}px`, top: `${enemy.y}px`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="w-6 h-6 bg-red-500 rounded-full relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-700 rounded">
                  <div 
                    className="h-full bg-red-500 rounded transition-all"
                    style={{ width: `${(enemy.health / (3 + Math.floor(wave / 2))) * 100}%` }}
                  />
                </div>
              </div>
            </div>
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
              <Button
                onClick={startNextWave}
                className="bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold text-lg px-8 py-4"
              >
                START WAVE {wave + 1}
              </Button>
            </div>
          )}
        </div>

        {!isPlaying ? (
          <Button
            onClick={startGame}
            className="w-full bg-[#00FF9F] hover:bg-[#00FF9F]/80 text-black font-bold"
          >
            {houseHealth <= 0 ? `GAME OVER - WAVE ${wave}` : "START DEFENSE"}
          </Button>
        ) : (
          <div className="text-gray-500 text-sm text-center font-mono">
            Drag defenses onto the field to protect the house!
          </div>
        )}
      </div>
    </Card>
  );
};
