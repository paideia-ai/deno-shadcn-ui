/**
 * A module providing TypeScript type definitions used throughout the library.
 * @module
 */

import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

/**
 * A utility type for creating components with forwarded refs.
 * This simplifies the type definition for React components that use forwardRef.
 *
 * @template T - The type of the ref (usually an HTML element)
 * @template P - The type of the props
 *
 * @example
 * ```tsx
 * const MyComponent: ForwardRef<HTMLDivElement, MyComponentProps> =
 *   React.forwardRef(({ className, ...props }, ref) => (
 *     <div ref={ref} className={className} {...props} />
 *   ));
 * ```
 */
// deno-lint-ignore ban-types
export type ForwardRef<T, P = {}> = ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
