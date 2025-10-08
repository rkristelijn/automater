# Automater Design Document

## Overview
Automater is a CLI tool that enables rapid scaffolding of modern web applications with best practices baked in. Think `npm create cloudflare@latest` but for any stack combination with intelligent conflict resolution.

## Core Philosophy
- **Best Practice First**: Always follow official documentation and recommended setups
- **Conflict Aware**: Detect and resolve conflicts between tools (e.g., Tailwind vs MUI)
- **Incremental**: Add features to existing projects or start fresh
- **Opinionated**: Make smart defaults while allowing customization

## Architecture

### Command Structure
```bash
# Create new project
automater create <project-name> [options]

# Add features to existing project
automater add <feature> [options]

# List available templates/features
automater list [templates|features]
```

### Core Features

#### 1. Project Templates
- **Vite + React**: Modern React with Vite, TypeScript, pnpm
- **Next.js**: Full-stack React framework
- **Astro**: Content-focused sites
- **SvelteKit**: Svelte-based full-stack

#### 2. Feature Modules
- **Styling**: Tailwind, MUI, Styled Components, CSS Modules
- **Code Quality**: Biome, ESLint + Prettier, Husky
- **UI Libraries**: MUI, Chakra UI, Ant Design, Headless UI
- **Advanced**: MUI Toolpad, Storybook, Testing (Vitest, Playwright)
- **Deployment**: Vercel, Netlify, Cloudflare Pages

#### 3. Conflict Resolution
- **Styling Conflicts**: Installing MUI removes Tailwind, offers CSS-in-JS alternative
- **Linting Conflicts**: Biome replaces ESLint + Prettier setup
- **Framework Conflicts**: Warn when adding incompatible features

### Technical Implementation

#### File Structure
```
automater/
├── src/
│   ├── cli/           # CLI interface and commands
│   ├── templates/     # Project templates
│   ├── features/      # Feature modules
│   ├── resolvers/     # Conflict resolution logic
│   └── utils/         # Shared utilities
├── templates/         # Template files and configs
└── docs/             # Documentation
```

#### Template System
- **Base Templates**: Minimal starting points
- **Feature Configs**: JSON/YAML configs for each feature
- **Merge Strategies**: How to combine features safely

#### Conflict Resolution Engine
```typescript
interface ConflictRule {
  feature: string;
  conflicts: string[];
  resolution: 'replace' | 'warn' | 'merge';
  message: string;
}
```

### Example Workflows

#### New Project with MUI
```bash
automater create my-app --template=vite-react --features=mui,biome
# Creates Vite + React + TypeScript + MUI + Biome
# Automatically excludes Tailwind, configures MUI theme
```

#### Add Feature to Existing Project
```bash
cd existing-project
automater add mui
# Detects existing setup, removes conflicting styles
# Adds MUI with proper Next.js/Vite integration
```

## Development Phases

### Phase 1: Core CLI & Templates
- Basic CLI structure with create command
- Vite + React template with TypeScript
- Biome and MUI feature modules

### Phase 2: Conflict Resolution
- Conflict detection engine
- Smart feature replacement
- User confirmation prompts

### Phase 3: Extended Features
- More templates (Next.js, Astro)
- Additional UI libraries
- Deployment integrations

### Phase 4: Advanced Features
- Custom template creation
- Plugin system
- Interactive mode with prompts

## Technical Decisions

### Package Manager
- **Primary**: pnpm (fastest, most efficient)
- **Fallback**: npm/yarn detection and support

### Configuration Format
- **Templates**: JSON with mustache templating
- **Features**: YAML for readability
- **User Config**: `.automaterrc.json`

### Dependencies
- **CLI Framework**: Commander.js or Yargs
- **File Operations**: fs-extra
- **Templating**: Mustache or Handlebars
- **Package Detection**: Read package.json, detect frameworks

## Success Metrics
- Time to create production-ready app < 2 minutes
- Zero configuration conflicts
- 100% alignment with official documentation
- Community adoption and contributions
