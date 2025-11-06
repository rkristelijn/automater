# Automater

> Skip the setup, focus on the code - built for Hack Your Future

Automater is a CLI tool designed for [Hack Your Future](https://www.hackyourfuture.net/) participants to instantly create production-ready web applications. Skip the boring configuration and jump straight into the design-to-code feedback loop that matters most in real development work.

While primarily built to support Hack Your Future assignments, Automater follows the Open-Closed Principle - stable core functionality that's easily extensible for other educational programs and use cases.

## What is Hack Your Future?
[![Hack Your Future](https://img.youtube.com/vi/1D_qK6jWNAM/0.jpg)](https://www.youtube.com/watch?v=1D_qK6jWNAM)]

## What is Automater?

Automater solves the "blank page problem" for developers by providing:

- **Instant scaffolding** with `automater create my-app --features=mui,biome`
- **Conflict-free integrations** - installing MUI automatically handles Tailwind conflicts
- **Best practice defaults** - follows official docs from Vite, Next.js, MUI, Biome, etc.
- **Incremental additions** - add features to existing projects safely

Think `npm create cloudflare@latest` but for any stack combination with intelligent conflict resolution.

## Quick Start

### Create a New Project
```bash
# Vite + React + TypeScript + MUI + Biome
npx automater create my-app --features=mui,biome

# Next.js with MUI Toolpad in specific directory
npx automater create projects/admin-app --features=mui-toolpad

# Create in tmp directory for testing
npx automater create tmp/test-app

# Start development server immediately and open browser
npx automater create my-app --start --open
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

> 📖 **Complete reference**: See [OPTIONS_OVERVIEW.md](docs/OPTIONS_OVERVIEW.md) for detailed feature descriptions, sources, and compatibility matrix.

### Security & Quality ⭐
- **serverHardening** *(Default)*: Production-ready security headers following [OWASP guidelines](https://owasp.org/www-project-secure-headers/)
- **biome** *(Default)*: Fast Rust-based linter/formatter from [Biome project](https://biomejs.dev/)
- **eslint**: Traditional ESLint + Prettier setup for teams requiring specific plugins
- **husky**: Git hooks for code quality enforcement

**[🔒 Security Best Practices](docs/security-best-practices.md)** - Detailed security implementation and verification guide.

### Styling & UI
- **mui**: Material-UI components with [official Next.js integration](https://mui.com/material-ui/integrations/nextjs/)
- **mui-toolpad**: Complete admin dashboard with [MUI Toolpad Core](https://mui.com/toolpad/) - includes theme system, DataGrids, and CRUD pages
- **tailwind**: Utility-first CSS with [framework-specific setup](https://tailwindcss.com/docs/guides/nextjs)
- **chakra**: Accessible React components from [Chakra UI](https://chakra-ui.com/)

### Deployment
- **vercel**: [Vercel platform](https://vercel.com/docs) deployment configuration
- **netlify**: [Netlify](https://docs.netlify.com/) static site deployment
- **cloudflare**: [Cloudflare Pages](https://developers.cloudflare.com/pages/) with Workers integration

### Default Features
All templates include **serverHardening** and **biome** by default for production readiness and optimal developer experience.

## Coding Principles

Automater follows essential development principles that help developers write clear, maintainable code:

- **RTFM** (Respect The Framework's Model): Follow official documentation and framework conventions
- **C4C** (Coding For Clarity): Write code that's easy to read and understand
- **C4I** (Code for Inclusivity): Make your code accessible to new team members
- **KISS** (Keep It Simple Stupid): Choose simplicity over cleverness
- **YAGNI** (You Aren't Gonna Need It): Don't build features until they're needed
- **HIPI** (Hide Implementation, Present Interface): Encapsulate complexity behind clear APIs
- **NBI** (Naming by Intention): Use names that clearly express purpose and behavior

Every generated project embeds these principles through code comments, structure, and tool choices.

**[📖 More Information](docs/coding-principles.md)** - Detailed explanations, enterprise principles, SOLID, and 15-factor app guidelines.

**[🔧 Toolpad Best Practices](docs/toolpad-best-practices.md)** - Essential patterns for MUI Toolpad implementation based on official examples.

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
pnpm build
node dist/cli.js create tmp/test-app --start --open

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

## Support This Project

This project is **free and open source**, but it wasn't free to build. If Automater saves you time and helps your development workflow, please consider supporting its continued development.

**[💖 Sponsor on GitHub](https://github.com/sponsors/rkristelijn)**

Your support helps:
- Maintain and improve existing features
- Add new templates and integrations
- Provide community support
- Keep the project sustainable

Every contribution, no matter the size, makes a difference and is greatly appreciated! 🙏

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📖 [Documentation](docs/)
- 🐛 [Issues](https://github.com/yourusername/automater/issues)
- 💬 [Discussions](https://github.com/yourusername/automater/discussions)
