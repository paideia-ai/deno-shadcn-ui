'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'
import { Dialog, DialogContent } from '@/default/ui/dialog.tsx'
import type { ForwardRef } from '@/typing'

/**
 * A command menu component built on top of the cmdk library.
 *
 * The Command component serves as the root container for command menu interfaces,
 * providing a styled container for command search, items, and groups.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component
 * @returns {React.ReactElement} The Command component
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Search Emoji</CommandItem>
 *       <CommandItem>Calculator</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
const Command: ForwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
> = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
      className,
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

/**
 * A dialog component that contains a Command menu.
 *
 * The CommandDialog component wraps a Command component within a Dialog,
 * making it useful for keyboard-triggered command menus (e.g., Cmd+K).
 *
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - The content of the command dialog
 * @param {boolean} [props.open] - Whether the dialog is open
 * @param {(open: boolean) => void} [props.onOpenChange] - Function called when open state changes
 * @returns {React.ReactElement} The CommandDialog component
 *
 * @example
 * ```tsx
 * export function CommandMenu() {
 *   const [open, setOpen] = React.useState(false)
 *
 *   React.useEffect(() => {
 *     const down = (e: KeyboardEvent) => {
 *       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
 *         e.preventDefault()
 *         setOpen((open) => !open)
 *       }
 *     }
 *     document.addEventListener("keydown", down)
 *     return () => document.removeEventListener("keydown", down)
 *   }, [])
 *
 *   return (
 *     <CommandDialog open={open} onOpenChange={setOpen}>
 *       <CommandInput placeholder="Type a command or search..." />
 *       <CommandList>
 *         <CommandEmpty>No results found.</CommandEmpty>
 *         <CommandGroup heading="Suggestions">
 *           <CommandItem>Calendar</CommandItem>
 *           <CommandItem>Search Emoji</CommandItem>
 *           <CommandItem>Calculator</CommandItem>
 *         </CommandGroup>
 *       </CommandList>
 *     </CommandDialog>
 *   )
 * }
 * ```
 */
const CommandDialog: React.FC<DialogProps> = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className='overflow-hidden p-0 shadow-lg'>
        <Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

/**
 * An input component for the Command menu.
 *
 * The CommandInput component creates a styled search input with a search icon,
 * used for filtering commands within a Command menu.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {string} [props.placeholder] - Placeholder text for the input
 * @param {React.Ref<HTMLInputElement>} ref - The ref to attach to the component
 * @returns {React.ReactElement} The CommandInput component
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command or search..." />
 *   {/* ... *\/}
 * </Command>
 * ```
 */
const CommandInput: ForwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div className='flex items-center border-b px-3' cmdk-input-wrapper=''>
    <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

/**
 * A container for command items in the Command menu.
 *
 * The CommandList component creates a scrollable container for holding
 * command items, groups, and empty states within a Command menu.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component
 * @returns {React.ReactElement} The CommandList component
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
const CommandList: ForwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
> = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

/**
 * A component to display when no results are found in the Command menu.
 *
 * The CommandEmpty component renders when the command search returns no results,
 * providing feedback to the user.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {React.ReactNode} [props.children] - The content to display when empty
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component
 * @returns {React.ReactElement} The CommandEmpty component
 *
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandEmpty>No results found.</CommandEmpty>
 *   {/* ... *\/}
 * </CommandList>
 * ```
 */
const CommandEmpty: ForwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
> = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className='py-6 text-center text-sm'
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

/**
 * A group component for organizing commands in the Command menu.
 *
 * The CommandGroup component provides a way to categorize related command items
 * with an optional heading.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {string} [props.heading] - The heading text for the group
 * @param {React.ReactNode} props.children - The command items in this group
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component
 * @returns {React.ReactElement} The CommandGroup component
 *
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandGroup heading="Suggestions">
 *     <CommandItem>Calendar</CommandItem>
 *     <CommandItem>Search Emoji</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 * ```
 */
const CommandGroup: ForwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
> = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
      className,
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

/**
 * A separator component for the Command menu.
 *
 * The CommandSeparator component creates a visual divider between command groups
 * or items in a Command menu.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component
 * @returns {React.ReactElement} The CommandSeparator component
 *
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandGroup heading="Suggestions">
 *     <CommandItem>Calendar</CommandItem>
 *   </CommandGroup>
 *   <CommandSeparator />
 *   <CommandGroup heading="Settings">
 *     <CommandItem>Profile</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 * ```
 */
const CommandSeparator: ForwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
> = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

/**
 * An item component for the Command menu.
 *
 * The CommandItem component represents a selectable option in a Command menu,
 * with styling for hover, focus, and selection states. It automatically styles
 * icons placed inside it.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {React.ReactNode} props.children - The content of the command item
 * @param {boolean} [props.disabled] - Whether the item is disabled
 * @param {React.Ref<HTMLDivElement>} ref - The ref to attach to the component
 * @returns {React.ReactElement} The CommandItem component
 *
 * @example
 * ```tsx
 * <CommandGroup heading="Suggestions">
 *   <CommandItem>Calendar</CommandItem>
 *   <CommandItem disabled>Search Emoji</CommandItem>
 *   <CommandItem>
 *     <CalendarIcon />
 *     <span>Meeting</span>
 *   </CommandItem>
 * </CommandGroup>
 * ```
 */
const CommandItem: ForwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
> = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

/**
 * A component for displaying keyboard shortcuts in command items.
 *
 * The CommandShortcut component is used to display keyboard shortcuts or additional
 * information at the right side of a command item.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply
 * @param {React.ReactNode} props.children - The shortcut text or element
 * @returns {React.ReactElement} The CommandShortcut component
 *
 * @example
 * ```tsx
 * <CommandItem>
 *   <span>Settings</span>
 *   <CommandShortcut>⌘S</CommandShortcut>
 * </CommandItem>
 * ```
 */
const CommandShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
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
CommandShortcut.displayName = 'CommandShortcut'

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
