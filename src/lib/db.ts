import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (!MONGO_URI) {
    console.warn('MONGO_URI environment variable is missing. Database features will fallback to static data.');
    return null;
  }

  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongooseCache.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      console.log('MongoDB connected successfully');
      return m;
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      global.mongooseCache.promise = null;
      throw err;
    });
  }

  try {
    global.mongooseCache.conn = await global.mongooseCache.promise;
  } catch (e) {
    global.mongooseCache.promise = null;
    throw e;
  }

  return global.mongooseCache.conn;
}

declare global {
  var mongooseCache: {
    conn: any;
    promise: Promise<any> | null;
  };
}
