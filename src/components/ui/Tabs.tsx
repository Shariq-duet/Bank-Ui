'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { agentProps } from '@/lib/agent'

export interface TabItem<T extends string> {
  value: T
  label: string
  icon?: ReactNode
}

export interface TabsProps<T extends string> {
  items: TabItem<T>[]
  value: T
  onChange: (value: T) => void
  /** Prefix for the generated agent ids, e.g. "transfer-mode" → "transfer-mode-ibft". */
  agentId: string
  ariaLabel: string
  className?: string
}

/** Segmented control. Arrow keys move between tabs, as WAI-ARIA expects. */
export function Tabs<T extends string>({
  items,
  value,
  onChange,
  agentId,
  ariaLabel,
  className,
}: TabsProps<T>) {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = items.findIndex((item) => item.value === value)
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      onChange(items[(index + 1) % items.length].value)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onChange(items[(index - 1 + items.length) % items.length].value)
    }
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn('flex gap-1 rounded-xl border border-line bg-canvas p-1', className)}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.value)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200',
              active ? 'bg-surface text-brand-700 shadow-sm' : 'text-ink-muted hover:text-ink',
            )}
            {...agentProps(`${agentId}-${item.value}`)}
          >
            {item.icon}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
