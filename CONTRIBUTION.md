# Contributing

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