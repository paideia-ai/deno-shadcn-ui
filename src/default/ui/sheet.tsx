'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassProp } from 'class-variance-authority/types'
import { X } from 'lucide-react'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * The root component for the Sheet.
 *
 * Sheet is a dialog that slides in from the edge of the screen.
 * It's useful for displaying complementary content to the main content of the screen.
 *
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger>Open</SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Sheet Title</SheetTitle>
 *       <SheetDescription>Sheet Description</SheetDescription>
 *     </SheetHeader>
 *   </SheetContent>
 * </Sheet>
 * ```
 */
const Sheet: React.FC<React.ComponentProps<typeof SheetPrimitive.Root>> = SheetPrimitive.Root

/**
 * The button that opens the sheet when clicked.
 *
 * @example
 * ```tsx
 * <SheetTrigger>Open Sheet</SheetTrigger>
 * ```
 */
const SheetTrigger: React.FC<React.ComponentProps<typeof SheetPrimitive.Trigger>> = SheetPrimitive.Trigger

/**
 * The button that closes the sheet when clicked.
 *
 * @example
 * ```tsx
 * <SheetClose>Close Sheet</SheetClose>
 * ```
 */
const SheetClose: React.FC<React.ComponentProps<typeof SheetPrimitive.Close>> = SheetPrimitive.Close

/**
 * The portalled container for the sheet content.
 *
 * @example
 * ```tsx
 * <SheetPortal>
 *   <SheetOverlay />
 *   <SheetContent>Content</SheetContent>
 * </SheetPortal>
 * ```
 */
const SheetPortal: React.FC<React.ComponentProps<typeof SheetPrimitive.Portal>> = SheetPrimitive.Portal

/**
 * A transparent overlay that covers the main content while the sheet is open.
 *
 * @param props - The props for the overlay component
 * @param ref - The ref to be passed to the overlay element
 * @returns A React element representing the sheet overlay
 *
 * @example
 * ```tsx
 * <SheetOverlay className="custom-overlay-class" />
 * ```
 */
const SheetOverlay: ForwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
> = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

/**
 * Type definition for the sheetVariants function.
 */
type SheetVariantFunction = (
  options?: {
    side?: 'top' | 'bottom' | 'left' | 'right'
  } & ClassProp,
) => string

/**
 * The cva (class-variance-authority) configuration for sheet variant styling.
 * Defines the animation and positioning styles based on which side the sheet appears from.
 */
const sheetVariants: SheetVariantFunction = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left:
          'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

/**
 * Interface for SheetContent component props.
 * Extends the standard Dialog content props with the variant props from sheetVariants.
 */
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}

/**
 * The component that contains the content to be displayed in the sheet.
 *
 * @param props - The props for the content component
 * @param props.side - The side of the screen from which the sheet will appear ('top', 'right', 'bottom', or 'left')
 * @param props.className - Additional CSS classes to apply to the content
 * @param props.children - The content to be displayed in the sheet
 * @param ref - The ref to be passed to the content element
 * @returns A React element representing the sheet content
 *
 * @example
 * ```tsx
 * <SheetContent side="left">
 *   <SheetHeader>
 *     <SheetTitle>Sheet Title</SheetTitle>
 *     <SheetDescription>Sheet Description</SheetDescription>
 *   </SheetHeader>
 * </SheetContent>
 * ```
 *
 * @example
 * ```tsx
 * <SheetContent className="w-[400px] sm:w-[540px]">
 *   Content with custom width
 * </SheetContent>
 * ```
 */
const SheetContent: ForwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
> = React.forwardRef(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

/**
 * A component for structuring header content within a sheet.
 *
 * @param props - The props for the header component
 * @param props.className - Additional CSS classes to apply to the header
 * @returns A React element representing the sheet header
 *
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Sheet Title</SheetTitle>
 *   <SheetDescription>Sheet Description</SheetDescription>
 * </SheetHeader>
 * ```
 */
const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
SheetHeader.displayName = 'SheetHeader'

/**
 * A component for structuring footer content within a sheet.
 *
 * @param props - The props for the footer component
 * @param props.className - Additional CSS classes to apply to the footer
 * @returns A React element representing the sheet footer
 *
 * @example
 * ```tsx
 * <SheetFooter>
 *   <Button>Save Changes</Button>
 *   <SheetClose asChild>
 *     <Button variant="outline">Cancel</Button>
 *   </SheetClose>
 * </SheetFooter>
 * ```
 */
const SheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
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
SheetFooter.displayName = 'SheetFooter'

/**
 * A component for displaying the title of the sheet.
 *
 * @param props - The props for the title component
 * @param props.className - Additional CSS classes to apply to the title
 * @param ref - The ref to be passed to the title element
 * @returns A React element representing the sheet title
 *
 * @example
 * ```tsx
 * <SheetTitle>Are you absolutely sure?</SheetTitle>
 * ```
 */
const SheetTitle: ForwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
> = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

/**
 * A component for displaying the description of the sheet.
 *
 * @param props - The props for the description component
 * @param props.className - Additional CSS classes to apply to the description
 * @param ref - The ref to be passed to the description element
 * @returns A React element representing the sheet description
 *
 * @example
 * ```tsx
 * <SheetDescription>
 *   This action cannot be undone. This will permanently delete your account
 *   and remove your data from our servers.
 * </SheetDescription>
 * ```
 */
const SheetDescription: ForwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
> = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
