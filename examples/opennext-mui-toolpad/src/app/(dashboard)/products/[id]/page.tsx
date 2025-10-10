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
import { mockProducts } from '@/data/mockData';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const productId = parseInt(id);
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <Box>
        <Typography variant="h5">Product not found</Typography>
        <Button component={Link} href="/products" variant="outlined">
          Back to Products
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          href="/products"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Products
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2">
              {product.name}
            </Typography>
            <Chip
              label={product.status}
              color={product.status === 'In Stock' ? 'success' : 'warning'}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Product Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>SKU:</strong> {product.sku}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Category:</strong> {product.category}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Description:</strong> {product.description}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Pricing & Inventory
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Price:</strong> $${product.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Stock Quantity:</strong> {product.stock} units
              </Typography>
              <Typography variant="body1">
                <strong>Product ID:</strong> #{product.id}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}