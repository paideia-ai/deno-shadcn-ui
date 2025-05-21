'use client'

/**
 * A module providing context menu components for displaying custom overlays on right-click.
 *
 * @see https://ui.shadcn.com/docs/components/context-menu
 * @module
 */

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * Root component for the context menu.
 *
 * The ContextMenu is used to display a menu triggered by right-clicking an area.
 * It provides users with a list of actions or options related to the clicked element.
 *
 * @type {React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>>}
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>Right click here</ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem>Profile</ContextMenuItem>
 *     <ContextMenuItem>Billing</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
const ContextMenu: React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>> =
  ContextMenuPrimitive.Root

/**
 * Trigger area for the context menu.
 *
 * This component defines the area that will trigger the context menu when right-clicked.
 *
 * @type {React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>>}
 * @example
 * ```tsx
 * <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center">
 *   Right click here
 * </ContextMenuTrigger>
 * ```
 */
const ContextMenuTrigger: React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>> =
  ContextMenuPrimitive.Trigger

/**
 * Group component for the context menu items.
 *
 * Used to group related menu items together.
 *
 * @type {React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>>}
 * @example
 * ```tsx
 * <ContextMenuGroup>
 *   <ContextMenuItem>Cut</ContextMenuItem>
 *   <ContextMenuItem>Copy</ContextMenuItem>
 *   <ContextMenuItem>Paste</ContextMenuItem>
 * </ContextMenuGroup>
 * ```
 */
const ContextMenuGroup: React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Group>> =
  ContextMenuPrimitive.Group

/**
 * Portal component for the context menu.
 *
 * Used to render the context menu into a portal to ensure proper layering.
 *
 * @type {React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal>>}
 */
const ContextMenuPortal: React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Portal>> =
  ContextMenuPrimitive.Portal

/**
 * Sub menu component for creating nested context menus.
 *
 * Used to create hierarchical menu structures with sub-menus.
 *
 * @type {React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub>>}
 * @example
 * ```tsx
 * <ContextMenuSub>
 *   <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
 *   <ContextMenuSubContent>
 *     <ContextMenuItem>Option 1</ContextMenuItem>
 *     <ContextMenuItem>Option 2</ContextMenuItem>
 *   </ContextMenuSubContent>
 * </ContextMenuSub>
 * ```
 */
const ContextMenuSub: React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Sub>> =
  ContextMenuPrimitive.Sub

/**
 * Radio group component for the context menu.
 *
 * Used to create a group of radio items where only one can be selected at a time.
 *
 * @type {React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup>>}
 * @example
 * ```tsx
 * <ContextMenuRadioGroup value="option1">
 *   <ContextMenuRadioItem value="option1">Option 1</ContextMenuRadioItem>
 *   <ContextMenuRadioItem value="option2">Option 2</ContextMenuRadioItem>
 * </ContextMenuRadioGroup>
 * ```
 */
const ContextMenuRadioGroup: React.FC<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioGroup>> =
  ContextMenuPrimitive.RadioGroup

/**
 * Trigger component for sub menus.
 *
 * Used to create a trigger for nested sub-menus within a context menu.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean } & React.RefAttributes<React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @param {boolean} [props.inset] - Whether to inset the trigger
 * @param {React.ReactNode} props.children - The content of the trigger
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>>} ref - Forwarded ref
 * @returns {JSX.Element} The SubTrigger component
 * @example
 * ```tsx
 * <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
 * ```
 */
const ContextMenuSubTrigger: ForwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }
> = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <ContextMenuPrimitive.SubTrigger
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
    </ContextMenuPrimitive.SubTrigger>
  ),
)
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

/**
 * Content component for sub menus.
 *
 * Contains the items displayed in a sub menu.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> & React.RefAttributes<React.ElementRef<typeof ContextMenuPrimitive.SubContent>>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.SubContent>>} ref - Forwarded ref
 * @returns {JSX.Element} The SubContent component
 * @example
 * ```tsx
 * <ContextMenuSubContent className="w-48">
 *   <ContextMenuItem>Save Page...</ContextMenuItem>
 *   <ContextMenuItem>Create Shortcut...</ContextMenuItem>
 * </ContextMenuSubContent>
 * ```
 */
const ContextMenuSubContent: ForwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]',
        className,
      )}
      {...props}
    />
  ),
)
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

