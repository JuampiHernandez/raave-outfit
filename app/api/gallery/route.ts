import { NextRequest, NextResponse } from 'next/server';
import { getAllOutfits } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const outfits = await getAllOutfits(limit, offset);

    return NextResponse.json({
      success: true,
      outfits,
      count: outfits.length,
    });
  } catch (error) {
    console.error('[Gallery API] Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to load gallery',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

