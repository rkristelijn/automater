import { FeatureConfig } from '../types/feature.js';

export const serverHardening: FeatureConfig = {
  name: 'serverHardening',
  description: 'Production-ready security headers and server hardening',
  category: 'security',
  defaultEnabled: true,
  dependencies: [],
  conflicts: [],
  files: {},
  
  nextConfigUpdates: {
    async: true,
    content: `
    poweredByHeader: false,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
            { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
            { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'" }
          ]
        }
      ];
    },`
  },

  instructions: [
    'Security headers configured with OWASP-compliant defaults',
    'Removes X-Powered-By header for security',
    'Headers applied to all routes automatically'
  ]
};
