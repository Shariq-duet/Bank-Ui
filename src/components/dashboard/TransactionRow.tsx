import { cn } from '@/lib/cn'
import { agentProps } from '@/lib/agent'
import { formatCurrency, formatRelativeDateTime } from '@/lib/format'
import { TODAY } from '@/lib/mock-data'
import type { Transaction, TransactionTone } from '@/lib/types'

const TONES: Record<TransactionTone, string> = {
  green: 'bg-positive-50 text-positive-500',
  brand: 'bg-brand-50 text-brand-600',
  cyan: 'bg-accent-100 text-accent-600',
  violet: 'bg-[#eee7fb] text-[#7c63b8]',
  sky: 'bg-[#e0ecf9] text-[#3d6bb5]',
}

export interface TransactionRowProps {
  transaction: Transaction
  /** Prefix for the agent id, so lists on different screens stay distinguishable. */
  agentIdPrefix?: string
}

export function TransactionRow({ transaction, agentIdPrefix = 'transaction' }: TransactionRowProps) {
  const isCredit = transaction.direction === 'credit'

  return (
    <li
      className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-200 hover:bg-canvas"
      {...agentProps(`${agentIdPrefix}-${transaction.id}`)}
    >
      <span
        aria-hidden
        className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold', TONES[transaction.tone])}
      >
        {transaction.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.8125rem] font-semibold text-ink">{transaction.merchant}</p>
        <p className="mt-0.5 truncate text-[0.6875rem] text-ink-muted">
          {transaction.category} • {formatRelativeDateTime(transaction.date, TODAY)}
        </p>
      </div>
      <p
        className={cn(
          'shrink-0 text-right text-[0.8125rem] font-bold tabular',
          isCredit ? 'text-positive-500' : 'text-ink',
        )}
      >
        {isCredit ? '+' : '−'} {formatCurrency(transaction.amount)}
      </p>
    </li>
  )
}
