'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'
import * as React from 'react'

/**
 * Type definition for the Toaster component props.
 * Inherits all properties from the original Sonner Toaster component.
 */
type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * A toast notification component that provides a way to show brief, auto-dismissible notifications.
 * This component is a wrapper around the Sonner Toaster component with styled defaults for the
 * shadcn/ui design system.
 *
 * @see {@link https://sonner.emilkowal.ski} - For more details about the underlying Sonner library
 *
 * @example
 * // Add to your root layout
 * import { Toaster } from "@/components/ui/sonner"
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         {children}
 *         <Toaster />
 *       </body>
 *     </html>
 *   )
 * }
 *
 * @example
 * // Usage with toast function
 * import { toast } from "sonner"
 *
 * // Show a simple toast
 * toast("Event has been created.")
 *
 * @param {ToasterProps} props - All props from the original Sonner Toaster component
 * @returns {React.ReactElement} A styled Toaster component that displays toast notifications
 */
const Toaster: React.FC<ToasterProps> = ({ ...props }: ToasterProps): React.ReactElement => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
