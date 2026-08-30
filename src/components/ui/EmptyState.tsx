import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-10 text-center', className)}>
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">{icon}</span>
      <p className="mt-3 heading-sm">{title}</p>
      <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-ink-muted">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
