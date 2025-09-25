import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    const { story } = await req.json();

    if (!story || typeof story !== 'string' || story.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Story input is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Generating lyrics for story:', story);

    const prompt = `Create song lyrics based on this theme: "${story.trim()}"

Requirements:
- Generate a Verse section with 12-16 lines 
- Generate a Hook section with 4-8 lines (catchy and repeatable)
- NO numbering or bullet points
- Keep it appropriate and positive
- Make it catchy and memorable
- Focus on the emotions and story elements
- Each line should be concise but meaningful

Format the response exactly like this:
Verse:
[verse lyrics here, each line on a new line]

Hook:
[hook lyrics here, each line on a new line]

Return only the lyrics in this format, nothing else.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a professional songwriter who creates catchy, meaningful lyrics that rhyme perfectly.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedLyrics = data.choices[0].message.content;

    console.log('Generated lyrics:', generatedLyrics);

    return new Response(
      JSON.stringify({ lyrics: generatedLyrics }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-lyrics function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate lyrics. Please try again.' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});