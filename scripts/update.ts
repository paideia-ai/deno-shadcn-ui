/**
 * Script to copy shadcn/ui components from the submodule to the project
 * This script copies components from ui/apps/www/registry/default/ to src/default/
 */

import { copy, ensureDir } from 'jsr:@std/fs'
import { join } from 'jsr:@std/path'

const SHADCN_REGISTRY_PATH = './ui/apps/www/registry/default'
const TARGET_BASE_PATH = './src/default'

// Store all detected imports with counts and categories
interface ImportInfo {
  count: number;
  path: string;
}

// Define core modules - exported for testing
export const CORE_MODULES = ['react', 'clsx', 'tailwind-merge', 'lucide-react'];

// Three categories: core, external, local
const coreImports: Map<string, ImportInfo> = new Map(); // core modules defined above
const externalImports: Map<string, ImportInfo> = new Map(); // non-local (not starting with @/)
const localImports: Map<string, ImportInfo> = new Map(); // local (starting with @/)

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
  
  // Helper for sorting and printing
  const printImportCategory = (categoryName: string, imports: Map<string, ImportInfo>) => {
    console.log(`\n===== ${categoryName} IMPORTS =====`);
    
    // Convert to array for sorting
    const sortedImports = Array.from(imports.values())
      .sort((a, b) => b.count - a.count); // Sort by count descending
    
    // Print the imports
    for (const imp of sortedImports) {
      console.log(`${imp.path} (${imp.count} times)`);
    }
    
    console.log(`Total ${categoryName.toLowerCase()} imports: ${imports.size}`);
  };
  
  // Print each category
  printImportCategory('CORE', coreImports);
  printImportCategory('EXTERNAL', externalImports);
  printImportCategory('LOCAL', localImports);
  
  // Calculate overall total
  const totalUniqueImports = coreImports.size + externalImports.size + localImports.size;
  console.log(`\nTotal unique imports across all categories: ${totalUniqueImports}`);
}

/**
 * Add NPM prefixes to all non-local and non-core imports
 * Transform local imports with file extensions and proper paths
 * Exported for testing
 */
export function transformImports(content: string): string {
  // First, handle external modules - add "npm:" prefix to non-local, non-core imports
  // Match specific import statements with quoted paths for external modules - handle multi-line imports
  const externalImportRegex = /import\s+(?:(?:type\s+)?(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+)(?:\s*,\s*(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+))*\s+from\s+['"])([^@][^'"]*|@(?!\/)[^'"]*)(["'])/gs;
  
  let transformed = content.replace(externalImportRegex, (match, path, suffix) => {
    // Reconstruct the prefix from the match
    const prefixEnd = match.lastIndexOf(path);
    const prefix = match.substring(0, prefixEnd);
    
    // Skip core packages that are already in deno.json
    if (CORE_MODULES.includes(path)) {
      return `${prefix}${path}${suffix}`;
    }
    // Add npm: prefix to external packages
    return `${prefix}npm:${path}${suffix}`;
  });
  
  // Next, handle local imports - transform paths and add extensions
  // Match all local imports starting with @/ including different import formats
  // This handles:
  // 1. Regular imports: import { x } from "@/path"
  // 2. Type imports: import type { x } from "@/path"
  // 3. Multi-line imports with various formats
  const localImportRegex = /import\s+(?:(?:type\s+)?(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+)(?:\s*,\s*(?:{[^}]*}|\*\s+as\s+[^\s,;]+|[^\s,;]+))*\s+from\s+['"])(@\/[^'"]+)(['"])/g;
  
  transformed = transformed.replace(localImportRegex, (match, path, suffix) => {
    // Reconstruct the prefix from the original match up to the path
    const prefixEnd = match.lastIndexOf(path);
    const prefix = match.substring(0, prefixEnd);
    // Handle different types of local imports
    if (path.startsWith('@/registry/default/')) {
      // Transform @/registry/default/xxx/yyy to @/default/xxx/yyy.ext
      const newPath = path.replace('@/registry/default/', '@/default/');
      
      // Add appropriate extension based on the directory
      if (newPath.includes('/ui/')) {
        return `${prefix}${newPath}.tsx${suffix}`;
      } else {
        return `${prefix}${newPath}.ts${suffix}`;
      }
    } else if (path.startsWith('@/lib/') || path.startsWith('@/hooks/')) {
      // Transform @/lib/utils to @/default/lib/utils.ts
      // Transform @/hooks/xxx to @/default/hooks/xxx.ts
      const parts = path.split('/');
      const directory = parts[1]; // lib or hooks
      const filename = parts.slice(2).join('/');
      
      return `${prefix}@/default/${directory}/${filename}.ts${suffix}`;
    } else if (path === '@/lib/utils') {
      // Special case for the most common import
      return `${prefix}@/default/lib/utils.ts${suffix}`;
    } else {
      // For any other local imports, try to determine the proper extension
      if (path.includes('/ui/')) {
        return `${prefix}@/default${path.substring(2)}.tsx${suffix}`;
      } else {
        return `${prefix}@/default${path.substring(2)}.ts${suffix}`;
      }
    }
  });
  
  return transformed;
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
    // Get the import path
    const importPath = match[1]
    
    // Categorize the import
    if (CORE_MODULES.includes(importPath)) {
      // Core imports
      if (coreImports.has(importPath)) {
        const info = coreImports.get(importPath)!
        info.count++
        coreImports.set(importPath, info)
      } else {
        coreImports.set(importPath, { count: 1, path: importPath })
      }
    } else if (importPath.startsWith('@/')) {
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
      let transformedContent = await transformFile(content)
      
      // Then transform all imports (add npm: prefix to external modules and fix local imports)
      transformedContent = transformImports(transformedContent)
      
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
