import * as React from 'react'
import { cn } from '@/default/lib/utils.ts'

/**
 * Skeleton component for displaying loading states
 *
 * The Skeleton component is used to show a visual placeholder while content is loading.
 * It renders a div with a pulsing animation that can be styled with custom dimensions,
 * border radius, and other properties through the className prop.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Skeleton className="w-[100px] h-[20px] rounded-full" />
 *
 * // Card loading state example
 * <div className="flex flex-col space-y-3">
 *   <Skeleton className="h-[125px] w-[250px] rounded-xl" />
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-[250px]" />
 *     <Skeleton className="h-4 w-[200px]" />
 *   </div>
 * </div>
 * ```
 *
 * @param props - The component props
 * @param props.className - Optional CSS class to apply additional styles
 * @param props.children - Optional children elements
 * @returns A div element with animation styling to represent loading content
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
