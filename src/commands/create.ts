import { spawn } from 'child_process';
import { exec } from 'child_process';
import * as fs from 'fs';
import chalk from 'chalk';

interface CreateOptions {
  template?: string;
  features?: string;
  framework?: string;
  platform?: 'workers' | 'pages';
  typescript?: boolean;
  deploy?: boolean;
  git?: boolean;
  start?: boolean;
  open?: boolean;
  eslint?: boolean;
  tailwind?: boolean;
  app?: boolean;
  srcDir?: boolean;
  importAlias?: string;
  turbopack?: boolean;
  mui?: boolean;
}

export async function createProject(projectName: string, options: CreateOptions): Promise<void> {
  const { 
    template = 'nextjs', 
    features,
    framework = 'next',
    platform = 'workers',
    typescript = true,
    deploy = false,
    git = false,
    start = true,
    open = true,
    eslint = true,
    tailwind = false,
    app = true,
    srcDir = true,
    importAlias = '@/*',
    turbopack = true
  } = options;

  console.log(chalk.blue(`🚀 Creating ${projectName} with ${template} template...`));

  if (template === 'nextjs') {
    await createCloudflareNextJs(projectName, { framework, platform, typescript, deploy, git, start, open, eslint, tailwind, app, srcDir, importAlias, turbopack });
  } else {
    throw new Error(`Template "${template}" is not supported yet`);
  }

  console.log(chalk.green(`✅ Project ${projectName} created successfully!`));
  
  // Apply Cloudflare OpenNext configuration (replaces old next-on-pages setup)
  await applyOpenNextConfig(projectName, turbopack);
  
  // Apply default features (serverHardening, biome first, flupke last)
  const customFeatures = features ? features.split(',').map(f => f.trim()) : [];
  const allFeatures = ['serverHardening', 'biome', ...customFeatures, 'flupke'];
  
  console.log(chalk.yellow(`📦 Adding features: ${allFeatures.join(', ')}`));
  
  for (const feature of allFeatures) {
    if (feature === 'serverHardening') {
      await applyServerHardening(projectName);
    } else if (feature === 'biome') {
      await applyBiome(projectName);
    } else if (feature === 'flupke') {
      await applyFlupke(projectName);
    } else if (feature === 'mui') {
      await installMUI(projectName);
    }
  }

  if (start) {
    console.log(chalk.blue(`🚀 Starting development server...`));
    await startDevServer(projectName, open);
  }
}

