/**
 * A module providing accordion components for collapsible content sections.
 *
 * @see https://ui.shadcn.com/docs/components/accordion
 * @module
 */

'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * A vertically stacked set of interactive headings that each reveal a section of content.
 * This is the root component that contains all accordion items.
 *
 * @see https://www.radix-ui.com/docs/primitives/components/accordion
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>
 *       Yes. It adheres to the WAI-ARIA design pattern.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion: React.FC<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>> = AccordionPrimitive.Root

/**
 * An individual accordion item containing a header/trigger and content.
 * Must be used within the `Accordion` component.
 *
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the item
 * @param props.value - Unique value for the accordion item (required)
 * @param ref - React ref forwarded to the underlying DOM element
 * @returns An accordion item component
 *
 * @example
 * ```tsx
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Accordion Trigger</AccordionTrigger>
 *   <AccordionContent>Accordion Content</AccordionContent>
 * </AccordionItem>
 * ```
 */
const AccordionItem: ForwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

/**
 * The trigger button for an accordion item that toggles the expanded state.
 * Must be used within an `AccordionItem` component.
 * Includes a chevron icon that rotates based on the open/closed state.
 *
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the trigger
 * @param props.children - The content to display within the trigger
 * @param ref - React ref forwarded to the underlying DOM element
 * @returns An accordion trigger component
 *
 * @example
 * ```tsx
 * <AccordionTrigger>Is it accessible?</AccordionTrigger>
 * ```
 */
const AccordionTrigger: ForwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
> = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * The content section for an accordion item that is revealed when the trigger is activated.
 * Must be used within an `AccordionItem` component.
 * Features smooth animations for expanding/collapsing.
 *
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the content container
 * @param props.children - The content to display when the accordion item is expanded
 * @param ref - React ref forwarded to the underlying DOM element
 * @returns An accordion content component
 *
 * @example
 * ```tsx
 * <AccordionContent>
 *   Yes. It adheres to the WAI-ARIA design pattern.
 * </AccordionContent>
 * ```
 */
const AccordionContent: ForwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
> = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
