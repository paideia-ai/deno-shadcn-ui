'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * CSS class variants for the Label component.
 *
 * @type {Function}
 */
const labelVariants: ReturnType<typeof cva> = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

/**
 * An accessible label component that associates text with a form control.
 *
 * This component is built on top of Radix UI's Label primitive and provides
 * consistent styling with the ability to be customized through className prop.
 *
 * @component
 * @param {object} props - The properties for the Label component
 * @param {string} [props.className] - Additional CSS classes to apply to the component
 * @param {string} [props.htmlFor] - The ID of the form control to associate with
 * @param {React.ReactNode} props.children - The label content
 * @param {React.Ref<HTMLLabelElement>} ref - Forwarded ref to the label element
 *
 * @returns {JSX.Element} The rendered Label component
 *
 * @example
 * // Basic usage with a form control
 * <Label htmlFor="email">Your email address</Label>
 * <Input id="email" type="email" />
 *
 * @example
 * // With custom styling
 * <Label htmlFor="name" className="text-primary">Full Name</Label>
 */
const Label: ForwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  & React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
  & VariantProps<typeof labelVariants>
> = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label, labelVariants }
