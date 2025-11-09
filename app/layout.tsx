import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const appUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  return {
    title: 'RAAVE Outfitter - Get Your Perfect Outfit',
    description:
      'Not sure what to wear during the raave? Enter your Twitter handle and get your perfect outfit featuring vibrant Colores del Sol!',
    openGraph: {
      title: 'RAAVE Outfitter - Get Your Perfect Outfit',
      description:
        'Not sure what to wear during the raave? Get your perfect outfit now!',
      images: [`${appUrl}/og-image.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'RAAVE Outfitter - Get Your Perfect Outfit',
      description:
        'Not sure what to wear during the raave? Get your perfect outfit now!',
      images: [`${appUrl}/og-image.png`],
    },
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: `${appUrl}/og-image.png`,
        button: {
          title: 'Get My Outfit',
          action: {
            type: 'launch_miniapp',
            name: 'RAAVE Outfitter',
            url: appUrl,
            splashImageUrl: `${appUrl}/splash.png`,
            splashBackgroundColor: '#FF8C00',
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}

