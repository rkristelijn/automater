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
// Theme integration: Import centralized theme with dark/light mode support
import { theme } from '../../theme/theme';

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
      // Theme integration: Pass theme to AppProvider for dark/light mode support
      // Best practice: Centralized theme management through AppProvider
      theme={theme}
      router={{ 
        pathname, 
        searchParams: new URLSearchParams(), 
        navigate: (path: string | URL) => router.push(path.toString()) 
      }}
    >
      {/* Layout simplification: Removed complex sx overrides that caused conflicts
          Best practice: Let Toolpad handle default layout, minimal custom styling */}
      <DashboardLayout>
        <PageContainer>
          {children}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
