'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { OutfitRecord } from '@/lib/supabase';

export default function GalleryPage() {
  const [outfits, setOutfits] = useState<OutfitRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const LIMIT = 6; // Reduced to avoid timeout with large base64 images

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async (loadMore = false) => {
    try {
      if (loadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError('');
      
      const currentOffset = loadMore ? offset : 0;
      
      // Add timeout for slow requests (30s due to large base64 images)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(`/api/gallery?limit=${LIMIT}&offset=${currentOffset}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Gallery] API error:', errorData);
        throw new Error(errorData.details || 'Failed to load gallery');
      }

      const data = await response.json();
      const newOutfits = data.outfits || [];
      
      if (loadMore) {
        setOutfits(prev => [...prev, ...newOutfits]);
      } else {
        setOutfits(newOutfits);
      }
      
      // Update offset for next load
      setOffset(currentOffset + LIMIT);
      
      // Show "Load More" button if we got a full batch (meaning there might be more)
      setHasMore(newOutfits.length === LIMIT);
    } catch (err) {
      console.error('[Gallery] ❌ Error loading gallery:', err);
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
        // Keep "Load More" button visible on timeout (there might be more outfits)
        if (loadMore) {
          setHasMore(true);
        }
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load gallery');
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    fetchGallery(true);
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-sol-yellow/20 via-sol-orange/10 to-sol-purple/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center space-y-4 mb-12">
          <div className="flex justify-between items-center mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sol-orange hover:text-sol-red transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <div></div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-sol bg-clip-text text-transparent">
            RAAVE Gallery
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Check out all the amazing outfits created for RAAVE! 🕺🏻
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sol-orange"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchGallery}
              className="mt-4 px-6 py-2 bg-sol-orange text-white rounded-lg hover:bg-sol-red transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && (
          <>
            {outfits.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">
                  No outfits yet! Be the first to create one.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-block px-6 py-3 bg-gradient-sol text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Create Your Outfit
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center text-gray-600">
                  {outfits.length} outfit{outfits.length !== 1 ? 's' : ''} in the gallery
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {outfits.map((outfit) => (
                    <div
                      key={outfit.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-fade-in"
                    >
                      {/* Outfit Image */}
                      <div className="relative aspect-square">
                        <Image
                          src={`data:image/png;base64,${outfit.generated_image_base64}`}
                          alt={`${outfit.handle}'s RAAVE outfit`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Outfit Info */}
                      <div className="p-3">
                        <h3 className="font-bold text-sm text-gray-800 truncate">
                          @{outfit.handle}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-8 text-center space-y-3">
                    {error && !loading && (
                      <p className="text-sm text-red-600">{error}</p>
                    )}
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="px-8 py-3 bg-gradient-sol text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingMore ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        'Load More Outfits'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}

