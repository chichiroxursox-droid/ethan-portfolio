-- Add guest_id to game_leaderboards for guest accounts
ALTER TABLE public.game_leaderboards
ADD COLUMN IF NOT EXISTS guest_id text;

-- Ensure update_updated_at_column uses a fixed search_path for security
ALTER FUNCTION public.update_updated_at_column()
SET search_path = public;