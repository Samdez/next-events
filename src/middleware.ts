import { authMiddleware } from '@clerk/nextjs/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: [
    '/',
    '/concerts/:id',
    '/lieux/:slug',
    '/lieux',
    '/genres/:genre',
    '/agenda',
    '/privacy-policy',
    '/contact',
    '/api/webhooks/clerk',
    '/api/webhooks/payload',
    '/api/calendar',
    '/api/send',
  ],
});
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
