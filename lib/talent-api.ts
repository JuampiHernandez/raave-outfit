/**
 * Talent Protocol API Client
 * Documentation: https://docs.talentprotocol.com/
 */

export type Platform = 'twitter' | 'farcaster' | 'lens' | 'github';

export interface TalentProfile {
  id: string;
  display_name: string;
  image_url: string;
  bio?: string;
  name?: string;
}

export interface TalentSearchResponse {
  profiles: TalentProfile[];
  pagination: {
    total: number;
  };
}

/**
 * Search for a profile by identity (handle)
 * Uses the Talent Protocol Advanced Search API with identity search
 */
export async function searchProfileByHandle(
  handle: string,
  platform: Platform
): Promise<TalentProfile | null> {
  const apiKey = process.env.TALENT_PROTOCOL_API_KEY;
  
  if (!apiKey) {
    throw new Error('TALENT_PROTOCOL_API_KEY is not configured');
  }

  // Clean the handle (remove @ if present)
  let cleanHandle = handle.replace(/^@/, '').trim();
  
  // For Lens, add .lens suffix if not present
  if (platform === 'lens' && !cleanHandle.toLowerCase().endsWith('.lens')) {
    cleanHandle = `${cleanHandle}.lens`;
  }
  
  // Map platform to Talent Protocol identity scope prefix
  const scopeMap: Record<Platform, string> = {
    twitter: 'twitter',
    farcaster: 'farcaster',
    lens: 'lens',
    github: 'github',
  };

  const scopePrefix = scopeMap[platform];
  
  // Use scope-limited identity search (e.g., "twitter:vitalik")
  const identity = `${scopePrefix}:${cleanHandle}`;

  try {
    // Build the query - search by identity with scope prefix and exact match
    const query = {
      identity: identity,
      exactMatch: true, // Only return exact matches
    };

    const sort = {
      score: { order: 'desc' },
      id: { order: 'desc' },
    };

    const queryString = new URLSearchParams({
      query: JSON.stringify(query),
      sort: JSON.stringify(sort),
      page: '1',
      per_page: '20', // Get more results to find exact matches
    });

    const url = `https://api.talentprotocol.com/search/advanced/profiles?${queryString}`;
    
    console.log('Searching Talent Protocol with identity:', identity);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-KEY': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Talent API Error:', response.status, response.statusText, errorText);
      return null;
    }

    const data: TalentSearchResponse = await response.json();
    
    console.log('Talent API Response:', {
      total: data.pagination?.total || 0,
      results: data.profiles?.length || 0,
      searchedFor: identity,
    });

    if (data.profiles && data.profiles.length > 0) {
      // First, try to find an exact match by checking display_name or searching in the profile data
      // Clean handle for comparison (remove dots and make lowercase)
      const cleanSearchHandle = cleanHandle.toLowerCase().replace(/\./g, '');
      
      // Look for profiles where the display name or name matches exactly
      const exactMatch = data.profiles.find(profile => {
        const profileDisplayName = (profile.display_name || '').toLowerCase().replace(/\./g, '');
        const profileName = (profile.name || '').toLowerCase().replace(/\./g, '');
        
        return profileDisplayName === cleanSearchHandle || 
               profileName === cleanSearchHandle ||
               profileDisplayName.startsWith(cleanSearchHandle) ||
               profileName.startsWith(cleanSearchHandle);
      });

      if (exactMatch && exactMatch.image_url) {
        console.log('Found exact match:', exactMatch.display_name);
        return exactMatch;
      }

      // Fallback: Return the first profile with an image
      const profileWithImage = data.profiles.find(p => p.image_url);
      if (profileWithImage) {
        console.log('Using first profile with image:', profileWithImage.display_name);
        return profileWithImage;
      }
      
      return data.profiles[0];
    }

    return null;
  } catch (error) {
    console.error('Error searching Talent Protocol:', error);
    throw error;
  }
}

/**
 * Validate if an image URL is accessible
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

