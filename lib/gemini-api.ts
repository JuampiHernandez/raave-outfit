/**
 * Google Gemini API Client
 * Uses Gemini 2.5 Flash Image Preview for image editing
 * Documentation: https://ai.google.dev/gemini-api/docs/image-generation
 */

import { GoogleGenAI } from '@google/genai';

// Rave outfit styles - each user gets assigned one deterministically
const RAVE_STYLES = [
  {
    name: 'HARDCORE TECHNO',
    description: `**HARDCORE TECHNO**: Industrial rave look
- Black base with bold Colores del Sol color-blocking
- Harness-style straps, utility vest, or structured jacket
- Tech pants with straps/buckles, combat boots
- Hard-edged, angular patterns
- Dark + vibrant color contrast
- ACCESSORIES: Futuristic visor sunglasses or wraparound shades in orange/red tint`,
  },
  {
    name: 'BEACH SUNSET',
    description: `**BEACH SUNSET**: Tropical rave vibes
- Flowy, lightweight fabrics in sunset gradients
- Open shirt or loose tank with sunset color flow (orange→yellow→purple)
- Comfortable shorts or linen pants
- Relaxed, breezy aesthetic
- Natural gradient transitions
- ACCESSORIES: Colorful bandana or headband with flower patterns`,
  },
  {
    name: 'NEO Y2K',
    description: `**NEO Y2K**: Futuristic throwback
- Shiny/metallic fabrics in Colores del Sol colors
- Crop tops, low-rise pants, or chunky platform shoes
- Tech-meets-fashion aesthetic
- Holographic or reflective accents
- Bold 2000s silhouettes
- ACCESSORIES: Tiny oval sunglasses or colored lens glasses (pink/purple/yellow)`,
  },
  {
    name: 'STREET HYPEBEAST',
    description: `**STREET HYPEBEAST**: Urban rave fashion
- Oversized graphic hoodie or windbreaker with color panels
- Baggy pants or cargo joggers
- Chunky sneakers with colored accents
- Streetwear meets rave energy
- Logo placements, bold graphics
- ACCESSORIES: Snapback cap or bucket hat in Colores del Sol colors`,
  },
  {
    name: 'MINIMAL LUXURY',
    description: `**MINIMAL LUXURY**: Clean and expensive-looking
- Solid-colored premium pieces in one dominant Colores del Sol color
- Sleek silhouettes, perfect fit
- Designer aesthetic (think high-end club wear)
- Subtle color accents, no patterns
- Sophisticated and polished
- ACCESSORIES: Sleek aviator or round frame sunglasses with subtle tint`,
  },
  {
    name: 'FESTIVAL FREE SPIRIT',
    description: `**FESTIVAL FREE SPIRIT**: Bohemian rave
- Patterned fabrics with Colores del Sol in tribal/geometric designs
- Layered pieces, flowing elements
- Mix of textures and prints
- Comfortable and expressive
- Artistic, creative vibe
- ACCESSORIES: Flower crown or wide-brim hat with colorful ribbons/flowers`,
  },
];

// Simple hash function to deterministically assign a style based on username
function getUserStyle(username: string): typeof RAVE_STYLES[0] {
  // Create a simple hash from the username
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo to get a style index
  const styleIndex = Math.abs(hash) % RAVE_STYLES.length;
  const selectedStyle = RAVE_STYLES[styleIndex];
  
  console.log(`[STYLE] User "${username}" assigned style: ${selectedStyle.name} (index: ${styleIndex})`);
  
  return selectedStyle;
}

/**
 * Generate a "Colores del Sol" outfit image from an avatar URL
 * @param avatarUrl - URL of the user's avatar image
 * @param username - Twitter username (used for deterministic style selection)
 */
export async function generateColoresSolOutfit(
  avatarUrl: string,
  username?: string
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    // Fetch the image from the URL
    const imageResponse = await fetch(avatarUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch avatar image');
    }

    const imageArrayBuffer = await imageResponse.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

    // Determine MIME type from URL or default to jpeg
    const mimeType = avatarUrl.toLowerCase().includes('.png')
      ? 'image/png'
      : 'image/jpeg';

    // Get the deterministic style for this user
    const userStyle = username ? getUserStyle(username) : RAVE_STYLES[0];

    // Create a detailed prompt for unique RAAVE outfit generation
    const prompt = [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64ImageData,
        },
      },
      {
        text: `CRITICAL INSTRUCTION: This is an OUTFIT EDITING task, NOT image generation. You must preserve EVERYTHING about the original image except the clothing.

🎯 EXACT PRESERVATION REQUIREMENTS (MUST FOLLOW):
1. Keep the EXACT same face, facial features, skin tone, hair, and expression
2. Keep the EXACT same background, setting, and environment
3. Keep the EXACT same pose, body position, and framing
4. Keep the EXACT same lighting, shadows, and photo quality
5. ONLY modify the clothing/outfit - absolutely nothing else

The person in the edited photo must look IDENTICAL to the original, just wearing different clothes.

---

🎨 RAVE OUTFIT ASSIGNMENT:
Transform ONLY the clothing into a rave outfit for RAAVE Buenos Aires using "Colores del Sol" theme.
Colors to use: Red (#FF4444), Orange (#FF8C00), Yellow (#FFD700), Purple (#9B59B6)

YOUR ASSIGNED STYLE FOR THIS USER:
${userStyle.description}

🎭 DESIGN RULES:
- Use realistic, wearable rave fashion (not costumes)
- Incorporate Colores del Sol colors naturally into the outfit
- Match the style to the person's vibe
- Ensure proper fabric textures, folds, and shadows
- Make it look like they're dressed for a real rave in Buenos Aires
- The edit should look professional and seamless
- IMPORTANT: Include the specified accessories (sunglasses, hats, headbands, etc.) as part of the outfit
- Accessories should match the overall style and color scheme

⚠️ REMINDER: The result must look like the SAME PERSON wearing different clothes and accessories. Face, facial features, background, pose - ALL must remain IDENTICAL. Only clothing and accessories change.`,
      },
    ];

    // Generate the image using Gemini 2.5 Flash Image Preview
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: prompt,
    });

    // Extract the generated image
    if (!response.candidates || response.candidates.length === 0) {
      console.error('No candidates in Gemini response');
      return null;
    }

    const candidate = response.candidates[0];
    if (!candidate || !candidate.content || !candidate.content.parts) {
      console.error('Invalid candidate structure in Gemini response');
      return null;
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return part.inlineData.data;
      }
    }

    return null;
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    throw error;
  }
}
