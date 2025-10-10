'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import Chip from '@mui/material/Chip';
import { mockCustomers } from '@/data/mockData';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Customer ID',
    width: 120,
    renderCell: (params) => (
      <Link href={`/customers/${params.value}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
        #{params.value}
      </Link>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
    renderCell: (params) => (
      <Link href={`/customers/${params.row.id}`} style={{ color: '#1976d2', textDecoration: 'none' }}>
        {params.value}
      </Link>
    ),
  },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'address', headerName: 'Address', width: 300 },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'orders', headerName: 'Orders', width: 100 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Active' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
];

export default function CustomersPage() {
  return (
    <DataGrid
      rows={mockCustomers}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 25, 50]}
      checkboxSelection
      disableRowSelectionOnClick
      sx={{ 
        height: 'calc(100vh - 120px)',
        width: '100%'
      }}
    />
  );
}