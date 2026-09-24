# Learnings

> Scaffold-level fixes that improve every generated app.

## 1. CSP `connect-src 'self'` breaks any app that calls an API

`serverHardening` emitted:

```text
connect-src 'self'
```

The moment the frontend talks to a backend on a different origin (the common case),
the browser silently blocks the request with a CSP violation. Fix: derive the allowed
API origin from an env var so it also covers deployed URLs.

```ts
const apiOrigin = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
const connectSrc = `'self' ${apiOrigin}`;
// ...
{ key: 'Content-Security-Policy',
  value: `... connect-src ${connectSrc}; frame-ancestors 'none';` }
```

## 2. Complete, consistent security headers by default

Keep both `X-Frame-Options: DENY` and `frame-ancestors 'none'` (belt + braces), and
make the default `connect-src` API-aware as above.

## 3. Post-scaffold `pnpm approve-builds`

pnpm 11+ refuses native build scripts until approved, failing install with
`ERR_PNPM_IGNORED_BUILDS` and leaving an invalid `pnpm-workspace.yaml` placeholder.
Run `pnpm approve-builds --all` as a post-scaffold step so install/dev work out of the box.

## 4. Don't run npm over a pnpm store

If pnpm install fails and we fall back to npm, remove `node_modules` + `pnpm-lock.yaml`
first, otherwise npm's arborist crashes on the pnpm symlink farm.
