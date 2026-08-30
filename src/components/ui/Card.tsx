import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface CardProps {
  children: ReactNode
  className?: string
  /** Adds the hover lift used on the prototype's content panels. */
  interactive?: boolean
  padded?: boolean
  as?: 'div' | 'section' | 'article'
  /** Instrumentation attributes from `agentProps`, forwarded to the element. */
  'data-agent-id'?: string
  'data-testid'?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

export function Card({
  children,
  className,
  interactive,
  padded = true,
  as: Tag = 'section',
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        'surface-card transition-shadow duration-200',
        padded && 'p-4',
        interactive && 'hover:shadow-deep',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  action?: ReactNode
  className?: string
}

/** Eyebrow + title on the left, an optional link or control on the right. */
export function SectionHeading({ eyebrow, title, action, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex items-end justify-between gap-3', className)}>
      <div className="min-w-0">
        {eyebrow ? <p className="eyebrow mb-1">{eyebrow}</p> : null}
        <h2 className="heading-md truncate">{title}</h2>
      </div>
      {action}
    </div>
  )
}
