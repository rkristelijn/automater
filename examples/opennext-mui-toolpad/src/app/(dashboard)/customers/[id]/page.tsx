'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { mockCustomers } from '@/data/mockData';

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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