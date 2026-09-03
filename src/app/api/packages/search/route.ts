import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import TourPackage from '@/models/TourPackage';
import { checkRateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function GET(req: NextRequest) {
  try {
    // 1. Rate Limit Enforcement (Max 40 search requests per minute per IP)
    const rateLimit = checkRateLimit(req, {
      limit: 40,
      windowMs: 60 * 1000,
      identifier: 'package-search',
    });

    if (rateLimit.isRateLimited && rateLimit.response) {
      return rateLimit.response;
    }

    const { searchParams } = new URL(req.url);
    const query = (searchParams.get('q') || '').trim();

    await connectDB();

    if (!query) {
      const allPackages = await TourPackage.find({}).sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, count: allPackages.length, data: allPackages });
    }

    const safeRegex = new RegExp(escapeRegex(query), 'i');

    // Multi-field MongoDB regex search
    const matchedPackages = await TourPackage.find({
      $or: [
        { title: safeRegex },
        { slug: safeRegex },
        { route: safeRegex },
        { categories: safeRegex },
        { highlights: safeRegex },
        { 'itinerary.title': safeRegex },
        { 'itinerary.description': safeRegex },
        { 'itinerary.overnight': safeRegex },
      ],
    })
      .lean();

    // Sort by relevancy score (exact/title matches first)
    const qLower = query.toLowerCase();
    const sorted = matchedPackages.sort((a: any, b: any) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      const aStartsWith = aTitle.startsWith(qLower);
      const bStartsWith = bTitle.startsWith(qLower);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      const aTitleIncludes = aTitle.includes(qLower);
      const bTitleIncludes = bTitle.includes(qLower);

      if (aTitleIncludes && !bTitleIncludes) return -1;
      if (!aTitleIncludes && bTitleIncludes) return 1;

      return 0;
    });

    return NextResponse.json({
      success: true,
      query,
      count: sorted.length,
      data: sorted,
    });
  } catch (error: any) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to search packages' },
      { status: 500 }
    );
  }
}
