import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { agentProps } from '@/lib/agent'

interface RowContent {
  leading?: ReactNode
  title: string
  subtitle?: ReactNode
  trailing?: ReactNode
  /** Shows the chevron affordance on navigational rows. */
  chevron?: boolean
}

interface RowBaseProps extends RowContent {
  className?: string
  agentId?: string
}

function RowInner({ leading, title, subtitle, trailing, chevron }: RowContent) {
  return (
    <>
      {leading}
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[0.8125rem] font-semibold text-ink">{title}</span>
        {subtitle ? (
          <span className="mt-0.5 block truncate text-[0.6875rem] text-ink-muted">{subtitle}</span>
        ) : null}
      </span>
      {trailing}
      {chevron ? <ChevronRight size={16} aria-hidden className="shrink-0 text-ink-faint" /> : null}
    </>
  )
}

const ROW_BASE =
  'flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors duration-200 hover:bg-canvas'

export interface ListRowLinkProps extends RowBaseProps {
  href: string
}

export function ListRowLink({ href, className, agentId, ...content }: ListRowLinkProps) {
  return (
    <Link href={href} className={cn(ROW_BASE, className)} {...(agentId ? agentProps(agentId) : {})}>
      <RowInner {...content} />
    </Link>
  )
}

export interface ListRowButtonProps extends RowBaseProps {
  onClick: () => void
  selected?: boolean
  disabled?: boolean
}

export function ListRowButton({
  onClick,
  selected,
  disabled,
  className,
  agentId,
  ...content
}: ListRowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        ROW_BASE,
        'border',
        selected ? 'border-brand-300 bg-brand-50 hover:bg-brand-50' : 'border-transparent',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      {...(agentId ? agentProps(agentId) : {})}
    >
      <RowInner {...content} />
    </button>
  )
}

export function ListRowStatic({ className, agentId, ...content }: RowBaseProps) {
  return (
    <div className={cn('flex items-center gap-3 px-2 py-3', className)} {...(agentId ? agentProps(agentId) : {})}>
      <RowInner {...content} />
    </div>
  )
}
