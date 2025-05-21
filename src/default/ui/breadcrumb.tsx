/**
 * A module providing breadcrumb components for navigation and hierarchy display.
 *
 * @see https://ui.shadcn.com/docs/components/breadcrumb
 * @module
 */

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'
import { ForwardRef } from '@/typing'

/**
 * Breadcrumb component props type
 */
export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * Optional custom separator element to use between breadcrumb items
   */
  separator?: React.ReactNode
}

/**
 * Breadcrumb component that displays the path to the current resource using a hierarchy of links.
 *
 * @param props - The component props
 * @param ref - The ref to the HTML element
 * @returns The Breadcrumb component
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/components">Components</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const Breadcrumb: ForwardRef<HTMLElement, BreadcrumbProps> = React.forwardRef(({ ...props }, ref) => (
  <nav ref={ref} aria-label='breadcrumb' {...props} />
))
Breadcrumb.displayName = 'Breadcrumb'

/**
 * BreadcrumbList component props type
 */
export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<'ol'> {}

/**
 * BreadcrumbList component that contains all breadcrumb items in an ordered list.
 *
 * @param props - The component props
 * @param ref - The ref to the HTML element
 * @returns The BreadcrumbList component
 * @example
 * ```tsx
 * <BreadcrumbList>
 *   <BreadcrumbItem>
 *     <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbPage>Current Page</BreadcrumbPage>
 *   </BreadcrumbItem>
 * </BreadcrumbList>
 * ```
 */
const BreadcrumbList: ForwardRef<HTMLOListElement, BreadcrumbListProps> = React.forwardRef((
  { className, ...props },
  ref,
) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      className,
    )}
    {...props}
  />
))
BreadcrumbList.displayName = 'BreadcrumbList'

/**
 * BreadcrumbItem component props type
 */
export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'li'> {}

/**
 * BreadcrumbItem component that wraps each item in the breadcrumb.
 * Can contain a BreadcrumbLink, BreadcrumbPage, or other components like DropdownMenu.
 *
 * @param props - The component props
 * @param ref - The ref to the HTML element
 * @returns The BreadcrumbItem component
 * @example
 * ```tsx
 * <BreadcrumbItem>
 *   <BreadcrumbLink href="/">Home</BreadcrumbLink>
 * </BreadcrumbItem>
 * ```
 */
const BreadcrumbItem: ForwardRef<HTMLLIElement, BreadcrumbItemProps> = React.forwardRef((
  { className, ...props },
  ref,
) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
))
BreadcrumbItem.displayName = 'BreadcrumbItem'

/**
 * BreadcrumbLink component props type
 */
export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /**
   * When true, the component will not render an anchor tag
   * but will instead wrap its children with the functionality needed
   * Use this when you want to use your routing library's Link component
   */
  asChild?: boolean
}

/**
 * BreadcrumbLink component that renders a link in the breadcrumb.
 * Can be used with your routing library's Link component using the asChild prop.
 *
 * @param props - The component props
 * @param props.asChild - When true, renders the child component with added functionality instead of an anchor tag
 * @param props.className - Additional CSS classes to apply to the component
 * @param ref - The ref to the HTML element
 * @returns The BreadcrumbLink component
 * @example
 * ```tsx
 * // Regular usage
 * <BreadcrumbLink href="/home">Home</BreadcrumbLink>
 *
 * // With routing library (e.g., Next.js)
 * <BreadcrumbLink asChild>
 *   <Link href="/">Home</Link>
 * </BreadcrumbLink>
 * ```
 */
const BreadcrumbLink: ForwardRef<HTMLAnchorElement, BreadcrumbLinkProps> = React.forwardRef(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
        ref={ref}
        className={cn('transition-colors hover:text-foreground', className)}
        {...props}
      />
    )
  },
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

/**
 * BreadcrumbPage component props type
 */
export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<'span'> {}

/**
 * BreadcrumbPage component that represents the current page in the breadcrumb.
 * This should be used for the last item in the breadcrumb to indicate the current page.
 *
 * @param props - The component props
 * @param ref - The ref to the HTML element
 * @returns The BreadcrumbPage component
 * @example
 * ```tsx
 * <BreadcrumbPage>Current Page</BreadcrumbPage>
 * ```
 */
const BreadcrumbPage: ForwardRef<HTMLSpanElement, BreadcrumbPageProps> = React.forwardRef((
  { className, ...props },
  ref,
) => (
  <span
    ref={ref}
    role='link'
    aria-disabled='true'
    aria-current='page'
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

/**
 * BreadcrumbSeparator component props type
 */
export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<'li'> {
  /**
   * Optional custom separator content. Defaults to ChevronRight icon
   */
  children?: React.ReactNode
}

/**
 * BreadcrumbSeparator component that provides a visual separator between breadcrumb items.
 * Uses ChevronRight as the default separator, but can be customized with children.
 *
 * @param props - The component props
 * @param props.children - Optional custom separator content
 * @param props.className - Additional CSS classes to apply to the component
 * @returns The BreadcrumbSeparator component
 * @example
 * ```tsx
 * // Default separator
 * <BreadcrumbSeparator />
 *
 * // Custom separator
 * <BreadcrumbSeparator>
 *   <Slash />
 * </BreadcrumbSeparator>
 * ```
 */
const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  className,
  ...props
}) => (
  <li
    role='presentation'
    aria-hidden='true'
    className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

/**
 * BreadcrumbEllipsis component props type
 */
export interface BreadcrumbEllipsisProps extends React.ComponentPropsWithoutRef<'span'> {}

/**
 * BreadcrumbEllipsis component that shows a collapsed state when the breadcrumb is too long.
 * Used to indicate that there are more items that aren't being displayed.
 *
 * @param props - The component props
 * @returns The BreadcrumbEllipsis component
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbEllipsis />
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
const BreadcrumbEllipsis: React.FC<BreadcrumbEllipsisProps> = ({
  className,
  ...props
}) => (
  <span
    role='presentation'
    aria-hidden='true'
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More</span>
  </span>
)
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis'

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
