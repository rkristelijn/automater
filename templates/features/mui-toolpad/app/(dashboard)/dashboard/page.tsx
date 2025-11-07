import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function DashboardPage() {
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      gap: 3 
    }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Welcome to Toolpad
          </Typography>
          <Typography variant="body2">
            This is your admin dashboard built with MUI Toolpad Core.
          </Typography>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Quick Stats
          </Typography>
          <Typography variant="body2">
            Add your metrics and KPIs here.
          </Typography>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Recent Activity
          </Typography>
          <Typography variant="body2">
            Show recent user activities or system events.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
