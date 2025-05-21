'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * Tooltip provider component that manages tooltip state globally.
 * Must be used as a wrapper around all tooltip components.
 *
 * @type {React.FC<React.ComponentProps<typeof TooltipPrimitive.Provider>>}
 * @see {@link https://www.radix-ui.com/docs/primitives/components/tooltip#provider}
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover</TooltipTrigger>
 *     <TooltipContent>Add to library</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
const TooltipProvider: React.FC<React.ComponentProps<typeof TooltipPrimitive.Provider>> = TooltipPrimitive.Provider

/**
 * Root tooltip component that controls the display of the tooltip.
 * Manages the open state of the tooltip.
 *
 * @type {React.FC<React.ComponentProps<typeof TooltipPrimitive.Root>>}
 * @see {@link https://www.radix-ui.com/docs/primitives/components/tooltip#root}
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover</TooltipTrigger>
 *   <TooltipContent>Add to library</TooltipContent>
 * </Tooltip>
 * ```
 */
const Tooltip: React.FC<React.ComponentProps<typeof TooltipPrimitive.Root>> = TooltipPrimitive.Root

/**
 * The element that triggers the tooltip when hovered or focused.
 *
 * @type {React.FC<React.ComponentProps<typeof TooltipPrimitive.Trigger>>}
 * @see {@link https://www.radix-ui.com/docs/primitives/components/tooltip#trigger}
 *
 * @example
 * ```tsx
 * <TooltipTrigger>Hover</TooltipTrigger>
 * ```
 */
const TooltipTrigger: React.FC<React.ComponentProps<typeof TooltipPrimitive.Trigger>> = TooltipPrimitive.Trigger

/**
 * The content displayed inside the tooltip.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & React.RefAttributes<React.ElementRef<typeof TooltipPrimitive.Content>>>}
 * @see {@link https://www.radix-ui.com/docs/primitives/components/tooltip#content}
 *
 * @param {object} props - The properties for the tooltip content
 * @param {string} [props.className] - Additional CSS class names
 * @param {number} [props.sideOffset=4] - The distance in pixels from the trigger
 * @param {React.Ref<React.ElementRef<typeof TooltipPrimitive.Content>>} ref - The ref to be passed to the underlying element
 * @returns {React.ReactElement} The tooltip content component
 *
 * @example
 * ```tsx
 * <TooltipContent className="bg-secondary">
 *   <p>Add to library</p>
 * </TooltipContent>
 * ```
 */
const TooltipContent: ForwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
> = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
      className,
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
