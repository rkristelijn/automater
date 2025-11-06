'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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
