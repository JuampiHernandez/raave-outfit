/**
 * Utility functions
 */

/**
 * Validate a social media handle
 */
export function validateHandle(handle: string): boolean {
  if (!handle || handle.trim().length === 0) {
    return false;
  }

  // Remove @ if present
  const cleanHandle = handle.replace(/^@/, '');

  // Basic validation: alphanumeric, underscores, hyphens, 1-39 characters
  const handleRegex = /^[a-zA-Z0-9_-]{1,39}$/;
  return handleRegex.test(cleanHandle);
}

/**
 * Format a handle for display
 */
export function formatHandle(handle: string, platform: string): string {
  const cleanHandle = handle.replace(/^@/, '');
  return `@${cleanHandle}`;
}

/**
 * Get platform display name
 */
export function getPlatformDisplayName(platform: string): string {
  const names: Record<string, string> = {
    twitter: 'Twitter / X',
    farcaster: 'Farcaster',
    lens: 'Lens',
    github: 'GitHub',
  };
  return names[platform] || platform;
}

/**
 * Get platform icon emoji
 */
export function getPlatformIcon(platform: string): string {
  const icons: Record<string, string> = {
    twitter: '𝕏',
    farcaster: '🎭',
    lens: '🌿',
    github: '🐙',
  };
  return icons[platform] || '🔗';
}

/**
 * Sleep utility for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

