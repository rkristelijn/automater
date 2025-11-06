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
import { mockProducts } from '@/data/mockData';
import { use } from '.pnpm/@types+react@19.2.2/node_modules/@types/react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // use() hook: Unwraps Promise in client components
  // Why: Client components can't be async, but params is Promise in Next.js 15+
  // Best practice: Yes, this is the recommended way for client components
  // Alternative: Convert to Server Component (remove 'use client')
  const { id } = use(params);
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