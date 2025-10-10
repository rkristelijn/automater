'use client';
import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { usePathname, useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'customers',
    title: 'Customers',
    icon: <PeopleIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <InventoryIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
];

const BRANDING = {
  title: 'My Toolpad App',
};

export default function DashboardLayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <AppProvider 
      navigation={NAVIGATION} 
      branding={BRANDING}
      router={{ 
        pathname, 
        searchParams: new URLSearchParams(), 
        navigate: (path) => router.push(path) 
      }}
    >
      <DashboardLayout>
        <PageContainer>
          {children}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}