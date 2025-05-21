// Unit tests for update.ts import transformations
import { assertEquals } from 'jsr:@std/assert'
import { transformImports } from './update.ts'

// Mock the fileExtensionMap for testing
// We need to do this to test the determineFileExtension function
// @ts-ignore: Accessing internal module for testing
import { determineFileExtension, fileExtensionMap } from './update.ts'

// Clear any existing data
fileExtensionMap.clear()

// Set up some test data in the fileExtensionMap
fileExtensionMap.set('hooks/use-mobile', '.tsx')
fileExtensionMap.set('hooks/use-toast', '.ts')
fileExtensionMap.set('lib/utils', '.ts')
fileExtensionMap.set('ui/button', '.tsx')
fileExtensionMap.set('ui/toast', '.tsx')
fileExtensionMap.set('ui/dialog', '.tsx')
fileExtensionMap.set('ui/sidebar', '.tsx')

// Define a set of test cases for different import scenarios
Deno.test('transformImports - handles core modules correctly', () => {
  const input = `
import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronLeft } from "lucide-react";
`
  const output = transformImports(input)

  // Core modules should remain unchanged
  assertEquals(
    output.includes('import * as React from "react"'),
    true,
    'react import should remain unchanged',
  )
  assertEquals(
    output.includes('import { clsx } from "clsx"'),
    true,
    'clsx import should remain unchanged',
  )
  assertEquals(
    output.includes('import { twMerge } from "tailwind-merge"'),
    true,
    'tailwind-merge import should remain unchanged',
  )
  assertEquals(
    output.includes('import { ChevronLeft } from "lucide-react"'),
    true,
    'lucide-react import should remain unchanged',
  )
})

Deno.test('transformImports - adds npm: prefix to external imports', () => {
  const input = `
import * as RadixUI from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import useEmblaCarousel from "embla-carousel-react";
`
  const output = transformImports(input)

  // External modules should get npm: prefix
  assertEquals(
    output.includes('import * as RadixUI from "npm:@radix-ui/react-dialog"'),
    true,
    'RadixUI import should have npm: prefix',
  )
  assertEquals(
    output.includes('import { cva } from "npm:class-variance-authority"'),
    true,
    'cva import should have npm: prefix',
  )
  assertEquals(
    output.includes('import useEmblaCarousel from "npm:embla-carousel-react"'),
    true,
    'embla-carousel-react import should have npm: prefix',
  )
})

Deno.test('transformImports - handles local imports correctly', () => {
  const input = `
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import type { ToastProps } from "@/registry/default/ui/toast";
`
  const output = transformImports(input)

  // Local imports should be transformed with proper paths and extensions
  assertEquals(
    output.includes('import { cn } from "@/default/lib/utils.ts"'),
    true,
    '@/lib/utils should be transformed to @/default/lib/utils.ts',
  )
  assertEquals(
    output.includes('import { Button } from "@/default/ui/button.tsx"'),
    true,
    '@/registry/default/ui/button should be transformed to @/default/ui/button.tsx',
  )
  assertEquals(
    output.includes('import type { ToastProps } from "@/default/ui/toast.tsx"'),
    true,
    'Type imports should be handled correctly',
  )
})

Deno.test('transformImports - handles multi-line imports', () => {
  const input = `
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import type {
  ToastActionElement,
  ToastProps,
} from "@/registry/default/ui/toast";
`
  const output = transformImports(input)

  // Multi-line imports should be transformed correctly
  assertEquals(
    output.includes('import {\n  Controller,\n  FormProvider,\n  useFormContext,\n} from "npm:react-hook-form"'),
    true,
    'Multi-line external imports should have npm: prefix',
  )
  assertEquals(
    output.includes('import type {\n  ToastActionElement,\n  ToastProps,\n} from "@/default/ui/toast.tsx"'),
    true,
    'Multi-line local imports should be transformed correctly',
  )
})

Deno.test('transformImports - handles embla-carousel-react case', () => {
  const input = `
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
`
  const output = transformImports(input)

  // This specific case should be handled correctly
  assertEquals(
    output.includes('from "npm:embla-carousel-react"'),
    true,
    'embla-carousel-react import with newlines should have npm: prefix',
  )
})

// Test cases specific to dynamic file extension handling
Deno.test('transformImports - correctly adds .tsx extension to use-mobile', () => {
  const input = `import { useIsMobile } from "@/hooks/use-mobile";`
  const output = transformImports(input)

  assertEquals(
    output.includes('import { useIsMobile } from "@/default/hooks/use-mobile.tsx"'),
    true,
    'use-mobile should get .tsx extension',
  )
})

Deno.test('transformImports - handles direct component imports', () => {
  const input = `import { Button } from "@/ui/button";`
  const output = transformImports(input)

  assertEquals(
    output.includes('@/default/ui/button.tsx'),
    true,
    'Button should import from @/default/ui/button.tsx',
  )
})

Deno.test('determineFileExtension - returns correct extensions', () => {
  // Test with existing paths in the map
  assertEquals(determineFileExtension('@/default/hooks/use-mobile'), '.tsx')
  assertEquals(determineFileExtension('@/default/hooks/use-toast'), '.ts')
  assertEquals(determineFileExtension('@/default/ui/button'), '.tsx')

  // Test defaults for paths not in the map
  assertEquals(determineFileExtension('@/default/hooks/unknown'), '.ts')
  assertEquals(determineFileExtension('@/default/ui/unknown'), '.tsx')
})

// Add more specific cases for the regex patterns as needed
Deno.test('transformImports - multiple imports test cases', () => {
  const inputs = [
    `import { VariantProps } from "class-variance-authority";`,
    `import useEmblaCarousel from "embla-carousel-react";`,
    `import useEmblaCarousel, { Something } from "embla-carousel-react";`,
    `import useEmblaCarousel, {\n  type UseEmblaCarouselType,\n} from "embla-carousel-react";`,
    `import type {\n  ControllerProps,\n  FieldPath,\n  FieldValues,\n} from "react-hook-form";`,
  ]

  for (const input of inputs) {
    const output = transformImports(input)
    assertEquals(
      output.includes('npm:'),
      true,
      `Failed to add npm: prefix to: ${input}`,
    )
  }
})
