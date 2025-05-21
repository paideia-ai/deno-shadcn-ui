'use client'

/**
 * A module providing popover components for displaying content in floating panels.
 *
 * @see https://ui.shadcn.com/docs/components/popover
 * @module
 */

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * The root component of the popover.
 *
 * Displays rich content in a portal, triggered by a button.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Place content for the popover here.</PopoverContent>
 * </Popover>
 * ```
 */
const Popover: React.FC<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>> = PopoverPrimitive.Root

/**
 * The trigger element that toggles the popover.
 *
 * This component is typically used as a button or other interactive element
 * that users can click to open or close the popover.
 *
 * @example
 * ```tsx
 * <PopoverTrigger>Click me</PopoverTrigger>
 * ```
 */
const PopoverTrigger: React.FC<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>> =
  PopoverPrimitive.Trigger

/**
 * The content component that appears inside the portal when the popover is open.
 *
 * @param props - Component properties
 * @param props.className - Additional CSS class names to apply to the content
 * @param props.align - Alignment of the popover relative to the trigger (default: 'center')
 * @param props.sideOffset - Distance from the trigger in pixels (default: 4)
 * @param ref - Forwarded ref
 * @returns The popover content component
 *
 * @example
 * ```tsx
 * <PopoverContent className="p-4">
 *   <h3>Popover Title</h3>
 *   <p>This is the content of the popover.</p>
 * </PopoverContent>
 * ```
 */
const PopoverContent: ForwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
> = React.forwardRef(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent, PopoverTrigger }
