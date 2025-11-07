import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security hardening - Best practice: Disable powered-by header to prevent information disclosure
  // Reference: https://nextjs.org/blog/security-nextjs-server-components-actions
  poweredByHeader: false,
  
  // Security hardening - Best practice: OWASP recommended security headers
  // Reference: https://owasp.org/www-project-secure-headers/
  // More info: https://github.com/rkristelijn/automater/blob/main/docs/security-best-practices.md
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking attacks
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Enable XSS protection
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Control referrer information
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Restrict dangerous browser features
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Prevent resource sharing attacks
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          // Comprehensive Content Security Policy
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';" }
        ]
      }
    ];
  },
  /* config options here */
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
