'use client';
import * as React from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useActivePage } from '@toolpad/core/useActivePage';
import { mockOrders } from '@/data/mockData';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // use() hook: Unwraps Promise in client components
  // Why: Client components can't be async, but params is Promise in Next.js 15+
  // Best practice: Yes, this is the recommended way for client components
  // Alternative: Convert to Server Component (remove 'use client')
  const { id } = use(params);
  const activePage = useActivePage();
  const orderId = parseInt(id, 10);
  const order = mockOrders.find(o => o.id === orderId);

  if (!activePage) return null;

  const title = `Order #${id}`;
  const breadcrumbs = [
    ...activePage.breadcrumbs,
    { title, path: `${activePage.path}/${id}` },
  ];

  if (!order) {
    return (
      <PageContainer title={title} breadcrumbs={breadcrumbs}>
        <Box>
          <Typography variant="h5">Order not found</Typography>
          <Button component={Link} href="/orders" variant="outlined">
            Back to Orders
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
            href="/orders"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
          >
            Back to Orders
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2">
                Order #{order.id}
              </Typography>
              <Chip
                label={order.status}
                color={
                  order.status === 'Completed' ? 'success' :
                  order.status === 'Shipped' ? 'info' : 'warning'
                }
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Name:</strong> {order.customer}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {order.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {order.address}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Order Details
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Product:</strong> {order.product}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Amount:</strong> ${order.amount.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  <strong>Order Date:</strong> {order.date}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
}
