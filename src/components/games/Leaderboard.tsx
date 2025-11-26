import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Trophy, User } from "lucide-react";

type LeaderboardEntry = {
  id: string;
  player_name: string;
  score: number;
  difficulty?: string;
  wave?: number;
  created_at: string;
  user_id?: string;
  profiles?: {
    username: string | null;
    is_guest: boolean;
  };
};

type LeaderboardProps = {
  gameName: string;
  currentScore?: number;
  showDifficulty?: boolean;
  showWave?: boolean;
};

export const Leaderboard = ({ gameName, currentScore, showDifficulty, showWave }: LeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [gameName, currentScore]);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from("game_leaderboards")
        .select(`
          *,
          profiles:user_id (
            username,
            is_guest
          )
        `)
        .eq("game_name", gameName)
        .order("score", { ascending: false })
        .limit(10);

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-black/50 border-[#00FF9F]/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-[#FFD700]" />
        <h3 className="text-[#00FF9F] font-mono text-lg font-bold">TOP 10 LEADERBOARD</h3>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-4 font-mono text-sm">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="text-gray-500 text-center py-4 font-mono text-sm">No scores yet. Be the first!</div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-2 rounded font-mono text-sm ${
                currentScore && entry.score === currentScore
                  ? "bg-[#00FF9F]/20 border border-[#00FF9F]/50"
                  : "bg-black/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 text-center font-bold ${
                    index === 0
                      ? "text-[#FFD700]"
                      : index === 1
                      ? "text-[#C0C0C0]"
                      : index === 2
                      ? "text-[#CD7F32]"
                      : "text-gray-500"
                  }`}
                >
                  {index + 1}
                </span>
                <div className="flex items-center gap-2">
                  {entry.profiles?.is_guest && (
                    <User className="w-3 h-3 text-gray-500" />
                  )}
                  <span className="text-white truncate max-w-[150px]">
                    {entry.profiles?.username || entry.player_name}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {showWave && entry.wave && (
                  <span className="text-orange-500 text-xs">W{entry.wave}</span>
                )}
                <span className="text-[#00FF9F] font-bold min-w-[60px] text-right">{entry.score}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
