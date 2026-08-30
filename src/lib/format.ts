const PKR = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  currencyDisplay: 'code',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const PKR_COMPACT = new Intl.NumberFormat('en-PK', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** "PKR 24,680.42" — the canonical amount format used across the app. */
export function formatCurrency(value: number | string): string {
  const amount = typeof value === 'string' ? Number.parseFloat(value) : value
  return PKR.format(Number.isFinite(amount) ? amount : 0).replace('PKR', 'PKR ').replace(/\s+/g, ' ')
}

/** "24,680" — for tight spots such as chart labels and limit sliders. */
export function formatAmount(value: number | string): string {
  const amount = typeof value === 'string' ? Number.parseFloat(value) : value
  return PKR_COMPACT.format(Number.isFinite(amount) ? amount : 0)
}

/** Signed amount for transaction rows, e.g. "+ PKR 4,280.00". */
export function formatSigned(value: number, direction: 'credit' | 'debit'): string {
  return `${direction === 'credit' ? '+' : '−'} ${formatCurrency(Math.abs(value))}`
}

// en-GB renders dates as "21 Mar 2024"; en-PK hyphenates them.
const DATE_FULL = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const DATE_SHORT = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
const DATE_DAY_MONTH = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })
const TIME_SHORT = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })

/** "Thursday, 21 March 2024" — used by the dashboard eyebrow. */
export function formatFullDate(date: Date | string): string {
  return DATE_FULL.format(toDate(date))
}

/** "21 Mar 2024" */
export function formatDate(date: Date | string): string {
  return DATE_SHORT.format(toDate(date))
}

/** "21 Mar 2024 • 10:42 AM" */
export function formatDateTime(date: Date | string): string {
  const parsed = toDate(date)
  return `${DATE_SHORT.format(parsed)} • ${TIME_SHORT.format(parsed)}`
}

/**
 * Human-friendly relative label with a time suffix, e.g. "Today, 10:42 AM".
 * Falls back to an absolute date beyond yesterday.
 */
export function formatRelativeDateTime(date: Date | string, now: Date = new Date()): string {
  const parsed = toDate(date)
  const days = dayDifference(parsed, now)
  const time = TIME_SHORT.format(parsed)
  if (days === 0) return `Today, ${time}`
  if (days === 1) return `Yesterday, ${time}`
  // Same-year dates drop the year so list rows do not truncate.
  const datePart =
    parsed.getFullYear() === now.getFullYear() ? DATE_DAY_MONTH.format(parsed) : DATE_SHORT.format(parsed)
  return `${datePart}, ${time}`
}

/** "2 hours ago" / "3 days ago" — used in the notifications list. */
export function formatTimeAgo(date: Date | string, now: Date = new Date()): string {
  const minutes = Math.max(1, Math.round((now.getTime() - toDate(date).getTime()) / 60000))
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  return formatDate(date)
}

/** "PK36 ALHB 0000 0011 2345 6702" grouped into readable blocks. */
export function formatIban(iban: string): string {
  return iban.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim()
}

/** Percentage with a single decimal only when it needs one. */
export function formatPercent(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`
}

/** Strips everything but digits and a single decimal point, for amount inputs. */
export function sanitiseAmount(input: string): string {
  const cleaned = input.replace(/[^\d.]/g, '')
  const [whole, ...rest] = cleaned.split('.')
  return rest.length ? `${whole}.${rest.join('').slice(0, 2)}` : whole
}

export function parseAmount(input: string): number {
  const value = Number.parseFloat(input)
  return Number.isFinite(value) ? value : 0
}

function toDate(date: Date | string): Date {
  return date instanceof Date ? date : new Date(date)
}

function dayDifference(date: Date, now: Date): number {
  const a = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const b = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return Math.round((b - a) / 86_400_000)
}
