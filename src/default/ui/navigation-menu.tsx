import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import type { ForwardRef } from '@/typing'

import { cn } from '@/default/lib/utils.ts'

/**
 * The root component of the navigation menu.
 *
 * This component renders a navigation menu container that holds navigation items and controls.
 * It automatically includes the NavigationMenuViewport component.
 *
 * @param {Object} props - The properties for the navigation menu
 * @param {string} [props.className] - Additional CSS class names
 * @param {React.ReactNode} props.children - The content of the navigation menu
 * @param {React.Ref<HTMLDivElement>} ref - Reference to the underlying DOM element
 * @returns {React.ReactElement} A styled navigation menu component
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <NavigationMenuLink>Link</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
const NavigationMenu: ForwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
> = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

/**
 * The list container for navigation menu items.
 *
 * This component renders a container for holding NavigationMenuItem components
 * in a horizontal layout.
 *
 * @param {Object} props - The properties for the navigation menu list
 * @param {string} [props.className] - Additional CSS class names
 * @param {React.ReactNode} props.children - The navigation menu items
 * @param {React.Ref<HTMLUListElement>} ref - Reference to the underlying DOM element
 * @returns {React.ReactElement} A styled list container for navigation items
 *
 * @example
 * ```tsx
 * <NavigationMenuList>
 *   <NavigationMenuItem>
 *     <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 *     <NavigationMenuContent>
 *       <NavigationMenuLink>Link</NavigationMenuLink>
 *     </NavigationMenuContent>
 *   </NavigationMenuItem>
 * </NavigationMenuList>
 * ```
 */
const NavigationMenuList: ForwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
> = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none items-center justify-center space-x-1',
      className,
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

/**
 * An individual item in the navigation menu.
 *
 * This component represents a single navigation item that can contain a trigger and content.
 *
 * @type {React.FC<React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>>}
 *
 * @example
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 *   <NavigationMenuContent>
 *     <NavigationMenuLink>Link</NavigationMenuLink>
 *   </NavigationMenuContent>
 * </NavigationMenuItem>
 * ```
 */
const NavigationMenuItem: React.FC<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
> = NavigationMenuPrimitive.Item

/**
 * A function that returns the CSS class for the navigation menu trigger.
 *
 * This function is useful when applying the navigation menu trigger styles
 * to custom components, such as a Next.js Link component.
 *
 * @returns {string} A class name string for styling navigation menu triggers
 *
 * @example
 * ```tsx
 * // With Next.js Link component
 * <NavigationMenuItem>
 *   <Link href="/docs" legacyBehavior passHref>
 *     <NavigationMenuLink className={navigationMenuTriggerStyle()}>
 *       Documentation
 *     </NavigationMenuLink>
 *   </Link>
 * </NavigationMenuItem>
 * ```
 */
const navigationMenuTriggerStyle: () => string = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent',
)

/**
 * The trigger component for a navigation menu item.
 *
 * This component renders a button that when clicked, displays the associated
 * NavigationMenuContent. It includes a chevron indicator that rotates when the menu is open.
 *
 * @param {Object} props - The properties for the navigation menu trigger
 * @param {string} [props.className] - Additional CSS class names
 * @param {React.ReactNode} props.children - The label for the trigger
 * @param {React.Ref<HTMLButtonElement>} ref - Reference to the underlying DOM element
 * @returns {React.ReactElement} A styled trigger button for navigation content
 *
 * @example
 * ```tsx
 * <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 * ```
 */
const NavigationMenuTrigger: ForwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
> = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className='relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180'
      aria-hidden='true'
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

/**
 * The content component that appears when a navigation menu trigger is activated.
 *
 * This component renders a panel containing links or other content
 * that is displayed when the associated NavigationMenuTrigger is clicked.
 * It includes animations for entering and exiting.
 *
 * @param {Object} props - The properties for the navigation menu content
 * @param {string} [props.className] - Additional CSS class names
 * @param {React.ReactNode} props.children - The content to display
 * @param {React.Ref<HTMLDivElement>} ref - Reference to the underlying DOM element
 * @returns {React.ReactElement} A styled content panel for navigation items
 *
 * @example
 * ```tsx
 * <NavigationMenuContent>
 *   <NavigationMenuLink>Link</NavigationMenuLink>
 * </NavigationMenuContent>
 * ```
 */
const NavigationMenuContent: ForwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
> = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ',
      className,
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

/**
 * A link component for use within navigation menus.
 *
 * This component renders a link that can be used in navigation menus, and can be styled
 * with the navigationMenuTriggerStyle function.
 *
 * @type {React.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>>}
 *
 * @example
 * ```tsx
 * <NavigationMenuLink>Simple link</NavigationMenuLink>
 *
 * // With styling
 * <NavigationMenuLink className={navigationMenuTriggerStyle()}>
 *   Styled link
 * </NavigationMenuLink>
 *
 * // With Next.js Link
 * <Link href="/docs" legacyBehavior passHref>
 *   <NavigationMenuLink className={navigationMenuTriggerStyle()}>
 *     Documentation
 *   </NavigationMenuLink>
 * </Link>
 * ```
 */
const NavigationMenuLink: React.ForwardRefExoticComponent<
  & NavigationMenuPrimitive.NavigationMenuLinkProps
  & React.RefAttributes<HTMLAnchorElement>
> = NavigationMenuPrimitive.Link

/**
 * The viewport component for displaying navigation menu content.
 *
 * This component provides a container where the navigation menu content panels
 * appear when triggered. It handles the animation and positioning of content panels.
 * It is automatically included in the NavigationMenu component.
 *
 * @param {Object} props - The properties for the navigation menu viewport
 * @param {string} [props.className] - Additional CSS class names
 * @param {React.ReactNode} props.children - The content to display in the viewport
 * @param {React.Ref<HTMLDivElement>} ref - Reference to the underlying DOM element
 * @returns {React.ReactElement} A styled viewport for displaying navigation content
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   {/* The NavigationMenuViewport is automatically included *\/}
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <NavigationMenuLink>Link</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
const NavigationMenuViewport: ForwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
> = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn('absolute left-0 top-full flex justify-center')}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

/**
 * An indicator component that highlights the active item in the navigation menu.
 *
 * This component renders a visual indicator (typically a small arrow) that points
 * to the currently active navigation menu item.
 *
 * @param {Object} props - The properties for the navigation menu indicator
 * @param {string} [props.className] - Additional CSS class names
 * @param {React.ReactNode} props.children - Optional custom indicator content
 * @param {React.Ref<HTMLDivElement>} ref - Reference to the underlying DOM element
 * @returns {React.ReactElement} A styled indicator for the active navigation item
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <NavigationMenuLink>Link</NavigationMenuLink>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 *   <NavigationMenuIndicator />
 * </NavigationMenu>
 * ```
 */
const NavigationMenuIndicator: ForwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
> = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
      className,
    )}
    {...props}
  >
    <div className='relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md' />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
}
