'use client'

import * as React from 'react'
import { useToast } from '@/default/hooks/use-toast.ts'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/default/ui/toast.tsx'

/**
 * A component that displays toast notifications.
 *
 * This component should be included once at the root of your application.
 * It handles rendering toast notifications created with the `useToast` hook.
 *
 * @example
 * ```tsx
 * // In your root layout or app component
 * import { Toaster } from "@/components/ui/toaster"
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
 * ```
 *
 * Then use the toast hook in any component:
 * ```tsx
 * import { useToast } from "@/hooks/use-toast"
 *
 * export function MyComponent() {
 *   const { toast } = useToast()
 *
 *   const showToast = () => {
 *     toast({
 *       title: "Success",
 *       description: "Your action was completed successfully.",
 *     })
 *   }
 *
 *   return <button onClick={showToast}>Show Toast</button>
 * }
 * ```
 */
export function Toaster(): React.ReactElement {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
