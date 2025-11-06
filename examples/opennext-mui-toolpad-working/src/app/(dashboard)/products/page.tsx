'use client';
import * as React from '.pnpm/@types+react@19.2.2/node_modules/@types/react';
import Box from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Box';
import { DataGrid, GridColDef } from '.pnpm/@mui+x-data-grid@8.17.0_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emoti_2cfcf2f74f76f24a940e49dfd58e9811/node_modules/@mui/x-data-grid/esm';
import Link from '.pnpm/next@15.4.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/link';
import Chip from '.pnpm/@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2.2_react@19.1.0__@emotion+s_778016e08791bee5e5a69a011a64ceda/node_modules/@mui/material/esm/Chip';
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
  return (
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
  );
}