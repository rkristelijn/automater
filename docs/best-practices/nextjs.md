# Next.js Best Practices

> Based on [Next.js Official Documentation](https://nextjs.org/docs) and production experience

## Project Structure

### App Router (Recommended)
```
app/
├── layout.tsx          # Root layout
├── page.tsx           # Homepage
├── loading.tsx        # Loading UI
├── error.tsx          # Error UI
├── not-found.tsx      # 404 page
├── globals.css        # Global styles
├── (dashboard)/       # Route groups
│   ├── layout.tsx     # Nested layout
│   └── page.tsx       # Dashboard page
├── api/               # API routes
│   └── route.ts       # API endpoint
└── [slug]/            # Dynamic routes
    └── page.tsx
```

## Performance

### Image Optimization
```tsx
import Image from 'next/image'

// Always use Next.js Image component
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // Optional blur placeholder
/>
```

### Font Optimization
```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Bundle Optimization
```tsx
// Use dynamic imports for code splitting
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/heavy-component'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR if needed
})
```

## Data Fetching

### Server Components (Default)
```tsx
// Fetch data directly in server components
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // or 'no-store' for dynamic data
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

### Client Components
```tsx
'use client'

import { useState, useEffect } from 'react'

export default function ClientComponent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
  }, [])

  return <div>{data?.title}</div>
}
```

## Security

### Environment Variables
```bash
# .env.local
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

```tsx
// Access in server components/API routes only
const dbUrl = process.env.DATABASE_URL

// For client-side, prefix with NEXT_PUBLIC_
const publicApiUrl = process.env.NEXT_PUBLIC_API_URL
```

### Content Security Policy
```tsx
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

## SEO & Metadata

### Static Metadata
```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'App description',
  openGraph: {
    title: 'My App',
    description: 'App description',
    images: ['/og-image.jpg']
  }
}
```

### Dynamic Metadata
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id)
  
  return {
    title: product.name,
    description: product.description
  }
}
```

## Error Handling

### Error Boundaries
```tsx
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Not Found Pages
```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  )
}
```

## API Routes

### Route Handlers
```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  
  return NextResponse.json({ users: [] })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  return NextResponse.json({ success: true })
}
```

### Middleware
```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add authentication logic
  if (!request.cookies.get('token')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
```

## Deployment

### Vercel (Recommended)
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Docker
```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## Configuration

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  
  // Image domains
  images: {
    domains: ['example.com', 'cdn.example.com']
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true
      }
    ]
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

## Testing

### Unit Tests
```tsx
// __tests__/page.test.tsx
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Page', () => {
  it('renders homepage', () => {
    render(<Page />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
```

### E2E Tests
```tsx
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})
```

## Common Patterns

### Loading States
```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading dashboard...</div>
}
```

### Streaming
```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading stats...</div>}>
        <Stats />
      </Suspense>
      <Suspense fallback={<div>Loading charts...</div>}>
        <Charts />
      </Suspense>
    </div>
  )
}
```

### Server Actions
```tsx
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  
  // Database operation
  await db.user.create({ data: { name } })
  
  // Revalidate cache
  revalidatePath('/users')
}
```

## Performance Monitoring

### Web Vitals
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Common Pitfalls

❌ **Don't:**
- Use `useEffect` for data fetching in server components
- Import client-only libraries in server components
- Forget to add `'use client'` for interactive components
- Use `Image` without proper sizing
- Expose sensitive environment variables to client

✅ **Do:**
- Use server components by default
- Implement proper error boundaries
- Optimize images and fonts
- Use TypeScript for better DX
- Follow the App Router conventions
