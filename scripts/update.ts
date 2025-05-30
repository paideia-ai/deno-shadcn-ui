/**
 * Script to copy shadcn/ui components from the submodule to the project
 * This script copies components from ui/apps/www/registry/default/ to src/default/
 */

import { ensureDir } from 'jsr:@std/fs'
import { extname, join } from 'jsr:@std/path'

const SHADCN_REGISTRY_PATH = './ui/apps/www/registry/default'
const TARGET_BASE_PATH = './raw/default'

// Store all detected imports with counts and categories
interface ImportInfo {
  count: number
  path: string
}

// Two categories: external and local imports
const externalImports: Map<string, ImportInfo> = new Map() // non-local (not starting with @/)
const localImports: Map<string, ImportInfo> = new Map() // local (starting with @/)

// Directories to copy
const DIRECTORIES = ['hooks', 'lib', 'ui']

// Map to store file paths with their extensions
type FileMap = Map<string, string> // key: path without extension, value: extension (.ts or .tsx)
// Export for testing
export const fileExtensionMap: FileMap = new Map()

/**
 * Build a file extension map for the target directories
 */
async function buildFileExtensionMap(basePath: string): Promise<void> {
  // Process each directory we need to copy
  for (const dir of DIRECTORIES) {
    const dirPath = join(basePath, dir)

    try {
      await scanDirectory(dirPath, dir)
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        console.warn(`Warning: Directory ${dirPath} not found, skipping scan.`)
      } else {
        console.error(`Error scanning ${dirPath}: ${e instanceof Error ? e.message : String(e)}`)
      }
    }
  }
}

/**
 * Recursively scan a directory and add files to the extension map
 */
async function scanDirectory(dirPath: string, relativePath: string): Promise<void> {
  for await (const entry of Deno.readDir(dirPath)) {
    const fullPath = join(dirPath, entry.name)
    const relPath = join(relativePath, entry.name)

    if (entry.isDirectory) {
      // Recursively scan subdirectories
      await scanDirectory(fullPath, relPath)
    } else {
      // Get the file extension
      const ext = extname(entry.name)
      // Store path without extension as key
      const pathWithoutExt = relPath.substring(0, relPath.length - ext.length)
      // Store the extension (including the dot)
      fileExtensionMap.set(pathWithoutExt, ext)
    }
  }
}

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

  // First, build the file extension map
  console.log('Building file extension map...')
  await buildFileExtensionMap(TARGET_BASE_PATH)
  console.log(`Found ${fileExtensionMap.size} files in the target directories.`)

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

  // Helper for sorting and printing
  const printImportCategory = (categoryName: string, imports: Map<string, ImportInfo>) => {
    console.log(`\n===== ${categoryName} IMPORTS =====`)

    // Convert to array for sorting
    const sortedImports = Array.from(imports.values())
      .sort((a, b) => b.count - a.count) // Sort by count descending

    // Print the imports
    for (const imp of sortedImports) {
      console.log(`${imp.path} (${imp.count} times)`)
    }

    console.log(`Total ${categoryName.toLowerCase()} imports: ${imports.size}`)
  }

  // Print each category
  printImportCategory('EXTERNAL', externalImports)
  printImportCategory('LOCAL', localImports)

  // Calculate overall total
  const totalUniqueImports = externalImports.size + localImports.size
  console.log(`\nTotal unique imports across all categories: ${totalUniqueImports}`)
}

/**
 * Determine the file extension for a local path
 * Defaults to .ts if not found in the map
 * Exported for testing
 */
export function determineFileExtension(path: string): string {
  // Extract the relative path from @/default/...
  if (!path.startsWith('@/default/')) {
    // Not a path we can determine
    return path.includes('/ui/') ? '.tsx' : '.ts'
  }

  // Remove @/default/ prefix
  const relativePath = path.substring('@/default/'.length)

  // Look up in the file map
  const foundExt = fileExtensionMap.get(relativePath)
  if (foundExt) {
    return foundExt
  }

  // Default to .ts or .tsx based on path
  return path.includes('/ui/') ? '.tsx' : '.ts'
}

/**
 * Transform local imports with file extensions and proper paths
 * Exported for testing
 */
