'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: 4 
    }}>
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
  );
}