async function createCloudflareNextJs(
  projectName: string, 
  options: { framework: string; platform: string; typescript: boolean; deploy: boolean; git: boolean; start: boolean; open: boolean; eslint: boolean; tailwind: boolean; app: boolean; srcDir: boolean; importAlias: string; turbopack: boolean }
): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(chalk.gray('Running: npx create-cloudflare@latest (OpenNext + Workers)'));
    
    // create-cloudflare@latest now uses @opennextjs/cloudflare by default for Next.js
    // see https://nextjs.org/docs/app/api-reference/cli/create-next-app for all arguments
    const args = [
      'create-cloudflare@latest',
      projectName,
      `--framework=${options.framework}`,
      `--platform=${options.platform}`,
      options.deploy ? '--deploy' : '--no-deploy',
      options.git ? '--git' : '--no-git',
      '--',
      options.typescript ? '--typescript' : '--javascript',
      options.eslint ? '--eslint' : '--no-eslint',
      options.tailwind ? '--tailwind' : '--no-tailwind',
      options.app ? '--app' : '--no-app',
      options.srcDir ? '--src-dir' : '--no-src-dir',
      `--import-alias="${options.importAlias}"`,
      options.turbopack ? '--turbopack' : '',
      '-y'
    ].filter(arg => arg !== '');

    const child = spawn('npx', ['--yes', ...args], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Cloudflare create process exited with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Apply @opennextjs/cloudflare configuration.
 * Replaces the old @cloudflare/next-on-pages setup.
 * Reference: https://opennext.js.org/cloudflare
 */
async function applyOpenNextConfig(projectName: string, turbopack: boolean = true): Promise<void> {
  console.log(chalk.blue('☁️  Configuring @opennextjs/cloudflare...'));
  
  try {
    // Write wrangler.jsonc (replaces wrangler.toml)
    const wranglerConfig = `{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "${projectName}",
  "compatibility_date": "2025-01-01",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "${projectName}"
    }
  ]
  // Uncomment to add D1 database:
  // "d1_databases": [
  //   {
  //     "binding": "DB",
  //     "database_name": "${projectName}-db",
  //     "database_id": "YOUR_DATABASE_ID"
  //   }
  // ]
  // Uncomment to add R2 for ISR cache:
  // "r2_buckets": [
  //   {
  //     "binding": "NEXT_INC_CACHE_R2_BUCKET",
  //     "bucket_name": "${projectName}-cache"
  //   }
  // ]
}
`;
    await fs.promises.writeFile(`${projectName}/wrangler.jsonc`, wranglerConfig);
    
    // Remove old wrangler.toml if it exists
    try { await fs.promises.unlink(`${projectName}/wrangler.toml`); } catch {}

    // Write open-next.config.ts
    const openNextConfig = `import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Uncomment to enable R2 incremental cache (requires R2 bucket binding):
  // incrementalCache: "r2-incremental-cache",
});
`;
    await fs.promises.writeFile(`${projectName}/open-next.config.ts`, openNextConfig);

    // Write .dev.vars for local development
    const devVars = `NEXTJS_ENV=development
`;
    await fs.promises.writeFile(`${projectName}/.dev.vars`, devVars);

    // Update next.config.ts to include initOpenNextCloudflareForDev
    const nextConfigPath = `${projectName}/next.config.ts`;
    let nextConfigContent = '';
    try {
      nextConfigContent = await fs.promises.readFile(nextConfigPath, 'utf8');
    } catch {
      nextConfigContent = `import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = {};\n\nexport default nextConfig;\n`;
    }
    
    // Append the OpenNext dev initialization (idempotent)
    if (!nextConfigContent.includes('initOpenNextCloudflareForDev')) {
      const openNextDevInit = `\nimport { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";\ninitOpenNextCloudflareForDev();\n`;
      await fs.promises.writeFile(nextConfigPath, nextConfigContent + openNextDevInit);
    }

    // Write cloudflare-env.d.ts
    const cloudflareEnvDts = `// Generated by wrangler types
interface CloudflareEnv {
  ASSETS: Fetcher;
  WORKER_SELF_REFERENCE: Fetcher;
  // DB: D1Database; // Uncomment when D1 is enabled
}
`;
    await fs.promises.writeFile(`${projectName}/cloudflare-env.d.ts`, cloudflareEnvDts);

    // Write public/_headers for static asset caching
    await fs.promises.mkdir(`${projectName}/public`, { recursive: true });
    const headers = `/_next/static/*
  Cache-Control: public,max-age=31536000,immutable
`;
    await fs.promises.writeFile(`${projectName}/public/_headers`, headers);

    // Update package.json scripts
    const packageJsonPath = `${projectName}/package.json`;
    const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8'));
    
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: turbopack ? 'next dev --turbopack' : 'next dev',
      build: 'next build',
      preview: 'opennextjs-cloudflare build && opennextjs-cloudflare preview',
      deploy: 'opennextjs-cloudflare build && opennextjs-cloudflare deploy',
      'cf-typegen': 'wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts',
    };
    
    // Remove old scripts
    delete packageJson.scripts['pages:build'];
    
    await fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Update .gitignore to include .open-next
    const gitignorePath = `${projectName}/.gitignore`;
    try {
      let gitignore = await fs.promises.readFile(gitignorePath, 'utf8');
      if (!gitignore.includes('.open-next')) {
        gitignore += '\n# OpenNext build output\n.open-next/\n.dev.vars\n';
        await fs.promises.writeFile(gitignorePath, gitignore);
      }
    } catch {}

    // Remove old next-on-pages dependencies, add opennext
    const devDeps = packageJson.devDependencies || {};
    delete devDeps['@cloudflare/next-on-pages'];
    delete devDeps['eslint-plugin-next-on-pages'];
    devDeps['@opennextjs/cloudflare'] = 'latest';
    devDeps['wrangler'] = '^4';
    packageJson.devDependencies = devDeps;
    
    await fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log(chalk.green('✅ OpenNext Cloudflare configured (wrangler.jsonc, open-next.config.ts, .dev.vars)'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not apply OpenNext config automatically.'));
    console.log(error);
  }
}

async function fallbackToNpm(projectName: string, packages: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const installProcess = spawn('npm', ['install', ...packages], {
      cwd: projectName,
      stdio: 'inherit'
    });

    installProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ Packages installed with npm'));
        resolve();
      } else {
        reject(new Error(`npm installation failed with code ${code}`));
      }
    });

    installProcess.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Install MUI v9 packages.
 * Reference: https://mui.com/blog/introducing-material-ui-v9/
 * Note: Material UI skipped v8 to sync with MUI X v9.
 */
