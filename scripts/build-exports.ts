/**
 * Script to generate exports for hooks and UI components
 * This script scans src/default and updates deno.json with exports
 */

import { basename, extname, join } from 'jsr:@std/path'

const SRC_DIR = './src/default'
const DENO_JSON_PATH = './deno.json'

interface DenoJsonConfig {
  compilerOptions?: Record<string, unknown>;
  lint?: Record<string, unknown>;
  fmt?: Record<string, unknown>;
  tasks?: Record<string, unknown>;
  imports?: Record<string, string>;
  exports?: Record<string, string>;
}

/**
 * Get all files in hooks and ui directories
 */
async function getComponentFiles(): Promise<{
  hooks: string[];
  ui: string[];
}> {
  const hooks: string[] = []
  const ui: string[] = []

  // Scan hooks directory
  try {
    for await (const entry of Deno.readDir(join(SRC_DIR, 'hooks'))) {
      if (!entry.isFile) continue
      if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx')) continue
      hooks.push(entry.name)
    }
  } catch (e) {
    console.warn(`Warning: Error reading hooks directory: ${e.message}`)
  }

  // Scan ui directory
  try {
    for await (const entry of Deno.readDir(join(SRC_DIR, 'ui'))) {
      if (!entry.isFile) continue
      if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx')) continue
      ui.push(entry.name)
    }
  } catch (e) {
    console.warn(`Warning: Error reading ui directory: ${e.message}`)
  }

  return { hooks, ui }
}

/**
 * Generate exports object for deno.json
 */
function generateExports(hooks: string[], ui: string[]): Record<string, string> {
  const exports: Record<string, string> = {}

  // Process hooks
  for (const file of hooks) {
    const name = basename(file, extname(file))
    exports[`./default/hooks/${name}`] = `./src/default/hooks/${file}`
  }

  // Process UI components
  for (const file of ui) {
    const name = basename(file, extname(file))
    exports[`./default/ui/${name}`] = `./src/default/ui/${file}`
  }

  return exports
}

/**
 * Check if exports have changed
 */
function haveExportsChanged(
  currentExports: Record<string, string> | undefined,
  newExports: Record<string, string>
): boolean {
  if (!currentExports) return true

  // Check if number of exports is different
  if (Object.keys(currentExports).length !== Object.keys(newExports).length) {
    return true
  }

  // Check if any export has changed
  for (const [key, value] of Object.entries(newExports)) {
    if (currentExports[key] !== value) {
      return true
    }
  }

  return false
}

/**
 * Main function
 */
async function main() {
  console.log('Starting exports generation...')

  // Get component files
  const { hooks, ui } = await getComponentFiles()
  console.log(`Found ${hooks.length} hooks and ${ui.length} UI components`)

  // Generate exports
  const newExports = generateExports(hooks, ui)
  
  // Read deno.json
  let config: DenoJsonConfig
  try {
    const content = await Deno.readTextFile(DENO_JSON_PATH)
    config = JSON.parse(content)
  } catch (e) {
    console.error(`Error reading deno.json: ${e.message}`)
    Deno.exit(1)
  }

  // Check if exports have changed
  if (!haveExportsChanged(config.exports, newExports)) {
    console.log('Exports have not changed, no update needed.')
    return
  }

  // Update config with new exports
  config.exports = newExports

  // Write updated deno.json
  try {
    await Deno.writeTextFile(
      DENO_JSON_PATH,
      JSON.stringify(config, null, 2) + '\n'
    )
    console.log(`Updated ${DENO_JSON_PATH} with ${Object.keys(newExports).length} exports`)
  } catch (e) {
    console.error(`Error writing deno.json: ${e.message}`)
    Deno.exit(1)
  }
}

// Run the main function
if (import.meta.main) {
  main().catch((e) => {
    console.error(`Error: ${e instanceof Error ? e.message : String(e)}`)
    Deno.exit(1)
  })
}