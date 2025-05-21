'use client'

import * as React from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

/**
 * An interactive component which expands/collapses a panel.
 *
 * The Collapsible root is the main container component that wraps the trigger and content.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     Yes. Free to use for personal and commercial projects. No attribution required.
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 *
 * @example
 * // With controlled state
 * ```tsx
 * const [isOpen, setIsOpen] = React.useState(false)
 *
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const Collapsible: React.FC<CollapsiblePrimitive.CollapsibleProps> = CollapsiblePrimitive.Root

/**
 * The trigger that controls the expand/collapse state of the collapsible content.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Click to expand</CollapsibleTrigger>
 *   <CollapsibleContent>Content</CollapsibleContent>
 * </Collapsible>
 * ```
 *
 * @example
 * // With custom button
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger asChild>
 *     <Button>Toggle</Button>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>Content</CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const CollapsibleTrigger: React.FC<CollapsiblePrimitive.CollapsibleTriggerProps> =
  CollapsiblePrimitive.CollapsibleTrigger

/**
 * The component that contains the collapsible content.
 * This is the element that will be expanded or collapsed.
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     This content will be expanded or collapsed.
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 *
 * @example
 * // With custom styling
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent className="p-4 bg-gray-100 rounded">
 *     Content with custom styling
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
export const CollapsibleContent: React.FC<CollapsiblePrimitive.CollapsibleContentProps> =
  CollapsiblePrimitive.CollapsibleContent
