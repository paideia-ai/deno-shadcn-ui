'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '@/default/lib/utils.ts'
import { Button } from '@/default/ui/button.tsx'
import type { ForwardRef } from '@/typing'

/**
 * Type representing the Embla Carousel API instance.
 * This is used for controlling the carousel programmatically.
 */
type CarouselApi = UseEmblaCarouselType[1]

/**
 * Type representing the parameters accepted by the useEmblaCarousel hook.
 */
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>

/**
 * Type representing the options that can be passed to the carousel.
 * See the Embla Carousel documentation for available options:
 * https://www.embla-carousel.com/api/options/
 */
type CarouselOptions = UseCarouselParameters[0]

/**
 * Type representing plugins that can be used with the carousel.
 * Plugins extend the carousel's functionality (e.g., autoplay, pagination).
 * See: https://www.embla-carousel.com/api/plugins/
 */
type CarouselPlugin = UseCarouselParameters[1]

/**
 * Properties for the Carousel component.
 */
type CarouselProps = {
  /**
   * Configuration options for the Embla Carousel.
   * See: https://www.embla-carousel.com/api/options/
   */
  opts?: CarouselOptions

  /**
   * Plugins to extend the carousel's functionality.
   * Example: Autoplay, pagination, etc.
   * See: https://www.embla-carousel.com/api/plugins/
   */
  plugins?: CarouselPlugin

  /**
   * The orientation of the carousel.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Callback to get access to the carousel API instance.
   * Useful for controlling the carousel programmatically or listening to events.
   */
  setApi?: (api: CarouselApi) => void
}

/**
 * Context properties for the Carousel component, providing access to internal state and methods.
 */
type CarouselContextProps = {
  /**
   * Reference to the carousel container element.
   */
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]

  /**
   * The Embla Carousel API instance.
   */
  api: ReturnType<typeof useEmblaCarousel>[1]

  /**
   * Function to scroll to the previous slide.
   */
  scrollPrev: () => void

  /**
   * Function to scroll to the next slide.
   */
  scrollNext: () => void

  /**
   * Whether the carousel can scroll to the previous slide.
   */
  canScrollPrev: boolean

  /**
   * Whether the carousel can scroll to the next slide.
   */
  canScrollNext: boolean
} & CarouselProps

/**
 * Context for sharing carousel state and functionality across components.
 */
const CarouselContext = React.createContext<CarouselContextProps | null>(null)

/**
 * Hook to access carousel context from child components.
 * Must be used within a Carousel component.
 *
 * @returns The carousel context containing state and methods to control the carousel
 * @throws Error if used outside of a Carousel component
 *
 * @example
 * ```tsx
 * const { scrollNext, scrollPrev } = useCarousel()
 * ```
 */
function useCarousel(): CarouselContextProps {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

/**
 * A carousel component built with Embla Carousel.
 * Provides a responsive and accessible interface for cycling through items.
 *
 * @param props - Component properties
 * @param ref - Forwarded ref to the carousel div element
 * @returns A Carousel component
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *     <CarouselItem>Slide 3</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 *
 * @example
 * // With options
 * ```tsx
 * <Carousel
 *   opts={{
 *     align: "start",
 *     loop: true,
 *   }}
 * >
 *   {/* ... *\/}
 * </Carousel>
 * ```
 *
 * @example
 * // With plugins
 * ```tsx
 * import Autoplay from "embla-carousel-autoplay"
 *
 * <Carousel
 *   plugins={[
 *     Autoplay({
 *       delay: 2000,
 *     }),
 *   ]}
 * >
 *   {/* ... *\/}
 * </Carousel>
 * ```
 */
const Carousel: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
> = React.forwardRef(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ): React.ReactElement => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins,
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState<boolean>(false)
    const [canScrollNext, setCanScrollNext] = React.useState<boolean>(false)

    const onSelect = React.useCallback((api: CarouselApi): void => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback((): void => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback((): void => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext],
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)

      return () => {
        api?.off('select', onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role='region'
          aria-roledescription='carousel'
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)
Carousel.displayName = 'Carousel'

/**
 * Container for carousel items.
 * This component wraps all the slides in your carousel.
 *
 * @param props - Component properties
 * @param ref - Forwarded ref to the content div element
 * @returns A container for carousel items
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>...</CarouselItem>
 *     <CarouselItem>...</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 *
 * @example
 * // With custom spacing
 * ```tsx
 * <Carousel>
 *   <CarouselContent className="-ml-2 md:-ml-4">
 *     <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
 *     <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */
const CarouselContent: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = React.forwardRef(({ className, ...props }, ref): React.ReactElement => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className='overflow-hidden'>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = 'CarouselContent'

/**
 * Individual item/slide within a carousel.
 *
 * @param props - Component properties
 * @param ref - Forwarded ref to the item div element
 * @returns A carousel item component
 *
 * @example
 * ```tsx
 * <CarouselItem>Content for slide</CarouselItem>
 * ```
 *
 * @example
 * // With sizing
 * ```tsx
 * <CarouselItem className="basis-1/3">
 *   Content for slide (33% width)
 * </CarouselItem>
 * ```
 *
 * @example
 * // With responsive sizing
 * ```tsx
 * <CarouselItem className="md:basis-1/2 lg:basis-1/3">
 *   Content with responsive width
 * </CarouselItem>
 * ```
 */
const CarouselItem: ForwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
> = React.forwardRef(({ className, ...props }, ref): React.ReactElement => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role='group'
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = 'CarouselItem'

/**
 * Button to navigate to the previous slide in the carousel.
 * Automatically disables when at the first slide.
 *
 * @param props - Component properties
 * @param ref - Forwarded ref to the button element
 * @returns A button to navigate to the previous slide
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent>...</CarouselContent>
 *   <CarouselPrevious />
 * </Carousel>
 * ```
 *
 * @example
 * // With custom styling
 * ```tsx
 * <CarouselPrevious className="custom-class" variant="ghost" />
 * ```
 */
const CarouselPrevious: ForwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
> = React.forwardRef(({ className, variant = 'outline', size = 'icon', ...props }, ref): React.ReactElement => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute  h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className='h-4 w-4' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

/**
 * Button to navigate to the next slide in the carousel.
 * Automatically disables when at the last slide.
 *
 * @param props - Component properties
 * @param ref - Forwarded ref to the button element
 * @returns A button to navigate to the next slide
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent>...</CarouselContent>
 *   <CarouselNext />
 * </Carousel>
 * ```
 *
 * @example
 * // With custom styling
 * ```tsx
 * <CarouselNext className="custom-class" variant="ghost" />
 * ```
 */
const CarouselNext: ForwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
> = React.forwardRef(({ className, variant = 'outline', size = 'icon', ...props }, ref): React.ReactElement => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className='h-4 w-4' />
      <span className='sr-only'>Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = 'CarouselNext'

export { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }
