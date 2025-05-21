'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'

import { cn } from '@/default/lib/utils.ts'
import { Label } from '@/default/ui/label.tsx'
import type { ForwardRef } from '@/typing'

/**
 * A wrapper around react-hook-form's FormProvider component for building composable and accessible forms.
 *
 * The Form component is part of a complete form solution that provides:
 * - Composable components for building forms
 * - A FormField component for building controlled form fields
 * - Proper accessibility attributes and error handling
 * - Integration with Radix UI components
 *
 * @type {React.ComponentType<import('react-hook-form').FormProviderProps>}
 *
 * @example
 * ```tsx
 * const form = useForm()
 *
 * return (
 *   <Form {...form}>
 *     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
 *       <FormField
 *         control={form.control}
 *         name="username"
 *         render={({ field }) => (
 *           <FormItem>
 *             <FormLabel>Username</FormLabel>
 *             <FormControl>
 *               <Input placeholder="shadcn" {...field} />
 *             </FormControl>
 *             <FormDescription>This is your public display name.</FormDescription>
 *             <FormMessage />
 *           </FormItem>
 *         )}
 *       />
 *       <Button type="submit">Submit</Button>
 *     </form>
 *   </Form>
 * )
 * ```
 */
const Form: React.ComponentType<import('react-hook-form').FormProviderProps> = FormProvider

/**
 * Context value for FormField component that contains form field name information.
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

/**
 * React context for sharing form field information with child components.
 */
const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

/**
 * A component for building controlled form fields with react-hook-form.
 *
 * FormField wraps the react-hook-form Controller component and provides
 * a context with the field name to child components.
 *
 * @template TFieldValues - The type of the form values
 * @template TName - The type of the field name
 *
 * @param {ControllerProps<TFieldValues, TName>} props - Props for the react-hook-form Controller
 * @returns {React.ReactElement} - A form field component
 *
 * @example
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="username"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Username</FormLabel>
 *       <FormControl>
 *         <Input placeholder="shadcn" {...field} />
 *       </FormControl>
 *       <FormDescription>This is your public display name.</FormDescription>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>): React.ReactElement => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

/**
 * Return type for the useFormField hook.
 */
interface UseFormFieldReturn {
  id: string
  name: string
  formItemId: string
  formDescriptionId: string
  formMessageId: string
  error?: Record<string, unknown>
}

/**
 * A hook for accessing form field context and state within form components.
 *
 * This hook should be used within FormField components to access field state
 * and form context. It provides unique IDs for form elements and access to
 * field error state.
 *
 * @returns {UseFormFieldReturn} - Form field information including IDs and error state
 * @throws {Error} - If used outside of a FormField component
 *
 * @example
 * ```tsx
 * const MyFormComponent = () => {
 *   const { id, name, formItemId, error } = useFormField()
 *   return (
 *     <div id={formItemId}>
 *       {error && <span>Error: {error.message}</span>}
 *     </div>
 *   )
 * }
 * ```
 */
const useFormField = (): UseFormFieldReturn => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

/**
 * Context value for FormItem component.
 */
type FormItemContextValue = {
  id: string
}

/**
 * React context for sharing form item information with child components.
 */
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

/**
 * A container component for form field elements with proper spacing.
 *
 * FormItem provides context for child components and handles proper spacing
 * between form elements.
 *
 * @param {React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }} props - HTML div props
 * @param {React.ForwardedRef<HTMLDivElement>} ref - Forwarded ref
 * @returns {React.ReactElement} - A form item container component
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Username</FormLabel>
 *   <FormControl>
 *     <Input />
 *   </FormControl>
 *   <FormDescription>This is your public display name.</FormDescription>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
const FormItem: ForwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>> = React.forwardRef(
  ({ className, ...props }, ref): React.ReactElement => {
    const id = React.useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('space-y-2', className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)
FormItem.displayName = 'FormItem'

/**
 * A label component for form fields that connects to the form item.
 *
 * FormLabel extends the Label component and automatically connects to the
 * associated form field's ID. It also applies error styling when the field
 * has an error.
 *
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { children?: React.ReactNode }} props - Label props
 * @param {React.ForwardedRef<React.ElementRef<typeof LabelPrimitive.Root>>} ref - Forwarded ref
 * @returns {React.ReactElement} - A form label component
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Username</FormLabel>
 *   <FormControl>
 *     <Input />
 *   </FormControl>
 * </FormItem>
 * ```
 */
const FormLabel: ForwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
> = React.forwardRef(
  ({ className, ...props }, ref): React.ReactElement => {
    const { error, formItemId } = useFormField()

    return (
      <Label
        ref={ref}
        className={cn(error && 'text-destructive', className)}
        htmlFor={formItemId}
        {...props}
      />
    )
  },
)
FormLabel.displayName = 'FormLabel'

/**
 * A component that provides proper attributes to form input elements.
 *
 * FormControl uses Radix UI's Slot component to pass accessibility attributes
 * to the actual form control element. It automatically sets aria attributes
 * based on field state.
 *
 * @param {React.ComponentPropsWithoutRef<typeof Slot> & { children?: React.ReactNode }} props - Slot props
 * @param {React.ForwardedRef<React.ElementRef<typeof Slot>>} ref - Forwarded ref
 * @returns {React.ReactElement} - A form control component
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Username</FormLabel>
 *   <FormControl>
 *     <Input placeholder="shadcn" {...field} />
 *   </FormControl>
 * </FormItem>
 * ```
 */
const FormControl: ForwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>> = React.forwardRef(
  ({ ...props }, ref): React.ReactElement => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    )
  },
)
FormControl.displayName = 'FormControl'

/**
 * A component for displaying form field descriptions.
 *
 * FormDescription shows additional information about a form field and is
 * automatically connected to the field via aria-describedby.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }} props - HTML paragraph props
 * @param {React.ForwardedRef<HTMLParagraphElement>} ref - Forwarded ref
 * @returns {React.ReactElement} - A form description component
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Username</FormLabel>
 *   <FormControl>
 *     <Input />
 *   </FormControl>
 *   <FormDescription>This is your public display name.</FormDescription>
 * </FormItem>
 * ```
 */
const FormDescription: ForwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>> = React.forwardRef(
  ({ className, ...props }, ref): React.ReactElement => {
    const { formDescriptionId } = useFormField()

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      />
    )
  },
)
FormDescription.displayName = 'FormDescription'

/**
 * A component for displaying form field validation messages.
 *
 * FormMessage shows error messages for a form field and is automatically
 * connected to the field's validation state. If there's no error, it can
 * display children content or return null.
 *
 * @param {React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }} props - HTML paragraph props
 * @param {React.ForwardedRef<HTMLParagraphElement>} ref - Forwarded ref
 * @returns {React.ReactElement | null} - A form message component or null if no message to display
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Username</FormLabel>
 *   <FormControl>
 *     <Input />
 *   </FormControl>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
const FormMessage: ForwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>> = React.forwardRef(
  ({ className, children, ...props }, ref): React.ReactElement | null => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message ?? '') : children

    if (!body) {
      return null
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn('text-sm font-medium text-destructive', className)}
        {...props}
      >
        {body}
      </p>
    )
  },
)
FormMessage.displayName = 'FormMessage'

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField }
