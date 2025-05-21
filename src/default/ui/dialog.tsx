'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * Dialog root component that manages the state of your dialog.
 *
 * @description A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Dialog Description</DialogDescription>
 *     </DialogHeader>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const Dialog: React.FC<DialogPrimitive.DialogProps> = DialogPrimitive.Root

/**
 * Dialog trigger component that opens the dialog when clicked.
 *
 * @description The button that opens the dialog when triggered.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open Dialog</DialogTrigger>
 *   <DialogContent>...</DialogContent>
 * </Dialog>
 * ```
 */
const DialogTrigger: React.FC<DialogPrimitive.DialogTriggerProps> = DialogPrimitive.Trigger

/**
 * Dialog portal component that renders the dialog into a portal.
 *
 * @description Creates a container for portal elements that teleports its children into a different part of the DOM.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogPortal>
 *     <DialogOverlay />
 *     <DialogContent>...</DialogContent>
 *   </DialogPortal>
 * </Dialog>
 * ```
 */
const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps> = DialogPrimitive.Portal

/**
 * Dialog close component that closes the dialog when clicked.
 *
 * @description The button that closes the dialog when triggered.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogContent>
 *     <DialogClose>Close</DialogClose>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const DialogClose: React.FC<DialogPrimitive.DialogCloseProps> = DialogPrimitive.Close

/**
 * Dialog overlay component that adds a background overlay when the dialog is open.
 *
 * @description The layer that covers the inert portion of the view when the dialog is open.
 *
 * @param props - The overlay props including className and other HTML attributes
 * @param ref - The ref to the overlay element
 * @returns A styled dialog overlay component
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogContent>
 *     <DialogOverlay className="custom-overlay" />
 *     ...
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const DialogOverlay: ForwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
> = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * Dialog content component that contains the dialog's content.
 *
 * @description The component that contains the content to be rendered when the dialog is open.
 *
 * @param props - The content props including className, children, and other HTML attributes
 * @param ref - The ref to the content element
 * @returns A styled dialog content component with close button
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Are you absolutely sure?</DialogTitle>
 *       <DialogDescription>
 *         This action cannot be undone. This will permanently delete your account
 *         and remove your data from our servers.
 *       </DialogDescription>
 *     </DialogHeader>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const DialogContent: ForwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
> = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/**
 * Dialog header component that contains the dialog's header content.
 *
 * @description A container for the dialog's header content, typically containing the title and description.
 *
 * @param props - The header props including className and other HTML attributes
 * @returns A styled header container for the dialog
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Are you absolutely sure?</DialogTitle>
 *     <DialogDescription>
 *       This action cannot be undone.
 *     </DialogDescription>
 *   </DialogHeader>
 * </DialogContent>
 * ```
 */
const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

/**
 * Dialog footer component that contains the dialog's footer content.
 *
 * @description A container for the dialog's footer content, typically containing action buttons.
 *
 * @param props - The footer props including className and other HTML attributes
 * @returns A styled footer container for the dialog
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>...</DialogHeader>
 *   <DialogFooter>
 *     <Button type="submit">Confirm</Button>
 *   </DialogFooter>
 * </DialogContent>
 * ```
 */
const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

/**
 * Dialog title component that renders the dialog's title.
 *
 * @description The title of the dialog, displayed at the top.
 *
 * @param props - The title props including className and other HTML attributes
 * @param ref - The ref to the title element
 * @returns A styled title component for the dialog
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Are you absolutely sure?</DialogTitle>
 * </DialogHeader>
 * ```
 */
const DialogTitle: ForwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
> = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/**
 * Dialog description component that renders the dialog's description.
 *
 * @description The description of the dialog, providing additional context.
 *
 * @param props - The description props including className and other HTML attributes
 * @param ref - The ref to the description element
 * @returns A styled description component for the dialog
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Are you absolutely sure?</DialogTitle>
 *   <DialogDescription>
 *     This action cannot be undone. This will permanently delete your account
 *     and remove your data from our servers.
 *   </DialogDescription>
 * </DialogHeader>
 * ```
 */
const DialogDescription: ForwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
> = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
