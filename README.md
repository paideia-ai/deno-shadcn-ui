# Deno shadcn/ui

An unofficial package of bundled shadcn/ui for Deno users.

## Usage

This package provides shadcn/ui components adapted for Deno. Usage is similar to the original shadcn/ui components.

```tsx
import { Button } from '@isofucius/deno-shadcn-ui/default/ui/button'

export function MyComponent() {
  return <Button variant='outline'>Click me</Button>
}
```

## Theming

shadcn/ui components require CSS variables to function correctly. These variables define colors, spacing, radii, and other design tokens that components use for consistent styling.

### Using the Default Theme

This package includes a default theme for quick prototyping. To use it, import the theme module in your application:

```tsx
import '@isofucius/deno-shadcn-ui/default/themes/base'
```

This will include the base CSS with all necessary CSS variables when your application is bundled with Vite.

### Why a Separate Import?

Deno's runtime doesn't support importing CSS files directly. To work around this limitation while maintaining compatibility with Deno's toolchain, we use a custom `@deno-vite-import` directive that gets transformed during the Vite build process. This approach:

- Keeps your code compatible with Deno's LSP, testing, and other tools
- Allows CSS to be properly bundled when building with Vite
- Follows the "import only what you need" philosophy - the theme is completely optional

For a complete Vite + Deno setup that supports this pattern, see [@isofucius/deno-vite-plus](https://jsr.io/@isofucius/deno-vite-plus).

### Custom Themes

The default theme is intended for quick prototyping. For production applications, you should create your own theme:

1. Copy the contents of `src/default/themes/base.css` as a starting point
2. Modify the CSS variables to match your design system
3. Import your custom CSS file instead of the default theme

The CSS variables follow shadcn/ui's theming system, supporting both light and dark modes with semantic color tokens.

## Repository Setup (For Maintainers)

This repository syncs components from the official shadcn/ui repository and adapts them for Deno's module system. Here's how the repository works:

### Component Synchronization

- We use `deno task update` to sync components from the upstream shadcn/ui submodule at `ui/` to the `raw/` directory
- The update script transforms import paths and other elements to work with Deno
- After syncing, components in `raw/` need to be enhanced with proper JSDoc and type definitions before publishing

### Component Enhancement

- The `enhance-components.ts` script helps add proper JSDoc comments and type signatures to components
- It uses component code and its MDX documentation (from the official shadcn/ui docs)
- You need to manually add MDX and types to top-level definitions
- Usage: `deno task enhance raw/default/ui/button.tsx` or pass multiple files

### Export Management

- The `build-exports.ts` script generates export entries in `deno.json`
- Run this after adding or updating components with: `deno task build-exports`
- This ensures all components are properly exported and importable by users

### Complete Workflow

1. Update from upstream: `deno task update`
2. Format and lint: `deno fmt raw && deno lint --fix raw`
3. Enhance components: `deno task enhance raw/default/ui/component-name.tsx`
4. Update exports: `deno task build-exports`
5. Run tests: `deno test scripts/update.test.ts`
6. Publish to JSR: `deno publish`
