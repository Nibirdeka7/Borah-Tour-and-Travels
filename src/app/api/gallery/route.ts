import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import GalleryImage from '@/models/GalleryImage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: images },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminUser = await verifyAdminRequest(req);
    if (!adminUser) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.image) {
      return NextResponse.json({ success: false, message: 'Image URL is required' }, { status: 400 });
    }

    await connectDB();
    const newGalleryItem = await GalleryImage.create(body);

    return NextResponse.json({ success: true, data: newGalleryItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const adminUser = await verifyAdminRequest(req);
    if (!adminUser) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
    }

    await connectDB();
    await GalleryImage.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
