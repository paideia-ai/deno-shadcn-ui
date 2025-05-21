'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { PanelLeft } from 'lucide-react'
import type { ForwardRef } from '@/typing'

import { useIsMobile } from '@/default/hooks/use-mobile.tsx'
import { cn } from '@/default/lib/utils.ts'
import { Button } from '@/default/ui/button.tsx'
import { Input } from '@/default/ui/input.tsx'
import { Separator } from '@/default/ui/separator.tsx'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/default/ui/sheet.tsx'
import { Skeleton } from '@/default/ui/skeleton.tsx'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/default/ui/tooltip.tsx'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '16rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

/**
 * Context props interface for the sidebar
 */
type SidebarContextProps = {
  /** Current state of the sidebar: 'expanded' or 'collapsed' */
  state: 'expanded' | 'collapsed'
  /** Whether the sidebar is open on desktop */
  open: boolean
  /** Function to set the open state on desktop */
  setOpen: (open: boolean) => void
  /** Whether the sidebar is open on mobile */
  openMobile: boolean
  /** Function to set the open state on mobile */
  setOpenMobile: (open: boolean) => void
  /** Whether the current device is mobile */
  isMobile: boolean
  /** Function to toggle the sidebar state (mobile or desktop) */
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

/**
 * Hook to access the sidebar context
 *
 * @returns The sidebar context containing state and control functions
 * @throws Error if used outside of a SidebarProvider
 *
 * @example
 * ```tsx
 * const { toggleSidebar, open, setOpen } = useSidebar()
 *
 * return <button onClick={toggleSidebar}>Toggle Sidebar</button>
 * ```
 */
function useSidebar(): SidebarContextProps {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

/**
 * Props for the SidebarProvider component
 */
interface SidebarProviderProps extends React.ComponentProps<'div'> {
  /** Default open state of the sidebar */
  defaultOpen?: boolean
  /** Controlled open state of the sidebar */
  open?: boolean
  /** Callback for when the open state changes */
  onOpenChange?: (open: boolean) => void
}

/**
 * Provider component that manages sidebar state and provides context to child components
 *
 * Handles open/closed state, mobile detection, keyboard shortcut, and state persistence via cookies.
 *
 * @param props - Component props including defaultOpen, open (controlled), onOpenChange
 *
 * @example
 * ```tsx
 * <SidebarProvider defaultOpen={true}>
 *   <Sidebar>
 *     <SidebarContent>
 *       <SidebarGroup>
 *         <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 *         <SidebarMenu>
 *           <SidebarMenuItem>
 *             <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *           </SidebarMenuItem>
 *         </SidebarMenu>
 *       </SidebarGroup>
 *     </SidebarContent>
 *   </Sidebar>
 *   <main>
 *     <SidebarTrigger />
 *     {children}
 *   </main>
 * </SidebarProvider>
 * ```
 */
const SidebarProvider: ForwardRef<HTMLDivElement, SidebarProviderProps> = React.forwardRef(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open],
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      globalThis.addEventListener('keydown', handleKeyDown)
      return () => globalThis.removeEventListener('keydown', handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? 'expanded' : 'collapsed'

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={{
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties}
            className={cn(
              'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  },
)
SidebarProvider.displayName = 'SidebarProvider'

/**
 * Props for the Sidebar component
 */
interface SidebarProps extends React.ComponentProps<'div'> {
  /** The side of the sidebar */
  side?: 'left' | 'right'
  /** The variant of the sidebar */
  variant?: 'sidebar' | 'floating' | 'inset'
  /** The collapsible behavior of the sidebar */
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

/**
 * Main sidebar component that provides the visual container and layout
 *
 * Renders different layouts based on mobile detection and collapsible mode
 *
 * @param props - Component props including side, variant, collapsible options
 *
 * @example
 * ```tsx
 * <Sidebar side="left" variant="floating" collapsible="icon">
 *   <SidebarHeader>Header Content</SidebarHeader>
 *   <SidebarContent>Main Content</SidebarContent>
 *   <SidebarFooter>Footer Content</SidebarFooter>
 * </Sidebar>
 * ```
 */
const Sidebar: ForwardRef<HTMLDivElement, SidebarProps> = React.forwardRef(
  (
    {
      side = 'left',
      variant = 'sidebar',
      collapsible = 'offcanvas',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === 'none') {
      return (
        <div
          className={cn(
            'flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground',
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar='sidebar'
            data-mobile='true'
            className='w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden'
            style={{
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties}
            side={side}
          >
            <SheetHeader className='sr-only'>
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className='flex h-full w-full flex-col'>{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className='group peer hidden text-sidebar-foreground md:block'
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            'relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
            'group-data-[collapsible=offcanvas]:w-0',
            'group-data-[side=right]:rotate-180',
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
              : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
          )}
        />
        <div
          className={cn(
            'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex',
            side === 'left'
              ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
              : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
            // Adjust the padding for floating and inset variants.
            variant === 'floating' || variant === 'inset'
              ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
              : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className,
          )}
          {...props}
        >
          <div
            data-sidebar='sidebar'
            className='flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow'
          >
            {children}
          </div>
        </div>
      </div>
    )
  },
)
Sidebar.displayName = 'Sidebar'

/**
 * Props for the SidebarTrigger component
 */
interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {}

/**
 * Button that toggles the sidebar open/closed state
 *
 * Uses the useSidebar hook to access the toggle function
 *
 * @param props - Component props extending Button props
 *
 * @example
 * ```tsx
 * <SidebarTrigger className="my-custom-class" />
 * ```
 */
const SidebarTrigger: ForwardRef<React.ElementRef<typeof Button>, SidebarTriggerProps> = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
      <Button
        ref={ref}
        data-sidebar='trigger'
        variant='ghost'
        size='icon'
        className={cn('h-7 w-7', className)}
        onClick={(event) => {
          onClick?.(event)
          toggleSidebar()
        }}
        {...props}
      >
        <PanelLeft />
        <span className='sr-only'>Toggle Sidebar</span>
      </Button>
    )
  },
)
SidebarTrigger.displayName = 'SidebarTrigger'

/**
 * Props for the SidebarRail component
 */
interface SidebarRailProps extends React.ComponentProps<'button'> {}

/**
 * Interactive sidebar rail component that allows resizing/toggling via drag
 *
 * Positioned at the edge of the sidebar to allow users to toggle it
 *
 * @param props - Component props for the button element
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarContent>{children}</SidebarContent>
 *   <SidebarRail />
 * </Sidebar>
 * ```
 */
const SidebarRail: ForwardRef<HTMLButtonElement, SidebarRailProps> = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
      <button
        ref={ref}
        data-sidebar='rail'
        aria-label='Toggle Sidebar'
        tabIndex={-1}
        onClick={toggleSidebar}
        title='Toggle Sidebar'
        className={cn(
          'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
          '[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize',
          '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
          'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar',
          '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
          '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarRail.displayName = 'SidebarRail'

/**
 * Props for the SidebarInset component
 */
interface SidebarInsetProps extends React.ComponentProps<'main'> {}

/**
 * Main content container to be used with the inset sidebar variant
 *
 * Provides proper spacing and styling when using the inset sidebar variant
 *
 * @param props - Component props for the main element
 *
 * @example
 * ```tsx
 * <SidebarProvider>
 *   <Sidebar variant="inset" />
 *   <SidebarInset>
 *     <main>{children}</main>
 *   </SidebarInset>
 * </SidebarProvider>
 * ```
 */
const SidebarInset: ForwardRef<HTMLDivElement, SidebarInsetProps> = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          'relative flex w-full flex-1 flex-col bg-background',
          'md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarInset.displayName = 'SidebarInset'

/**
 * Props for the SidebarInput component
 */
interface SidebarInputProps extends React.ComponentProps<typeof Input> {}

/**
 * Styled input component for use within a sidebar
 *
 * Provides appropriate styling for search inputs in the sidebar
 *
 * @param props - Component props extending Input props
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <SidebarInput placeholder="Search..." />
 * </SidebarHeader>
 * ```
 */
const SidebarInput: ForwardRef<React.ElementRef<typeof Input>, SidebarInputProps> = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-sidebar='input'
        className={cn(
          'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarInput.displayName = 'SidebarInput'

/**
 * Props for the SidebarHeader component
 */
interface SidebarHeaderProps extends React.ComponentProps<'div'> {}

/**
 * Header component for the sidebar that remains fixed at the top
 *
 * Typically contains logo, search input, or workspace selection controls
 *
 * @param props - Component props for the div element
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <SidebarInput placeholder="Search..." />
 * </SidebarHeader>
 * ```
 */
const SidebarHeader: ForwardRef<HTMLDivElement, SidebarHeaderProps> = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar='header'
        className={cn('flex flex-col gap-2 p-2', className)}
        {...props}
      />
    )
  },
)
SidebarHeader.displayName = 'SidebarHeader'

/**
 * Props for the SidebarFooter component
 */
interface SidebarFooterProps extends React.ComponentProps<'div'> {}

/**
 * Footer component for the sidebar that remains fixed at the bottom
 *
 * Typically contains user info, logout, or settings options
 *
 * @param props - Component props for the div element
 *
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <SidebarMenu>
 *     <SidebarMenuItem>
 *       <SidebarMenuButton>Settings</SidebarMenuButton>
 *     </SidebarMenuItem>
 *   </SidebarMenu>
 * </SidebarFooter>
 * ```
 */
const SidebarFooter: ForwardRef<HTMLDivElement, SidebarFooterProps> = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar='footer'
        className={cn('flex flex-col gap-2 p-2', className)}
        {...props}
      />
    )
  },
)
SidebarFooter.displayName = 'SidebarFooter'

/**
 * Props for the SidebarSeparator component
 */
interface SidebarSeparatorProps extends React.ComponentProps<typeof Separator> {}

/**
 * Horizontal separator component for visually dividing sidebar sections
 *
 * @param props - Component props extending Separator props
 *
 * @example
 * ```tsx
 * <SidebarHeader />
 * <SidebarSeparator />
 * <SidebarContent />
 * ```
 */
const SidebarSeparator: ForwardRef<React.ElementRef<typeof Separator>, SidebarSeparatorProps> = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        data-sidebar='separator'
        className={cn('mx-2 w-auto bg-sidebar-border', className)}
        {...props}
      />
    )
  },
)
SidebarSeparator.displayName = 'SidebarSeparator'

/**
 * Props for the SidebarContent component
 */
interface SidebarContentProps extends React.ComponentProps<'div'> {}

/**
 * Scrollable content container for the sidebar
 *
 * Contains the main navigation elements, typically organized in SidebarGroups
 *
 * @param props - Component props for the div element
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarGroup>
 *     <SidebarGroupLabel>Navigation</SidebarGroupLabel>
 *     <SidebarGroupContent>
 *       <SidebarMenu>{menuItems}</SidebarMenu>
 *     </SidebarGroupContent>
 *   </SidebarGroup>
 * </SidebarContent>
 * ```
 */
const SidebarContent: ForwardRef<HTMLDivElement, SidebarContentProps> = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar='content'
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarContent.displayName = 'SidebarContent'

/**
 * Props for the SidebarGroup component
 */
interface SidebarGroupProps extends React.ComponentProps<'div'> {}

/**
 * Container for grouping related sidebar items with a label
 *
 * Typically contains a SidebarGroupLabel, optional SidebarGroupAction, and SidebarGroupContent
 *
 * @param props - Component props for the div element
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Projects</SidebarGroupLabel>
 *   <SidebarGroupAction>
 *     <PlusIcon />
 *   </SidebarGroupAction>
 *   <SidebarGroupContent>
 *     <SidebarMenu>{projectItems}</SidebarMenu>
 *   </SidebarGroupContent>
 * </SidebarGroup>
 * ```
 */
const SidebarGroup: ForwardRef<HTMLDivElement, SidebarGroupProps> = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar='group'
        className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
        {...props}
      />
    )
  },
)
SidebarGroup.displayName = 'SidebarGroup'

/**
 * Props for the SidebarGroupLabel component
 */
interface SidebarGroupLabelProps extends React.ComponentProps<'div'> {
  /** Whether to use a slot to render children */
  asChild?: boolean
}

/**
 * Label component for a sidebar group
 *
 * Can be used with asChild to wrap interactive elements like Collapsible triggers
 *
 * @param props - Component props including asChild option
 *
 * @example
 * ```tsx
 * <SidebarGroupLabel>Projects</SidebarGroupLabel>
 *
 * // With asChild for collapsible groups
 * <SidebarGroupLabel asChild>
 *   <CollapsibleTrigger>
 *     Projects
 *     <ChevronDownIcon className="ml-auto" />
 *   </CollapsibleTrigger>
 * </SidebarGroupLabel>
 * ```
 */
const SidebarGroupLabel: ForwardRef<HTMLDivElement, SidebarGroupLabelProps> = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        data-sidebar='group-label'
        className={cn(
          'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

/**
 * Props for the SidebarGroupAction component
 */
interface SidebarGroupActionProps extends React.ComponentProps<'button'> {
  /** Whether to use a slot to render children */
  asChild?: boolean
}

/**
 * Action button component displayed in the right corner of a sidebar group
 *
 * Typically used for adding new items to the group or other actions
 *
 * @param props - Component props including asChild option
 *
 * @example
 * ```tsx
 * <SidebarGroupAction>
 *   <PlusIcon />
 *   <span className="sr-only">Add new project</span>
 * </SidebarGroupAction>
 * ```
 */
const SidebarGroupAction: ForwardRef<HTMLButtonElement, SidebarGroupActionProps> = React.forwardRef(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        data-sidebar='group-action'
        className={cn(
          'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          // Increases the hit area of the button on mobile.
          'after:absolute after:-inset-2 after:md:hidden',
          'group-data-[collapsible=icon]:hidden',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarGroupAction.displayName = 'SidebarGroupAction'

/**
 * Props for the SidebarGroupContent component
 */
interface SidebarGroupContentProps extends React.ComponentProps<'div'> {}

/**
 * Container for the content of a sidebar group
 *
 * Typically contains a SidebarMenu or other sidebar components
 *
 * @param props - Component props for the div element
 *
 * @example
 * ```tsx
 * <SidebarGroupContent>
 *   <SidebarMenu>{menuItems}</SidebarMenu>
 * </SidebarGroupContent>
 * ```
 */
const SidebarGroupContent: ForwardRef<HTMLDivElement, SidebarGroupContentProps> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar='group-content'
      className={cn('w-full text-sm', className)}
      {...props}
    />
  ),
)
SidebarGroupContent.displayName = 'SidebarGroupContent'

/**
 * Props for the SidebarMenu component
 */
interface SidebarMenuProps extends React.ComponentProps<'ul'> {}

/**
 * Menu container component for the sidebar
 *
 * Contains SidebarMenuItem components for navigation items
 *
 * @param props - Component props for the ul element
 *
 * @example
 * ```tsx
 * <SidebarMenu>
 *   <SidebarMenuItem>
 *     <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *   </SidebarMenuItem>
 *   <SidebarMenuItem>
 *     <SidebarMenuButton>Settings</SidebarMenuButton>
 *   </SidebarMenuItem>
 * </SidebarMenu>
 * ```
 */
const SidebarMenu: ForwardRef<HTMLUListElement, SidebarMenuProps> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  ),
)
SidebarMenu.displayName = 'SidebarMenu'

/**
 * Props for the SidebarMenuItem component
 */
interface SidebarMenuItemProps extends React.ComponentProps<'li'> {}

/**
 * List item component for sidebar menu items
 *
 * Typically contains a SidebarMenuButton and optional SidebarMenuAction
 *
 * @param props - Component props for the li element
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *   <SidebarMenuAction>
 *     <MoreIcon />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
 */
const SidebarMenuItem: ForwardRef<HTMLLIElement, SidebarMenuItemProps> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar='menu-item'
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  ),
)
SidebarMenuItem.displayName = 'SidebarMenuItem'

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

