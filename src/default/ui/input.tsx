/**
 * A module providing input components for collecting user input via a text field.
 *
 * @see https://ui.shadcn.com/docs/components/input
 * @module
 */

import * as React from 'react'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * Input component props type
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component
 *
 * Displays a form input field or a component that looks like an input field.
 * The component is built on top of the native HTML input element and supports
 * all its props.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class names
 * @param props.type - The input type (text, email, password, etc.)
 * @param ref - The ref to the underlying input element
 * @returns A styled input element
 *
 * @example
 * // Basic usage
 * <Input />
 *
 * @example
 * // With placeholder
 * <Input placeholder="Enter your name" />
 *
 * @example
 * // With type
 * <Input type="password" />
 *
 * @example
 * // Disabled state
 * <Input disabled />
 *
 * @example
 * // With file input
 * <Input type="file" />
 */
const Input: ForwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>> = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
