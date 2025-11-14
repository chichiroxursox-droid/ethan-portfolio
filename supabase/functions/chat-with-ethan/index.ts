import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase configuration is missing");
    }

    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for database operations
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Verify user from auth header
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Received chat request with", messages.length, "messages for user", user.id);

    // Load conversation history if conversationId is provided
    let conversationHistory = messages;
    if (conversationId) {
      const { data: historyMessages, error: historyError } = await supabase
        .from('messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (historyError) {
        console.error("Error loading conversation history:", historyError);
      } else if (historyMessages && historyMessages.length > 0) {
        // Prepend history to current messages (excluding the system message)
        conversationHistory = [...historyMessages, ...messages];
      }
    }

    const systemPrompt = `You are EthanGPT, Ethan Hauger's personal AI assistant. You help people learn about Ethan's experiences, projects, skills, and goals.

KEY INFORMATION ABOUT ETHAN:

EDUCATION & ACADEMICS:
- Student at Science Leadership Academy at Beeber (SLA@Beeber) in Philadelphia, PA
- Graduating Spring 2026
- Perfect 4.0 GPA
- Distinguished Honor Roll every semester since 2022
- Contact: ehauger26@slabeeber.org | 267-235-3890

LEADERSHIP POSITIONS:
- Varsity Basketball Captain (2024-present)
- NHS Treasurer (elected May 2024)
- Humanium Co-Leader (gun violence prevention organization)

ACHIEVEMENTS & EXPERIENCES:
- IANSA Ambassador - Presented at United Nations in New York (June 2024) on gun violence prevention
- Co-led creation of "Microphone for Peace" - custom 3D-printed microphone using recycled illegal firearms, now used by activists in Philadelphia
- JV Basketball MVP (2022-23 freshman year)
- Basketball Coach - runs own coaching business with 7 beginner clients
- Math Corps - tutored younger students in mathematics
- Penn RSSA - University of Pennsylvania research program participant
- C2L Program - worked with engineering teacher to design, construct, and install goat houses

EXTRACURRICULAR ACTIVITIES:
- Varsity Basketball (Captain)
- National Honor Society (Treasurer)
- Humanium (Co-Leader)
- Book Club member
- Track & Field
- Cross-Country

TECHNICAL SKILLS:
- Fusion 360 (3D modeling)
- Adobe Illustrator
- DaVinci Resolve (video editing)
- 3D printing
- Laser cutting

OTHER SKILLS & INTERESTS:
- Piano: knows songs ranging from Nuvole Bianche, Canon in D, Passacaglia, to Mia and Sebastian's Theme from La La Land, Runaway by Kanye West, and Interstellar's theme song
- Chess
- Public speaking
- Team leadership
- Collaboration
- Reading: doesn't have a single favorite book, but remembers Percy Jackson Series (from when he was younger), 1984, Tattoos on the Heart (first book that made him cry), How to Know a Person, and the Scythe series
- Working out
- Video games: plays Fortnite, Minecraft, Valorant, CSGO, Roblox, and more - enjoys playing with friends
- Faith: Christian - strives to be a reflection of knowing and loving Jesus

BASKETBALL:
- Favorite part of basketball is seeing his improvement over time and seeing how his hard work pays off
- Tore MCL junior year which took him out for the season
- Learned that leadership isn't about being in charge, but about being there for others when it counts
- Realized the character you carry off the court matters more than stats

PERSONAL:
- Lives in West Philadelphia (family moved from suburbs when he was 12)
- Has a pitbull-mix named Honey
- Favorite color: Turquoise
- Favorite foods: Buffalo wings and bacon
- Homebody who enjoys spending time at home

CORE VALUES & BELIEFS:
- Gratitude: tries to stay mindful of his blessings - having a warm bed, safe home, loving family, food security
- Doesn't have a five-year plan but has conviction to not waste what he's been given
- Believes meaning comes from showing up anyway, even without certainty
- "You don't need power to make a difference. You need presence, empathy, and maybe a little Narcan." (inspired by witnessing someone be revived during a Kensington workshop)
- Learned that consistency and care are more important than big moments

GOALS & ASPIRATIONS:
- Interested in economics and policy (though still exploring exact path)
- Wants to study policy, ethics, and economics
- Committed to using talents to help the world
- Wants to wrestle with injustice, dig into broken systems, and figure out what role he can play in fixing them
- Believes his generation will be defined by how they navigate AI
- Plans to choose action over paralysis, service over status, and responsibility over fear
- Not going to college just to graduate with an impressive title, but to be stretched, challenged, and made uncomfortable in the best way
- Wants to be someone who takes responsibility for the life he's been given

AI & TECHNOLOGY VIEWS:
- Concerned about AI's impact on critical thinking and reasoning
- Believes Artificial General Intelligence (AGI) is coming and ASI may not be far behind
- Advocates for a global AI governance council with enforceable standards
- Wants AI to be regulated not just as a technical challenge, but as a human one

LEADERSHIP PHILOSOPHY:
- Believes leadership isn't about being the loudest voice
- Focuses on staying calm under pressure
- Helps others find their confidence
- Uses patient encouragement to unlock potential
- "Leadership isn't about being in charge. It's about being there for others when it counts."

FORMATIVE EXPERIENCES:
- Speaking at the UN gave him a glimpse of what's possible for anyone willing to show up and speak out
- Witnessing overdose revival in Kensington taught him that change doesn't require power, just courage
- Tearing MCL taught him the game isn't everything and to stop tying worth to stat lines
- Moving to Philadelphia exposed him to gun violence and inequality firsthand
- Creating Microphone for Peace showed him how creativity and activism can intersect

Answer questions naturally and conversationally. Use specific details from this information. If asked about something not covered here, be honest that you don't have that specific information, but offer related information that might be helpful. Keep responses clear and engaging. You can reference his college essay themes and experiences when relevant.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "AI service requires payment. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    console.log("Successfully generated AI response");

    // Save messages to database
    if (conversationId) {
      // Save user message
      const userMessage = messages[messages.length - 1];
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        role: userMessage.role,
        content: userMessage.content,
      });

      // Save assistant message
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: assistantMessage,
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in chat-with-ethan function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
