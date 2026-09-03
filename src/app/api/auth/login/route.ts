import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signToken, isAuthorizedAdminEmail, getAdminPassword } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    // Enforce rate limiting: Max 10 login attempts per minute per IP
    const rateLimit = checkRateLimit(req, {
      limit: 10,
      windowMs: 60 * 1000,
      identifier: 'auth-login',
    });

    if (rateLimit.isRateLimited && rateLimit.response) {
      return rateLimit.response;
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Verify email is in authorized admin emails list (sintuborah81@gmail.com, nibirdeka70@gmail.com or env ADMIN_EMAILS)
    if (!isAuthorizedAdminEmail(normalizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Access denied: Email is not an authorized admin account' },
        { status: 403 }
      );
    }

    const targetAdminPassword = getAdminPassword();

    // Verify password matches configured ADMIN_PASSWORD
    if (password !== targetAdminPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin password' },
        { status: 401 }
      );
    }

    await connectDB();

    let user = await User.findOne({ email: normalizedEmail });

    // Seed or update password hash in DB for this admin user
    const passwordHash = await bcrypt.hash(password, 10);
    if (!user) {
      user = await User.create({
        email: normalizedEmail,
        passwordHash,
        role: 'ADMIN',
      });
    } else {
      user.passwordHash = passwordHash;
      user.role = 'ADMIN';
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