async function installMUI(projectName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue('📦 Installing MUI v9 packages...'));
    
    const packages = [
      '@mui/material@^9',
      '@mui/icons-material@^9',
      '@mui/material-nextjs@^9',
      '@emotion/cache',
      '@emotion/react',
      '@emotion/styled',
    ];
    
    const installProcess = spawn('pnpm', ['add', ...packages], {
      cwd: projectName,
      stdio: 'inherit'
    });

    installProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ MUI v9 packages installed successfully!'));
        configureMUI(projectName).then(resolve).catch(reject);
      } else {
        console.log(chalk.yellow('⚠️  pnpm failed, falling back to npm...'));
        fallbackToNpm(projectName, packages)
          .then(() => configureMUI(projectName))
          .then(resolve)
          .catch(reject);
      }
    });

    installProcess.on('error', () => {
      console.log(chalk.yellow('⚠️  pnpm not available, falling back to npm...'));
      fallbackToNpm(projectName, packages)
        .then(() => configureMUI(projectName))
        .then(resolve)
        .catch(reject);
    });
  });
}

/**
 * Configure MUI v9 with Next.js App Router.
 * Best practices:
 * - AppRouterCacheProvider for SSR
 * - CssBaseline for consistent styling
 * - Theme with CSS variables (cssVariables: true)
 * - No deep imports (enforced by v7+ package layout)
 * Reference: https://mui.com/material-ui/integrations/nextjs/
 */
