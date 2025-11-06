'use client';
import * as React from '.pnpm/@types+react@19.2.2/node_modules/@types/react';
import { AppProvider } from '.pnpm/@toolpad+core@0.16.0_4dc4fdc2eb62a962108989704f017f48/node_modules/@toolpad/core/esm/AppProvider';
import { DashboardLayout } from '.pnpm/@toolpad+core@0.16.0_4dc4fdc2eb62a962108989704f017f48/node_modules/@toolpad/core/esm/DashboardLayout';
import { PageContainer } from '.pnpm/@toolpad+core@0.16.0_4dc4fdc2eb62a962108989704f017f48/node_modules/@toolpad/core/esm/PageContainer';
import { usePathname, useRouter } from '.pnpm/next@15.4.6_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation';
import DashboardIcon from '.pnpm/@mui+icons-material@7.3.5_@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2._abf36ac447d274224975a5b39faba402/node_modules/@mui/icons-material/esm/Dashboard';
import PeopleIcon from '.pnpm/@mui+icons-material@7.3.5_@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2._abf36ac447d274224975a5b39faba402/node_modules/@mui/icons-material/esm/People';
import InventoryIcon from '.pnpm/@mui+icons-material@7.3.5_@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2._abf36ac447d274224975a5b39faba402/node_modules/@mui/icons-material/esm/Inventory';
import ShoppingCartIcon from '.pnpm/@mui+icons-material@7.3.5_@mui+material@7.3.5_@emotion+react@11.14.0_@types+react@19.2._abf36ac447d274224975a5b39faba402/node_modules/@mui/icons-material/esm/ShoppingCart';
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