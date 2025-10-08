# Vite + React Best Practices

> Based on [Vite Official Guide](https://vitejs.dev/guide/) and [React Documentation](https://react.dev/)

## Project Structure

### Recommended Structure
```
src/
├── components/         # Reusable components
│   ├── ui/            # Basic UI components
│   └── features/      # Feature-specific components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components (if using routing)
├── stores/            # State management
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
├── App.tsx            # Root component
├── main.tsx           # Entry point
└── vite-env.d.ts      # Vite type definitions
```

## Vite Configuration

### vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib')
    }
  },
  
  // Development server
  server: {
    port: 3000,
    open: true,
    host: true // Expose to network
  },
  
  // Build optimization
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})
```

## Component Patterns

### Functional Components with TypeScript
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  children 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Custom Hooks
```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}
```

## State Management

### Context + useReducer
```tsx
// stores/AppContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react'

interface AppState {
  user: User | null
  theme: 'light' | 'dark'
  loading: boolean
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LOADING'; payload: boolean }

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light',
    loading: false
  })

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
```

### Zustand (Recommended)
```tsx
// stores/useStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AppStore {
  user: User | null
  theme: 'light' | 'dark'
  setUser: (user: User | null) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
}

export const useStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        theme: 'light',
        setUser: (user) => set({ user }),
        setTheme: (theme) => set({ theme }),
        toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' })
      }),
      { name: 'app-store' }
    )
  )
)
```

## Routing

### React Router v6
```tsx
// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### Protected Routes
```tsx
// components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useStore } from '@/stores/useStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useStore(state => state.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

## Data Fetching

### TanStack Query (Recommended)
```tsx
// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users').then(res => res.data),
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userData: CreateUserData) => 
      api.post('/users', userData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
```

### Custom Fetch Hook
```tsx
// hooks/useFetch.ts
import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const abortController = new AbortController()

    fetch(url, { signal: abortController.signal })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => {
        if (error.name !== 'AbortError') {
          setState({ data: null, loading: false, error: error.message })
        }
      })

    return () => abortController.abort()
  }, [url])

  return state
}
```

## Styling

### CSS Modules
```tsx
// components/Button/Button.module.css
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.primary {
  background-color: #3b82f6;
  color: white;
}

.secondary {
  background-color: #6b7280;
  color: white;
}

// components/Button/Button.tsx
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  )
}
```

### Styled Components
```tsx
import styled from 'styled-components'

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${props => 
    props.variant === 'primary' ? '#3b82f6' : '#6b7280'
  };
  color: white;
  
  &:hover {
    opacity: 0.9;
  }
`
```

## Performance Optimization

### Code Splitting
```tsx
import { lazy, Suspense } from 'react'

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
```

### Memoization
```tsx
import { memo, useMemo, useCallback } from 'react'

interface ExpensiveComponentProps {
  items: Item[]
  onItemClick: (id: string) => void
}

export const ExpensiveComponent = memo(function ExpensiveComponent({ 
  items, 
  onItemClick 
}: ExpensiveComponentProps) {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0)
  }, [items])

  const handleClick = useCallback((id: string) => {
    onItemClick(id)
  }, [onItemClick])

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      {items.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  )
})
```

## Testing

### Vitest Configuration
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
})
```

### Component Testing
```tsx
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Build & Deployment

### Environment Variables
```bash
# .env
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=My App

# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_TITLE=My App
```

```tsx
// Access in components
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

### Build Optimization
```json
{
  "scripts": {
    "build": "tsc && vite build",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview"
  }
}
```

### Static Deployment
```bash
# Build for production
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

## Common Patterns

### Error Boundaries
```tsx
// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error?.message}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Loading States
```tsx
// components/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}

// Usage
function UserList() {
  const { data: users, loading, error } = useUsers()

  if (loading) return <LoadingSpinner />
  if (error) return <div>Error: {error}</div>
  
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

## Common Pitfalls

❌ **Don't:**
- Forget to cleanup useEffect subscriptions
- Mutate state directly
- Use index as key in dynamic lists
- Put all state in global store
- Ignore TypeScript errors

✅ **Do:**
- Use TypeScript for better DX
- Implement proper error boundaries
- Optimize bundle size with code splitting
- Use React DevTools for debugging
- Follow React hooks rules
