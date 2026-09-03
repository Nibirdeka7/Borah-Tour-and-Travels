import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { connectDB } from './db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'borah_tours_jwt_secret_key_2026';

const DEFAULT_ADMIN_EMAILS = ['sintuborah81@gmail.com', 'nibirdeka70@gmail.com'];

export const getAdminEmails = (): string[] => {
  const list = [...DEFAULT_ADMIN_EMAILS];

  if (process.env.ADMIN_EMAILS) {
    const split = process.env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase());
    split.forEach((e) => {
      if (e && !list.includes(e)) list.push(e);
    });
  }

  if (process.env.ADMIN_EMAIL) {
    const single = process.env.ADMIN_EMAIL.trim().toLowerCase();
    if (single && !list.includes(single)) list.push(single);
  }

  return list;
};

export const isAuthorizedAdminEmail = (email: string): boolean => {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return getAdminEmails().includes(normalized);
};

export const getAdminPassword = (): string => process.env.ADMIN_PASSWORD || 'borah@2026';

export function signToken(payload: { userId: string; email: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function verifyAdminRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    const cookieToken = req.cookies.get('admin_token')?.value;
    if (cookieToken) token = cookieToken;
  }

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded || !decoded.userId) return null;

  await connectDB();
  const user = await User.findById(decoded.userId);
  if (!user || user.role !== 'ADMIN') return null;

  return user;
}
