import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const APP_URL = process.env.NEXT_PUBLIC_URL || 'https://raave-outfit.vercel.app';

export const metadata: Metadata = {
  title: 'RAAVE Outfitter - Get Your Perfect Outfit',
  description:
    'Not sure what to wear during the raave? Enter your Twitter handle and get your perfect outfit featuring vibrant Colores del Sol!',
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    url: APP_URL,
    title: 'RAAVE Outfitter - Get Your Perfect Outfit',
    description:
      'Not sure what to wear during the raave? Get your perfect outfit now!',
    siteName: 'RAAVE Outfitter',
    images: [
      {
        url: `${APP_URL}/raave-banner.png`,
        width: 1500,
        height: 500,
        alt: 'RAAVE Outfitter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hoocrypto',
    creator: '@hoocrypto',
    title: 'RAAVE Outfitter - Get Your Perfect Outfit',
    description:
      'Not sure what to wear during the raave? Get your perfect outfit now!',
    images: [`${APP_URL}/raave-banner.png`],
  },
};

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

