/**
 * Default theme for shadcn/ui components - provides essential CSS variables for quick prototyping.
 * 
 * This module uses a custom @deno-vite-import directive to include CSS while maintaining Deno compatibility.
 * Deno's runtime doesn't support importing CSS files directly, which would cause errors during development,
 * testing, or running TypeScript code. The @deno-vite-import directive is processed by a custom Vite plugin
 * that transforms it into a proper CSS import during the build process, allowing you to:
 * - Use Deno's native toolchain (LSP, testing, etc.) without errors
 * - Bundle CSS correctly when building with Vite
 * 
 * For a complete working setup with Vite and Deno, see: https://jsr.io/@isofucius/deno-vite-plus
 * 
 * ## Usage
 * 
 * Import this module in your app to include the default shadcn/ui theme:
 * ```ts
 * import '@isofucius/deno-shadcn-ui/default/themes/base'
 * ```
 * 
 * When processed by Vite with the deno-vite-plugin, this will bundle the base.css file containing
 * all necessary CSS variables that shadcn/ui components depend on for styling.
 * 
 * ## Why CSS Variables?
 * 
 * shadcn/ui components rely on CSS custom properties (variables) for theming. These variables define
 * colors, spacing, radii, and other design tokens that components reference. Without these variables,
 * components will lack proper styling and may not display correctly.
 * 
 * ## Customization
 * 
 * This default theme is intended for quick prototyping. For production applications, you're encouraged
 * to create your own theme by:
 * 1. Copying the base.css file as a starting point
 * 2. Modifying the CSS variables to match your design system
 * 3. Importing your custom theme instead of this default one
 * 
 * This package follows a "import only what you need" philosophy. If you don't want to use the default
 * theme, simply don't import this module and provide your own CSS variables instead.
 * 
 * @module
 */

// @deno-vite-import ./base.css

const dummy = 'dummy'

export default dummy
