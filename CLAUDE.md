# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains `@isofucius/deno-shadcn-ui`, an unofficial package that bundles [shadcn/ui](https://ui.shadcn.com/) components for Deno users. It adapts the original shadcn/ui React components to work within the Deno ecosystem, providing proper import paths and compatibility with Deno's module system.

## Commands

### Development Commands

```bash
# Update components from shadcn/ui (copies from ui/ submodule)
deno task update

# Generate component exports for deno.json
deno task build-exports

# Run a full sync (update components, build exports, format, and lint)
deno task sync

# Format code with Deno formatter
deno fmt

# Lint code with Deno linter
deno lint

# Run tests
deno test scripts/update.test.ts
```

### Publishing

```bash
# Publish to JSR (Deno's registry)
deno publish
```

## Architecture

The project has the following structure:

- `src/default/`: Contains the adapted shadcn/ui components
  - `hooks/`: React hooks
  - `lib/`: Utility functions
  - `ui/`: UI components
- `scripts/`: Contains scripts for managing the project
  - `update.ts`: Copies and transforms shadcn/ui components from the submodule
  - `build-exports.ts`: Generates export entries in deno.json
  - `update.test.ts`: Tests for the import transformation logic
- `ui/`: Git submodule containing the original shadcn/ui source
- `deno.json`: Project configuration, including tasks, import maps, and exports

### Component Synchronization

The project works by:

1. Maintaining a Git submodule (`ui/`) pointing to the original shadcn/ui repository
2. Using `scripts/update.ts` to copy components from the submodule to `src/default/`
3. Transforming imports to work with Deno's module system
4. Using `scripts/build-exports.ts` to generate proper export mappings in deno.json

When updating components, the pipeline is:

1. Run `deno task update` to copy and transform components
2. Run `deno task build-exports` to update exports in deno.json
3. Format and lint the code with `deno fmt` and `deno lint`

All of these steps can be performed with a single command: `deno task sync`.

## Important Files

- `deno.json`: Contains all project configuration, including imports (dependencies), tasks, and exports
- `scripts/update.ts`: Handles copying and transforming components from the submodule
- `scripts/build-exports.ts`: Generates export entries in deno.json
- `src/default/lib/utils.ts`: Core utility functions used across components

## Testing

The project includes tests for the import transformation logic in `scripts/update.test.ts`. Run tests with:

```bash
deno test scripts/update.test.ts
```

## Development Workflow

When developing or updating this package:

1. Pull the latest changes from the shadcn/ui submodule
2. Run `deno task sync` to update components, build exports, and format/lint code
3. Check that components work as expected
4. Update version in deno.json if needed
5. Publish to JSR with `deno publish`
