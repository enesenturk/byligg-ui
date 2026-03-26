import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Check if user is authenticated
  const token = request.cookies.get('byligg_token')?.value;
  const isAuthenticated = !!token;

  // If accessing protected route without auth, redirect to landing
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If accessing public route while authenticated, could redirect to dashboard
  // But for now, allow access to landing page even when logged in

  // Add security headers
  const response = NextResponse.next();

  // Prevent XSS attacks
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || '';
  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ${apiEndpoint};`
  );

  return response;
}

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