'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import Chip from '@mui/material/Chip';
import { mockOrders } from '@/data/mockData';

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