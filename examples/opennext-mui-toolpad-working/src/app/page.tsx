'use client';
import { useState } from '.pnpm/@types+react@19.2.2/node_modules/@types/react';
import { useRouter } from '.pnpm/next@15.4.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation';
import Box from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Box';
import Typography from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Typography';
import Button from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Button';
import IconButton from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/IconButton';
import { ThemeProvider, createTheme } from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/styles';
import CssBaseline from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/CssBaseline';
import Brightness4Icon from '.pnpm/@mui+icons-material@7.3.5_@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2._abf36ac447d274224975a5b39faba402/node_modules/@mui/icons-material/esm/Brightness4';
import Brightness7Icon from '.pnpm/@mui+icons-material@7.3.5_@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2._abf36ac447d274224975a5b39faba402/node_modules/@mui/icons-material/esm/Brightness7';

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Create theme with proper mode switching
  const currentTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        padding: 4,
        position: 'relative'
      }}>
        {/* Theme toggle button */}
        <IconButton
          sx={{ position: 'absolute', top: 16, right: 16 }}
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to MUI Toolpad
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', maxWidth: 600 }}>
          Your admin dashboard is ready! Click below to access the Toolpad interface
          with navigation, authentication, and pre-built components.
        </Typography>
        
        <Button 
          variant="contained" 
          size="large"
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </Box>
    </ThemeProvider>
  );
}