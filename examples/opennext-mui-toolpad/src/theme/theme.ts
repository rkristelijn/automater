import { createTheme } from '@mui/material/styles';

// Centralized theme following MUI best practices
// Reference: https://mui.com/material-ui/customization/theming/
export const theme = createTheme({
  // CSS Variables configuration for theme switching
  // Best practice: Enables runtime theme switching without re-rendering
  cssVariables: {
    // Toolpad-specific selector for theme switching
    // Why: Toolpad uses data-toolpad-color-scheme attribute for theme detection
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  // Color schemes: Define light and dark mode palettes
  // Best practice: Explicit color definitions prevent SSR flickering
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2', // Material Design blue
        },
        background: {
          default: '#f5f5f5', // Light gray background
          paper: '#ffffff',    // White paper surfaces
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9', // Lighter blue for dark mode contrast
        },
        background: {
          default: '#121212', // Material Design dark background
          paper: '#1e1e1e',   // Elevated dark surfaces
        },
      },
    },
  },
  components: {
    // Component overrides: Fix layout constraints
    // Why: Toolpad's default maxWidth constraints don't work well with DataGrids
    // Best practice: Override at theme level for consistency
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 'none !important', // Remove default maxWidth
          width: '100%',               // Full width containers
        },
      },
    },
  },
});
