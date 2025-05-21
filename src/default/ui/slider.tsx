'use client'

/**
 * A module providing slider components for selecting a value or range from a range of values.
 *
 * @see https://ui.shadcn.com/docs/components/slider
 * @module
 */

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * A slider component that allows users to select a value or range of values along a track.
 *
 * This component is built on top of Radix UI's Slider primitive with consistent styling using Tailwind CSS.
 * It supports single values or ranges (multiple thumbs), keyboard navigation, and various customization options.
 *
 * @example
 * ```tsx
 * // Basic usage with single value
 * <Slider defaultValue={[33]} max={100} step={1} />
 *
 * // Example with a range (two thumbs)
 * <Slider defaultValue={[20, 80]} max={100} step={1} />
 *
 * // Example with custom min/max values
 * <Slider defaultValue={[0]} min={-50} max={50} step={10} />
 * ```
 *
 * @param props - The properties to pass to the component
 * @param props.defaultValue - The initial value (or array of values for multiple thumbs)
 * @param props.value - Controlled value (or array of values for multiple thumbs)
 * @param props.min - The minimum value (defaults to 0)
 * @param props.max - The maximum value (defaults to 100)
 * @param props.step - The stepping interval (defaults to 1)
 * @param props.orientation - The orientation of the slider ('horizontal' or 'vertical')
 * @param props.disabled - Whether the slider is disabled
 * @param props.className - Additional CSS class names to apply to the component
 * @param ref - A ref to the underlying DOM element
 * @returns A styled Slider component
 */
const Slider: ForwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
> = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-secondary'>
      <SliderPrimitive.Range className='absolute h-full bg-primary' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
