'use client'

/**
 * A module providing separator components for dividing content visually.
 *
 * @see https://ui.shadcn.com/docs/components/separator
 * @module
 */

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * SeparatorProps interface for the Separator component.
 * @typedef {Object} SeparatorProps
 * @property {string} [className] - Optional CSS class to apply to the separator.
 * @property {'horizontal' | 'vertical'} [orientation='horizontal'] - The orientation of the separator.
 * @property {boolean} [decorative=true] - Whether the separator is purely decorative,
 * which means it will be hidden from screen readers. Set to false if the separator
 * has meaning in your information architecture.
 */
export type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>

/**
 * A visually or semantically separates content.
 *
 * The Separator component is built on top of the Radix UI Separator primitive,
 * providing a simple way to separate content with a horizontal or vertical line.
 *
 * @param {SeparatorProps} props - The props for the Separator component.
 * @param {React.Ref<HTMLDivElement>} ref - A reference to the underlying HTML div element.
 * @returns {JSX.Element} The Separator component.
 *
 * @example
 * // Default horizontal separator
 * <Separator />
 *
 * @example
 * // Vertical separator
 * <Separator orientation="vertical" />
 *
 * @example
 * // Semantic separator (not decorative, visible to screen readers)
 * <Separator decorative={false} />
 *
 * @example
 * // With custom styling
 * <Separator className="my-2" />
 */
export const Separator: ForwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
> = React.forwardRef(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      {...props}
    />
  ),
)
Separator.displayName = SeparatorPrimitive.Root.displayName
