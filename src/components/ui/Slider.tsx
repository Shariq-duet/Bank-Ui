'use client'

import { useId } from 'react'
import { cn } from '@/lib/cn'

export interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  /** Rendered under the track — usually the min and max as formatted currency. */
  minLabel?: string
  maxLabel?: string
  disabled?: boolean
  className?: string
  'data-agent-id'?: string
  'data-testid'?: string
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  minLabel,
  maxLabel,
  disabled,
  className,
  ...props
}: SliderProps) {
  const id = useId()
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0

  return (
    <div className={cn('w-full', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        className="brand-range"
        style={{
          background: `linear-gradient(to right, rgb(var(--brand)) ${percent}%, #e8ebf2 ${percent}%)`,
        }}
        {...props}
      />
      {minLabel || maxLabel ? (
        <div className="mt-2 flex justify-between text-2xs text-ink-muted">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      ) : null}
    </div>
  )
}