/**
 * Props for the SidebarMenuButton component
 */
interface SidebarMenuButtonProps extends React.ComponentProps<'button'> {
  /** Whether to use a slot to render children */
  asChild?: boolean
  /** Whether the button is in active state */
  isActive?: boolean
  /** Tooltip content to show when sidebar is collapsed */
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
  /** Visual variant of the button */
  variant?: 'default' | 'outline'
  /** Size variant of the button */
  size?: 'default' | 'sm' | 'lg'
}

/**
 * Button component for sidebar menu items
 *
 * Supports active state, tooltips, and different variants
 *
 * @param props - Component props including asChild, isActive, tooltip, variant, and size
 *
 * @example
 * ```tsx
 * // Simple button
 * <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *
 * // As a link with icon
 * <SidebarMenuButton asChild isActive tooltip="Dashboard">
 *   <a href="/dashboard">
 *     <DashboardIcon />
 *     <span>Dashboard</span>
 *   </a>
 * </SidebarMenuButton>
 * ```
 */
const SidebarMenuButton: ForwardRef<HTMLButtonElement, SidebarMenuButtonProps> = React.forwardRef(
  (
    {
      asChild = false,
      isActive = false,
      variant = 'default',
      size = 'default',
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar='menu-button'
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === 'string') {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side='right'
          align='center'
          hidden={state !== 'collapsed' || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  },
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

/**
 * Props for the SidebarMenuAction component
 */
interface SidebarMenuActionProps extends React.ComponentProps<'button'> {
  /** Whether to use a slot to render children */
  asChild?: boolean
  /** Whether to show the action only on hover */
  showOnHover?: boolean
}

/**
 * Action button component for sidebar menu items
 *
 * Can be shown always or only on hover, typically used for item-specific actions
 *
 * @param props - Component props including asChild and showOnHover options
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Dashboard</SidebarMenuButton>
 *   <SidebarMenuAction showOnHover>
 *     <MoreIcon />
 *   </SidebarMenuAction>
 * </SidebarMenuItem>
 * ```
 */
const SidebarMenuAction: ForwardRef<HTMLButtonElement, SidebarMenuActionProps> = React.forwardRef(
  ({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        data-sidebar='menu-action'
        className={cn(
          'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
          // Increases the hit area of the button on mobile.
          'after:absolute after:-inset-2 after:md:hidden',
          'peer-data-[size=sm]/menu-button:top-1',
          'peer-data-[size=default]/menu-button:top-1.5',
          'peer-data-[size=lg]/menu-button:top-2.5',
          'group-data-[collapsible=icon]:hidden',
          showOnHover &&
            'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuAction.displayName = 'SidebarMenuAction'

/**
 * Props for the SidebarMenuBadge component
 */
interface SidebarMenuBadgeProps extends React.ComponentProps<'div'> {}

/**
 * Badge component for sidebar menu items to display counts or statuses
 *
 * Typically shows numerical information like notification counts
 *
 * @param props - Component props for the div element
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Inbox</SidebarMenuButton>
 *   <SidebarMenuBadge>5</SidebarMenuBadge>
 * </SidebarMenuItem>
 * ```
 */
const SidebarMenuBadge: ForwardRef<HTMLDivElement, SidebarMenuBadgeProps> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar='menu-badge'
      className={cn(
        'pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  ),
)
SidebarMenuBadge.displayName = 'SidebarMenuBadge'

/**
 * Props for the SidebarMenuSkeleton component
 */
interface SidebarMenuSkeletonProps extends React.ComponentProps<'div'> {
  /** Whether to show an icon skeleton */
  showIcon?: boolean
}

/**
 * Skeleton loading component for sidebar menu items
 *
 * Used for displaying loading states while content is being fetched
 *
 * @param props - Component props including showIcon option
 *
 * @example
 * ```tsx
 * // Simple skeleton
 * <SidebarMenuSkeleton />
 *
 * // Skeleton with icon
 * <SidebarMenuSkeleton showIcon />
 *
 * // Skeleton list
 * {Array.from({ length: 5 }).map((_, i) => (
 *   <SidebarMenuItem key={i}>
 *     <SidebarMenuSkeleton showIcon />
 *   </SidebarMenuItem>
 * ))}
 * ```
 */
const SidebarMenuSkeleton: ForwardRef<HTMLDivElement, SidebarMenuSkeletonProps> = React.forwardRef(
  ({ className, showIcon = false, ...props }, ref) => {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`
    }, [])

    return (
      <div
        ref={ref}
        data-sidebar='menu-skeleton'
        className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
        {...props}
      >
        {showIcon && (
          <Skeleton
            className='size-4 rounded-md'
            data-sidebar='menu-skeleton-icon'
          />
        )}
        <Skeleton
          className='h-4 max-w-[--skeleton-width] flex-1'
          data-sidebar='menu-skeleton-text'
          style={{
            '--skeleton-width': width,
          } as React.CSSProperties}
        />
      </div>
    )
  },
)
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton'

/**
 * Props for the SidebarMenuSub component
 */
interface SidebarMenuSubProps extends React.ComponentProps<'ul'> {}

/**
 * Submenu container component for sidebar nested navigation
 *
 * Contains SidebarMenuSubItem components with their own buttons
 *
 * @param props - Component props for the ul element
 *
 * @example
 * ```tsx
 * <SidebarMenuItem>
 *   <SidebarMenuButton>Projects</SidebarMenuButton>
 *   <SidebarMenuSub>
 *     <SidebarMenuSubItem>
 *       <SidebarMenuSubButton>Project A</SidebarMenuSubButton>
 *     </SidebarMenuSubItem>
 *     <SidebarMenuSubItem>
 *       <SidebarMenuSubButton>Project B</SidebarMenuSubButton>
 *     </SidebarMenuSubItem>
 *   </SidebarMenuSub>
 * </SidebarMenuItem>
 * ```
 */
const SidebarMenuSub: ForwardRef<HTMLUListElement, SidebarMenuSubProps> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar='menu-sub'
      className={cn(
        'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  ),
)
SidebarMenuSub.displayName = 'SidebarMenuSub'

/**
 * Props for the SidebarMenuSubItem component
 */
interface SidebarMenuSubItemProps extends React.ComponentProps<'li'> {}

/**
 * List item component for sidebar submenu items
 *
 * Typically contains a SidebarMenuSubButton
 *
 * @param props - Component props for the li element
 *
 * @example
 * ```tsx
 * <SidebarMenuSubItem>
 *   <SidebarMenuSubButton>Project A</SidebarMenuSubButton>
 * </SidebarMenuSubItem>
 * ```
 */
const SidebarMenuSubItem: ForwardRef<HTMLLIElement, SidebarMenuSubItemProps> = React.forwardRef(
  ({ ...props }, ref) => <li ref={ref} {...props} />,
)
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem'

/**
 * Props for the SidebarMenuSubButton component
 */
interface SidebarMenuSubButtonProps extends React.ComponentProps<'a'> {
  /** Whether to use a slot to render children */
  asChild?: boolean
  /** Size of the button */
  size?: 'sm' | 'md'
  /** Whether the button is in active state */
  isActive?: boolean
}

/**
 * Button component for sidebar submenu items
 *
 * Supports active state and different sizes
 *
 * @param props - Component props including asChild, size, and isActive options
 *
 * @example
 * ```tsx
 * // Simple submenu button
 * <SidebarMenuSubButton>Project A</SidebarMenuSubButton>
 *
 * // As a link with active state
 * <SidebarMenuSubButton asChild isActive size="sm">
 *   <a href="/projects/a">Project A</a>
 * </SidebarMenuSubButton>
 * ```
 */
const SidebarMenuSubButton: ForwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps> = React.forwardRef(
  ({ asChild = false, size = 'md', isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'

    return (
      <Comp
        ref={ref}
        data-sidebar='menu-sub-button'
        data-size={size}
        data-active={isActive}
        className={cn(
          'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
          'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          'group-data-[collapsible=icon]:hidden',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
