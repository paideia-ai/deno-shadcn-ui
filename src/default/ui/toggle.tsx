'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassProp } from 'class-variance-authority/types'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * Type definition for the toggleVariants function.
 */
type ToggleVariantFunction = (
  options?: {
    variant?: 'default' | 'outline'
    size?: 'default' | 'sm' | 'lg'
  } & ClassProp,
) => string

/**
 * Configuration for toggle component styling variants.
 * Provides style variations for different toggle appearances.
 *
 * @type {ToggleVariantFunction}
 */
const toggleVariants: ToggleVariantFunction = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

/**
 * Toggle component interface that extends Radix UI Toggle props
 */
type ToggleProps =
  & React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
  & VariantProps<typeof toggleVariants>

/**
 * A two-state button that can be either on or off.
 *
 * This component is built on top of Radix UI's Toggle primitive and supports
 * all of its props along with additional styling variants.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names
 * @param {('default'|'outline')} [props.variant='default'] - The visual style variant of the toggle
 * @param {('default'|'sm'|'lg')} [props.size='default'] - The size of the toggle
 * @param {React.ReactNode} props.children - The content of the toggle
 * @param {React.Ref<HTMLButtonElement>} ref - The ref to be forwarded to the root element
 * @returns {JSX.Element} The Toggle component
 *
 * @example
 * // Basic usage
 * <Toggle>Toggle</Toggle>
 *
 * @example
 * // With outline variant
 * <Toggle variant="outline">Outline</Toggle>
 *
 * @example
 * // With different sizes
 * <Toggle size="sm">Small</Toggle>
 * <Toggle size="default">Default</Toggle>
 * <Toggle size="lg">Large</Toggle>
 *
 * @example
 * // Disabled state
 * <Toggle disabled>Disabled</Toggle>
 */
const Toggle: ForwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
> = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

/**
 * The class variance authority configuration for Toggle component styling.
 * Use this to customize the toggle appearance when building custom components.
 *
 * @type {import('class-variance-authority').VariantFunction<{variant: {default: string, outline: string}, size: {default: string, sm: string, lg: string}}>}
 *
 * @example
 * // Custom component using toggleVariants
 * const CustomToggle = ({ className, ...props }) => {
 *   return (
 *     <button
 *       className={cn(toggleVariants({ variant: "outline", size: "sm" }), className)}
 *       {...props}
 *     />
 *   )
 * }
 */
export { toggleVariants }

/**
 * A toggle component that provides a two-state button.
 * Based on Radix UI's toggle primitive with additional styling variants.
 */
export { Toggle }
