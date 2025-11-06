import { FeatureConfig } from '../types/feature.js';

export const muiToolpadFeature: FeatureConfig = {
  name: 'mui-toolpad',
  description: 'Complete admin dashboard with MUI Toolpad Core',
  category: 'styling',
  dependencies: [
    '@toolpad/core@^0.9.0',
    '@mui/material@^6.2.0',
    '@mui/x-data-grid@^7.23.0',
    '@mui/icons-material@^6.2.0',
    '@emotion/react@^11.13.3',
    '@emotion/styled@^11.13.0',
  ],
  conflicts: ['tailwind'],
  files: {}, // Will be populated by template copying
  instructions: [
    'MUI Toolpad Core dashboard installed',
    'Complete CRUD interface with DataGrids',
    'Theme system with dark/light mode support',
    'Navigation and layout components configured',
  ],
};
