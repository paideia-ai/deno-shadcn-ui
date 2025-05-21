import * as React from 'react'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * A responsive table component that serves as the root container for tabular data.
 *
 * @component
 * @param props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the table
 * @param {React.Ref<HTMLTableElement>} ref - React ref forwarded to the table element
 * @returns {React.ReactElement} A styled table wrapped in a responsive container
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>A list of your recent invoices.</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Invoice</TableHead>
 *       <TableHead>Status</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>INV001</TableCell>
 *       <TableCell>Paid</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table: ForwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div className='relative w-full overflow-auto'>
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

/**
 * A component for the table header section that contains header rows.
 *
 * @component
 * @param props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the header
 * @param {React.Ref<HTMLTableSectionElement>} ref - React ref forwarded to the thead element
 * @returns {React.ReactElement} A styled table header section
 *
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Invoice</TableHead>
 *     <TableHead>Status</TableHead>
 *   </TableRow>
 * </TableHeader>
 * ```
 */
const TableHeader: ForwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

/**
 * A component for the table body section that contains data rows.
 *
 * @component
 * @param props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the body
 * @param {React.Ref<HTMLTableSectionElement>} ref - React ref forwarded to the tbody element
 * @returns {React.ReactElement} A styled table body section
 *
 * @example
 * ```tsx
 * <TableBody>
 *   <TableRow>
 *     <TableCell>INV001</TableCell>
 *     <TableCell>Paid</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 */
const TableBody: ForwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

/**
 * A component for the table footer section that typically contains summary information.
 *
 * @component
 * @param props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the footer
 * @param {React.Ref<HTMLTableSectionElement>} ref - React ref forwarded to the tfoot element
 * @returns {React.ReactElement} A styled table footer section
 *
 * @example
 * ```tsx
 * <TableFooter>
 *   <TableRow>
 *     <TableCell colSpan={3}>Total</TableCell>
 *     <TableCell>$250.00</TableCell>
 *   </TableRow>
 * </TableFooter>
 * ```
 */
const TableFooter: ForwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className,
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

/**
 * A component for table rows that contain table cells.
 *
 * @component
 * @param props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the row
 * @param {React.Ref<HTMLTableRowElement>} ref - React ref forwarded to the tr element
 * @returns {React.ReactElement} A styled table row
 *
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>INV001</TableCell>
 *   <TableCell>Paid</TableCell>
 * </TableRow>
 * ```
 */
const TableRow: ForwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className,
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

/**
 * A component for table header cells that typically contain column titles.
 *
 * @component
 * @param props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the header cell
 * @param {React.Ref<HTMLTableCellElement>} ref - React ref forwarded to the th element
 * @returns {React.ReactElement} A styled table header cell
 *
 * @example
 * ```tsx
 * <TableHead className="w-[100px]">Invoice</TableHead>
 * ```
 */
const TableHead: ForwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className,
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

/**
 * A component for standard table data cells that contain content.
 *
 * @component
 * @param props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the data cell
 * @param {React.Ref<HTMLTableCellElement>} ref - React ref forwarded to the td element
 * @returns {React.ReactElement} A styled table data cell
 *
 * @example
 * ```tsx
 * <TableCell className="font-medium">INV001</TableCell>
 * ```
 */
const TableCell: ForwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

/**
 * A component for table captions that provide a title or explanation for the table.
 *
 * @component
 * @param props - The component props
 * @param {string} [props.className] - Additional CSS class names to apply to the caption
 * @param {React.Ref<HTMLTableCaptionElement>} ref - React ref forwarded to the caption element
 * @returns {React.ReactElement} A styled table caption
 *
 * @example
 * ```tsx
 * <TableCaption>A list of your recent invoices.</TableCaption>
 * ```
 */
const TableCaption: ForwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
> = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
