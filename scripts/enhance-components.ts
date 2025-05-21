/**
 * Script to enhance components with JSDoc comments and proper type signatures
 * Based on the component's code and its MDX documentation.
 *
 * This script:
 * 1. Takes specified paths relative to project root (like raw/default/ui/button.tsx)
 * 2. Processes them with Claude to add proper JSDoc and type signatures
 * 3. Copies the enhanced components to the src/ directory
 * 4. Uses a semaphore to limit parallel processing to 4 files at a time
 *
 * You can run it with:
 *   deno run -A scripts/enhance-components.ts raw/default/ui/button.tsx
 *
 * Or with multiple files:
 *   deno run -A scripts/enhance-components.ts raw/default/ui/button.tsx raw/default/ui/alert.tsx
 */

// Constants
const RAW_DIR = './raw/default'
const SRC_DIR = './src/default'
const DOC_DIR = './ui/apps/www/content/docs/components'
const MAX_CONCURRENT = 4 // Maximum number of parallel processes

/**
 * Simple semaphore for limiting concurrent operations
 */
class Semaphore {
  private permits: number
  private waiting: Array<() => void> = []

  constructor(permits: number) {
    this.permits = permits
  }

  acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--
      return Promise.resolve()
    }

    return new Promise<void>((resolve) => {
      this.waiting.push(resolve)
    })
  }

  release(): void {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift()!
      resolve()
    } else {
      this.permits++
    }
  }
}

/**
 * Check if MDX documentation exists for a component
 */
async function hasDocumentation(componentName: string): Promise<boolean> {
  try {
    await Deno.stat(`${DOC_DIR}/${componentName}.mdx`)
    return true
  } catch {
    return false
  }
}

/**
 * Enhance a component with JSDoc and proper type signatures using Claude
 */
async function enhanceComponent(
  rawPath: string,
  componentName: string,
  semaphore: Semaphore,
): Promise<void> {
  try {
    await semaphore.acquire()
    console.log(`🔍 Enhancing ${componentName}...`)

    const docPath = `${DOC_DIR}/${componentName}.mdx`

    // Prepare the prompt for Claude
    const prompt =
      `Read the file ${rawPath} and the file ${docPath}. Transform the component file to meet JSR publishing standards by:

1. Adding comprehensive JSDoc comments to ALL exported members, derived from the MDX documentation
2. Adding explicit type signatures for ALL exported members
3. Ensure each export has a proper, specific type signature (not using derived or inferred types)
4. Use proper JSDoc syntax including @param, @returns, @example tags where appropriate
5. Keep the existing implementation logic unchanged

Your output will be redirected to a file, so do not say anything extra, do not include markdown code fence, and output only the valid TypeScript code for the enhanced component.`

    // Run Claude CLI
    const command = new Deno.Command('claude', {
      args: ['-p', prompt],
      stdout: 'piped',
    })

    const { stdout, code } = await command.output()

    if (code !== 0) {
      throw new Error(`Claude command failed with exit code ${code}`)
    }

    const enhancedCode = new TextDecoder().decode(stdout)

    // Create target directories if they don't exist
    const targetPath = rawPath.replace(RAW_DIR, SRC_DIR)
    const targetDir = targetPath.substring(0, targetPath.lastIndexOf('/'))
    await Deno.mkdir(targetDir, { recursive: true })

    // Write enhanced component to the src directory
    await Deno.writeTextFile(targetPath, enhancedCode)

    console.log(`✅ Successfully enhanced ${componentName}`)
  } catch (error) {
    console.error(`❌ Failed to enhance ${componentName}: ${error instanceof Error ? error.message : String(error)}`)

    // Copy the original file as fallback
    try {
      const targetPath = rawPath.replace(RAW_DIR, SRC_DIR)
      const targetDir = targetPath.substring(0, targetPath.lastIndexOf('/'))
      await Deno.mkdir(targetDir, { recursive: true })
      await Deno.copyFile(rawPath, targetPath)
      console.log(`ℹ️ Copied original ${componentName} as fallback`)
    } catch (copyError) {
      console.error(
        `Failed to copy original ${componentName}: ${
          copyError instanceof Error ? copyError.message : String(copyError)
        }`,
      )
    }
  } finally {
    semaphore.release()
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting component enhancement process...')

  // Create src directory if it doesn't exist
  await Deno.mkdir(SRC_DIR, { recursive: true })

  // If raw directory doesn't exist yet, create it
  try {
    await Deno.stat(RAW_DIR)
  } catch {
    console.log("⚠️ Raw directory doesn't exist yet. Run 'deno task sync' first.")
    return
  }

  // Get input paths from command line arguments
  const paths = Deno.args

  if (paths.length === 0) {
    console.error('❌ Error: No paths provided')
    console.log('Usage: deno run -A scripts/enhance-components.ts raw/default/ui/button.tsx')
    Deno.exit(1)
  }

  console.log(`Found ${paths.length} components to enhance.`)

  // Create semaphore for limiting concurrent operations
  const semaphore = new Semaphore(MAX_CONCURRENT)
  const enhanceTasks: Promise<void>[] = []

  // Process each provided file
  for (const rawPath of paths) {
    // Extract component name from file path
    const componentName = rawPath.substring(rawPath.lastIndexOf('/') + 1).replace('.tsx', '')

    // Check if documentation exists
    if (await hasDocumentation(componentName)) {
      // Create a task to enhance the component
      const task = enhanceComponent(rawPath, componentName, semaphore)
      enhanceTasks.push(task)
    } else {
      console.log(`⚠️ Skipping ${componentName}: No MDX documentation found`)

      // Copy the original file to the src directory
      const targetPath = rawPath.replace(RAW_DIR, SRC_DIR)
      const targetDir = targetPath.substring(0, targetPath.lastIndexOf('/'))
      await Deno.mkdir(targetDir, { recursive: true })
      await Deno.copyFile(rawPath, targetPath)
    }
  }

  // Wait for all enhancement tasks to complete
  await Promise.all(enhanceTasks)

  console.log('\n✨ Component enhancement process completed!')
}

// Run the main function
if (import.meta.main) {
  main().catch((error) => {
    console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
    Deno.exit(1)
  })
}
