/**
 * A module containing utility functions for class name handling and other common tasks.
 * @module
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function that combines class names using clsx and tailwind-merge.
 * This is used to merge Tailwind CSS classes safely, handling conflicts appropriately.
 *
 * @param {...ClassValue[]} inputs - The class names to be merged
 * @returns {string} The merged class name string
 *
 * @example
 * ```tsx
 * <div className={cn(
 *   "base-class",
 *   isActive && "active-class",
 *   className
 * )}>
 *   Content
 * </div>
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
