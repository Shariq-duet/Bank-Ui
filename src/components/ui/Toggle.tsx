'use client'

import { useId } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  /** Accessible name — required when no visible label sits beside the switch. */
  label: string
  disabled?: boolean
  className?: string
  'data-agent-id'?: string
  'data-testid'?: string
}

export function Toggle({ checked, onChange, label, disabled, className, ...props }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors duration-200 disabled:opacity-50',
        checked ? 'bg-brand-600' : 'bg-[#dce1eb]',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          'block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )
}

export interface ToggleRowProps {
  title: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  icon?: ReactNode
  disabled?: boolean
  'data-agent-id'?: string
  'data-testid'?: string
}

/** A settings row: title, supporting copy and a switch, all labelled together. */
export function ToggleRow({
  title,
  description,
  checked,
  onChange,
  icon,
  disabled,
  ...props
}: ToggleRowProps) {
  const titleId = useId()
  return (
    <div className="flex items-center gap-3 py-3.5">
      {icon ? <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">{icon}</span> : null}
      <div className="min-w-0 flex-1">
        <p id={titleId} className="text-[0.8125rem] font-semibold text-ink">
          {title}
        </p>
        {description ? <p className="mt-0.5 text-[0.6875rem] text-ink-muted">{description}</p> : null}
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} disabled={disabled} {...props} />
    </div>
  )
}
