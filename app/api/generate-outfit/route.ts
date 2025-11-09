import { NextRequest, NextResponse } from 'next/server';
import { generateColoresSolOutfit } from '@/lib/gemini-api';
import { getCachedOutfit, saveOutfit } from '@/lib/supabase';

// Get the style assigned to a username (same logic as in gemini-api.ts)
function getAssignedStyle(username: string): string {
  const styles = [
    'HARDCORE TECHNO',
    'BEACH SUNSET',
    'NEO Y2K',
    'STREET HYPEBEAST',
    'MINIMAL LUXURY',
    'FESTIVAL FREE SPIRIT',
  ];
  
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = ((hash << 5) - hash) + username.charCodeAt(i);
    hash = hash & hash;
  }
  
  const styleIndex = Math.abs(hash) % styles.length;
  return styles[styleIndex];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, username, forceRegenerate } = body;

    console.log(`[API] Generate outfit request - username: ${username}, imageUrl: ${imageUrl}`);

    // Check cache first (unless force regenerate)
    if (username && !forceRegenerate) {
      const cached = await getCachedOutfit(username);
      if (cached) {
        console.log(`[API] ✅ Returning cached outfit for ${username}`);
        return NextResponse.json({
          success: true,
          image: cached.generated_image_base64,
          style: cached.style,
          cached: true,
        });
      }
      console.log(`[API] No cached outfit found for ${username}`);
    }

    // If imageUrl is 'cached', it means frontend is just checking cache
    // Return 404 to signal no cache exists
    if (imageUrl === 'cached') {
      console.log(`[API] Cache-only request for ${username} - no cache found`);
      return NextResponse.json(
        { error: 'No cached outfit found', cached: false },
        { status: 404 }
      );
    }

    // Validate input for new generation
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid image URL' },
        { status: 400 }
      );
    }

    console.log(`[API] Generating new outfit for user: ${username || 'unknown'}`)

    // Generate the outfit image (pass username for deterministic style)
    const generatedImageBase64 = await generateColoresSolOutfit(imageUrl, username);

    if (!generatedImageBase64) {
      return NextResponse.json(
        { error: 'Failed to generate outfit image' },
        { status: 500 }
      );
    }

    // Save to database for caching
    if (username) {
      // Get the style that was assigned to this user
      const style = getAssignedStyle(username);
      const saved = await saveOutfit({
        handle: username,
        platform: 'twitter',
        style,
        originalImageUrl: imageUrl,
        generatedImageBase64,
      });
      
      if (saved) {
        console.log(`[API] Successfully saved outfit for ${username}`);
      } else {
        console.error(`[API] Failed to save outfit for ${username}`);
      }
    }

    // Return the generated image as base64
    return NextResponse.json({
      success: true,
      image: generatedImageBase64,
      cached: false,
    });
  } catch (error) {
    console.error('Error in generate-outfit:', error);
    return NextResponse.json(
      { error: 'We couldn\'t generate your outfit, please try again' },
      { status: 500 }
    );
  }
}

// Increase the timeout for this API route (Vercel default is 10s)
export const maxDuration = 60; // 60 seconds

