'use client'

/**
 * A module providing select components for selecting a value from a list of options.
 *
 * @see https://ui.shadcn.com/docs/components/select
 * @module
 */

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * The root component of the select.
 *
 * @description The main container for the Select component that manages the selection state.
 * Displays a list of options for the user to pick from.
 *
 * @example
 * ```tsx
 * <Select>
 *   <SelectTrigger className="w-[180px]">
 *     <SelectValue placeholder="Theme" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="light">Light</SelectItem>
 *     <SelectItem value="dark">Dark</SelectItem>
 *     <SelectItem value="system">System</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
const Select: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>> = SelectPrimitive.Root

/**
 * Used to group multiple items together in the select dropdown.
 *
 * @description Creates a logical grouping for Select items, allowing them to be organized
 * in categories within the dropdown menu.
 *
 * @example
 * ```tsx
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectLabel>Fruits</SelectLabel>
 *       <SelectItem value="apple">Apple</SelectItem>
 *       <SelectItem value="banana">Banana</SelectItem>
 *     </SelectGroup>
 *     <SelectGroup>
 *       <SelectLabel>Vegetables</SelectLabel>
 *       <SelectItem value="carrot">Carrot</SelectItem>
 *       <SelectItem value="potato">Potato</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 * ```
 */
const SelectGroup: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>> = SelectPrimitive.Group

/**
 * Displays the selected value in the select trigger.
 *
 * @description Renders the currently selected value inside the trigger button.
 * When no value is selected, it can display a placeholder.
 *
 * @example
 * ```tsx
 * <SelectTrigger>
 *   <SelectValue placeholder="Select an option" />
 * </SelectTrigger>
 * ```
 */
const SelectValue: React.FC<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>> = SelectPrimitive.Value

/**
 * The button that toggles the select dropdown.
 *
 * @description Acts as the trigger button for the select dropdown.
 * When clicked, it opens the select content with the list of selectable options.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying button element
 * @returns A styled trigger button component
 *
 * @example
 * ```tsx
 * <Select>
 *   <SelectTrigger className="w-[180px]">
 *     <SelectValue placeholder="Theme" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="light">Light</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
const SelectTrigger: ForwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
> = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className='h-4 w-4 opacity-50' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * Button for scrolling up within a select dropdown with many options.
 *
 * @description Provides a way to scroll up through the select options when there are more
 * options than can fit in the visible dropdown area.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying button element
 * @returns A styled scroll up button component
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectScrollUpButton />
 *   <SelectViewport>
 *     {/* Many select items *\/}
 *   </SelectViewport>
 * </SelectContent>
 * ```
 */
const SelectScrollUpButton: ForwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUp className='h-4 w-4' />
    </SelectPrimitive.ScrollUpButton>
  ),
)
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

/**
 * Button for scrolling down within a select dropdown with many options.
 *
 * @description Provides a way to scroll down through the select options when there are more
 * options than can fit in the visible dropdown area.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying button element
 * @returns A styled scroll down button component
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectViewport>
 *     {/* Many select items *\/}
 *   </SelectViewport>
 *   <SelectScrollDownButton />
 * </SelectContent>
 * ```
 */
const SelectScrollDownButton: ForwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDown className='h-4 w-4' />
    </SelectPrimitive.ScrollDownButton>
  ),
)
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

/**
 * The content of the select dropdown that contains the options.
 *
 * @description Contains the list of selectable options that appear when the select
 * is opened. It includes viewport, scroll buttons, and animation styles.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying element
 * @returns A styled dropdown content component
 *
 * @example
 * ```tsx
 * <Select>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
const SelectContent: ForwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
> = React.forwardRef(
  ({ className, children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
)
SelectContent.displayName = SelectPrimitive.Content.displayName

/**
 * A label component for group headings within the select dropdown.
 *
 * @description Allows you to label groups of options within the select dropdown,
 * providing context for the options that follow it.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying element
 * @returns A styled label component
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectGroup>
 *     <SelectLabel>Fruits</SelectLabel>
 *     <SelectItem value="apple">Apple</SelectItem>
 *     <SelectItem value="banana">Banana</SelectItem>
 *   </SelectGroup>
 * </SelectContent>
 * ```
 */
const SelectLabel: ForwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Label
      ref={ref}
      className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
      {...props}
    />
  ),
)
SelectLabel.displayName = SelectPrimitive.Label.displayName

/**
 * A selectable item within the select dropdown.
 *
 * @description Represents a single option that can be selected from the dropdown.
 * It displays a checkmark when selected and supports disabled state.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying element
 * @returns A styled selectable item component
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectItem value="light">Light</SelectItem>
 *   <SelectItem value="dark">Dark</SelectItem>
 *   <SelectItem value="system">System</SelectItem>
 * </SelectContent>
 * ```
 */
const SelectItem: ForwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
> = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <Check className='h-4 w-4' />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
)
SelectItem.displayName = SelectPrimitive.Item.displayName

/**
 * A separator line for dividing groups of items in the select dropdown.
 *
 * @description Provides a visual separator between sections of options in the dropdown,
 * useful for creating visual distinction between different groups of options.
 *
 * @param props - The component props
 * @param ref - The ref to the underlying element
 * @returns A styled separator component
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectGroup>
 *     <SelectLabel>Fruits</SelectLabel>
 *     <SelectItem value="apple">Apple</SelectItem>
 *   </SelectGroup>
 *   <SelectSeparator />
 *   <SelectGroup>
 *     <SelectLabel>Vegetables</SelectLabel>
 *     <SelectItem value="carrot">Carrot</SelectItem>
 *   </SelectGroup>
 * </SelectContent>
 * ```
 */
const SelectSeparator: ForwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-muted', className)}
      {...props}
    />
  ),
)
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
