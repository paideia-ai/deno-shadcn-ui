import * as React from 'react'

import { cn } from '@/default/lib/utils.ts'

import type { ForwardRef } from '@/typing'

/**
 * The main card component that serves as a container for card content.
 *
 * @description Displays a styled card container with a border, background, text color, and shadow.
 * This component is the root element of the card component set and can contain CardHeader,
 * CardContent, and CardFooter components.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names to apply
 * @param ref - React ref forwarded to the underlying div element
 * @returns A styled card container component
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card Content</p>
 *   </CardContent>
 *   <CardFooter>
 *     <p>Card Footer</p>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className,
    )}
    {...props}
  />
))
Card.displayName = 'Card'

/**
 * The header section of a card component.
 *
 * @description Provides a styled header container for the card title and description.
 * Typically contains CardTitle and CardDescription components.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names to apply
 * @param ref - React ref forwarded to the underlying div element
 * @returns A styled card header component
 *
 * @example
 * ```tsx
 * <CardHeader>
 *   <CardTitle>Card Title</CardTitle>
 *   <CardDescription>Card Description</CardDescription>
 * </CardHeader>
 * ```
 */
const CardHeader: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/**
 * The title component for a card.
 *
 * @description Renders a styled title within a card header.
 * Uses a div element for better accessibility as recommended in the component's changelog.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names to apply
 * @param ref - React ref forwarded to the underlying div element
 * @returns A styled card title component
 *
 * @example
 * ```tsx
 * <CardTitle>Card Title</CardTitle>
 * ```
 */
const CardTitle: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

/**
 * The description component for a card.
 *
 * @description Renders a styled description text within a card header.
 * Uses a div element for better accessibility as recommended in the component's changelog.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names to apply
 * @param ref - React ref forwarded to the underlying div element
 * @returns A styled card description component
 *
 * @example
 * ```tsx
 * <CardDescription>Card Description</CardDescription>
 * ```
 */
const CardDescription: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * The content section of a card component.
 *
 * @description Provides a styled container for the main content of the card.
 * Positioned below the CardHeader and above the CardFooter.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names to apply
 * @param ref - React ref forwarded to the underlying div element
 * @returns A styled card content component
 *
 * @example
 * ```tsx
 * <CardContent>
 *   <p>Card Content</p>
 * </CardContent>
 * ```
 */
const CardContent: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

/**
 * The footer section of a card component.
 *
 * @description Provides a styled footer container for actions or additional information.
 * Typically positioned at the bottom of the card.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names to apply
 * @param ref - React ref forwarded to the underlying div element
 * @returns A styled card footer component
 *
 * @example
 * ```tsx
 * <CardFooter>
 *   <p>Card Footer</p>
 * </CardFooter>
 * ```
 */
const CardFooter: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
