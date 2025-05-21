'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * A drawer component that slides in from the edge of the screen.
 *
 * Built on top of Vaul by Emil Kowalski.
 *
 * @see https://vaul.emilkowal.ski/getting-started
 *
 * @param props - The component props
 * @param props.shouldScaleBackground - Whether the background should scale when the drawer is open, defaults to true
 * @returns A Drawer component
 *
 * @example
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger>Open</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Are you absolutely sure?</DrawerTitle>
 *       <DrawerDescription>This action cannot be undone.</DrawerDescription>
 *     </DrawerHeader>
 *     <DrawerFooter>
 *       <Button>Submit</Button>
 *       <DrawerClose>
 *         <Button variant="outline">Cancel</Button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
const Drawer: React.FC<React.ComponentProps<typeof DrawerPrimitive.Root>> = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = 'Drawer'

/**
 * The trigger that opens the drawer when clicked.
 *
 * @example
 * ```tsx
 * <DrawerTrigger>Open</DrawerTrigger>
 * ```
 */
const DrawerTrigger: React.FC<React.ComponentProps<typeof DrawerPrimitive.Trigger>> = DrawerPrimitive.Trigger

/**
 * Creates a portal for the drawer content.
 *
 * @example
 * ```tsx
 * <DrawerPortal>
 *   <DrawerContent>...</DrawerContent>
 * </DrawerPortal>
 * ```
 */
const DrawerPortal: React.FC<React.ComponentProps<typeof DrawerPrimitive.Portal>> = DrawerPrimitive.Portal

/**
 * The button that closes the drawer when clicked.
 *
 * @example
 * ```tsx
 * <DrawerClose>
 *   <Button variant="outline">Cancel</Button>
 * </DrawerClose>
 * ```
 */
const DrawerClose: React.FC<React.ComponentProps<typeof DrawerPrimitive.Close>> = DrawerPrimitive.Close

/**
 * The overlay that covers the background when the drawer is open.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @param ref - The reference to the underlying DOM element
 * @returns An overlay component with styling
 */
const DrawerOverlay: ForwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
> = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/80', className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

/**
 * The content of the drawer that appears from the edge of the screen.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @param props.children - The content inside the drawer
 * @param ref - The reference to the underlying DOM element
 * @returns A drawer content component with styling
 *
 * @example
 * ```tsx
 * <DrawerContent>
 *   <DrawerHeader>...</DrawerHeader>
 *   <p>Some content for the drawer</p>
 *   <DrawerFooter>...</DrawerFooter>
 * </DrawerContent>
 * ```
 */
const DrawerContent: ForwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
> = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
        className,
      )}
      {...props}
    >
      <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

/**
 * The header section of the drawer, typically containing a title and description.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @returns A styled header section
 *
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Are you absolutely sure?</DrawerTitle>
 *   <DrawerDescription>This action cannot be undone.</DrawerDescription>
 * </DrawerHeader>
 * ```
 */
const DrawerHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...props}
  />
)
DrawerHeader.displayName = 'DrawerHeader'

/**
 * The footer section of the drawer, typically containing action buttons.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @returns A styled footer section
 *
 * @example
 * ```tsx
 * <DrawerFooter>
 *   <Button>Submit</Button>
 *   <DrawerClose>
 *     <Button variant="outline">Cancel</Button>
 *   </DrawerClose>
 * </DrawerFooter>
 * ```
 */
const DrawerFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'

/**
 * The title of the drawer, typically placed inside the DrawerHeader.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @param ref - The reference to the underlying DOM element
 * @returns A styled title component
 *
 * @example
 * ```tsx
 * <DrawerTitle>Are you absolutely sure?</DrawerTitle>
 * ```
 */
const DrawerTitle: ForwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
> = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

/**
 * The description of the drawer, providing additional context about the drawer's purpose.
 * Typically placed inside the DrawerHeader.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @param ref - The reference to the underlying DOM element
 * @returns A styled description component
 *
 * @example
 * ```tsx
 * <DrawerDescription>This action cannot be undone.</DrawerDescription>
 * ```
 */
const DrawerDescription: ForwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
> = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
