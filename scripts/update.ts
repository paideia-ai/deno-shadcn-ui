/**
 * Script to copy shadcn/ui components from the submodule to the project
 * This script copies components from ui/apps/www/registry/default/ to src/default/
 */

import { copy, ensureDir } from 'jsr:@std/fs'
import { join } from 'jsr:@std/path'

const SHADCN_REGISTRY_PATH = './ui/apps/www/registry/default'
const TARGET_BASE_PATH = './src/default'

// Store all detected imports
const detectedImports: string[] = []

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
  
  // List all detected imports
  console.log('\n===== DETECTED IMPORTS =====');
  for (const importStmt of detectedImports) {
    console.log(importStmt);
  }
  console.log(`\nTotal imports found: ${detectedImports.length}`);
}

/**
 * Transform file content by adding DOM reference and extract imports
 */
async function transformFile(content: string): Promise<string> {
  // Add DOM reference if not already present
  const hasReference = content.includes('/// <reference lib="dom"')
  let newContent = hasReference ? content : '/// <reference lib="dom" />\n\n' + content
  
  // Extract imports using regex - match the import statements more precisely
  const importRegex = /^\s*import\s+(?:(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+)(?:\s*,\s*(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+))*\s+from\s+)?['"]([^'"]+)['"]/gm
  let match
  while ((match = importRegex.exec(content)) !== null) {
    // Just add the import path to detectedImports
    const importPath = match[1]
    if (!detectedImports.includes(importPath)) {
      detectedImports.push(importPath)
    }
  }
  
  return newContent
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
      // Read the source file
      const content = await Deno.readTextFile(sourcePath)
      
      // Transform the content
      const transformedContent = await transformFile(content)
      
      // Write directly to target path
      await Deno.writeTextFile(targetPath, transformedContent)
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
