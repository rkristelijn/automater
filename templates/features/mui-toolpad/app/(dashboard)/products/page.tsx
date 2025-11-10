'use client';
import * as React from 'react';
import Link from 'next/link';
import { Box, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PageContainer } from '@toolpad/core/PageContainer';
import { mockProducts } from '@/data/mockData';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Product ID',
    width: 100,
    renderCell: (params) => (
      <Link href={`/products/${params.value}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
        #{params.value}
      </Link>
    ),
  },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 300,
    renderCell: (params) => (
      <Link href={`/products/${params.row.id}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
        {params.value}
      </Link>
    ),
  },
  { field: 'category', headerName: 'Category', width: 150 },
  {
    field: 'price',
    headerName: 'Price',
    width: 120,
    renderCell: (params) => `$${params.value.toFixed(2)}`,
  },
  { field: 'stock', headerName: 'Stock', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'In Stock' ? 'success' : 'warning'}
        size="small"
      />
    ),
  },
];

export default function ProductsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <PageContainer><Box>Loading...</Box></PageContainer>;
  }

  return (
    <PageContainer>
      <Box sx={{ 
        // calc() usage: Dynamic height calculation for DataGrid
        // 100vh (full viewport) - 200px (estimated header + navigation space)
        // Best practice: Responsive height that adapts to viewport
        // Alternative: Use flexbox with flex: 1, but calc() is simpler here
        height: 'calc(100vh - 200px)', 
        width: '100%' 
      }}>
        <DataGrid
          rows={mockProducts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </PageContainer>
  );
}
