import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { connectDB } from './db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'borah_tours_jwt_secret_key_2026';

export const getAdminEmail = () => (process.env.ADMIN_EMAIL || 'nibirdeka70@gmail.com').trim().toLowerCase();
export const getAdminPassword = () => process.env.ADMIN_PASSWORD || 'nibir@borah2026';

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
