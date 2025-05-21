'use client'

/**
 * A module providing avatar components for user profile images with fallbacks.
 *
 * @see https://ui.shadcn.com/docs/components/avatar
 * @module
 */

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * Avatar component
 *
 * An image element with a fallback for representing the user.
 * Wraps the Radix UI Avatar root component with default styling.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/avatar}
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.ReactNode} props.children - The content of the avatar (typically AvatarImage and AvatarFallback)
 * @param {React.Ref<HTMLDivElement>} ref - A ref to the underlying DOM element
 * @returns {React.ReactElement} The Avatar component
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
 *   <AvatarFallback>CN</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar: ForwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * AvatarImage component
 *
 * The image part of the Avatar component.
 * Displays the user's image and hides when loading fails.
 * Wraps the Radix UI Avatar image component with default styling.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/avatar#image}
 *
 * @param {object} props - The component props
 * @param {string} props.src - The URL of the image
 * @param {string} [props.alt] - The alt text for the image
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {React.Ref<HTMLImageElement>} ref - A ref to the underlying DOM element
 * @returns {React.ReactElement} The AvatarImage component
 *
 * @example
 * ```tsx
 * <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
 * ```
 */
const AvatarImage: ForwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * AvatarFallback component
 *
 * The fallback part of the Avatar component.
 * Renders when the image fails to load or isn't provided.
 * Typically contains the user's initials or a generic icon.
 * Wraps the Radix UI Avatar fallback component with default styling.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/avatar#fallback}
 *
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - The content to display as fallback (typically initials)
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {boolean} [props.delayMs] - The time (in ms) to wait before displaying the fallback element
 * @param {React.Ref<HTMLDivElement>} ref - A ref to the underlying DOM element
 * @returns {React.ReactElement} The AvatarFallback component
 *
 * @example
 * ```tsx
 * <AvatarFallback>CN</AvatarFallback>
 * ```
 */
const AvatarFallback: ForwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
