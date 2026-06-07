# AGENTS.md

## Project overview

This repository (`web`) is a greenfield placeholder. It currently contains only `README.md` with the title `# web`. There is no application source code, dependency manifest (`package.json`, etc.), Docker setup, or test suite yet.

## Cursor Cloud specific instructions

### Services

| Service | Required? | Notes |
|---------|-----------|-------|
| Web app / dev server | No | Not defined in the repo yet |
| Database | No | Not defined |
| Docker | No | Not used |

There are **no runnable services** until application code and a dependency manifest are added.

### Toolchain available on the VM

The Cloud Agent VM includes:

- **Node.js** v22.x with **npm** 10.x
- **Python** 3.12
- **Git** 2.x

When a web stack is added (e.g. Next.js, Vite, or similar), typical commands will likely be:

- Install: `npm install` (or `pnpm install` / `yarn` depending on lockfile)
- Dev server: `npm run dev` (check `package.json` scripts once added)
- Lint: `npm run lint` (if configured)
- Test: `npm test` (if configured)

### Getting started (once code exists)

1. Add a `package.json` (or other stack-specific manifest) and application source.
2. Run the package manager install command matching the lockfile.
3. Start the dev server per `README.md` or `package.json` scripts.
4. Open the dev server URL (commonly `http://localhost:3000` or `http://localhost:5173`).

### Current limitations

- No lint, test, or build commands can run until project files are committed.
- End-to-end application verification is not possible on an empty repository.
