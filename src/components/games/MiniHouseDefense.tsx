import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Zap, Heart } from "lucide-react";

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
};

type Projectile = {
  id: number;
  x: number;
  y: number;
  targetId: number;
};

export const MiniHouseDefense = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [houseHealth, setHouseHealth] = useState(100);
  const [wave, setWave] = useState(0);
  const [money, setMoney] = useState(100);
  const [nextEnemyId, setNextEnemyId] = useState(1);
  const [nextTowerId, setNextTowerId] = useState(1);
  const [nextProjectileId, setNextProjectileId] = useState(1);

  const TOWER_COST = 50;
  const HOUSE_X = 550;

  const spawnEnemy = useCallback(() => {
    const newEnemy: Enemy = {
      id: nextEnemyId,
      x: 50,
      y: 200 + Math.random() * 100,
      health: 3 + Math.floor(wave / 2),
      speed: 1 + wave * 0.1
    };
    setEnemies(prev => [...prev, newEnemy]);
    setNextEnemyId(id => id + 1);
  }, [nextEnemyId, wave]);

  const placeTower = (x: number, y: number) => {
    if (money < TOWER_COST || !isPlaying) return;
    const newTower: Tower = {
      id: nextTowerId,
      x,
      y,
      cooldown: 0
    };
    setTowers(prev => [...prev, newTower]);
    setMoney(money - TOWER_COST);
    setNextTowerId(id => id + 1);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      // Move enemies
      setEnemies(prev => prev.map(enemy => ({
        ...enemy,
        x: enemy.x + enemy.speed
      })).filter(enemy => {
        if (enemy.x >= HOUSE_X) {
          setHouseHealth(h => Math.max(0, h - 10));
          return false;
        }
        return enemy.health > 0;
      }));

      // Tower shooting
      setTowers(prev => prev.map(tower => {
        if (tower.cooldown > 0) {
          return { ...tower, cooldown: tower.cooldown - 1 };
        }

        // Find nearest enemy
        let nearest: Enemy | null = null;
        let minDist = 150;
        
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
            targetId: nearest!.id
          }]);
          setNextProjectileId(id => id + 1);
          return { ...tower, cooldown: 30 };
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
            setEnemies(e => e.map(enemy => 
              enemy.id === proj.targetId 
                ? { ...enemy, health: enemy.health - 1 }
                : enemy
            ));
            if (target.health <= 1) {
              setMoney(m => m + 25);
            }
          } else {
            updated.push({
              ...proj,
              x: proj.x + (dx / dist) * 5,
              y: proj.y + (dy / dist) * 5
            });
          }
        });
        return updated;
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [isPlaying, enemies, nextProjectileId]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const waveInterval = setInterval(() => {
      spawnEnemy();
    }, 2000 - Math.min(wave * 100, 1500));

    return () => clearInterval(waveInterval);
  }, [isPlaying, wave, spawnEnemy]);

  useEffect(() => {
    if (houseHealth <= 0 && isPlaying) {
      setIsPlaying(false);
    }
  }, [houseHealth, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setEnemies([]);
    setTowers([]);
    setProjectiles([]);
    setHouseHealth(100);
    setWave(1);
    setMoney(100);
  };

  return (
    <Card className="bg-[#0D0D0D] border-[#00FF9F]/30 p-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center text-sm font-mono">
          <div className="flex items-center gap-2 text-red-500">
            <Heart className="w-5 h-5" />
            <span>HOUSE: {houseHealth}%</span>
          </div>
          <div className="text-[#00FF9F]">WAVE: {wave}</div>
          <div className="text-yellow-500">MONEY: ${money}</div>
        </div>

        <div
          className="relative bg-black border border-[#00FF9F]/20 rounded h-[400px] overflow-hidden cursor-crosshair"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            placeTower(x, y);
          }}
        >
          {/* House */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Home className="w-16 h-16 text-[#00D9FF]" />
          </div>

          {/* Towers */}
          {towers.map(tower => (
            <div
              key={tower.id}
              className="absolute"
              style={{ left: `${tower.x}px`, top: `${tower.y}px`, transform: 'translate(-50%, -50%)' }}
            >
              <Zap className="w-6 h-6 text-[#00FF9F]" />
              {tower.cooldown > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full" />
              )}
            </div>
          ))}

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
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{ left: `${proj.x}px`, top: `${proj.y}px` }}
            />
          ))}
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
            Click to place towers (${TOWER_COST} each) • Defend the house from enemies!
          </div>
        )}
      </div>
    </Card>
  );
};
