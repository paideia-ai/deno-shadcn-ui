'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassProp } from 'class-variance-authority/types'
import { X } from 'lucide-react'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * The provider component for toasts. Should be used at the root level of your application.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */
const ToastProvider: React.FC<ToastPrimitives.ToastProviderProps> = ToastPrimitives.Provider

/**
 * The viewport component for toasts. Defines the area where toasts will be displayed.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying DOM element
 * @returns A component that defines the viewport for toasts
 *
 * @example
 * ```tsx
 * <ToastViewport />
 * ```
 */
const ToastViewport: ForwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
> = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

/**
 * Type definition for the toastVariants function.
 */
type ToastVariantFunction = (
  options?: {
    variant?: 'default' | 'destructive'
  } & ClassProp,
) => string

/**
 * Variants for the toast component.
 */
const toastVariants: ToastVariantFunction = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/**
 * A toast component that displays a brief notification message.
 *
 * @param props - The component props including variant and className
 * @param ref - The ref to the underlying DOM element
 * @returns A toast component
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Scheduled: Catch up</ToastTitle>
 *   <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
 * </Toast>
 * ```
 *
 * @example
 * ```tsx
 * // Destructive variant
 * <Toast variant="destructive">
 *   <ToastTitle>Error</ToastTitle>
 *   <ToastDescription>There was a problem with your request.</ToastDescription>
 * </Toast>
 * ```
 */
const Toast: ForwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  & React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
  & VariantProps<typeof toastVariants>
> = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

/**
 * The action component for toasts. Used to provide interactive actions within a toast.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying DOM element
 * @returns A component that renders an action button inside a toast
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Scheduled: Catch up</ToastTitle>
 *   <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
 *   <ToastAction altText="Undo" onClick={() => handleUndo()}>Undo</ToastAction>
 * </Toast>
 * ```
 */
const ToastAction: ForwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
> = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

/**
 * The close button component for toasts. Used to dismiss a toast notification.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying DOM element
 * @returns A component that renders a close button for a toast
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Notification</ToastTitle>
 *   <ToastDescription>This is a toast message.</ToastDescription>
 *   <ToastClose />
 * </Toast>
 * ```
 */
const ToastClose: ForwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
> = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className,
    )}
    toast-close=''
    {...props}
  >
    <X className='h-4 w-4' />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

/**
 * The title component for toasts. Used to display the main heading of a toast.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying DOM element
 * @returns A component that renders a title for a toast
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Scheduled: Catch up</ToastTitle>
 *   <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
 * </Toast>
 * ```
 */
const ToastTitle: ForwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
> = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

/**
 * The description component for toasts. Used to provide additional details about a toast notification.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying DOM element
 * @returns A component that renders a description for a toast
 *
 * @example
 * ```tsx
 * <Toast>
 *   <ToastTitle>Scheduled: Catch up</ToastTitle>
 *   <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
 * </Toast>
 * ```
 */
const ToastDescription: ForwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
> = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

/**
 * Props for the Toast component.
 */
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

/**
 * Type representing a ToastAction element.
 */
type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
}
