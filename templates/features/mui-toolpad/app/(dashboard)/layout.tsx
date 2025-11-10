'use client';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Dashboard as DashboardIcon, People as PeopleIcon, Inventory as InventoryIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
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
    pattern: 'customers{/:id}*',
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <InventoryIcon />,
    pattern: 'products{/:id}*',
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    pattern: 'orders{/:id}*',
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
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}
