'use client';

import { useState, useEffect } from 'react';
import PlatformSelector from '@/components/PlatformSelector';
import HandleInput from '@/components/HandleInput';
import LoadingState from '@/components/LoadingState';
import ResultsDisplay from '@/components/ResultsDisplay';

type AppState = 'input' | 'resolving' | 'generating' | 'results' | 'error' | 'upload';

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

  // Initialize Mini App SDK and handle URL params
  useEffect(() => {
    // Signal that the app is ready to be displayed
    // The SDK will be added when deploying as a Mini App
    if (typeof window !== 'undefined' && (window as any).Farcaster) {
      (window as any).Farcaster.actions?.ready();
    }

    // Check for handle in URL params
    const params = new URLSearchParams(window.location.search);
    const urlHandle = params.get('handle');
    if (urlHandle) {
      setHandle(urlHandle);
      // Auto-trigger search after a short delay
      setTimeout(() => {
        handleSubmit();
      }, 500);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setState('resolving');
      setError('');

      // Step 1: Check cache first (try to generate with cached data)
      console.log(`[Frontend] Checking cache for: ${handle}`);
      
      const generateResponse = await fetch('/api/generate-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl: 'cached', // Signal to check cache first
          username: handle
        }),
      });

      // If cached outfit exists, use it immediately
      if (generateResponse.ok) {
        const { image, cached } = await generateResponse.json();
        
        if (cached) {
          console.log(`[Frontend] ✅ Loaded from cache for: ${handle}`);
          setResultData({
            originalImageUrl: '', // Not needed for cached results
            generatedImageBase64: image,
            displayName: handle,
          });
          setState('results');
          return;
        }
      }

      // Step 2: No cache - need to fetch avatar and generate new outfit
      console.log(`[Frontend] No cache found, fetching avatar for: ${handle}`);
      setState('resolving');

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

      // Step 3: Generate new outfit with fetched avatar
      setState('generating');

      const generateNewResponse = await fetch('/api/generate-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          imageUrl: profile.imageUrl,
          username: handle
        }),
      });

      if (!generateNewResponse.ok) {
        const errorData = await generateNewResponse.json();
        throw new Error(errorData.error || 'Failed to generate outfit');
      }

      const { image } = await generateNewResponse.json();

      // Step 4: Show results
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

  const handleUploadClick = () => {
    setState('upload');
    setError('');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    try {
      setState('generating');
      
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        // Generate outfit with uploaded image
        const generateResponse = await fetch('/api/generate-outfit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            imageUrl: base64String, // Send base64 directly
            username: handle
          }),
        });

        if (!generateResponse.ok) {
          const errorData = await generateResponse.json();
          throw new Error(errorData.error || 'Failed to generate outfit');
        }

        const { image } = await generateResponse.json();

        setResultData({
          originalImageUrl: base64String,
          generatedImageBase64: image,
          displayName: handle,
        });
        setState('results');
      };
      
      reader.onerror = () => {
        throw new Error('Failed to read image file');
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to process image. Please try again.'
      );
      setState('error');
    }
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
                <p className="text-gray-600 text-sm mt-2">
                  Can't find your avatar? Upload your own photo instead!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Try Another Handle
                </button>
                <button
                  onClick={handleUploadClick}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-sol hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  📤 Upload Your Photo
                </button>
              </div>
            </div>
          )}

          {state === 'upload' && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="text-6xl">📸</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Upload Your Photo
                </h3>
                <p className="text-gray-600">
                  Upload a photo of yourself to generate your RAAVE outfit!
                </p>
                <p className="text-sm text-gray-500">
                  Handle: <span className="font-semibold text-sol-orange">{handle}</span>
                </p>
              </div>
              
              <div className="max-w-md mx-auto">
                <label className="block">
                  <div className="border-2 border-dashed border-sol-orange rounded-xl p-8 cursor-pointer hover:bg-sol-orange/5 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <div className="text-4xl">🖼️</div>
                      <p className="text-gray-700 font-medium">
                        Click to select a photo
                      </p>
                      <p className="text-sm text-gray-500">
                        JPG, PNG, or GIF (max 5MB)
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <button
                onClick={handleReset}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                ← Back to search
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

