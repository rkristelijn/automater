# Coding Principles

## Core Principles (Level 0 - Bare Minimum)

These principles help any developer write code that's clear, maintainable, and works well with others.

### RTFM (Respect The Framework's Model)
**Follow the framework's intended way of doing things.**

- Use React hooks patterns, not class components when the docs recommend hooks
- Follow Next.js file-based routing instead of custom routing solutions
- Stick to MUI's theming system rather than inline styles everywhere

**Why**: Frameworks are designed by experts who've solved common problems. Fighting the framework creates bugs and confusion.

### C4C (Coding For Clarity)
**Write code that's easy to read and understand.**

- Use descriptive variable names: `userEmail` not `ue`
- Keep functions short and focused on one task
- Add comments explaining *why*, not *what*

**Why**: 80% of programming is reading existing code. Clear code saves everyone time.

### C4I (Code for Inclusivity)
**Make your code accessible to new team members.**

- Keep folder structure logical (features together, not types together)
- Make code "greppable" - searchable with simple text search
- Document what's necessary, not everything

**Why**: Teams change. New developers should be able to contribute quickly.

### KISS (Keep It Simple Stupid)
**Choose the simplest solution that works.**

- Don't build abstractions until you need them twice
- Avoid clever code that requires explanation
- Default to boring, proven solutions

**Why**: Simple code has fewer bugs and is easier to maintain.

### YAGNI (You Aren't Gonna Need It)
**Don't build features until they're actually needed.**

- Don't add configuration options "just in case"
- Don't generalize until you have a second use case
- Don't optimize prematurely

**Why**: Unused features become technical debt and maintenance burden.

### HIPI (Hide Implementation, Present Interface)
**Encapsulate complexity behind clear interfaces.**

```javascript
// 🤔 Meh - exposes implementation
if (user.age > 18 && user.isActive && !user.isBanned) { ... }

// ✅ Better - hides complexity
if (user.canAccessDashboard()) { ... }
```

**Why**: Clean interfaces make refactoring safer and code more testable.

### NBI (Naming by Intention)
**Names should clearly express purpose and behavior.**

```javascript
// 🤔 Meh - unclear intent
const data = fetchData();

// ✅ Better - clear intent
const userList: User[] = fetchUsers();
```

**Why**: Good names act as documentation and reduce cognitive load.

## Enterprise Principles (When Code Must Survive Years)

For applications that will be maintained by many people over years, additional principles become important.

### SOLID Principles

**S - Single Responsibility Principle**
Each class/function should have one reason to change. A user service shouldn't also handle email formatting.

**O - Open-Closed Principle**
Open for extension, closed for modification. Add new features without changing existing code.

**L - Liskov Substitution Principle**
Subtypes should be replaceable with their base types without breaking functionality.

**I - Interface Segregation Principle**
Don't force classes to depend on interfaces they don't use. Keep interfaces focused.

**D - Dependency Inversion Principle**
Depend on abstractions, not concrete implementations. Use dependency injection.

### 15-Factor App (Modern Cloud Applications)

The original 12-factor app has evolved to 15 factors for modern cloud-native applications:

1. **Codebase** - One codebase, many deployments
2. **Dependencies** - Explicitly declare dependencies
3. **Config** - Store config in environment variables
4. **Backing Services** - Treat services as attached resources
5. **Build/Release/Run** - Separate build and run stages
6. **Processes** - Execute as stateless processes
7. **Port Binding** - Export services via port binding
8. **Concurrency** - Scale via process model
9. **Disposability** - Fast startup and graceful shutdown
10. **Dev/Prod Parity** - Keep environments similar
11. **Logs** - Treat logs as event streams
12. **Admin Processes** - Run admin tasks as one-off processes
13. **API First** - Design APIs before implementation
14. **Telemetry** - Monitor everything
15. **Authentication & Authorization** - Security built-in, not bolted-on

### When to Use Enterprise Principles

**Use enterprise principles when:**
- Code will be maintained for 3+ years
- Multiple teams will work on the codebase
- The application is business-critical
- You need to onboard new developers regularly

**Stick to core principles when:**
- Building prototypes or MVPs
- Working on personal projects
- Time-to-market is critical
- The team is small and stable

## Balance: Simplicity vs. Maintainability

The key is knowing when to apply which principles:

- **Start simple** - Use core principles by default
- **Evolve complexity** - Add enterprise patterns when you feel the pain
- **Document decisions** - Explain why you chose complexity over simplicity
- **Refactor gradually** - Don't rewrite everything at once

Remember: The best code is code that solves the problem at hand with the appropriate level of complexity for its intended lifespan and team size.
