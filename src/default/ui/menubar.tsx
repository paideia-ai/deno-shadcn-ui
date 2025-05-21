'use client'

/**
 * A module providing menubar components for desktop-style application menus.
 *
 * @see https://ui.shadcn.com/docs/components/menubar
 * @module
 */

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * A component for creating a menu within a menubar structure.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Menu component
 * @returns A menubar menu component
 * @example
 * ```tsx
 * <MenubarMenu>
 *   <MenubarTrigger>File</MenubarTrigger>
 *   <MenubarContent>
 *     <MenubarItem>New Tab</MenubarItem>
 *     <MenubarItem>New Window</MenubarItem>
 *   </MenubarContent>
 * </MenubarMenu>
 * ```
 */
function MenubarMenu(props: React.ComponentProps<typeof MenubarPrimitive.Menu>): React.JSX.Element {
  return <MenubarPrimitive.Menu {...props} />
}

/**
 * A component for grouping related menubar items.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Group component
 * @returns A menubar group component
 * @example
 * ```tsx
 * <MenubarGroup>
 *   <MenubarItem>Item 1</MenubarItem>
 *   <MenubarItem>Item 2</MenubarItem>
 * </MenubarGroup>
 * ```
 */
function MenubarGroup(props: React.ComponentProps<typeof MenubarPrimitive.Group>): React.JSX.Element {
  return <MenubarPrimitive.Group {...props} />
}

/**
 * A component for creating a portal within a menubar.
 * Used internally by other menubar components.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Portal component
 * @returns A menubar portal component
 */
function MenubarPortal(props: React.ComponentProps<typeof MenubarPrimitive.Portal>): React.JSX.Element {
  return <MenubarPrimitive.Portal {...props} />
}

/**
 * A component for grouping related radio items within a menubar.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.RadioGroup component
 * @returns A menubar radio group component
 * @example
 * ```tsx
 * <MenubarRadioGroup>
 *   <MenubarRadioItem value="option1">Option 1</MenubarRadioItem>
 *   <MenubarRadioItem value="option2">Option 2</MenubarRadioItem>
 * </MenubarRadioGroup>
 * ```
 */
function MenubarRadioGroup(props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>): React.JSX.Element {
  return <MenubarPrimitive.RadioGroup {...props} />
}

/**
 * A component for creating a submenu within a menubar.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Sub component
 * @returns A menubar sub component
 * @example
 * ```tsx
 * <MenubarSub>
 *   <MenubarSubTrigger>More Options</MenubarSubTrigger>
 *   <MenubarSubContent>
 *     <MenubarItem>Option 1</MenubarItem>
 *     <MenubarItem>Option 2</MenubarItem>
 *   </MenubarSubContent>
 * </MenubarSub>
 * ```
 */
function MenubarSub(props: React.ComponentProps<typeof MenubarPrimitive.Sub>): React.JSX.Element {
  return <MenubarPrimitive.Sub data-slot='menubar-sub' {...props} />
}

/**
 * The root menubar component that serves as a container for menu items.
 * A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Root component
 * @param props.className - Additional CSS class names
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar root component
 * @example
 * ```tsx
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>New Tab</MenubarItem>
 *       <MenubarItem>New Window</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 */
const Menubar: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
> = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'flex h-10 items-center space-x-1 rounded-md border bg-background p-1',
      className,
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

/**
 * A button that triggers the display of a menubar menu.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Trigger component
 * @param props.className - Additional CSS class names
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar trigger button component
 * @example
 * ```tsx
 * <MenubarTrigger>File</MenubarTrigger>
 * ```
 */
const MenubarTrigger: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
> = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      className,
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

/**
 * A button that triggers the display of a submenu in a menubar.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.SubTrigger component
 * @param props.className - Additional CSS class names
 * @param props.inset - Whether to inset the trigger (adds padding to the left)
 * @param props.children - The content of the trigger
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar subtrigger button component
 * @example
 * ```tsx
 * <MenubarSubTrigger>More Options</MenubarSubTrigger>
 * ```
 */
const MenubarSubTrigger: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
> = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className='ml-auto h-4 w-4' />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

/**
 * The content container for a submenu in a menubar.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.SubContent component
 * @param props.className - Additional CSS class names
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar subcontent component
 * @example
 * ```tsx
 * <MenubarSubContent>
 *   <MenubarItem>Option 1</MenubarItem>
 *   <MenubarItem>Option 2</MenubarItem>
 * </MenubarSubContent>
 * ```
 */
