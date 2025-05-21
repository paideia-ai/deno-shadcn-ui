import type { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react'

// deno-lint-ignore ban-types
export type ForwardRef<T, P = {}> = ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
