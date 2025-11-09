import { NextRequest, NextResponse } from 'next/server';
import { uploadManualOutfit } from '@/lib/supabase';

/**
 * Manual Upload Endpoint
 * For handles that fail avatar fetching, you can manually upload outfit images
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { handle, imageBase64, style } = body;

    // Validate input
    if (!handle || typeof handle !== 'string') {
      return NextResponse.json(
        { error: 'Handle is required' },
        { status: 400 }
      );
    }

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { error: 'Image base64 is required' },
        { status: 400 }
      );
    }

    if (!style || typeof style !== 'string') {
      return NextResponse.json(
        { error: 'Style is required' },
        { status: 400 }
      );
    }

    // Save to database
    const success = await uploadManualOutfit({
      handle: handle.toLowerCase(),
      platform: 'twitter',
      style,
      generatedImageBase64: imageBase64,
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to upload outfit' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Outfit uploaded for @${handle}`,
    });
  } catch (error) {
    console.error('Error in upload-outfit:', error);
    return NextResponse.json(
      { error: 'Failed to upload outfit' },
      { status: 500 }
    );
  }
}

