import * as React from '.pnpm/@types+react@19.2.2/node_modules/@types/react';
import Typography from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Typography';
import Box from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Box';
import Card from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Card';
import CardContent from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/CardContent';
import Grid from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Grid';

export default function DashboardPage() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
        </Grid>
      </Grid>
    </Box>
  );
}