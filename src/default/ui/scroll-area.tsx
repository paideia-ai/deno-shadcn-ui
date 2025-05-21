'use client'

/**
 * A module providing scroll area components with custom scrollbars.
 *
 * @see https://ui.shadcn.com/docs/components/scroll-area
 * @module
 */

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * ScrollArea component properties
 */
export type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>

/**
 * ScrollArea component ref type
 */
export type ScrollAreaRef = React.ElementRef<typeof ScrollAreaPrimitive.Root>

/**
 * A scrollable area component that augments native scroll functionality for custom, cross-browser styling.
 *
 * This component provides a way to customize the appearance of scrollbars, making them consistent across
 * different browsers while maintaining the native scroll behavior.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @param props.children - The content to be scrollable
 * @param ref - The ref to the underlying DOM element
 * @returns A styled ScrollArea component with custom scrollbars
 *
 * @example
 * ```tsx
 * <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
 *   Jokester began sneaking into the castle in the middle of the night and leaving
 *   jokes all over the place: under the king's pillow, in his soup, even in the
 *   royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
 *   then, one day, the people of the kingdom discovered that the jokes left by
 *   Jokester were so funny that they couldn't help but laugh. And once they
 *   started laughing, they couldn't stop.
 * </ScrollArea>
 * ```
 */
const ScrollArea: ForwardRef<ScrollAreaRef, ScrollAreaProps> = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className='h-full w-full rounded-[inherit]'>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  ),
)
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

/**
 * ScrollBar component properties
 */
export type ScrollBarProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>

/**
 * ScrollBar component ref type
 */
export type ScrollBarRef = React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>

/**
 * A customizable scrollbar for the ScrollArea component.
 *
 * This component provides the visual scrollbar element with custom styling.
 * It can be oriented vertically or horizontally.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @param props.orientation - The scrollbar orientation, defaults to 'vertical'
 * @param ref - The ref to the underlying DOM element
 * @returns A styled ScrollBar component
 *
 * @example
 * ```tsx
 * // The ScrollBar is automatically included when using the ScrollArea component
 * // For horizontal scrolling example:
 * <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
 *   <div className="flex w-max space-x-4 p-4">
 *     {/* Content items *\/}
 *   </div>
 * </ScrollArea>
 * ```
 */
const ScrollBar: ForwardRef<ScrollBarRef, ScrollBarProps> = React.forwardRef(
  ({ className, orientation = 'vertical', ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent p-[1px]',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent p-[1px]',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className='relative flex-1 rounded-full bg-border' />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
)
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