const MenubarSubContent: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
> = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]',
      className,
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

/**
 * The content container for a menubar menu.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Content component
 * @param props.className - Additional CSS class names
 * @param props.align - The alignment of the content relative to the trigger
 * @param props.alignOffset - The offset of the alignment
 * @param props.sideOffset - The offset from the side
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar content component
 * @example
 * ```tsx
 * <MenubarContent>
 *   <MenubarItem>New Tab</MenubarItem>
 *   <MenubarItem>New Window</MenubarItem>
 *   <MenubarSeparator />
 *   <MenubarItem>Share</MenubarItem>
 * </MenubarContent>
 * ```
 */
const MenubarContent: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
> = React.forwardRef(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref,
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]',
          className,
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  ),
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

/**
 * An actionable item within a menubar menu.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Item component
 * @param props.className - Additional CSS class names
 * @param props.inset - Whether to inset the item (adds padding to the left)
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar item component
 * @example
 * ```tsx
 * <MenubarItem>New Tab</MenubarItem>
 * <MenubarItem>
 *   New Tab <MenubarShortcut>⌘T</MenubarShortcut>
 * </MenubarItem>
 * ```
 */
const MenubarItem: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
> = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

/**
 * A checkable item within a menubar menu.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.CheckboxItem component
 * @param props.className - Additional CSS class names
 * @param props.children - The content of the checkbox item
 * @param props.checked - Whether the checkbox is checked
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar checkbox item component
 * @example
 * ```tsx
 * <MenubarCheckboxItem checked={isChecked} onCheckedChange={setIsChecked}>
 *   Show Toolbar
 * </MenubarCheckboxItem>
 * ```
 */
const MenubarCheckboxItem: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
> = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <MenubarPrimitive.ItemIndicator>
        <Check className='h-4 w-4' />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

/**
 * A radio item within a menubar menu, should be used within a MenubarRadioGroup.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.RadioItem component
 * @param props.className - Additional CSS class names
 * @param props.children - The content of the radio item
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar radio item component
 * @example
 * ```tsx
 * <MenubarRadioGroup value={size} onValueChange={setSize}>
 *   <MenubarRadioItem value="small">Small</MenubarRadioItem>
 *   <MenubarRadioItem value="medium">Medium</MenubarRadioItem>
 *   <MenubarRadioItem value="large">Large</MenubarRadioItem>
 * </MenubarRadioGroup>
 * ```
 */
const MenubarRadioItem: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
> = React.forwardRef(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
      <MenubarPrimitive.ItemIndicator>
        <Circle className='h-2 w-2 fill-current' />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

/**
 * A label item within a menubar menu, used to provide context or grouping for other menu items.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Label component
 * @param props.className - Additional CSS class names
 * @param props.inset - Whether to inset the label (adds padding to the left)
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar label component
 * @example
 * ```tsx
 * <MenubarLabel>Edit Options</MenubarLabel>
 * <MenubarItem>Cut</MenubarItem>
 * <MenubarItem>Copy</MenubarItem>
 * <MenubarItem>Paste</MenubarItem>
 * ```
 */
const MenubarLabel: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
> = React.forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

/**
 * A separator item within a menubar menu, used to visually separate groups of related menu items.
 *
 * @component
 * @param props - The props to pass to the underlying MenubarPrimitive.Separator component
 * @param props.className - Additional CSS class names
 * @param ref - Forwarded ref to the underlying element
 * @returns A menubar separator component
 * @example
 * ```tsx
 * <MenubarItem>New Tab</MenubarItem>
 * <MenubarItem>New Window</MenubarItem>
 * <MenubarSeparator />
 * <MenubarItem>Share</MenubarItem>
 * ```
 */
const MenubarSeparator: ForwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
> = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

/**
 * A component for displaying keyboard shortcuts within a menubar item.
 *
 * @component
 * @param props - The props to pass to the underlying HTML span element
 * @param props.className - Additional CSS class names
 * @returns A menubar shortcut component
 * @example
 * ```tsx
 * <MenubarItem>
 *   New Tab <MenubarShortcut>⌘T</MenubarShortcut>
 * </MenubarItem>
 * ```
 */
const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = 'MenubarShortcut'

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
