# Automater Options Overview

> Complete reference for all templates, features, and configuration options

## Templates

### `vite-react` (Default)
**Source**: [Vite Official Templates](https://vitejs.dev/guide/)
- **Description**: Modern React development with Vite bundler
- **Stack**: Vite + React 18 + TypeScript + pnpm
- **Features**: Fast HMR, optimized builds, TypeScript support
- **Default Features**: `serverHardening`, `biome`
- **Use Case**: Modern SPAs, component libraries, fast development

### `nextjs`
**Source**: [Next.js Official Documentation](https://nextjs.org/docs)
- **Description**: Full-stack React framework with SSR/SSG
- **Stack**: Next.js 14 + React 18 + TypeScript + pnpm
- **Features**: App Router, Server Components, built-in optimization
- **Default Features**: `serverHardening`, `biome`
- **Use Case**: Production web apps, SEO-critical sites, full-stack applications

### `astro`
**Source**: [Astro Official Templates](https://astro.build/themes/)
- **Description**: Content-focused static site generator
- **Stack**: Astro + TypeScript + pnpm
- **Features**: Island architecture, multi-framework support, optimized for content
- **Default Features**: `serverHardening`, `biome`
- **Use Case**: Blogs, documentation sites, marketing pages

### `sveltekit`
**Source**: [SvelteKit Official Documentation](https://kit.svelte.dev/)
- **Description**: Full-stack Svelte framework
- **Stack**: SvelteKit + TypeScript + pnpm
- **Features**: File-based routing, server-side rendering, progressive enhancement
- **Default Features**: `serverHardening`, `biome`
- **Use Case**: High-performance web apps, progressive web apps

## Features

### Security & Quality

#### `serverHardening` ⭐ (Default Enabled)
**Source**: [OWASP Security Headers](https://owasp.org/www-project-secure-headers/) + Agility Cloud Security Library
- **Description**: Production-ready security headers and server hardening
- **Functionality**: 
  - Content Security Policy (CSP) with framework-specific optimizations
  - HTTP Strict Transport Security (HSTS)
  - X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
  - Referrer-Policy, Permissions-Policy, Cross-Origin-Resource-Policy
- **Configuration**: `lib/security-headers.ts`
- **Framework Support**: Next.js (headers), Vite (middleware), Astro (middleware)
- **Conflicts**: None
- **Why Default**: Essential for production security, follows industry standards

#### `biome` ⭐ (Default Enabled)
**Source**: [Biome Official Documentation](https://biomejs.dev/)
- **Description**: Fast linter and formatter (Rust-based)
- **Functionality**: 
  - Replaces ESLint + Prettier with single tool
  - 100x faster than ESLint
  - TypeScript, JavaScript, JSON support
- **Configuration**: `biome.json`
- **Conflicts**: `eslint`
- **Why Default**: Superior performance, unified tooling, active development

#### `eslint`
**Source**: [ESLint Official Configuration](https://eslint.org/docs/latest/)
- **Description**: Traditional JavaScript linting with Prettier formatting
- **Functionality**: 
  - ESLint with TypeScript support
  - Prettier for code formatting
  - Pre-commit hooks with Husky
- **Configuration**: `.eslintrc.js`, `.prettierrc`
- **Conflicts**: `biome`
- **Use Case**: Teams requiring specific ESLint plugins, legacy projects

#### `husky`
**Source**: [Husky Official Documentation](https://typicode.github.io/husky/)
- **Description**: Git hooks for code quality enforcement
- **Functionality**: 
  - Pre-commit linting and formatting
  - Commit message validation
  - Pre-push testing
- **Configuration**: `.husky/` directory
- **Dependencies**: Works with `biome` or `eslint`

### Styling & UI

#### `mui`
**Source**: [Material-UI Next.js Integration Guide](https://mui.com/material-ui/integrations/nextjs/)
- **Description**: Material Design React components
- **Functionality**: 
  - Complete component library
  - Theming system with CSS-in-JS
  - Automatic Tailwind conflict resolution
  - Framework-specific setup (Next.js App Router, Vite, etc.)
- **Configuration**: Theme in `src/theme/`, provider setup
- **Conflicts**: `tailwind`, `chakra`
- **Bundle Size**: ~300KB (tree-shakeable)

#### `mui-toolpad`
**Source**: [MUI Toolpad Documentation](https://mui.com/toolpad/)
- **Description**: Low-code admin interface builder
- **Functionality**: 
  - Drag-and-drop interface builder
  - Data source integrations
  - Built on MUI components
- **Dependencies**: `mui`
- **Use Case**: Admin dashboards, internal tools, rapid prototyping

#### `tailwind`
**Source**: [Tailwind CSS Framework Integration](https://tailwindcss.com/docs/guides/nextjs)
- **Description**: Utility-first CSS framework
- **Functionality**: 
  - Utility classes for rapid styling
  - Framework-specific configuration
  - PostCSS integration
  - JIT compilation
- **Configuration**: `tailwind.config.js`
- **Conflicts**: `mui`, `chakra`
- **Bundle Size**: ~10KB (purged)

#### `chakra`
**Source**: [Chakra UI Documentation](https://chakra-ui.com/)
- **Description**: Modular and accessible React component library
- **Functionality**: 
  - Accessible components out of the box
  - Theme-based design system
  - Emotion-based styling
- **Configuration**: Theme provider setup
- **Conflicts**: `mui`, `tailwind`
- **Bundle Size**: ~200KB (tree-shakeable)

### Deployment

#### `vercel`
**Source**: [Vercel Platform Documentation](https://vercel.com/docs)
- **Description**: Deployment configuration for Vercel platform
- **Functionality**: 
  - `vercel.json` configuration
  - Environment variable setup
  - Build optimization settings
  - Edge function configuration
- **Framework Support**: Automatic detection for Next.js, Vite, Astro
- **Features**: Zero-config deployments, preview deployments, edge network

#### `netlify`
**Source**: [Netlify Build Configuration](https://docs.netlify.com/)
- **Description**: Deployment configuration for Netlify platform
- **Functionality**: 
  - `netlify.toml` configuration
  - Build command optimization
  - Redirect rules
  - Form handling setup
- **Framework Support**: Universal static site deployment
- **Features**: Continuous deployment, form handling, serverless functions

#### `cloudflare`
**Source**: [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- **Description**: Deployment configuration for Cloudflare Pages
- **Functionality**: 
  - `wrangler.toml` configuration
  - Edge worker integration
  - KV storage setup
  - Custom domain configuration
- **Framework Support**: Static sites, full-stack with Workers
- **Features**: Global edge network, serverless functions, KV storage

## Configuration Philosophy

### Default Selections
- **Security First**: `serverHardening` enabled by default for production readiness
- **Performance**: `biome` over `eslint` for faster development cycles
- **Modern Standards**: TypeScript, pnpm, latest framework versions
- **Conflict Resolution**: Automatic handling of incompatible features

### Customization Levels
1. **Template Level**: Choose base framework and architecture
2. **Feature Level**: Add/remove specific functionality
3. **Configuration Level**: Fine-tune individual feature settings
4. **File Level**: Direct modification of generated configuration files

### Best Practices Integration
- **Official Documentation**: All configurations follow official framework guides
- **Industry Standards**: Security headers follow OWASP recommendations
- **Performance Optimization**: Bundle splitting, tree shaking, lazy loading
- **Developer Experience**: Fast builds, hot reloading, TypeScript support

## Usage Examples

### Basic Project Creation
```bash
# Default: vite-react + serverHardening + biome
automater create my-app

# Specific template with features
automater create my-app --template=nextjs --features=mui,vercel

# Disable default features
automater create my-app --no-serverHardening --features=eslint
```

### Feature Management
```bash
# Add features to existing project
automater add tailwind husky

# Remove conflicting features (automatic)
automater add mui  # Removes tailwind if present

# List available options
automater list templates
automater list features
```

### Advanced Configuration
```bash
# Multiple features with specific template
automater create admin-app --template=nextjs --features=mui-toolpad,vercel,husky

# Development vs Production optimized
automater create dev-app --features=eslint  # More flexible for development
automater create prod-app --features=biome,serverHardening  # Optimized for production
```

## Feature Compatibility Matrix

| Feature | vite-react | nextjs | astro | sveltekit |
|---------|------------|--------|-------|-----------|
| serverHardening | ✅ | ✅ | ✅ | ✅ |
| biome | ✅ | ✅ | ✅ | ✅ |
| eslint | ✅ | ✅ | ✅ | ✅ |
| mui | ✅ | ✅ | ❌ | ❌ |
| tailwind | ✅ | ✅ | ✅ | ✅ |
| chakra | ✅ | ✅ | ❌ | ❌ |
| vercel | ✅ | ✅ | ✅ | ✅ |
| netlify | ✅ | ✅ | ✅ | ✅ |
| cloudflare | ✅ | ✅ | ✅ | ✅ |

## Conflict Resolution

### Automatic Conflicts
- `biome` ↔ `eslint`: Biome replaces ESLint + Prettier
- `mui` ↔ `tailwind`: MUI removes Tailwind (CSS-in-JS approach)
- `mui` ↔ `chakra`: Component library conflict

### Manual Resolution
When conflicts are detected:
1. User is prompted to choose preferred option
2. Conflicting configurations are safely removed
3. Dependencies are updated accordingly
4. Instructions provided for manual cleanup if needed

## Source Attribution

All features and templates are based on official documentation and best practices:
- **Framework Templates**: Official starter templates and documentation
- **Security Features**: OWASP guidelines and production-tested implementations
- **Tooling**: Official configuration recommendations
- **Deployment**: Platform-specific optimization guides

This ensures reliability, maintainability, and alignment with ecosystem standards.
