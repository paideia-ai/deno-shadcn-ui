'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * Progress component interface
 */
export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /**
   * The current progress value between 0 and 100
   */
  value?: number
}

/**
 * Progress component
 *
 * Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
 *
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the component
 * @param props.value - The current progress value between 0 and 100
 * @param props.props - Additional props to pass to the underlying element
 * @param ref - React ref forwarded to the underlying element
 * @returns A Progress component
 *
 * @example
 * ```tsx
 * <Progress value={33} />
 * ```
 */
const Progress: ForwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
> = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className='h-full w-full flex-1 bg-primary transition-all'
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
