# Automater

> Scaffold modern web apps with best practices in seconds

Automater is a CLI tool that creates production-ready web applications following official documentation and best practices. No more copy-pasting setup guides or dealing with configuration conflicts.

## What is Automater?

Automater solves the "blank page problem" for developers by providing:

- **Instant scaffolding** with `automater create my-app --features=mui,biome`
- **Conflict-free integrations** - installing MUI automatically handles Tailwind conflicts
- **Best practice defaults** - follows official docs from Vite, Next.js, MUI, Biome, etc.
- **Incremental additions** - add features to existing projects safely

Think `npm create cloudflare@latest` but for any stack combination with intelligent conflict resolution.

## Quick Start

### Installation
```bash
npm install -g automater
# or
pnpm add -g automater
```

### Create a New Project
```bash
# Vite + React + TypeScript + MUI + Biome
automater create my-app --template=vite-react --features=mui,biome

# Next.js with MUI Toolpad
automater create admin-app --template=nextjs --features=mui-toolpad

# Minimal Vite setup
automater create simple-app
```

### Add Features to Existing Project
```bash
cd my-existing-project

# Add Biome (replaces ESLint + Prettier if present)
automater add biome

# Add MUI (handles Tailwind conflicts)
automater add mui

# Add deployment
automater add vercel
```

### List Available Options
```bash
automater list templates
automater list features
```

## Supported Templates

- **vite-react**: Vite + React + TypeScript + pnpm
- **nextjs**: Next.js with TypeScript
- **astro**: Astro for content sites
- **sveltekit**: SvelteKit full-stack

## Supported Features

### Styling & UI
- **mui**: Material-UI with proper framework integration
- **mui-toolpad**: MUI Toolpad for admin interfaces
- **tailwind**: Tailwind CSS with framework-specific setup
- **chakra**: Chakra UI components

### Code Quality
- **biome**: Biome for linting and formatting (replaces ESLint + Prettier)
- **eslint**: ESLint + Prettier setup
- **husky**: Git hooks for code quality

### Deployment
- **vercel**: Vercel deployment configuration
- **netlify**: Netlify deployment setup
- **cloudflare**: Cloudflare Pages integration

## How It Works

### Conflict Resolution
Automater intelligently handles conflicts between tools:

- Installing **MUI** removes Tailwind and offers CSS-in-JS alternatives
- Adding **Biome** replaces existing ESLint + Prettier configurations
- Framework-specific integrations follow official documentation

### Best Practices
Every feature follows official documentation:
- MUI installation uses the exact steps from [MUI Next.js guide](https://mui.com/material-ui/integrations/nextjs/)
- Biome setup follows [Biome getting started](https://biomejs.dev/guides/getting-started/)
- Vite configuration matches [Vite official templates](https://vitejs.dev/guide/)

## Development

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Setup
```bash
git clone https://github.com/yourusername/automater
cd automater
pnpm install
```

### Development Commands
```bash
# Build the CLI
pnpm build

# Run in development
pnpm dev

# Test the CLI locally
pnpm link
automater --help

# Run tests
pnpm test
```

### Project Structure
```
automater/
├── src/
│   ├── cli/           # CLI commands and interface
│   ├── templates/     # Project templates
│   ├── features/      # Feature modules
│   ├── resolvers/     # Conflict resolution
│   └── utils/         # Shared utilities
├── templates/         # Template files
├── tests/            # Test suites
└── docs/             # Documentation
```

## Contributing

We welcome contributions! Here's how to get started:

### Adding a New Feature
1. Create feature config in `src/features/`
2. Add template files in `templates/features/`
3. Update conflict resolution rules if needed
4. Add tests and documentation

### Adding a New Template
1. Create template directory in `templates/`
2. Add template config in `src/templates/`
3. Test with various feature combinations
4. Update documentation

### Contribution Guidelines
- Follow existing code style (Biome formatting)
- Add tests for new features
- Update documentation
- Follow official documentation for integrations
- Test conflict resolution scenarios

### Pull Request Process
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Run `pnpm test` and `pnpm build`
5. Submit a pull request with clear description

## Roadmap

- [ ] Core CLI with Vite + React template
- [ ] MUI and Biome feature modules
- [ ] Conflict resolution engine
- [ ] Next.js and Astro templates
- [ ] Deployment integrations
- [ ] Interactive mode with prompts
- [ ] Custom template creation
- [ ] Plugin system

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📖 [Documentation](docs/)
- 🐛 [Issues](https://github.com/yourusername/automater/issues)
- 💬 [Discussions](https://github.com/yourusername/automater/discussions)
