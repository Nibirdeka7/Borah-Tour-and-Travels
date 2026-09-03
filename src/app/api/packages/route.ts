import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/auth';
import TourPackage from '@/models/TourPackage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    const packages = await TourPackage.find({}).sort({ createdAt: -1 });
    return NextResponse.json(
      { success: true, data: packages },
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
    if (!body.title || !body.duration || !body.image) {
      return NextResponse.json(
        { success: false, message: 'Title, duration, and cover image are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newPackage = await TourPackage.create({
      ...body,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
    });

    return NextResponse.json({ success: true, data: newPackage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const adminUser = await verifyAdminRequest(req);
    if (!adminUser) {
      return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Package ID is required' }, { status: 400 });
    }

    await connectDB();
    const updatedPackage = await TourPackage.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPackage) {
      return NextResponse.json({ success: false, message: 'Package not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPackage });
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
      return NextResponse.json({ success: false, message: 'Package ID is required' }, { status: 400 });
    }

    await connectDB();
    await TourPackage.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Package deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
