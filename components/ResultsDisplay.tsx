'use client';

import Image from 'next/image';

interface ResultsDisplayProps {
  originalImageUrl: string;
  generatedImageBase64: string;
  displayName: string;
  onTryAnother: () => void;
}

export default function ResultsDisplay({
  originalImageUrl,
  generatedImageBase64,
  displayName,
  onTryAnother,
}: ResultsDisplayProps) {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedImageBase64}`;
    link.download = `${displayName}-colores-del-sol.png`;
    link.click();
  };

  const shareOnTwitter = () => {
    // Download the image first so it's ready to attach
    downloadImage();
    
    // Open Twitter with pre-filled text
    const tweetText = encodeURIComponent(
      `Already have my outfit for @raave 🕺🏻\n\nCheck yours with @hoocrypto's outfit checker`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Success message */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-sol bg-clip-text text-transparent">
          Your RAAVE Outfit is Ready! 🕺🏻
        </h2>
        <p className="text-gray-600">
          {displayName}, you&apos;re all set for the raave!
        </p>
      </div>

      {/* Generated RAAVE Outfit - Center Display */}
      <div className="flex justify-center">
        <div className="w-full max-w-md space-y-3">
          <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-sol-orange shadow-2xl ring-4 ring-sol-yellow/30">
            <Image
              src={`data:image/png;base64,${generatedImageBase64}`}
              alt="RAAVE Outfit"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <p className="text-xs text-gray-500 text-center">
            AI Generated with Google Gemini ✨
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadImage}
          className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-sol hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Download Image 📥
        </button>
        <button
          onClick={shareOnTwitter}
          className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share on X
        </button>
      </div>

      {/* Share instructions */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          Click "Share on X" to post your Colores del Sol look! 🌞
        </p>
        <p className="text-xs text-gray-500">
          (The image will download automatically - just attach it to your tweet!)
        </p>
      </div>
      
      {/* Try another button */}
      <div className="text-center">
        <button
          onClick={onTryAnother}
          className="text-sm text-sol-orange hover:text-sol-red underline transition-colors"
        >
          Try another handle →
        </button>
      </div>
    </div>
  );
}

