import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { agentProps } from '@/lib/agent'

export interface ReviewItem {
  label: string
  value: ReactNode
  agentId: string
  /** Renders in brand colour — use for the amount or total line. */
  emphasis?: boolean
}

export interface ReviewListProps {
  items: ReviewItem[]
  className?: string
}

/** The shared confirm-step summary used by transfers, bills and QR payments. */
export function ReviewList({ items, className }: ReviewListProps) {
  return (
    <dl className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item) => (
        <div key={item.agentId} className="flex items-center justify-between gap-4 py-3" {...agentProps(item.agentId)}>
          <dt className="shrink-0 text-[0.6875rem] font-semibold text-ink-muted">{item.label}</dt>
          <dd
            className={cn(
              'min-w-0 text-right text-xs font-bold tabular',
              item.emphasis ? 'text-brand-700' : 'text-ink',
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
