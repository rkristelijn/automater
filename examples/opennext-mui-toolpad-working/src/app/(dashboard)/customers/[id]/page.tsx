'use client';
import * as React from '.pnpm/@types+react@19.2.2/node_modules/@types/react';
import Box from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Box';
import Card from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Card';
import CardContent from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/CardContent';
import Typography from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Typography';
import Chip from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Chip';
import Button from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Button';
import ArrowBackIcon from '.pnpm/@mui+icons-material@7.3.5_@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2._abf36ac447d274224975a5b39faba402/node_modules/@mui/icons-material/esm/ArrowBack';
import Link from '.pnpm/next@15.4.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/link';
import { mockCustomers } from '@/data/mockData';
import { use } from '.pnpm/@types+react@19.2.2/node_modules/@types/react';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // use() hook: Unwraps Promise in client components
  // Why: Client components can't be async, but params is Promise in Next.js 15+
  // Best practice: Yes, this is the recommended way for client components
  // Alternative: Convert to Server Component (remove 'use client')
  const { id } = use(params);
  const customerId = parseInt(id);
  const customer = mockCustomers.find(c => c.id === customerId);

  if (!customer) {
    return (
      <Box>
        <Typography variant="h5">Customer not found</Typography>
        <Button component={Link} href="/customers" variant="outlined">
          Back to Customers
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          href="/customers"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Customers
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2">
              {customer.name}
            </Typography>
            <Chip
              label={customer.status}
              color={customer.status === 'Active' ? 'success' : 'default'}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {customer.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Phone:</strong> {customer.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {customer.address}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Customer ID:</strong> #{customer.id}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Total Orders:</strong> {customer.orders}
              </Typography>
              <Typography variant="body1">
                <strong>Member Since:</strong> {customer.joined}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}