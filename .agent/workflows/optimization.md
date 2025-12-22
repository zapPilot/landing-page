---
description: Landing Page Optimization Workflow (Dead Code, Coverage, Refactoring)
---

# turbo-all

**Working Directory**: `/Users/chouyasushi/htdocs/all-weather-protocol/landing-page`

### 1. Remove Dead Code

```bash
npm run deadcode:exports
```

Review ts-prune output. Remove unused exports (watch for Next.js false positives like `metadata`, `viewport`).

```bash
npm run deadcode:check
```

### 2. Validate

```bash
npm run type-check && npm run lint && npm run dup:all
```

### 3. Increase Test Coverage

```bash
npm run test:coverage
```

Check `coverage/index.html`. Add tests in `__tests__/` directories.

### 4. Validate

```bash
npm run test:ci
```

### 5. Refactor & Modularize (SOLID/DRY)

1. Run `npm run dup:check` for duplicate detection
2. Extract shared components to `/components/`
3. Move utilities to `/lib/`

### 6. Final Validation

```bash
npm run type-check && npm run lint && npm run test:coverage
```

### 7. Commit

```bash
git add . && git commit -m "refactor(landing-page): optimize code quality"
```