/**
 * Content component for the context menu.
 *
 * Contains the items displayed in the main context menu.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> & React.RefAttributes<React.ElementRef<typeof ContextMenuPrimitive.Content>>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.Content>>} ref - Forwarded ref
 * @returns {JSX.Element} The Content component
 * @example
 * ```tsx
 * <ContextMenuContent className="w-64">
 *   <ContextMenuItem>Back</ContextMenuItem>
 *   <ContextMenuItem>Forward</ContextMenuItem>
 *   <ContextMenuItem>Reload</ContextMenuItem>
 * </ContextMenuContent>
 * ```
 */
const ContextMenuContent: ForwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          'z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]',
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  ),
)
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

/**
 * Item component for the context menu.
 *
 * Represents a clickable action or option in the context menu.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean } & React.RefAttributes<React.ElementRef<typeof ContextMenuPrimitive.Item>>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @param {boolean} [props.inset] - Whether to inset the item for alignment with other elements
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.Item>>} ref - Forwarded ref
 * @returns {JSX.Element} The Item component
 * @example
 * ```tsx
 * <ContextMenuItem inset>
 *   Back
 *   <ContextMenuShortcut>⌘[</ContextMenuShortcut>
 * </ContextMenuItem>
 * ```
 */
const ContextMenuItem: ForwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean }
> = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  ),
)
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

/**
 * Checkbox item component for the context menu.
 *
 * Represents a toggleable option with a checkbox in the context menu.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> & React.RefAttributes<React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @param {boolean} [props.checked] - Whether the checkbox is checked
 * @param {React.ReactNode} props.children - The content of the checkbox item
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>>} ref - Forwarded ref
 * @returns {JSX.Element} The CheckboxItem component
 * @example
 * ```tsx
 * <ContextMenuCheckboxItem checked>
 *   Show Bookmarks Bar
 *   <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
 * </ContextMenuCheckboxItem>
 * ```
 */
const ContextMenuCheckboxItem: ForwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
> = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <Check className='h-4 w-4' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  ),
)
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName

/**
 * Radio item component for the context menu.
 *
 * Represents a selectable option within a radio group in the context menu.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> & React.RefAttributes<React.ElementRef<typeof ContextMenuPrimitive.RadioItem>>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @param {string} props.value - The value of the radio item
 * @param {React.ReactNode} props.children - The content of the radio item
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.RadioItem>>} ref - Forwarded ref
 * @returns {JSX.Element} The RadioItem component
 * @example
 * ```tsx
 * <ContextMenuRadioGroup value="pedro">
 *   <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
 *   <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
 * </ContextMenuRadioGroup>
 * ```
 */
const ContextMenuRadioItem: ForwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
> = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className='h-2 w-2 fill-current' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  ),
)
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

/**
 * Label component for the context menu.
 *
 * Displays a non-interactive label within the context menu, useful for section headers.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean } & React.RefAttributes<React.ElementRef<typeof ContextMenuPrimitive.Label>>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @param {boolean} [props.inset] - Whether to inset the label for alignment with other elements
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.Label>>} ref - Forwarded ref
 * @returns {JSX.Element} The Label component
 * @example
 * ```tsx
 * <ContextMenuLabel inset>People</ContextMenuLabel>
 * ```
 */
const ContextMenuLabel: ForwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }
> = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        'px-2 py-1.5 text-sm font-semibold text-foreground',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  ),
)
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

/**
 * Separator component for the context menu.
 *
 * Creates a visual divider between groups of items in the context menu.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> & React.RefAttributes<React.ElementRef<typeof ContextMenuPrimitive.Separator>>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.Separator>>} ref - Forwarded ref
 * @returns {JSX.Element} The Separator component
 * @example
 * ```tsx
 * <ContextMenuItem>Cut</ContextMenuItem>
 * <ContextMenuItem>Copy</ContextMenuItem>
 * <ContextMenuSeparator />
 * <ContextMenuItem>Paste</ContextMenuItem>
 * ```
 */
const ContextMenuSeparator: ForwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  ),
)
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

/**
 * Shortcut component for the context menu.
 *
 * Displays keyboard shortcuts associated with context menu items.
 *
 * @type {React.FC<React.HTMLAttributes<HTMLSpanElement>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional className for styling
 * @returns {JSX.Element} The Shortcut component
 * @example
 * ```tsx
 * <ContextMenuItem>
 *   Back
 *   <ContextMenuShortcut>⌘[</ContextMenuShortcut>
 * </ContextMenuItem>
 * ```
 */
const ContextMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
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
ContextMenuShortcut.displayName = 'ContextMenuShortcut'

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
}
