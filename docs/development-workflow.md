# Development Workflow

## Testing and Development Process

Automater follows a **safe development workflow** that ensures every change is tested before being integrated into the generator code.

### The Workflow

1. **Generate Example** - Use the CLI to create a working example
2. **Test & Fix** - Fix issues directly in the example directory
3. **Commit** - Save the working state
4. **Retrofit** - Update the generator code to match the fixes
5. **Regenerate** - Overwrite the example to verify no changes are missed

### Step-by-Step Process

#### 1. Generate Example
```bash
# Generate the target stack in examples/
node dist/cli.js create examples/opennext-mui-toolpad --features=mui-toolpad,serverHardening,biome
```

#### 2. Test & Fix in Examples
```bash
cd examples/opennext-mui-toolpad
npm install
npm run dev

# Fix any issues directly in this directory
# - Update package.json dependencies
# - Fix configuration files
# - Adjust component code
# - Test DataGrid spacing issues
# - Verify security headers
```

#### 3. Commit Working State
```bash
git add examples/
git commit -m "Working example: opennext-mui-toolpad with fixes"
```

#### 4. Retrofit Generator Code
Update the generator templates and code to match the working example:
```bash
# Update templates in src/templates/
# Update feature modules in src/features/
# Update conflict resolution in src/resolvers/
```

#### 5. Regenerate and Verify
```bash
# Remove the example
rm -rf examples/opennext-mui-toolpad

# Regenerate using updated generator
node dist/cli.js create examples/opennext-mui-toolpad --features=mui-toolpad,serverHardening,biome

# Check for any differences
git status
# Should show no changes if retrofit was complete
```

### Safety Net Benefits

- **No Breaking Changes**: Always have a working reference
- **Incremental Progress**: Fix one issue at a time
- **Version Control**: Every working state is committed
- **Validation**: Regeneration confirms all fixes are captured
- **Rollback Safety**: Can always return to last working state

### Example Issues to Fix

Based on the instructions, common issues to address:

1. **CSS Files**: Remove unnecessary CSS file generation
2. **DataGrid Spacing**: Ensure DataGrid consumes full parent space
3. **Missing Routes**: Add proper detail routes for Toolpad
4. **Security Comments**: Add inline comments with best practice links
5. **Theme Consolidation**: Replace local overrides with centralized theme

### Commands Reference

```bash
# Build CLI
pnpm build

# Generate example
node dist/cli.js create examples/[stack-name] --features=[feature-list]

# Test example
cd examples/[stack-name] && npm install && npm run dev

# Commit working state
git add examples/ && git commit -m "Working: [description]"

# Regenerate for validation
rm -rf examples/[stack-name] && node dist/cli.js create examples/[stack-name] --features=[feature-list]
```

This workflow ensures **only progress** - every step forward is validated and preserved.
