import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface PageHeaderProps {
  eyebrow?: string
  /**
   * Omit on sub-routes: the TopBar already renders the screen title there, so a
   * second copy would duplicate it. Tab-root screens pass a title because the
   * TopBar shows the brand instead.
   */
  title?: ReactNode
  subtitle?: string
  action?: ReactNode
  className?: string
}

/** The screen-level heading block: eyebrow, title, optional supporting copy. */
export function PageHeader({ eyebrow, title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        {eyebrow ? <p className={cn('eyebrow', title && 'mb-1.5')}>{eyebrow}</p> : null}
        {title ? <h2 className="heading-lg">{title}</h2> : null}
        {subtitle ? (
          <p className={cn('text-xs leading-relaxed text-ink-muted', (title || eyebrow) && 'mt-1.5')}>{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 pt-0.5">{action}</div> : null}
    </div>
  )
}
