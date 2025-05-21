// Unit tests for update.ts import transformations
import { assertEquals } from "jsr:@std/assert";
import { CORE_MODULES, transformImports } from "./update.ts";

// Define a set of test cases for different import scenarios
Deno.test("transformImports - handles core modules correctly", () => {
  const input = `
import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronLeft } from "lucide-react";
`;
  const output = transformImports(input);
  
  // Core modules should remain unchanged
  assertEquals(
    output.includes('import * as React from "react"'), 
    true, 
    "react import should remain unchanged"
  );
  assertEquals(
    output.includes('import { clsx } from "clsx"'), 
    true, 
    "clsx import should remain unchanged"
  );
  assertEquals(
    output.includes('import { twMerge } from "tailwind-merge"'), 
    true, 
    "tailwind-merge import should remain unchanged"
  );
  assertEquals(
    output.includes('import { ChevronLeft } from "lucide-react"'), 
    true, 
    "lucide-react import should remain unchanged"
  );
});

Deno.test("transformImports - adds npm: prefix to external imports", () => {
  const input = `
import * as RadixUI from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import useEmblaCarousel from "embla-carousel-react";
`;
  const output = transformImports(input);
  
  // External modules should get npm: prefix
  assertEquals(
    output.includes('import * as RadixUI from "npm:@radix-ui/react-dialog"'), 
    true, 
    "RadixUI import should have npm: prefix"
  );
  assertEquals(
    output.includes('import { cva } from "npm:class-variance-authority"'), 
    true, 
    "cva import should have npm: prefix"
  );
  assertEquals(
    output.includes('import useEmblaCarousel from "npm:embla-carousel-react"'), 
    true, 
    "embla-carousel-react import should have npm: prefix"
  );
});

Deno.test("transformImports - handles local imports correctly", () => {
  const input = `
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import type { ToastProps } from "@/registry/default/ui/toast";
`;
  const output = transformImports(input);
  
  // Local imports should be transformed with proper paths and extensions
  assertEquals(
    output.includes('import { cn } from "@/default/lib/utils.ts"'), 
    true, 
    "@/lib/utils should be transformed to @/default/lib/utils.ts"
  );
  assertEquals(
    output.includes('import { Button } from "@/default/ui/button.tsx"'), 
    true, 
    "@/registry/default/ui/button should be transformed to @/default/ui/button.tsx"
  );
  assertEquals(
    output.includes('import type { ToastProps } from "@/default/ui/toast.tsx"'), 
    true, 
    "Type imports should be handled correctly"
  );
});

Deno.test("transformImports - handles multi-line imports", () => {
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
`;
  const output = transformImports(input);
  
  // Multi-line imports should be transformed correctly
  assertEquals(
    output.includes('import {\n  Controller,\n  FormProvider,\n  useFormContext,\n} from "npm:react-hook-form"'),
    true,
    "Multi-line external imports should have npm: prefix"
  );
  assertEquals(
    output.includes('import type {\n  ToastActionElement,\n  ToastProps,\n} from "@/default/ui/toast.tsx"'),
    true,
    "Multi-line local imports should be transformed correctly"
  );
});

Deno.test("transformImports - handles embla-carousel-react case", () => {
  const input = `
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
`;
  const output = transformImports(input);
  
  // This specific case should be handled correctly
  assertEquals(
    output.includes('from "npm:embla-carousel-react"'),
    true,
    "embla-carousel-react import with newlines should have npm: prefix"
  );
});

// Add more specific cases for the regex patterns as needed
Deno.test("transformImports - multiple imports test cases", () => {
  const inputs = [
    `import { VariantProps } from "class-variance-authority";`,
    `import useEmblaCarousel from "embla-carousel-react";`,
    `import useEmblaCarousel, { Something } from "embla-carousel-react";`,
    `import useEmblaCarousel, {\n  type UseEmblaCarouselType,\n} from "embla-carousel-react";`,
    `import type {\n  ControllerProps,\n  FieldPath,\n  FieldValues,\n} from "react-hook-form";`,
  ];
  
  for (const input of inputs) {
    const output = transformImports(input);
    assertEquals(
      output.includes("npm:"),
      true,
      `Failed to add npm: prefix to: ${input}`
    );
  }
});