async function configureMUI(projectName: string): Promise<void> {
  console.log(chalk.blue('⚙️  Configuring MUI v9...'));
  
  try {
    // Create theme file
    const themeContent = `'use client';
import { createTheme } from '@mui/material/styles';

// MUI v9 theme with CSS variables
// Best practice: Use cssVariables for zero-rerender mode switches
// Reference: https://mui.com/material-ui/customization/css-theme-variables/
export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1976d2' },
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        primary: { main: '#90caf9' },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Roboto, sans-serif',
  },
});
`;
    await fs.promises.mkdir(`${projectName}/src/theme`, { recursive: true });
    await fs.promises.writeFile(`${projectName}/src/theme/theme.ts`, themeContent);

    // Create ThemeRegistry component (SSR-compatible provider)
    const themeRegistryContent = `'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { theme } from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
`;
    await fs.promises.writeFile(`${projectName}/src/theme/ThemeRegistry.tsx`, themeRegistryContent);

    // Update layout.tsx
    const layoutContent = `import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "${projectName}",
  description: "Built with Next.js, MUI v9, and Cloudflare Workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${geistSans.variable} \${geistMono.variable}\`}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
`;
    await fs.promises.writeFile(`${projectName}/src/app/layout.tsx`, layoutContent);

    // Create demo page
    const pageContent = `import { Typography, Box, Button, Card, CardContent, Stack } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        ${projectName}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Built with Next.js 15, MUI v9, and deployed on Cloudflare Workers.
      </Typography>
      
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Next.js 15</Typography>
            <Typography variant="body2" color="text.secondary">
              App Router, Server Components, Server Actions
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>MUI v9</Typography>
            <Typography variant="body2" color="text.secondary">
              CSS variables, zero-rerender theme switching
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Cloudflare Workers</Typography>
            <Typography variant="body2" color="text.secondary">
              Edge deployment via @opennextjs/cloudflare
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" sx={{ mr: 1 }}>Get Started</Button>
        <Button variant="outlined">Documentation</Button>
      </Box>
    </Box>
  );
}
`;
    await fs.promises.writeFile(`${projectName}/src/app/page.tsx`, pageContent);

    // Remove unnecessary CSS files
    await removeCSSFiles(projectName);

    // Write README
    const readmeContent = `# ${projectName}

> Generated with [Automater](https://github.com/rkristelijn/automater)

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **UI Library**: Material UI v9
- **Styling**: Emotion + CSS Variables
- **Platform**: Cloudflare Workers via @opennextjs/cloudflare
- **Language**: TypeScript

## Getting Started

\`\`\`bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Build for production
pnpm preview      # Build + preview on Workers locally
pnpm deploy       # Build + deploy to Cloudflare Workers
pnpm cf-typegen   # Generate CloudflareEnv types
\`\`\`

## Project Structure

\`\`\`
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with ThemeRegistry
│   │   └── page.tsx      # Homepage
│   └── theme/
│       ├── theme.ts      # MUI v9 theme (CSS variables, light/dark)
│       └── ThemeRegistry.tsx  # SSR-compatible provider
├── wrangler.jsonc        # Cloudflare Workers config
├── open-next.config.ts   # OpenNext adapter config
├── cloudflare-env.d.ts   # Cloudflare bindings types
├── .dev.vars             # Local dev environment vars
└── public/_headers       # Static asset cache headers
\`\`\`

## Best Practices Applied

- ✅ MUI v9 with CSS variables (zero-rerender mode switch)
- ✅ AppRouterCacheProvider with CSS layers
- ✅ @opennextjs/cloudflare (replaces deprecated next-on-pages)
- ✅ wrangler.jsonc with $schema for IDE support
- ✅ Security headers (OWASP-compliant)
- ✅ Biome for linting/formatting (replaces ESLint)
- ✅ No deep imports (MUI v7+ package layout)
- ✅ No \`export const runtime = 'edge'\` (Workers are already edge)

## References

- [Next.js App Router](https://nextjs.org/docs/app)
- [MUI v9](https://mui.com/material-ui/getting-started/)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
`;
    await fs.promises.writeFile(`${projectName}/README.md`, readmeContent);

    console.log(chalk.green('✅ MUI v9 configured with theme, ThemeRegistry, and demo page!'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not automatically configure MUI v9.'));
    console.log(error);
  }
}

async function applyServerHardening(projectName: string): Promise<void> {
  console.log(chalk.blue('🔒 Applying server hardening...'));
  
  try {
    const nextConfigPath = `${projectName}/next.config.ts`;
    const nextConfigContent = await fs.promises.readFile(nextConfigPath, 'utf8');
    
    const updatedNextConfig = nextConfigContent.replace(
      /const nextConfig: NextConfig = \{/,
      `const nextConfig: NextConfig = {
  // Security: Disable powered-by header (information disclosure)
  poweredByHeader: false,
  
  // Security: OWASP recommended headers
  // Reference: https://owasp.org/www-project-secure-headers/
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';" }
        ]
      }
    ];
  },`
    );
    
    await fs.promises.writeFile(nextConfigPath, updatedNextConfig);
    console.log(chalk.green('✅ Server hardening applied (security headers)'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not apply server hardening automatically.'));
    console.log(error);
  }
}

async function applyBiome(projectName: string): Promise<void> {
  console.log(chalk.blue('🔧 Setting up Biome (replaces ESLint)...'));
  
  return new Promise((resolve) => {
    const installProcess = spawn('pnpm', ['add', '--save-dev', '@biomejs/biome'], {
      cwd: projectName,
      stdio: 'inherit'
    });

    installProcess.on('close', async (code) => {
      if (code === 0) {
        try {
          const path = await import('path');
          
          const biomeConfig = {
            "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
            "files": {
              "ignore": [".next/**", "node_modules/**", "dist/**", "build/**", ".open-next/**"]
            },
            "formatter": {
              "enabled": true,
              "indentStyle": "space"
            },
            "linter": {
              "enabled": true,
              "rules": {
                "recommended": true
              }
            },
            "javascript": {
              "formatter": {
                "quoteStyle": "single"
              }
            }
          };
          
          await fs.promises.writeFile(`${projectName}/biome.json`, JSON.stringify(biomeConfig, null, 2));
          
          // Remove ESLint files
          const eslintFiles = ['.eslintrc.json', '.eslintrc.js', '.eslintrc.cjs', 'eslint.config.js', 'eslint.config.mjs'];
          for (const file of eslintFiles) {
            try { await fs.promises.unlink(path.join(projectName, file)); } catch {}
          }
          
          // Update package.json
          const packageJsonPath = path.join(projectName, 'package.json');
          const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8'));
          
          if (packageJson.devDependencies) {
            delete packageJson.devDependencies.eslint;
            delete packageJson.devDependencies['eslint-config-next'];
            delete packageJson.devDependencies['@typescript-eslint/eslint-plugin'];
            delete packageJson.devDependencies['@typescript-eslint/parser'];
          }
          
          if (packageJson.scripts) {
            packageJson.scripts.lint = 'biome check src/';
            packageJson.scripts['lint:fix'] = 'biome check --write src/';
            packageJson.scripts.format = 'biome format --write src/';
          }
          
          await fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
          console.log(chalk.green('✅ Biome configured, ESLint removed'));
        } catch (error) {
          console.log(chalk.yellow('⚠️  Could not configure Biome automatically.'));
        }
      } else {
        console.log(chalk.yellow('⚠️  Biome installation failed, continuing...'));
      }
      resolve();
    });

    installProcess.on('error', () => {
      console.log(chalk.yellow('⚠️  Biome installation failed, continuing...'));
      resolve();
    });
  });
}

async function applyFlupke(projectName: string): Promise<void> {
  console.log(chalk.blue('⚡ Optimizing dependencies with flupke...'));
  
  return new Promise((resolve) => {
    const child = spawn('npx', ['--yes', '@flupkejs/cli'], {
      cwd: projectName,
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ Dependencies optimized with flupke'));
      } else {
        console.log(chalk.yellow('⚠️  flupke optimization skipped'));
      }
      resolve();
    });

    child.on('error', () => {
      console.log(chalk.yellow('⚠️  flupke not available, skipping'));
      resolve();
    });
  });
}

async function startDevServer(projectName: string, openBrowser: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(chalk.gray(`Running: pnpm dev in ${projectName}`));
    
    const child = spawn('pnpm', ['dev'], {
      cwd: projectName,
      stdio: 'inherit',
      shell: true
    });

    setTimeout(() => {
      if (openBrowser) {
        console.log(chalk.green('🌐 Opening browser...'));
        exec('open http://localhost:3000', () => {});
      }
      console.log(chalk.green('✅ Development server started! Press Ctrl+C to stop.'));
      resolve();
    }, 3000);

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function removeCSSFiles(projectName: string): Promise<void> {
  console.log(chalk.blue('🧹 Removing default CSS files (using MUI styling)...'));
  
  const cssFiles = [`${projectName}/src/app/globals.css`, `${projectName}/src/app/page.module.css`];
  for (const file of cssFiles) {
    try { await fs.promises.unlink(file); } catch {}
  }
  
  // Remove CSS import from layout.tsx if it exists
  const layoutPath = `${projectName}/src/app/layout.tsx`;
  try {
    const content = await fs.promises.readFile(layoutPath, 'utf8');
    const updated = content.replace(/import ["']\.\/globals\.css["'];?\n?/g, '');
    await fs.promises.writeFile(layoutPath, updated);
  } catch {}
}
