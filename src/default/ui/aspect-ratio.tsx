/**
 * A module providing aspect ratio components to maintain consistent width-to-height ratios.
 *
 * @see https://ui.shadcn.com/docs/components/aspect-ratio
 * @module
 */

'use client'

import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import type { ComponentPropsWithoutRef } from 'react'

/**
 * AspectRatio component displays content within a desired ratio.
 *
 * This component maintains a consistent width-to-height ratio for its content,
 * which is especially useful for responsive layouts and preventing layout shift
 * when loading images or videos.
 *
 * @component
 * @see {@link https://www.radix-ui.com/docs/primitives/components/aspect-ratio}
 *
 * @example
 * ```tsx
 * import Image from "next/image"
 * import { AspectRatio } from "@/components/ui/aspect-ratio"
 *
 * <div className="w-[450px]">
 *   <AspectRatio ratio={16 / 9}>
 *     <Image
 *       src="/image.jpg"
 *       alt="Image"
 *       className="rounded-md object-cover"
 *     />
 *   </AspectRatio>
 * </div>
 * ```
 *
 * @param props - Props for the AspectRatio component
 * @param props.ratio - The desired aspect ratio (width divided by height)
 * @param props.children - The content to display within the aspect ratio container
 * @param props.className - Additional CSS classes to apply to the component
 * @returns The AspectRatio component with the specified aspect ratio
 */
const AspectRatio: React.FC<ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>> = AspectRatioPrimitive.Root

export { AspectRatio }
