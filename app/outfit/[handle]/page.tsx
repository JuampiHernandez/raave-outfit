import { Metadata } from 'next';
import { getCachedOutfit } from '@/lib/supabase';
import { redirect } from 'next/navigation';

type Props = {
  params: { handle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const handle = decodeURIComponent(params.handle);
  const appUrl = process.env.NEXT_PUBLIC_URL || 'https://raave-outfit.vercel.app';
  
  // Try to get outfit from database
  const outfit = await getCachedOutfit(handle);
  
  if (outfit) {
    return {
      title: `${handle}'s RAAVE Outfit`,
      description: `Check out ${handle}'s outfit for RAAVE! Get yours at RAAVE Outfitter.`,
      openGraph: {
        title: `${handle}'s RAAVE Outfit`,
        description: `Check out ${handle}'s outfit for RAAVE! Get yours now!`,
        images: [`${appUrl}/api/og-image?handle=${encodeURIComponent(handle)}`],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${handle}'s RAAVE Outfit`,
        description: `Check out ${handle}'s outfit for RAAVE! Get yours now!`,
        images: [`${appUrl}/api/og-image?handle=${encodeURIComponent(handle)}`],
      },
    };
  }

  // Default metadata if outfit not found
  return {
    title: 'RAAVE Outfitter',
    description: 'Get your perfect outfit for RAAVE!',
  };
}

export default async function OutfitPage({ params }: Props) {
  const handle = decodeURIComponent(params.handle);
  
  // Redirect to home with handle parameter (will auto-load outfit)
  redirect(`/?handle=${encodeURIComponent(handle)}`);
}

