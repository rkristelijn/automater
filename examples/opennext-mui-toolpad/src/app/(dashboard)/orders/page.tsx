'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import Chip from '@mui/material/Chip';

const mockOrders = [
  { id: 1, customer: 'John Doe', product: 'MacBook Pro 16" M3 Max', amount: 3499.00, status: 'Completed', date: '2024-01-15' },
  { id: 2, customer: 'Jane Smith', product: 'Lily58 Pro Keyboard Kit', amount: 149.50, status: 'Pending', date: '2024-01-14' },
  { id: 3, customer: 'Bob Johnson', product: 'Samsung Odyssey G9 49" Ultrawide', amount: 1299.99, status: 'Shipped', date: '2024-01-13' },
  { id: 4, customer: 'Alice Brown', product: 'iPhone 15 Pro Max 1TB', amount: 1599.00, status: 'Completed', date: '2024-01-12' },
  { id: 5, customer: 'Charlie Wilson', product: 'AirPods Pro 2nd Gen', amount: 249.00, status: 'Shipped', date: '2024-01-11' },
  { id: 6, customer: 'Diana Lee', product: 'Samsung Galaxy S24 Ultra', amount: 1299.99, status: 'Pending', date: '2024-01-10' },
  { id: 7, customer: 'Frank Miller', product: 'NVIDIA RTX 4090 24GB', amount: 1599.99, status: 'Completed', date: '2024-01-09' },
  { id: 8, customer: 'Grace Chen', product: 'Dell XPS 17 OLED', amount: 2899.00, status: 'Shipped', date: '2024-01-08' },
  { id: 9, customer: 'Henry Davis', product: 'Samsung Galaxy Buds2 Pro', amount: 229.99, status: 'Completed', date: '2024-01-07' },
  { id: 10, customer: 'Ivy Taylor', product: 'LG UltraGear 38" Curved', amount: 999.99, status: 'Pending', date: '2024-01-06' },
];

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Order ID',
    width: 100,
    renderCell: (params) => (
      <Link href={`/orders/${params.value}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
        #{params.value}
      </Link>
    ),
  },
  { field: 'customer', headerName: 'Customer', width: 150, renderCell: (params) => (
    <Link href={`/customers/${params.row.id}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
      {params.value}
    </Link>
  )},
  { field: 'product', headerName: 'Product', width: 300, renderCell: (params) => (
    <Link href={`/products/${params.row.id}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
      {params.value}
    </Link>
  )},
  {
    field: 'amount',
    headerName: 'Amount',
    width: 120,
    renderCell: (params) => `$${params.value.toFixed(2)}`,
  },
  { field: 'date', headerName: 'Date', width: 120 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={
          params.value === 'Completed' ? 'success' :
          params.value === 'Shipped' ? 'info' : 'warning'
        }
        size="small"
      />
    ),
  },
];

export default function OrdersPage() {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={mockOrders}
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