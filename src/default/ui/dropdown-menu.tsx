'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * Root component for the dropdown menu.
 *
 * Displays a menu to the user — such as a set of actions or functions — triggered by a button.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu}
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>My Account</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Billing</DropdownMenuItem>
 *     <DropdownMenuItem>Team</DropdownMenuItem>
 *     <DropdownMenuItem>Subscription</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const DropdownMenu: React.FC<React.ComponentProps<typeof DropdownMenuPrimitive.Root>> = DropdownMenuPrimitive.Root

/**
 * The button that toggles the dropdown menu.
 *
 * By default, the {@link DropdownMenuContent} will position itself against the trigger.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#trigger}
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     {/* Content *\/}
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const DropdownMenuTrigger: React.FC<React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>> =
  DropdownMenuPrimitive.Trigger

/**
 * Used to group multiple items together.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#group}
 *
 * @example
 * ```tsx
 * <DropdownMenuGroup>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 *   <DropdownMenuItem>Billing</DropdownMenuItem>
 *   <DropdownMenuItem>Settings</DropdownMenuItem>
 * </DropdownMenuGroup>
 * ```
 */
const DropdownMenuGroup: React.FC<React.ComponentProps<typeof DropdownMenuPrimitive.Group>> =
  DropdownMenuPrimitive.Group

/**
 * Portal for the dropdown menu content.
 *
 * When used, portals the content into the body.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#portal}
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuPortal>
 *     <DropdownMenuContent>
 *       {/* Content *\/}
 *     </DropdownMenuContent>
 *   </DropdownMenuPortal>
 * </DropdownMenu>
 * ```
 */
const DropdownMenuPortal: React.FC<React.ComponentProps<typeof DropdownMenuPrimitive.Portal>> =
  DropdownMenuPrimitive.Portal

/**
 * Contains all the parts of a submenu.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#sub}
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Save</DropdownMenuItem>
 *     <DropdownMenuItem>Delete</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
const DropdownMenuSub: React.FC<React.ComponentProps<typeof DropdownMenuPrimitive.Sub>> = DropdownMenuPrimitive.Sub

/**
 * Used to group multiple radio items.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#radiogroup}
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value="value1" onValueChange={(value) => console.log(value)}>
 *   <DropdownMenuRadioItem value="value1">Option 1</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="value2">Option 2</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
const DropdownMenuRadioGroup: React.FC<React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>> =
  DropdownMenuPrimitive.RadioGroup

/**
 * The trigger that opens a submenu when hovered or clicked.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#subtrigger}
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 * @param props.inset - Whether to add padding to the left side of the trigger.
 * @param props.children - The content to display inside the trigger.
 * @param ref - The ref to attach to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Save</DropdownMenuItem>
 *     <DropdownMenuItem>Delete</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
const DropdownMenuSubTrigger: ForwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
> = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className='ml-auto' />
    </DropdownMenuPrimitive.SubTrigger>
  ),
)
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

/**
 * The content that appears when a submenu is opened.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#subcontent}
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 * @param ref - The ref to attach to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Save</DropdownMenuItem>
 *     <DropdownMenuItem>Delete</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
const DropdownMenuSubContent: ForwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
        className,
      )}
      {...props}
    />
  ),
)
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

/**
 * The main content that appears when the dropdown menu is opened.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#content}
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 * @param props.sideOffset - The distance in pixels from the trigger.
 * @param ref - The ref to attach to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Billing</DropdownMenuItem>
 *     <DropdownMenuItem>Team</DropdownMenuItem>
 *     <DropdownMenuItem>Subscription</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const DropdownMenuContent: ForwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
> = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  ),
)
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

/**
 * The selectable item in the dropdown menu.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#item}
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 * @param props.inset - Whether to add padding to the left side of the item.
 * @param ref - The ref to attach to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 * <DropdownMenuItem>
 *   <User className="mr-2 h-4 w-4" />
 *   <span>Account</span>
 *   <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuItem: ForwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
> = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  ),
)
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

/**
 * A menu item with a checkbox that can be selected.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#checkboxitem}
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 * @param props.children - The content to display inside the checkbox item.
 * @param props.checked - Whether the checkbox is checked.
 * @param ref - The ref to attach to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenuCheckboxItem checked={isChecked} onCheckedChange={setIsChecked}>
 *   Show Details
 * </DropdownMenuCheckboxItem>
 * ```
 */
const DropdownMenuCheckboxItem: ForwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
> = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className='h-4 w-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  ),
)
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

/**
 * A menu item with a radio item that can be selected from a group.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#radioitem}
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 * @param props.children - The content to display inside the radio item.
 * @param ref - The ref to attach to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
 *   <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
const DropdownMenuRadioItem: ForwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
> = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className='h-2 w-2 fill-current' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  ),
)
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

/**
 * A label for items in the dropdown menu. Useful for providing headings.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#label}
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 * @param props.inset - Whether to add padding to the left side of the label.
 * @param ref - The ref to attach to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenuLabel>My Account</DropdownMenuLabel>
 * <DropdownMenuSeparator />
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 * ```
 */
const DropdownMenuLabel: ForwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
> = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  ),
)
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

/**
 * A visual separator for menu items.
 *
 * @see {@link https://www.radix-ui.com/docs/primitives/components/dropdown-menu#separator}
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 * @param ref - The ref to attach to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenuLabel>My Account</DropdownMenuLabel>
 * <DropdownMenuSeparator />
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 * ```
 */
const DropdownMenuSeparator: ForwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-muted', className)}
      {...props}
    />
  ),
)
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

/**
 * A visual cue for keyboard shortcuts in menu items.
 *
 * @param props - The props for the component.
 * @param props.className - The class name to apply to the component.
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>
 *   Profile
 *   <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
