/**
 * A module providing alert dialog components for interrupting user workflow with important content.
 *
 * @see https://ui.shadcn.com/docs/components/alert-dialog
 * @module
 */

'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/default/lib/utils.ts'
import { buttonVariants } from '@/default/ui/button.tsx'
import type { ForwardRef } from '@/typing'

/**
 * The root component for alert dialogs.
 *
 * An alert dialog is a modal dialog that interrupts the user with important content and expects a response.
 * Unlike regular dialogs, users must interact with an alert dialog before they can continue using the application.
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>Open</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         This action cannot be undone. This will permanently delete your account
 *         and remove your data from our servers.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Continue</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
const AlertDialog: React.FC<AlertDialogPrimitive.AlertDialogProps> = AlertDialogPrimitive.Root

/**
 * The button that triggers the alert dialog.
 *
 * This component is used to open the alert dialog when clicked.
 *
 * @example
 * ```tsx
 * <AlertDialogTrigger>Open Alert Dialog</AlertDialogTrigger>
 * ```
 */
const AlertDialogTrigger: React.FC<AlertDialogPrimitive.AlertDialogTriggerProps> = AlertDialogPrimitive.Trigger

/**
 * The portal component for the alert dialog.
 *
 * This component creates a portal for rendering the alert dialog content,
 * which ensures the content appears above other page elements.
 */
const AlertDialogPortal: React.FC<AlertDialogPrimitive.AlertDialogPortalProps> = AlertDialogPrimitive.Portal

/**
 * The overlay component for the alert dialog.
 *
 * This component renders a semi-transparent overlay behind the alert dialog,
 * providing visual separation from the rest of the page content.
 *
 * @param props - The component props
 * @param ref - The ref forwarded to the underlying element
 * @returns A styled alert dialog overlay
 */
const AlertDialogOverlay: ForwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

/**
 * The content container for the alert dialog.
 *
 * This component wraps the alert dialog content and provides styling and animations.
 * It automatically includes the portal and overlay components.
 *
 * @param props - The component props
 * @param ref - The ref forwarded to the underlying element
 * @returns A styled alert dialog content container
 *
 * @example
 * ```tsx
 * <AlertDialogContent>
 *   <AlertDialogHeader>
 *     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *     <AlertDialogDescription>
 *       This action cannot be undone.
 *     </AlertDialogDescription>
 *   </AlertDialogHeader>
 *   <AlertDialogFooter>
 *     <AlertDialogCancel>Cancel</AlertDialogCancel>
 *     <AlertDialogAction>Continue</AlertDialogAction>
 *   </AlertDialogFooter>
 * </AlertDialogContent>
 * ```
 */
const AlertDialogContent: ForwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

/**
 * The header component for the alert dialog.
 *
 * This component is used to group the title and description of the alert dialog.
 * It provides consistent spacing and styling for the header section.
 *
 * @param props - The component props
 * @returns A styled header for the alert dialog
 *
 * @example
 * ```tsx
 * <AlertDialogHeader>
 *   <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 *   <AlertDialogDescription>
 *     This action cannot be undone.
 *   </AlertDialogDescription>
 * </AlertDialogHeader>
 * ```
 */
const AlertDialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

/**
 * The footer component for the alert dialog.
 *
 * This component is used to group the action buttons of the alert dialog.
 * It provides consistent spacing and responsive layout for the buttons.
 *
 * @param props - The component props
 * @returns A styled footer for the alert dialog
 *
 * @example
 * ```tsx
 * <AlertDialogFooter>
 *   <AlertDialogCancel>Cancel</AlertDialogCancel>
 *   <AlertDialogAction>Continue</AlertDialogAction>
 * </AlertDialogFooter>
 * ```
 */
const AlertDialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

/**
 * The title component for the alert dialog.
 *
 * This component displays the main heading of the alert dialog.
 * It uses appropriate styling and semantics for accessibility.
 *
 * @param props - The component props
 * @param ref - The ref forwarded to the underlying element
 * @returns A styled title for the alert dialog
 *
 * @example
 * ```tsx
 * <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
 * ```
 */
const AlertDialogTitle: ForwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

/**
 * The description component for the alert dialog.
 *
 * This component displays the supporting text of the alert dialog.
 * It provides additional context and information about the action being confirmed.
 *
 * @param props - The component props
 * @param ref - The ref forwarded to the underlying element
 * @returns A styled description for the alert dialog
 *
 * @example
 * ```tsx
 * <AlertDialogDescription>
 *   This action cannot be undone. This will permanently delete your account
 *   and remove your data from our servers.
 * </AlertDialogDescription>
 * ```
 */
const AlertDialogDescription: ForwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

/**
 * The action button component for the alert dialog.
 *
 * This component represents the primary action button in the alert dialog,
 * typically used for confirming the action mentioned in the dialog.
 *
 * @param props - The component props
 * @param ref - The ref forwarded to the underlying element
 * @returns A styled action button for the alert dialog
 *
 * @example
 * ```tsx
 * <AlertDialogAction>Continue</AlertDialogAction>
 * ```
 */
const AlertDialogAction: ForwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

/**
 * The cancel button component for the alert dialog.
 *
 * This component represents the secondary/cancel button in the alert dialog,
 * used for dismissing the dialog without performing the action.
 *
 * @param props - The component props
 * @param ref - The ref forwarded to the underlying element
 * @returns A styled cancel button for the alert dialog
 *
 * @example
 * ```tsx
 * <AlertDialogCancel>Cancel</AlertDialogCancel>
 * ```
 */
const AlertDialogCancel: ForwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
> = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'mt-2 sm:mt-0',
      className,
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