export function transformImports(content: string): string {
  // We don't need to modify external modules anymore - they'll be treated as core modules
  // Just start with the original content
  let transformed = content

  // Next, handle local imports - transform paths and add extensions
  // Match all local imports starting with @/ including different import formats
  // This handles:
  // 1. Regular imports: import { x } from "@/path"
  // 2. Type imports: import type { x } from "@/path"
  // 3. Multi-line imports with various formats
  const localImportRegex =
    /import\s+(?:(?:type\s+)?(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+)(?:\s*,\s*(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+))*\s+from\s+['"])(@\/[^'"]+)(['"])/g

  transformed = transformed.replace(localImportRegex, (match, path, suffix) => {
    // Reconstruct the prefix from the original match up to the path
    const prefixEnd = match.lastIndexOf(path)
    const prefix = match.substring(0, prefixEnd)

    // Handle different types of local imports
    if (path.startsWith('@/registry/default/')) {
      // Transform @/registry/default/xxx/yyy to @/default/xxx/yyy.ext
      const newPath = path.replace('@/registry/default/', '@/default/')
      // Use the file extension map to determine the correct extension
      const ext = determineFileExtension(newPath)
      return `${prefix}${newPath}${ext}${suffix}`
    } else if (path.startsWith('@/lib/') || path.startsWith('@/hooks/')) {
      // Transform @/lib/utils to @/default/lib/utils.ts
      // Transform @/hooks/xxx to @/default/hooks/xxx.ts
      const parts = path.split('/')
      const directory = parts[1] // lib or hooks
      const filename = parts.slice(2).join('/')

      const newPath = `@/default/${directory}/${filename}`
      const ext = determineFileExtension(newPath)
      return `${prefix}${newPath}${ext}${suffix}`
    } else if (path.startsWith('@/ui/')) {
      // Handle direct UI component imports like @/ui/button
      const componentName = path.substring('@/ui/'.length)
      const newPath = `@/default/ui/${componentName}`
      const ext = determineFileExtension(newPath)
      return `${prefix}${newPath}${ext}${suffix}`
    } else if (path === '@/lib/utils') {
      // Special case for the most common import
      return `${prefix}@/default/lib/utils.ts${suffix}`
    } else {
      // For any other local imports, try to determine the proper extension
      // Convert path from @/path to @/default/path
      const newPath = `@/default${path.substring(2)}`
      const ext = determineFileExtension(newPath)
      return `${prefix}${newPath}${ext}${suffix}`
    }
  })

  return transformed
}

/**
 * Extract imports from file content
 * Note: DOM references are now handled through deno.json compilerOptions.lib
 */
function transformFile(content: string): string {
  // No need to add DOM reference anymore, it's in deno.json
  const newContent = content

  // Extract imports using regex - match the import statements more precisely
  const importRegex =
    /^\s*import\s+(?:(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+)(?:\s*,\s*(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+))*\s+from\s+)?['"]([^'"]+)['"]/gm
  let match
  while ((match = importRegex.exec(content)) !== null) {
    // Get the import path
    const importPath = match[1]

    // Categorize the import
    if (importPath.startsWith('@/')) {
      // Local imports
      if (localImports.has(importPath)) {
        const info = localImports.get(importPath)!
        info.count++
        localImports.set(importPath, info)
      } else {
        localImports.set(importPath, { count: 1, path: importPath })
      }
    } else {
      // External imports
      if (externalImports.has(importPath)) {
        const info = externalImports.get(importPath)!
        info.count++
        externalImports.set(importPath, info)
      } else {
        externalImports.set(importPath, { count: 1, path: importPath })
      }
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

      // First transform to add DOM reference and extract imports
      let transformedContent = transformFile(content)

      // Then transform all imports (add npm: prefix to external modules and fix local imports)
      transformedContent = transformImports(transformedContent)

      // Write directly to target path
      await Deno.writeTextFile(targetPath, transformedContent)

      // After writing the file, update the file extension map
      const ext = extname(entry.name)
      const relPath = join(target, entry.name).replace(TARGET_BASE_PATH + '/', '')
      const pathWithoutExt = relPath.substring(0, relPath.length - ext.length)
      fileExtensionMap.set(pathWithoutExt, ext)
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
