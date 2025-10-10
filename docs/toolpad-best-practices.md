# MUI Toolpad Best Practices

> **RTFM Principle**: Always follow official examples and documentation patterns

## Key Learning: Always Check Official Examples First

When implementing MUI Toolpad, **always** start by examining the official examples:

```bash
pnpm create toolpad-app --example auth-nextjs-themed example-project
```

## Official Toolpad Pattern (Working)

Based on the official `auth-nextjs-themed` example:

### Root Layout (`app/layout.tsx`)
```tsx
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  // ... more navigation items
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <NextAppProvider navigation={NAVIGATION}>
            {children}
          </NextAppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

### Dashboard Layout (`app/(dashboard)/layout.tsx`)
```tsx
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

export default function Layout({ children }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
```

## Common Mistakes to Avoid

### ❌ Don't: Custom Theme Objects
```tsx
// This causes serialization errors in Next.js 15
<NextAppProvider theme={customTheme} navigation={NAVIGATION}>
```

### ❌ Don't: Complex Layout Overrides
```tsx
// This breaks header layout and theme switching
<DashboardLayout sx={{ /* complex overrides */ }}>
  <PageContainer sx={{ /* more overrides */ }}>
```

### ❌ Don't: MUI Grid v2 in Server Components
```tsx
// This causes function serialization errors
<Grid size={{ xs: 12, sm: 6 }}>
```

## ✅ Best Practices

### 1. Use Official Patterns
- Follow the exact structure from official examples
- Don't add custom styling until you understand the base pattern
- Test with official examples first

### 2. Theme Switching
- Toolpad handles dark/light switching automatically
- Use `data-toolpad-color-scheme` attribute for initial theme
- Don't pass theme objects to NextAppProvider

### 3. Layout Structure
- Keep DashboardLayout simple without custom sx props
- Let Toolpad handle container sizing and responsive behavior
- Use CSS Grid instead of MUI Grid for complex layouts

### 4. Next.js 15 Compatibility
- Always use `AppRouterCacheProvider` for MUI integration
- Use `Promise<{ id: string }>` for dynamic route params
- Avoid passing functions to client components

## Development Workflow

1. **Start with official examples**: `pnpm create toolpad-app --example <name>`
2. **Understand the pattern** before customizing
3. **Test incrementally** - don't change everything at once
4. **Follow RTFM principle** - respect the framework's model

## References

- [MUI Toolpad Examples](https://mui.com/toolpad/core/introduction/examples/)
- [NextAppProvider Documentation](https://mui.com/toolpad/core/react-app-provider/)
- [Next.js 15 App Router](https://nextjs.org/docs/app)

---

**Remember**: When in doubt, check the official examples. They contain the tested, working patterns that prevent common pitfalls.
