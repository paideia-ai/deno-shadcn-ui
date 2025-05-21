'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * Switch component properties extending Radix UI Switch Root props.
 */
export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>

/**
 * A control that allows the user to toggle between checked and not checked states.
 *
 * This component is built on top of the Radix UI Switch primitive.
 *
 * @param props - The props to pass to the switch component
 * @param props.className - Additional CSS classes to apply to the switch
 * @param props.checked - Whether the switch is checked or not
 * @param props.defaultChecked - The default checked state when initially rendered
 * @param props.onCheckedChange - Event handler called when the checked state changes
 * @param props.disabled - When true, prevents the user from interacting with the switch
 * @param ref - Ref forwarded to the underlying switch element
 * @returns A styled switch component
 *
 * @example
 * // Basic usage
 * <Switch />
 *
 * @example
 * // With checked state controlled
 * <Switch checked={checked} onCheckedChange={setChecked} />
 *
 * @example
 * // Disabled state
 * <Switch disabled />
 *
 * @example
 * // With form integration
 * <FormField
 *   control={form.control}
 *   name="marketingEmails"
 *   render={({ field }) => (
 *     <FormItem className="flex items-center justify-between">
 *       <FormLabel>Marketing emails</FormLabel>
 *       <FormControl>
 *         <Switch
 *           checked={field.value}
 *           onCheckedChange={field.onChange}
 *         />
 *       </FormControl>
 *     </FormItem>
 *   )}
 * />
 */
export const Switch: ForwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
> = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName
