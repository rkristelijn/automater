'use client';
import * as React from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useActivePage } from '@toolpad/core/useActivePage';
import { mockCustomers } from '@/data/mockData';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // use() hook: Unwraps Promise in client components
  // Why: Client components can't be async, but params is Promise in Next.js 15+
  // Best practice: Yes, this is the recommended way for client components
  // Alternative: Convert to Server Component (remove 'use client')
  const { id } = use(params);
  const activePage = useActivePage();
  const customerId = parseInt(id, 10);
  const customer = mockCustomers.find(c => c.id === customerId);

  if (!activePage) return null;

  const title = customer ? customer.name : `Customer #${id}`;
  const breadcrumbs = [
    ...activePage.breadcrumbs,
    { title, path: `${activePage.path}/${id}` },
  ];

  if (!customer) {
    return (
      <PageContainer title={title} breadcrumbs={breadcrumbs}>
        <Box>
          <Typography variant="h5">Customer not found</Typography>
          <Button component={Link} href="/customers" variant="outlined">
            Back to Customers
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={title} breadcrumbs={breadcrumbs}>
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
    </PageContainer>
  );
}
