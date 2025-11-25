-- Drop the email column from profiles table to prevent email exposure
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;

-- Update the handle_new_user function to not include email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, is_guest, guest_id)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE((new.raw_user_meta_data->>'is_guest')::boolean, false),
    new.raw_user_meta_data->>'guest_id'
  );
  RETURN new;
END;
$function$;