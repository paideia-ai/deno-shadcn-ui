/**
 * A module providing hooks and utilities for creating and managing toast notifications.
 * Inspired by react-hot-toast library.
 * @module
 */

'use client'

import * as React from 'react'

import type { ToastActionElement, ToastProps } from '@/default/ui/toast.tsx'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
    type: ActionType['ADD_TOAST']
    toast: ToasterToast
  }
  | {
    type: ActionType['UPDATE_TOAST']
    toast: Partial<ToasterToast>
  }
  | {
    type: ActionType['DISMISS_TOAST']
    toastId?: ToasterToast['id']
  }
  | {
    type: ActionType['REMOVE_TOAST']
    toastId?: ToasterToast['id']
  }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Reducer function for managing toast state.
 *
 * @param {State} state - The current state of the toasts
 * @param {Action} action - The action to perform on the state
 * @returns {State} The updated state
 *
 * Handles four types of actions:
 * - ADD_TOAST: Adds a new toast to the beginning of the queue
 * - UPDATE_TOAST: Updates an existing toast by its id
 * - DISMISS_TOAST: Marks toasts as closed and adds them to the removal queue
 * - REMOVE_TOAST: Removes toasts from the state
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
              ...t,
              open: false,
            }
            : t
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, 'id'>

interface ToastReturn {
  id: string
  dismiss: () => void
  update: (props: ToasterToast) => void
}

/**
 * Creates and displays a toast notification.
 *
 * @param {Toast} props - Props for configuring the toast notification
 * @returns {ToastReturn} Object containing methods to control the toast:
 *   - id: Unique identifier for the toast
 *   - dismiss: Function to dismiss the toast
 *   - update: Function to update the toast properties
 *
 * @example
 * ```tsx
 * const { toast } = useToast();
 *
 * toast({
 *   title: "Success",
 *   description: "Your changes have been saved.",
 *   variant: "default"
 * });
 * ```
 */
function toast({ ...props }: Toast): ToastReturn {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

interface UseToastReturn extends State {
  toast: typeof toast
  dismiss: (toastId?: string) => void
}

/**
 * A custom hook for creating and managing toast notifications.
 *
 * @returns {UseToastReturn} An object containing:
 *   - toasts: Array of current toast notifications
 *   - toast: Function to create a new toast
 *   - dismiss: Function to dismiss a specific toast or all toasts
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { toast, dismiss } = useToast();
 *
 *   const showToast = () => {
 *     toast({
 *       title: "Notification",
 *       description: "This is a toast notification",
 *     });
 *   };
 *
 *   return (
 *     <Button onClick={showToast}>Show Notification</Button>
 *   );
 * }
 * ```
 */
function useToast(): UseToastReturn {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { toast, useToast }
