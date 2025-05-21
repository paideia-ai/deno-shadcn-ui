import * as React from 'react'

import { cn } from '@/default/lib/utils.ts'
import type { ForwardRef } from '@/typing'

/**
 * A textarea component for multi-line text input.
 *
 * The Textarea component is a styled HTML textarea element designed for multi-line text input
 * in forms, comments, messages, and other user input scenarios. It includes styling for
 * focus states, disabled states, and placeholder text.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Textarea placeholder="Type your message here." />
 *
 * // Disabled state
 * <Textarea disabled placeholder="This textarea is disabled." />
 *
 * // With a label (using Label component)
 * <div className="grid w-full gap-1.5">
 *   <Label htmlFor="message">Your message</Label>
 *   <Textarea id="message" placeholder="Type your message here." />
 * </div>
 *
 * // With descriptive text
 * <div className="grid w-full gap-1.5">
 *   <Label htmlFor="message-2">Your message</Label>
 *   <Textarea placeholder="Type your message here." id="message-2" />
 *   <p className="text-sm text-muted-foreground">
 *     Your message will be copied to the support team.
 *   </p>
 * </div>
 *
 * // With a button
 * <div className="grid w-full gap-2">
 *   <Textarea placeholder="Type your message here." />
 *   <Button>Send message</Button>
 * </div>
 * ```
 */
const Textarea: ForwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>> = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
