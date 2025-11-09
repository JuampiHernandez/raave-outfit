/**
 * Supabase Client Configuration
 * Database for storing generated outfit images and caching results
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing environment variables. Database features will be disabled.');
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface OutfitRecord {
  id: string;
  handle: string;
  platform: string;
  style: string;
  original_image_url: string | null;
  generated_image_base64: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get cached outfit for a handle
 */
export async function getCachedOutfit(handle: string): Promise<OutfitRecord | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('outfits')
      .select('*')
      .eq('handle', handle.toLowerCase())
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 = not found
        console.error('[Supabase] Error fetching cached outfit:', error);
      }
      return null;
    }

    return data as OutfitRecord;
  } catch (error) {
    console.error('[Supabase] Exception fetching cached outfit:', error);
    return null;
  }
}

/**
 * Save generated outfit to database
 */
export async function saveOutfit(data: {
  handle: string;
  platform: string;
  style: string;
  originalImageUrl: string | null;
  generatedImageBase64: string;
}): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('outfits')
      .upsert({
        handle: data.handle.toLowerCase(),
        platform: data.platform,
        style: data.style,
        original_image_url: data.originalImageUrl,
        generated_image_base64: data.generatedImageBase64,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'handle',
      });

    if (error) {
      console.error('[Supabase] Error saving outfit:', error);
      return false;
    }

    console.log(`[Supabase] Saved outfit for ${data.handle}`);
    return true;
  } catch (error) {
    console.error('[Supabase] Exception saving outfit:', error);
    return false;
  }
}

/**
 * Get all outfits for gallery (paginated)
 */
export async function getAllOutfits(limit = 50, offset = 0): Promise<OutfitRecord[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('outfits')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[Supabase] Error fetching all outfits:', error);
      return [];
    }

    return (data as OutfitRecord[]) || [];
  } catch (error) {
    console.error('[Supabase] Exception fetching all outfits:', error);
    return [];
  }
}

/**
 * Manually upload outfit image for a handle (for failed avatar fetches)
 */
export async function uploadManualOutfit(data: {
  handle: string;
  platform: string;
  style: string;
  generatedImageBase64: string;
}): Promise<boolean> {
  return saveOutfit({
    ...data,
    originalImageUrl: null, // No original for manual uploads
  });
}

