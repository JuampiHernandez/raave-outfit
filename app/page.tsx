'use client';

import { useState, useEffect } from 'react';
import PlatformSelector from '@/components/PlatformSelector';
import HandleInput from '@/components/HandleInput';
import LoadingState from '@/components/LoadingState';
import ResultsDisplay from '@/components/ResultsDisplay';

type AppState = 'input' | 'resolving' | 'generating' | 'results' | 'error';

interface ProfileData {
  displayName: string;
  imageUrl: string;
}

interface ResultData {
  originalImageUrl: string;
  generatedImageBase64: string;
  displayName: string;
}

export default function Home() {
  const [state, setState] = useState<AppState>('input');
  const [handle, setHandle] = useState('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [error, setError] = useState('');
  
  // Fixed to Twitter only
  const platform = 'twitter';

  // Initialize Mini App SDK (optional, for when running in Base app)
  useEffect(() => {
    // Signal that the app is ready to be displayed
    // The SDK will be added when deploying as a Mini App
    if (typeof window !== 'undefined' && (window as any).Farcaster) {
      (window as any).Farcaster.actions?.ready();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setState('resolving');
      setError('');

      // Step 1: Resolve identity via Talent Protocol
      const resolveResponse = await fetch('/api/resolve-identity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, platform }),
      });

      if (!resolveResponse.ok) {
        const errorData = await resolveResponse.json();
        throw new Error(errorData.error || 'Failed to find profile');
      }

      const { profile } = await resolveResponse.json();
      setProfileData(profile);

      // Step 2: Generate outfit with Gemini
      setState('generating');

      const generateResponse = await fetch('/api/generate-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl: profile.imageUrl,
          username: handle // Pass username for deterministic style selection
        }),
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || 'Failed to generate outfit');
      }

      const { image } = await generateResponse.json();

      // Step 3: Show results
      setResultData({
        originalImageUrl: profile.imageUrl,
        generatedImageBase64: image,
        displayName: profile.displayName || profile.name || handle,
      });
      setState('results');
    } catch (err) {
      console.error('Error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
      setState('error');
    }
  };

  const handleReset = () => {
    setState('input');
    setHandle('');
    setProfileData(null);
    setResultData(null);
    setError('');
  };

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center space-y-4 mb-12">
          <div className="flex justify-end mb-4">
            <a
              href="/gallery"
              className="px-4 py-2 text-sol-orange hover:text-sol-red border-2 border-sol-orange hover:border-sol-red rounded-lg transition-colors font-medium"
            >
              View Gallery 🎨
            </a>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-sol bg-clip-text text-transparent">
            RAAVE Outfitter
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Not sure what to wear during the raave? Just enter your handle and we will get you the perfect fit ;)
          </p>
        </header>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8">
          {state === 'input' && (
            <div className="space-y-6 animate-fade-in">
              <HandleInput
                value={handle}
                onChange={setHandle}
                onSubmit={handleSubmit}
                isLoading={false}
                platform={platform}
              />
            </div>
          )}

          {(state === 'resolving' || state === 'generating') && (
            <LoadingState stage={state} />
          )}

          {state === 'results' && resultData && (
            <ResultsDisplay
              originalImageUrl={resultData.originalImageUrl}
              generatedImageBase64={resultData.generatedImageBase64}
              displayName={resultData.displayName}
              onTryAnother={handleReset}
            />
          )}

          {state === 'error' && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="text-6xl">😔</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Oops! Something went wrong
                </h3>
                <p className="text-red-600">{error}</p>
              </div>
              <button
                onClick={handleReset}
                className="py-3 px-6 rounded-xl font-semibold text-white bg-gradient-sol hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-600">
          <p>
            Made by{' '}
            <a
              href="https://twitter.com/hoocrypto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sol-orange hover:underline font-medium"
            >
              Juampi
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

