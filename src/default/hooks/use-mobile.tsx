/**
 * A module providing a hook for detecting mobile viewports.
 * @module
 */

import * as React from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * A hook that detects if the current viewport is mobile-sized.
 *
 * @returns {boolean} Returns true if the viewport width is less than the mobile breakpoint (768px),
 *                    false otherwise.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *
 *   return (
 *     <div>
 *       {isMobile ? 'Mobile View' : 'Desktop View'}
 *     </div>
 *   );
 * }
 * ```
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = globalThis.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(globalThis.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(globalThis.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
