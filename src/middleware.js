import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*',
};

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    if (basicAuth) {
      const auth = basicAuth.split(' ')[1];
      const [ user, password ] = atob(auth).split(':');

      if (
        user === process.env.BASIC_USER_NAME ||
        password === process.env.BASIC_PASSWORD
      ) {
        return NextResponse.next();
      }
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}