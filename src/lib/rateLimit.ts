import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: { count: number; expiresAt: number };
}

const store: RateLimitStore = {};

// Periodic cleanup to avoid memory leak
if (typeof globalThis !== 'undefined') {
  const g = globalThis as any;
  if (!g.__rateLimitCleanupInterval) {
    g.__rateLimitCleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const ip in store) {
        if (store[ip].expiresAt < now) {
          delete store[ip];
        }
      }
    }, 5 * 60 * 1000);
  }
}

export function checkRateLimit(
  req: NextRequest,
  options: { limit?: number; windowMs?: number; identifier?: string } = {}
): { isRateLimited: boolean; currentCount: number; response?: NextResponse } {
  const limit = options.limit || 30; // Max requests per window
  const windowMs = options.windowMs || 60 * 1000; // 1 minute window
  const identifier = options.identifier || 'api';

  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || '127.0.0.1';

  const key = `${identifier}:${ip}`;
  const now = Date.now();

  if (!store[key] || store[key].expiresAt < now) {
    store[key] = { count: 1, expiresAt: now + windowMs };
  } else {
    store[key].count += 1;
  }

  const currentCount = store[key].count;

  if (currentCount > limit) {
    const retryAfter = Math.ceil((store[key].expiresAt - now) / 1000);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Too many requests. Please slow down and try again shortly.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(store[key].expiresAt / 1000)),
        },
      }
    );
    return { isRateLimited: true, currentCount, response };
  }

  return { isRateLimited: false, currentCount };
}
