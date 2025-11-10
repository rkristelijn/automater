'use client';
import * as React from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useActivePage } from '@toolpad/core/useActivePage';
import { mockProducts } from '@/data/mockData';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // use() hook: Unwraps Promise in client components
  // Why: Client components can't be async, but params is Promise in Next.js 15+
  // Best practice: Yes, this is the recommended way for client components
  // Alternative: Convert to Server Component (remove 'use client')
  const { id } = use(params);
  const activePage = useActivePage();
  const productId = parseInt(id, 10);
  const product = mockProducts.find(p => p.id === productId);

  if (!activePage) return null;

  const title = product ? product.name : `Product #${id}`;
  const breadcrumbs = [
    ...activePage.breadcrumbs,
    { title, path: `${activePage.path}/${id}` },
  ];

  if (!product) {
    return (
      <PageContainer title={title} breadcrumbs={breadcrumbs}>
        <Box>
          <Typography variant="h5">Product not found</Typography>
          <Button component={Link} href="/products" variant="outlined">
            Back to Products
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
                  <strong>Price:</strong> ${product.price.toFixed(2)}
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
    </PageContainer>
  );
}
