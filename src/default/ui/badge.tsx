import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ClassProp } from 'class-variance-authority/types'

import { cn } from '@/default/lib/utils.ts'

/**
 * Type definition for the badgeVariants function.
 */
type BadgeVariantFunction = (
  options?: {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  } & ClassProp,
) => string

/**
 * A class variance authority configuration for badge variants.
 *
 * Provides styling options for different visual representations of badges.
 *
 * @type {BadgeVariantFunction}
 * @param {Object} options - The options for the badge variant
 * @param {string} [options.variant] - The visual style variant for the badge
 * @returns {string} A string of class names
 *
 * @example
 * ```tsx
 * // Use with a Link component
 * <Link className={badgeVariants({ variant: "outline" })}>Badge</Link>
 * ```
 */
const badgeVariants: BadgeVariantFunction = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/**
 * Props for the Badge component.
 *
 * @interface BadgeProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @extends VariantProps<typeof badgeVariants>
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

/**
 * A badge component used to display a small piece of information.
 *
 * Badges can be used to highlight status, display counts, or emphasize small pieces of information.
 * Available in multiple variants: default, secondary, destructive, and outline.
 *
 * @param {BadgeProps} props - The props for the Badge component
 * @param {string} [props.className] - Additional CSS class names
 * @param {string} [props.variant] - The visual style variant for the badge (default, secondary, destructive, outline)
 * @returns {React.ReactElement} A div element styled as a badge
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>New</Badge>
 *
 * // With a variant
 * <Badge variant="outline">Badge</Badge>
 *
 * // With a destructive variant
 * <Badge variant="destructive">Error</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps): React.ReactElement {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
