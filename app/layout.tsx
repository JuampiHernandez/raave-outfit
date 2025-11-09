import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RAAVE Outfitter - Get Your Perfect Outfit',
  description:
    'Not sure what to wear during the raave? Enter your Twitter handle and get your perfect outfit featuring vibrant Colores del Sol!',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://raave-outfit.vercel.app'),
  openGraph: {
    title: 'RAAVE Outfitter - Get Your Perfect Outfit',
    description:
      'Not sure what to wear during the raave? Get your perfect outfit now!',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAAVE Outfitter - Get Your Perfect Outfit',
    description:
      'Not sure what to wear during the raave? Get your perfect outfit now!',
    images: ['/og-default.png'],
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

