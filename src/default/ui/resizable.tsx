'use client'

import { GripVertical } from 'lucide-react'
import * as ResizablePrimitive from 'react-resizable-panels'

import { cn } from '@/default/lib/utils.ts'

/**
 * A container for resizable panels that manages their layout and interaction.
 *
 * The ResizablePanelGroup component wraps multiple ResizablePanel components and
 * controls their arrangement, either horizontally or vertically.
 *
 * @param {object} props - The component props
 * @param {string} [props.className] - Optional CSS class name for styling
 * @param {'horizontal' | 'vertical'} [props.direction='horizontal'] - Direction of the panel layout
 * @param {React.ReactNode} props.children - ResizablePanel and ResizableHandle components
 * @returns {JSX.Element} The rendered ResizablePanelGroup component
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel>One</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel>Two</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>): React.JSX.Element => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
      className,
    )}
    {...props}
  />
)

/**
 * A resizable panel that can be adjusted by the user.
 *
 * The ResizablePanel is used within a ResizablePanelGroup and represents a section
 * of the layout that can be resized using a ResizableHandle.
 *
 * @type {React.FC<import('react-resizable-panels').PanelProps>}
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup>
 *   <ResizablePanel>Content for first panel</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel>Content for second panel</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanel: React.FC<import('react-resizable-panels').PanelProps> = ResizablePrimitive.Panel

/**
 * A handle component for resizing adjacent panels.
 *
 * The ResizableHandle is placed between ResizablePanel components and provides
 * a draggable control for adjusting the size of the panels.
 *
 * @param {object} props - The component props
 * @param {boolean} [props.withHandle] - Whether to show a visible handle with an icon
 * @param {string} [props.className] - Optional CSS class name for styling
 * @returns {JSX.Element} The rendered ResizableHandle component
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup>
 *   <ResizablePanel>Content for first panel</ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel>Content for second panel</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}): React.JSX.Element => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border'>
        <GripVertical className='h-2.5 w-2.5' />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
