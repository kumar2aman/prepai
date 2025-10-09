// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function will be called for every request that matches the config
export function middleware(request: NextRequest) {
  // 1. Get the token from the user's cookies
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  // 2. If the user has no token AND is trying to access a protected route (e.g., /dashboard)
  // redirect them to the sign-in page.
  if (!token && pathname.startsWith('/dashboard')) {
    const signinUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(signinUrl);
  }

  // 3. If the user HAS a token AND is trying to access an auth page (like sign-in)
  // redirect them away to the dashboard, because they are already logged in.
  if (token && pathname.startsWith('/auth/signin')) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 4. If none of the above, allow the request to continue
  return NextResponse.next();
}

// Configures which routes the middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};