# examples/opennext-mui-toolpad

> Generated with [Automater](https://github.com/rkristelijn/automater)

This project was scaffolded using Automater with MUI Toolpad Core for admin interfaces.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Platform**: Cloudflare Workers/Pages
- **Admin UI**: MUI Toolpad Core
- **UI Library**: Material-UI (MUI) v6
- **Authentication**: NextAuth.js with GitHub provider
- **Language**: TypeScript
- **Package Manager**: npm

## Getting Started

### Development
```bash
npm run dev
```

Visit:
- `http://localhost:3000` - Landing page
- `http://localhost:3000/dashboard` - Admin dashboard

### Build
```bash
npm run build
```

### Deploy
```bash
npm run deploy
```

## Features

- 📊 **Dashboard Layout** - Pre-configured admin interface
- 🔐 **Authentication** - GitHub OAuth integration ready
- 📱 **Responsive Design** - Mobile-friendly admin panels
- 🎨 **Material Design** - Consistent UI components
- 📋 **Data Tables** - Ready-to-use data display components

## Project Structure

```
examples/opennext-mui-toolpad/
├── src/
│   └── app/
│       ├── (dashboard)/
│       │   ├── layout.tsx      # Toolpad dashboard layout
│       │   ├── dashboard/      # Dashboard page
│       │   └── orders/         # Orders management page
│       ├── layout.tsx          # Root layout
│       └── page.tsx           # Landing page
├── public/                     # Static assets
└── package.json               # Dependencies and scripts
```

## Standards & Best Practices

This project follows official standards from:

- [MUI Toolpad Core](https://mui.com/toolpad/core/introduction/) - Admin interface framework
- [Next.js App Router](https://nextjs.org/docs/app) - Modern React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Material-UI](https://mui.com/) - React UI framework
- [Cloudflare Pages](https://developers.cloudflare.com/pages/) - Deployment platform

## Authentication Setup

To enable GitHub authentication:

1. Create a GitHub OAuth App at https://github.com/settings/applications/new
2. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
3. Add environment variables:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## Learn More

- [MUI Toolpad Documentation](https://mui.com/toolpad/core/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Automater GitHub](https://github.com/rkristelijn/automater)
