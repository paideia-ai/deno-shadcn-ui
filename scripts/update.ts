/**
 * Script to copy shadcn/ui components from the submodule to the project
 * This script copies components from ui/apps/www/registry/default/ to src/default/
 */

import { copy, ensureDir } from 'jsr:@std/fs'
import { join } from 'jsr:@std/path'

const SHADCN_REGISTRY_PATH = './ui/apps/www/registry/default'
const TARGET_BASE_PATH = './src/default'

// Directories to copy
const DIRECTORIES = ['hooks', 'lib', 'ui']

async function main() {
  console.log('Starting shadcn/ui components update...')

  // Check if shadcn/ui submodule exists
  try {
    await Deno.stat(SHADCN_REGISTRY_PATH)
  } catch {
    console.error(
      `Error: Could not find shadcn/ui registry at ${SHADCN_REGISTRY_PATH}`,
    )
    console.error('Make sure the submodule is initialized correctly.')
    console.error('You can run: git submodule update --init --recursive')
    Deno.exit(1)
  }

  // Process each directory
  for (const dir of DIRECTORIES) {
    const sourcePath = join(SHADCN_REGISTRY_PATH, dir)
    const targetPath = join(TARGET_BASE_PATH, dir)

    try {
      // Check if source directory exists
      await Deno.stat(sourcePath)

      // Create the target directory if it doesn't exist
      await ensureDir(targetPath)

      console.log(`Copying ${dir} components...`)

      // Copy directory contents recursively
      await copyDirectory(sourcePath, targetPath)

      console.log(`✓ Successfully copied ${dir} components`)
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        console.warn(`Warning: Directory ${sourcePath} not found, skipping.`)
      } else {
        console.error(
          `Error processing ${dir}: ${e instanceof Error ? e.message : String(e)}`,
        )
      }
    }
  }

  console.log('shadcn/ui component update completed!')
}

/**
 * Recursively copy a directory
 */
async function copyDirectory(source: string, target: string) {
  // Create target directory
  await ensureDir(target)

  // Read source directory
  for await (const entry of Deno.readDir(source)) {
    const sourcePath = join(source, entry.name)
    const targetPath = join(target, entry.name)

    if (entry.isDirectory) {
      // Recursively copy subdirectories
      await copyDirectory(sourcePath, targetPath)
    } else {
      // Copy file
      await copy(sourcePath, targetPath, { overwrite: true })
    }
  }
}

// Run the main function
if (import.meta.main) {
  main().catch((e) => {
    console.error(
      `Error: ${e instanceof Error ? e.message : String(e)}`,
    )
    Deno.exit(1)
  })
}
