'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@/default/lib/utils.ts'

import type { ForwardRef } from '@/typing'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const

/**
 * Configuration type for chart components that defines colors, labels, and icons.
 *
 * The chart config is where you define labels, icons, and colors for each data series in a chart.
 * It is intentionally decoupled from chart data to allow sharing config between charts and
 * to support cases where data or color tokens live remotely or in a different format.
 *
 * @example
 * ```tsx
 * import { Monitor } from "lucide-react"
 * import { type ChartConfig } from "@/components/ui/chart"
 *
 * const chartConfig = {
 *   desktop: {
 *     label: "Desktop",
 *     icon: Monitor,
 *     color: "#2563eb",
 *   },
 *   mobile: {
 *     label: "Mobile",
 *     theme: {
 *       light: "#60a5fa",
 *       dark: "#3b82f6",
 *     },
 *   },
 * } satisfies ChartConfig
 * ```
 */
export type ChartConfig = {
  [k in string]:
    & {
      label?: React.ReactNode
      icon?: React.ComponentType
    }
    & (
      | { color?: string; theme?: never }
      | { color?: never; theme: Record<keyof typeof THEMES, string> }
    )
}

/**
 * Context props type for the chart context
 */
type ChartContextProps = {
  config: ChartConfig
}

/**
 * React context for sharing chart configuration between components
 */
const ChartContext = React.createContext<ChartContextProps | null>(null)

/**
 * Hook to access chart context within chart components
 *
 * @returns The chart context containing the chart configuration
 * @throws Error when used outside of a ChartContainer
 */
function useChart(): ChartContextProps {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }

  return context
}

/**
 * Container component for charts that provides configuration and responsive layout
 *
 * This is the main wrapper component for all charts. It provides a context for
 * chart configuration and a responsive container for chart components.
 *
 * @example
 * ```tsx
 * import { Bar, BarChart } from "recharts"
 * import { ChartContainer } from "@/components/ui/chart"
 *
 * export function MyChart() {
 *   return (
 *     <ChartContainer config={chartConfig} className="min-h-[200px]">
 *       <BarChart data={data}>
 *         <Bar dataKey="value" fill="var(--color-value)" />
 *       </BarChart>
 *     </ChartContainer>
 *   )
 * }
 * ```
 */
const ChartContainer: ForwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >['children']
  }
> = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = 'Chart'

/**
 * Utility component that injects CSS variables for chart colors
 *
 * @param id - The unique ID for this chart
 * @param config - The chart configuration object
 * @returns A style element with CSS variables or null if no color configuration exists
 */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }): React.ReactElement | null => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color,
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${
              colorConfig
                .map(([key, itemConfig]) => {
                  const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
                    itemConfig.color
                  return color ? `  --color-${key}: ${color};` : null
                })
                .join('\n')
            }
}
`,
          )
          .join('\n'),
      }}
    />
  )
}

/**
 * Wrapper for the Recharts Tooltip component
 * Used to display tooltips when hovering over chart elements
 */
const ChartTooltip = RechartsPrimitive.Tooltip

/**
 * Customizable tooltip content component for charts
 *
 * This component provides a styled tooltip content with support for indicators,
 * labels, and formatted values.
 *
 * @example
 * ```tsx
 * import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
 *
 * <ChartTooltip content={<ChartTooltipContent />} />
 * ```
 *
 * @param active - Whether the tooltip is active (provided by Recharts)
 * @param payload - Data for the tooltip (provided by Recharts)
 * @param className - Optional CSS class name
 * @param indicator - The indicator style to use ('dot', 'line', or 'dashed')
 * @param hideLabel - Whether to hide the label
 * @param hideIndicator - Whether to hide the indicator
 * @param label - The label for the tooltip
 * @param labelFormatter - Function to format the label
 * @param labelClassName - Optional CSS class name for the label
 * @param formatter - Function to format tooltip values
 * @param color - Override color for the tooltip
 * @param nameKey - The key to use for the tooltip name
 * @param labelKey - The key to use for the tooltip label
 */
const ChartTooltipContent: ForwardRef<
  HTMLDivElement,
  & React.ComponentProps<typeof RechartsPrimitive.Tooltip>
  & React.ComponentProps<'div'>
  & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: 'line' | 'dot' | 'dashed'
    nameKey?: string
    labelKey?: string
  }
> = React.forwardRef(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item?.dataKey || item?.name || 'value'}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value = !labelKey && typeof label === 'string'
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn('font-medium', labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn('font-medium', labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot'

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className='grid gap-1.5'>
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
                  indicator === 'dot' && 'items-center',
                )}
              >
                {formatter && item?.value !== undefined && item.name
                  ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  )
                  : (
                    <>
                      {itemConfig?.icon ? <itemConfig.icon /> : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                              {
                                'h-2.5 w-2.5': indicator === 'dot',
                                'w-1': indicator === 'line',
                                'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
                                'my-0.5': nestLabel && indicator === 'dashed',
                              },
                            )}
                            style={{
                              '--color-bg': indicatorColor,
                              '--color-border': indicatorColor,
                            } as React.CSSProperties}
                          />
                        )
                      )}
                      <div
                        className={cn(
                          'flex flex-1 justify-between leading-none',
                          nestLabel ? 'items-end' : 'items-center',
                        )}
                      >
                        <div className='grid gap-1.5'>
                          {nestLabel ? tooltipLabel : null}
                          <span className='text-muted-foreground'>
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className='font-mono font-medium tabular-nums text-foreground'>
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = 'ChartTooltip'

/**
 * Wrapper for the Recharts Legend component
 * Used to display legends for chart elements
 */
const ChartLegend = RechartsPrimitive.Legend

/**
 * Customizable legend content component for charts
 *
 * This component provides a styled legend with support for icons and
 * custom formatting. Colors are automatically referenced from the chart config.
 *
 * @example
 * ```tsx
 * import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
 *
 * <ChartLegend content={<ChartLegendContent />} />
 * ```
 *
 * @param className - Optional CSS class name
 * @param hideIcon - Whether to hide the icon
 * @param payload - Legend data payload (provided by Recharts)
 * @param verticalAlign - Vertical alignment of the legend ('top' or 'bottom')
 * @param nameKey - The key to use for legend names
 */
const ChartLegendContent: ForwardRef<
  HTMLDivElement,
  & React.ComponentProps<'div'>
  & Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'>
  & {
    hideIcon?: boolean
    nameKey?: string
  }
> = React.forwardRef(
  (
    { className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey },
    ref,
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className,
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || 'value'}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground',
              )}
            >
              {itemConfig?.icon && !hideIcon ? <itemConfig.icon /> : (
                <div
                  className='h-2 w-2 shrink-0 rounded-[2px]'
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  },
)
ChartLegendContent.displayName = 'ChartLegend'

/**
 * Helper function to extract item configuration from a chart payload
 *
 * This utility function extracts the appropriate configuration for a chart item
 * from the chart config based on the payload data.
 *
 * @param config - The chart configuration object
 * @param payload - The payload object from Recharts
 * @param key - The key to look for in the payload
 * @returns The configuration for the specified item or undefined if not found
 */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
): ChartConfig[string] | undefined {
  if (typeof payload !== 'object' || payload === null) {
    return undefined
  }

  const payloadPayload = 'payload' in payload &&
      typeof payload.payload === 'object' &&
      payload.payload !== null
    ? payload.payload
    : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === 'string'
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config]
}

export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent }
