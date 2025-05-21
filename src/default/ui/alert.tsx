/**
 * A module providing alert components for displaying important messages to users.
 *
 * @see https://ui.shadcn.com/docs/components/alert
 * @module
 */

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassProp } from 'class-variance-authority/types'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * Type definition for the alertVariants function.
 */
type AlertVariantFunction = (
  options?: {
    variant?: 'default' | 'destructive'
  } & ClassProp,
) => string

/**
 * Alert variants for styling different types of alerts.
 *
 * @private Internal use only
 */
const alertVariants: AlertVariantFunction = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/**
 * Alert component used to display a callout for user attention.
 *
 * @param props - The component props
 * @param props.className - Optional additional CSS classes
 * @param props.variant - Alert variant: 'default' or 'destructive'
 * @param ref - React ref forwarded to the DOM element
 * @returns A React alert component
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components to your app using the cli.
 *   </AlertDescription>
 * </Alert>
 *
 * // With destructive variant
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>
 *     Your session has expired. Please log in again.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
const Alert: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
> = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role='alert'
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

/**
 * AlertTitle component used to display the title within an Alert.
 *
 * @param props - The component props
 * @param props.className - Optional additional CSS classes
 * @param ref - React ref forwarded to the DOM element
 * @returns A React component for alert titles
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>...</AlertDescription>
 * </Alert>
 * ```
 */
const AlertTitle: ForwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

/**
 * AlertDescription component used to display descriptive text within an Alert.
 *
 * @param props - The component props
 * @param props.className - Optional additional CSS classes
 * @param ref - React ref forwarded to the DOM element
 * @returns A React component for alert descriptions
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components to your app using the cli.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
const AlertDescription: ForwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
