import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInAsGuest: (username: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

type Profile = {
  id: string;
  username: string | null;
  is_guest: boolean;
  guest_id: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetch to avoid blocking
          setTimeout(async () => {
            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
            setProfile(data);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setProfile(data);
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, username: string) => {
    // Check if username already exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();
    
    if (existingProfile) {
      toast({
        title: "Error",
        description: "Username already taken. Please choose a different one.",
        variant: "destructive",
      });
      return { error: { message: "Username already taken" } };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          username,
          is_guest: false,
        },
      },
    });
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Account created! You can now sign in.",
      });
    }
    
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/games`,
      },
    });
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    
    return { error };
  };

  const signInAsGuest = async (username: string) => {
    // Check if username already exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();
    
    if (existingProfile) {
      toast({
        title: "Error",
        description: "Username already taken. Please choose a different one.",
        variant: "destructive",
      });
      return { error: { message: "Username already taken" } };
    }

    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Create anonymous user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: `${guestId}@guest.local`,
      password: guestId,
      options: {
        data: {
          username,
          is_guest: true,
          guest_id: guestId,
        },
      },
    });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to create guest account",
        variant: "destructive",
      });
      return { error };
    }
    
    // Store guest ID in localStorage for persistence
    localStorage.setItem("guest_id", guestId);
    
    toast({
      title: "Welcome!",
      description: `Playing as ${username}`,
    });
    
    return { error: null };
  };

  const signOut = async () => {
    // Clear guest ID if exists
    localStorage.removeItem("guest_id");
    
    await supabase.auth.signOut();
    
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signInAsGuest,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
