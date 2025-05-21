'use client'

import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'
import { toggleVariants } from '@/default/ui/toggle.tsx'

/**
 * Context for sharing toggle variant props between ToggleGroup and ToggleGroupItem
 * @private
 */
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'default',
  variant: 'default',
})

/**
 * Props for the ToggleGroup component
 * @typedef {Object} ToggleGroupProps
 */
export type ToggleGroupProps =
  & React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
  & VariantProps<typeof toggleVariants>

/**
 * A set of two-state buttons that can be toggled on or off.
 *
 * ToggleGroup allows users to select one or more options from a group of buttons.
 * It supports both single and multiple selection modes via the `type` prop.
 *
 * @param {ToggleGroupProps} props - The props for the ToggleGroup component
 * @param {string} [props.className] - Additional CSS class names
 * @param {string} [props.variant] - The variant of the toggle group ("default" or "outline")
 * @param {string} [props.size] - The size of the toggle group ("default", "sm", or "lg")
 * @param {React.ReactNode} props.children - The content of the toggle group
 * @param {React.ForwardedRef<React.ElementRef<typeof ToggleGroupPrimitive.Root>>} ref - The forwarded ref
 * @returns {JSX.Element} The ToggleGroup component
 *
 * @example
 * // Multiple selection mode (default)
 * <ToggleGroup type="multiple">
 *   <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
 *   <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
 * </ToggleGroup>
 *
 * @example
 * // Single selection mode
 * <ToggleGroup type="single">
 *   <ToggleGroupItem value="a">A</ToggleGroupItem>
 *   <ToggleGroupItem value="b">B</ToggleGroupItem>
 *   <ToggleGroupItem value="c">C</ToggleGroupItem>
 * </ToggleGroup>
 *
 * @example
 * // With outline variant
 * <ToggleGroup type="single" variant="outline">
 *   <ToggleGroupItem value="month">Month</ToggleGroupItem>
 *   <ToggleGroupItem value="year">Year</ToggleGroupItem>
 * </ToggleGroup>
 *
 * @example
 * // With small size
 * <ToggleGroup type="single" size="sm">
 *   <ToggleGroupItem value="1">1</ToggleGroupItem>
 *   <ToggleGroupItem value="2">2</ToggleGroupItem>
 * </ToggleGroup>
 */
const ToggleGroup: ForwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
> = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex items-center justify-center gap-1', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

/**
 * Props for the ToggleGroupItem component
 * @typedef {Object} ToggleGroupItemProps
 */
export type ToggleGroupItemProps =
  & React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
  & VariantProps<typeof toggleVariants>

/**
 * Individual toggle item within a ToggleGroup.
 *
 * ToggleGroupItem represents an individual selectable option within a ToggleGroup.
 * It inherits variant and size from its parent ToggleGroup but these can be overridden.
 *
 * @param {ToggleGroupItemProps} props - The props for the ToggleGroupItem component
 * @param {string} props.value - The value of the toggle item (required)
 * @param {string} [props.className] - Additional CSS class names
 * @param {React.ReactNode} props.children - The content of the toggle item
 * @param {string} [props.variant] - The variant of the toggle item (overrides parent)
 * @param {string} [props.size] - The size of the toggle item (overrides parent)
 * @param {boolean} [props.disabled] - Whether the toggle item is disabled
 * @param {React.ForwardedRef<React.ElementRef<typeof ToggleGroupPrimitive.Item>>} ref - The forwarded ref
 * @returns {JSX.Element} The ToggleGroupItem component
 *
 * @example
 * <ToggleGroup type="multiple">
 *   <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
 *   <ToggleGroupItem value="italic" disabled>Italic</ToggleGroupItem>
 * </ToggleGroup>
 *
 * @example
 * // With icon
 * <ToggleGroupItem value="bold">
 *   <BoldIcon className="h-4 w-4" />
 *   <span className="sr-only">Bold</span>
 * </ToggleGroupItem>
 */
const ToggleGroupItem: ForwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
> = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
