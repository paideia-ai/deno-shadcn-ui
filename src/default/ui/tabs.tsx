'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * @typedef {import('@radix-ui/react-tabs').TabsProps} TabsProps
 */

/**
 * Tabs component that provides a set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * @type {React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>}
 * @example
 * ```tsx
 * <Tabs defaultValue="account" className="w-[400px]">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="password">Password</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Make changes to your account here.</TabsContent>
 *   <TabsContent value="password">Change your password here.</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs: React.ForwardRefExoticComponent<
  TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>
> = TabsPrimitive.Root

/**
 * The container for the tab triggers.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & React.RefAttributes<HTMLDivElement>>}
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional CSS class name to apply to the component
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref
 * @returns {React.ReactElement} The rendered TabsList component
 * @example
 * ```tsx
 * <TabsList>
 *   <TabsTrigger value="account">Account</TabsTrigger>
 *   <TabsTrigger value="password">Password</TabsTrigger>
 * </TabsList>
 * ```
 */
const TabsList: ForwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
> = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * The button that activates its associated content.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & React.RefAttributes<HTMLButtonElement>>}
 * @param {object} props - The component props
 * @param {string} props.value - The unique value of the tab trigger
 * @param {React.ReactNode} props.children - The content of the tab trigger
 * @param {string} [props.className] - Optional CSS class name to apply to the component
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref
 * @returns {React.ReactElement} The rendered TabsTrigger component
 * @example
 * ```tsx
 * <TabsTrigger value="account">Account</TabsTrigger>
 * ```
 */
const TabsTrigger: ForwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
> = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * Contains the content associated with each tab trigger.
 *
 * @type {React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & React.RefAttributes<HTMLDivElement>>}
 * @param {object} props - The component props
 * @param {string} props.value - The unique value of the tab content (should match a TabsTrigger value)
 * @param {React.ReactNode} props.children - The content to display when this tab is active
 * @param {string} [props.className] - Optional CSS class name to apply to the component
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref
 * @returns {React.ReactElement} The rendered TabsContent component
 * @example
 * ```tsx
 * <TabsContent value="account">Make changes to your account here.</TabsContent>
 * ```
 */
const TabsContent: ForwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
> = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
