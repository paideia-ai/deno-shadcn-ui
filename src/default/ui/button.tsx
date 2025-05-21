/**
 * A module providing button components with various styles and behaviors.
 *
 * @see https://ui.shadcn.com/docs/components/button
 * @module
 */

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassProp } from 'class-variance-authority/types'
import { cn } from '@/default/lib/utils.ts'
import { ForwardRef } from '@/typing'

type ButtonVariantFunction = (
  options?: {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
  } & ClassProp,
) => string

/**
 * A utility function that generates class names for button variants.
 *
 * @type {ButtonVariantFunction}
 *
 * @description
 * Utility for creating consistently styled buttons with different variants and sizes.
 * Includes default styling for buttons with icons, automatic gap handling, and various
 * interaction states (hover, focus, disabled).
 *
 * @example
 * ```tsx
 * // Use with a Link component
 * import { Link } from "your-router-library";
 * import { buttonVariants } from "@/components/ui/button";
 *
 * <Link className={buttonVariants({ variant: "outline" })}>
 *   Click here
 * </Link>
 * ```
 */
const buttonVariants: ButtonVariantFunction = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

/**
 * Props for the Button component.
 *
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof buttonVariants>
 *
 * @property {boolean} [asChild] - When true, the button will render its children directly using Radix UI's Slot component,
 * allowing you to compose the button's functionality with other components like Link.
 * @property {('default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link')} [variant] - The visual style variant of the button.
 * @property {('default' | 'sm' | 'lg' | 'icon')} [size] - The size variant of the button.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Button component that displays a clickable button or a component that looks like a button.
 *
 * @type {React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>}
 *
 * @description
 * A versatile button component with support for different variants, sizes, and the ability
 * to render as a different component via the asChild prop.
 *
 * @param {ButtonProps} props - The props for the button component
 * @param {React.Ref<HTMLButtonElement>} ref - Ref forwarded to the button element
 * @returns {JSX.Element} The button component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="default">Click me</Button>
 *
 * // With icon
 * <Button>
 *   <IconComponent />
 *   With Icon
 * </Button>
 *
 * // As a link
 * <Button asChild>
 *   <Link href="/login">Login</Link>
 * </Button>
 *
 * // Variants
 * <Button variant="destructive">Delete</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="ghost">Ghost</Button>
 * <Button variant="link">Link Style</Button>
 *
 * // Sizes
 * <Button size="default">Default Size</Button>
 * <Button size="sm">Small</Button>
 * <Button size="lg">Large</Button>
 * <Button size="icon"><IconComponent /></Button>
 *
 * // Loading state
 * <Button disabled>
 *   <ReloadIcon className="animate-spin" />
 *   Please wait
 * </Button>
 * ```
 */
const Button: ForwardRef<HTMLButtonElement, ButtonProps> = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
