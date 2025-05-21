/**
 * A module providing pagination components for navigating through pages of content.
 *
 * @see https://ui.shadcn.com/docs/components/pagination
 * @module
 */

import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'
import { ButtonProps, buttonVariants } from '@/default/ui/button.tsx'

/**
 * A pagination component that provides navigation between pages.
 *
 * @component
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the component
 * @returns A navigation component for page traversal
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationEllipsis />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
const Pagination: React.FC<React.ComponentProps<'nav'>> = ({ className, ...props }) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

/**
 * The container for pagination items.
 *
 * @component
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the component
 * @param props.children - The content of the pagination container
 * @param ref - The React ref to pass to the underlying element
 * @returns A list container for pagination items
 *
 * @example
 * ```tsx
 * <PaginationContent>
 *   <PaginationItem>
 *     <PaginationLink href="#">1</PaginationLink>
 *   </PaginationItem>
 * </PaginationContent>
 * ```
 */
const PaginationContent: ForwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
> = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

/**
 * An individual item in the pagination component.
 *
 * @component
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the component
 * @param props.children - The content of the pagination item
 * @param ref - The React ref to pass to the underlying element
 * @returns A list item element for pagination
 *
 * @example
 * ```tsx
 * <PaginationItem>
 *   <PaginationLink href="#">1</PaginationLink>
 * </PaginationItem>
 * ```
 */
const PaginationItem: ForwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
> = React.forwardRef(({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />)
PaginationItem.displayName = 'PaginationItem'

/**
 * Properties for the PaginationLink component.
 */
type PaginationLinkProps =
  & {
    /**
     * Indicates if the page link is for the current active page.
     */
    isActive?: boolean
  }
  & Pick<ButtonProps, 'size'>
  & React.ComponentProps<'a'>

/**
 * A link component for pagination, styled like a button.
 *
 * @component
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the component
 * @param props.isActive - Whether this link represents the current page
 * @param props.size - The size of the link button
 * @returns An anchor element styled as a button for page navigation
 *
 * @example
 * ```tsx
 * <PaginationLink href="#" isActive={true}>1</PaginationLink>
 * ```
 */
const PaginationLink: React.FC<PaginationLinkProps> = ({
  className,
  isActive,
  size = 'icon',
  ...props
}) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

/**
 * A specialized link for navigating to the previous page.
 *
 * @component
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the component
 * @returns A link component for navigating to the previous page
 *
 * @example
 * ```tsx
 * <PaginationPrevious href="#" />
 * ```
 */
const PaginationPrevious: React.FC<React.ComponentProps<typeof PaginationLink>> = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className='h-4 w-4' />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

/**
 * A specialized link for navigating to the next page.
 *
 * @component
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the component
 * @returns A link component for navigating to the next page
 *
 * @example
 * ```tsx
 * <PaginationNext href="#" />
 * ```
 */
const PaginationNext: React.FC<React.ComponentProps<typeof PaginationLink>> = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className='h-4 w-4' />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

/**
 * An ellipsis component to indicate skipped pages in pagination.
 *
 * @component
 * @param props - The component props
 * @param props.className - Optional CSS class to apply to the component
 * @returns A span element displaying an ellipsis for pagination
 *
 * @example
 * ```tsx
 * <PaginationEllipsis />
 * ```
 */
const PaginationEllipsis: React.FC<React.ComponentProps<'span'>> = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
