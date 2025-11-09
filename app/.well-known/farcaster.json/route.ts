import { NextResponse } from 'next/server';

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS || '0x';

  const manifest = {
    accountAssociation: {
      // These will be generated using Base Build's account association tool
      // https://www.base.dev/preview?tab=account
      header: '',
      payload: '',
      signature: '',
    },
    baseBuilder: {
      ownerAddress: ownerAddress,
    },
    miniapp: {
      version: '1',
      name: 'Colores del Sol',
      homeUrl: appUrl,
      iconUrl: `${appUrl}/icon.png`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: '#FF8C00',
      webhookUrl: `${appUrl}/api/webhook`,
      subtitle: 'Transform your style',
      description:
        'Transform your profile picture with vibrant Colores del Sol outfit - featuring bright reds, oranges, yellows, and purples!',
      screenshotUrls: [
        `${appUrl}/screenshot1.png`,
        `${appUrl}/screenshot2.png`,
        `${appUrl}/screenshot3.png`,
      ],
      primaryCategory: 'art-creativity',
      tags: ['art', 'creativity', 'fun', 'social', 'avatar'],
      heroImageUrl: `${appUrl}/hero.png`,
      tagline: 'Style yourself instantly',
      ogTitle: 'Colores del Sol - Transform Your Style',
      ogDescription:
        'Get your profile picture styled with vibrant Colores del Sol colors!',
      ogImageUrl: `${appUrl}/og-image.png`,
      noindex: process.env.NODE_ENV === 'development', // Only index in production
    },
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

