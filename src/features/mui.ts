import { FeatureConfig } from '../types/feature.js';

export const muiFeature: FeatureConfig = {
  name: 'mui',
  description: 'Material UI v9 with CSS variables, dark/light mode, and Next.js App Router integration',
  category: 'styling',
  dependencies: [
    '@mui/material@^9',
    '@mui/icons-material@^9',
    '@mui/material-nextjs@^9',
    '@emotion/cache',
    '@emotion/react',
    '@emotion/styled',
  ],
  conflicts: ['tailwind'],
  files: {},
  instructions: [
    'MUI v9 installed with CSS variables theme',
    'ThemeRegistry component for SSR-compatible styling',
    'AppRouterCacheProvider with CSS layers enabled',
    'Light/dark color schemes configured',
    'No deep imports (enforced by MUI v7+ package layout)',
  ],
};
