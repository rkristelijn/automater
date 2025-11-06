import * as React from '.pnpm/@types+react@19.2.2/node_modules/@types/react';
import Box from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Box';
import Card from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Card';
import CardContent from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/CardContent';
import Typography from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Typography';
import Chip from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Chip';
import Button from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Button';
import ArrowBackIcon from '.pnpm/@mui+icons-material@7.3.5_@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2._abf36ac447d274224975a5b39faba402/node_modules/@mui/icons-material/esm/ArrowBack';
import Link from '.pnpm/next@15.4.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/link';
import { notFound } from '.pnpm/next@15.4.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation';
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