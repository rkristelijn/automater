import { createTheme } from '@mui/material/styles';

// Centralized theme following MUI best practices
// Reference: https://mui.com/material-ui/customization/theming/
export const theme = createTheme({
  cssVariables: true, // Enable CSS variables for theme switching
  components: {
    // Override PageContainer to remove maxWidth constraints
    // Reference: https://mui.com/toolpad/core/react-page-container/
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 'none !important',
          width: '100%',
        },
      },
    },
  },
});
