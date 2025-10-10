import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockOrders } from '@/data/mockData';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = parseInt(id);
  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    notFound();
  }

  return (
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
                <strong>Amount:</strong> $${order.amount.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                <strong>Order Date:</strong> {order.date}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}