import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Received chat request with", messages.length, "messages");

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
- Python programming
- Fusion 360 (3D modeling)
- Adobe Illustrator
- DaVinci Resolve (video editing)
- 3D printing

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

PERSONAL:
- Lives in West Philadelphia
- Has a pitbull-mix named Honey
- Favorite color: Turquoise
- Favorite foods: Buffalo wings and bacon
- Homebody who enjoys spending time at home

GOALS & ASPIRATIONS:
- Interested in economics and politics
- Committed to using talents to help the world
- Wants to make a positive impact on community
- Growing in Christian faith
- Still exploring exact career path

LEADERSHIP PHILOSOPHY:
- Believes leadership isn't about being the loudest voice
- Focuses on staying calm under pressure
- Helps others find their confidence
- Uses patient encouragement to unlock potential

Answer questions naturally and conversationally. Use specific details from this information. If asked about something not covered here, be honest that you don't have that specific information, but offer related information that might be helpful. Keep responses clear and engaging.`;

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
          ...messages,
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
    console.log("Successfully generated AI response");

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
