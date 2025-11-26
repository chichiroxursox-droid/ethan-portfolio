-- Add unique constraint to username column in profiles table
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_username_unique UNIQUE (username);

-- Create index for faster username lookups
CREATE INDEX idx_profiles_username ON public.profiles(username) WHERE username IS NOT NULL;