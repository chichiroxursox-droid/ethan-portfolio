-- Create game leaderboards table
CREATE TABLE public.game_leaderboards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_name TEXT NOT NULL,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  difficulty TEXT,
  wave INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.game_leaderboards ENABLE ROW LEVEL SECURITY;

-- Create policies for game leaderboards (public read, anyone can submit)
CREATE POLICY "Anyone can view leaderboard scores" 
ON public.game_leaderboards 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can submit scores" 
ON public.game_leaderboards 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_game_leaderboards_game_score ON public.game_leaderboards(game_name, score DESC);
CREATE INDEX idx_game_leaderboards_created ON public.game_leaderboards(created_at DESC);