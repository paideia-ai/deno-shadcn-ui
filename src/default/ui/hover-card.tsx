'use client'

import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * HoverCard is a component that displays a card when the user hovers over a trigger element.
 * It's useful for sighted users to preview content available behind a link.
 *
 * Based on Radix UI's HoverCard primitive.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/hover-card}
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>Hover</HoverCardTrigger>
 *   <HoverCardContent>Card content</HoverCardContent>
 * </HoverCard>
 * ```
 */
const HoverCard: React.FC<React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>> = HoverCardPrimitive.Root

/**
 * The trigger element that opens the hover card when hovered.
 * Can be wrapped around any element using the `asChild` prop.
 *
 * @example
 * ```tsx
 * <HoverCardTrigger>Hover over me</HoverCardTrigger>
 * ```
 *
 * @example
 * ```tsx
 * <HoverCardTrigger asChild>
 *   <Button>Hover over me</Button>
 * </HoverCardTrigger>
 * ```
 */
const HoverCardTrigger: React.FC<React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger>> =
  HoverCardPrimitive.Trigger

/**
 * The content that appears when the trigger is hovered.
 * Contains the information to be previewed.
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes to apply to the component
 * @param props.align - Alignment of the content relative to the trigger (default: 'center')
 * @param props.sideOffset - Distance in pixels from the trigger (default: 4)
 * @param ref - Forwarded ref
 * @returns HoverCard content component
 *
 * @example
 * ```tsx
 * <HoverCardContent className="w-80">
 *   <div className="flex space-x-4">
 *     <Avatar>
 *       <AvatarImage src="https://github.com/vercel.png" />
 *       <AvatarFallback>VC</AvatarFallback>
 *     </Avatar>
 *     <div className="space-y-1">
 *       <h4 className="text-sm font-semibold">@nextjs</h4>
 *       <p className="text-sm">
 *         The React Framework – created and maintained by @vercel.
 *       </p>
 *     </div>
 *   </div>
 * </HoverCardContent>
 * ```
 */
const HoverCardContent: ForwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
> = React.forwardRef(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]',
      className,
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardContent, HoverCardTrigger }
