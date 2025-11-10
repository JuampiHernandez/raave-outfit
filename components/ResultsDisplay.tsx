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
    // Create shareable URL using the /outfit/[handle] route for proper OG metadata
    const shareUrl = `${window.location.origin}/outfit/${encodeURIComponent(displayName)}`;
    
    // Open Twitter with pre-filled text and URL
    const tweetText = encodeURIComponent(
      `Already have my outfit for @raave 🕺🏻\n\nCheck yours with @hoocrypto's outfit checker`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(shareUrl)}`;
    
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
        <div className="w-full max-w-md">
          <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-sol-orange shadow-2xl ring-4 ring-sol-yellow/30">
            <Image
              src={`data:image/png;base64,${generatedImageBase64}`}
              alt="RAAVE Outfit"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
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
          className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Share on X
        </button>
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

