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

const mockOrders = [
  { id: 1, customer: 'John Doe', product: 'MacBook Pro 16" M3 Max', amount: 3499.00, status: 'Completed', date: '2024-01-15', email: 'john.doe@email.com', address: '123 Main St, New York, NY 10001' },
  { id: 2, customer: 'Jane Smith', product: 'Lily58 Pro Keyboard Kit', amount: 149.50, status: 'Pending', date: '2024-01-14', email: 'jane.smith@email.com', address: '456 Oak Ave, Los Angeles, CA 90210' },
  { id: 3, customer: 'Bob Johnson', product: 'Samsung Odyssey G9 49" Ultrawide', amount: 1299.99, status: 'Shipped', date: '2024-01-13', email: 'bob.johnson@email.com', address: '789 Pine Rd, Chicago, IL 60601' },
];

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = parseInt(params.id);
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