import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signToken, getAdminEmail, getAdminPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const targetAdminEmail = getAdminEmail();
    const targetAdminPassword = getAdminPassword();
    const normalizedEmail = email.trim().toLowerCase();

    // Verify email strictly matches the configured admin email
    if (normalizedEmail !== targetAdminEmail) {
      return NextResponse.json(
        { success: false, message: 'Access denied: Only authorized admin email can log in' },
        { status: 403 }
      );
    }

    // Verify password strictly matches configured ADMIN_PASSWORD
    if (password !== targetAdminPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin password' },
        { status: 401 }
      );
    }

    await connectDB();

    let user = await User.findOne({ email: normalizedEmail });

    // Seed or update password hash in DB
    const passwordHash = await bcrypt.hash(password, 10);
    if (!user) {
      user = await User.create({
        email: normalizedEmail,
        passwordHash,
        role: 'ADMIN',
      });
    } else {
      user.passwordHash = passwordHash;
      await user.save();
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
