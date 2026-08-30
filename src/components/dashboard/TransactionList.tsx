import { Receipt } from 'lucide-react'
import type { Transaction } from '@/lib/types'
import { EmptyState } from '@/components/ui'
import { TransactionRow } from './TransactionRow'

export interface TransactionListProps {
  transactions: Transaction[]
  agentIdPrefix?: string
  emptyTitle?: string
  emptyDescription?: string
}

export function TransactionList({
  transactions,
  agentIdPrefix,
  emptyTitle = 'No transactions yet',
  emptyDescription = 'Activity on this account will appear here as soon as there is something to show.',
}: TransactionListProps) {
  if (transactions.length === 0) {
    return <EmptyState icon={<Receipt size={20} />} title={emptyTitle} description={emptyDescription} />
  }

  return (
    <ul className="divide-y divide-line">
      {transactions.map((transaction) => (
        <TransactionRow key={transaction.id} transaction={transaction} agentIdPrefix={agentIdPrefix} />
      ))}
    </ul>
  )
}
