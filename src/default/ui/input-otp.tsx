'use client'

import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { Dot } from 'lucide-react'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * A one-time password input component with copy-paste functionality.
 *
 * This component allows users to input one-time passwords or verification codes
 * with individual character slots. It supports accessibility features and provides
 * a copy-paste functionality for improved user experience.
 *
 * @see {@link https://github.com/guilhermerodz/input-otp} Built on top of input-otp by @guilherme_rodz
 *
 * @param props - The props to pass to the underlying OTPInput component
 * @param props.maxLength - Maximum number of characters
 * @param props.pattern - Optional pattern for character validation
 * @param props.value - The current value (for controlled usage)
 * @param props.onChange - Change handler (for controlled usage)
 * @param props.disabled - Whether the input is disabled
 * @param props.className - Additional className for the input element
 * @param props.containerClassName - Additional className for the container element
 * @param ref - React ref forwarded to the underlying input element
 *
 * @example
 * ```tsx
 * // Basic usage
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 * </InputOTP>
 *
 * // With separators
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *     <InputOTPSeparator />
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 *
 * @returns A styled OTP input component
 */
const InputOTP: ForwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
> = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      'flex items-center gap-2 has-[:disabled]:opacity-50',
      containerClassName,
    )}
    className={cn('disabled:cursor-not-allowed', className)}
    {...props}
  />
))
InputOTP.displayName = 'InputOTP'

/**
 * A group container for OTP input slots.
 *
 * This component is used to group OTP input slots together and provide
 * appropriate layout styling.
 *
 * @param props - Standard div props
 * @param props.className - Additional className for custom styling
 * @param props.children - Child components (typically InputOTPSlot and InputOTPSeparator)
 * @param ref - React ref forwarded to the underlying div element
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 *
 * @returns A styled group container for OTP input slots
 */
const InputOTPGroup: ForwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
))
InputOTPGroup.displayName = 'InputOTPGroup'

/**
 * Individual character slot for OTP input.
 *
 * This component represents an individual character slot within an OTP input.
 * It handles displaying the character, active state, and caret animations.
 *
 * @param props - Props extending standard div props
 * @param props.index - The slot's index position in the OTP input (required)
 * @param props.className - Additional className for custom styling
 * @param ref - React ref forwarded to the underlying div element
 *
 * @example
 * ```tsx
 * <InputOTPSlot index={0} />
 * ```
 *
 * @returns A styled input slot for a single character
 */
const InputOTPSlot: ForwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { index: number }
> = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
        isActive && 'z-10 ring-2 ring-ring ring-offset-background',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = 'InputOTPSlot'

/**
 * Separator component for OTP input groups.
 *
 * This component provides a visual separator between groups of OTP slots.
 * By default, it displays a dot separator.
 *
 * @param props - Standard div props
 * @param ref - React ref forwarded to the underlying div element
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup>
 *     <InputOTPSlot index={0} />
 *     <InputOTPSlot index={1} />
 *     <InputOTPSlot index={2} />
 *     <InputOTPSeparator />
 *     <InputOTPSlot index={3} />
 *     <InputOTPSlot index={4} />
 *     <InputOTPSlot index={5} />
 *   </InputOTPGroup>
 * </InputOTP>
 * ```
 *
 * @returns A styled separator for OTP input groups
 */
const InputOTPSeparator: ForwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
> = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role='separator' {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
