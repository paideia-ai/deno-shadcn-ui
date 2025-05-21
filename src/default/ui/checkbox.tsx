'use client'

/**
 * A module providing checkbox components for selecting single items.
 *
 * @see https://ui.shadcn.com/docs/components/checkbox
 * @module
 */

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'

import type { ForwardRef } from '@/typing'

/**
 * Checkbox component properties
 * @typedef {Object} CheckboxProps
 * @extends {React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>}
 */
export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * This component is built on top of the Radix UI Checkbox primitive and
 * includes custom styling with Tailwind CSS.
 *
 * @param {CheckboxProps} props - The properties to pass to the checkbox
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {boolean} [props.checked] - Whether the checkbox is checked (controlled)
 * @param {boolean} [props.defaultChecked] - Initial checked state (uncontrolled)
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled
 * @param {boolean} [props.required] - Whether the checkbox is required
 * @param {string} [props.name] - Form name of the checkbox
 * @param {string} [props.value] - Form value of the checkbox
 * @param {(checked: boolean | 'indeterminate') => void} [props.onCheckedChange] - Function called when checked state changes
 * @param {React.Ref<HTMLButtonElement>} ref - Ref to the underlying button element
 *
 * @example
 * // Basic usage
 * <Checkbox id="terms" />
 *
 * @example
 * // With label
 * <div className="flex items-center space-x-2">
 *   <Checkbox id="terms" />
 *   <label htmlFor="terms">Accept terms and conditions</label>
 * </div>
 *
 * @example
 * // With default checked state
 * <Checkbox id="terms" defaultChecked />
 *
 * @example
 * // Disabled state
 * <Checkbox id="terms" disabled />
 *
 * @example
 * // Form integration with React Hook Form
 * <FormField
 *   control={form.control}
 *   name="mobile"
 *   render={({ field }) => (
 *     <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
 *       <FormControl>
 *         <Checkbox
 *           checked={field.value}
 *           onCheckedChange={field.onChange}
 *         />
 *       </FormControl>
 *       <div className="space-y-1 leading-none">
 *         <FormLabel>Use different settings for my mobile devices</FormLabel>
 *         <FormDescription>
 *           You can manage your mobile settings in your mobile devices section.
 *         </FormDescription>
 *       </div>
 *     </FormItem>
 *   )}
 * />
 *
 * @returns {JSX.Element} - The checkbox component
 */
const Checkbox: ForwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
> = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className='h-4 w-4' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
