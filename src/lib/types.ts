import type { LucideIcon } from 'lucide-react'

export type AccountKind = 'current' | 'savings' | 'deposit'

export interface Account {
  id: string
  nickname: string
  productName: string
  kind: AccountKind
  /** Masked display number, e.g. "•••• 4821". */
  maskedNumber: string
  iban: string
  branch: string
  currency: 'PKR'
  balance: number
  availableBalance: number
  /** Month-over-month change of the balance, as a percentage. */
  changePercent: number
  monthlyIncome: number
  monthlySpend: number
}

export type TransactionDirection = 'credit' | 'debit'

export type TransactionCategory =
  | 'Groceries'
  | 'Salary'
  | 'Utilities'
  | 'Shopping'
  | 'Transport'
  | 'Dining'
  | 'Transfer'
  | 'Mobile'
  | 'Housing'

export type TransactionTone = 'green' | 'brand' | 'cyan' | 'violet' | 'sky'

export interface Transaction {
  id: string
  accountId: string
  merchant: string
  category: TransactionCategory
  /** ISO-8601 date string. */
  date: string
  amount: number
  direction: TransactionDirection
  initials: string
  tone: TransactionTone
  reference: string
}

export type BeneficiaryBank =
  | 'Zenith Bank'
  | 'Meezan Bank'
  | 'HBL'
  | 'UBL'
  | 'Bank Alfalah'
  | 'JS Bank'

export type AvatarTone = 'lavender' | 'peach' | 'mint' | 'sky' | 'cyan'

export interface Beneficiary {
  id: string
  name: string
  initials: string
  tone: AvatarTone
  bank: BeneficiaryBank
  maskedNumber: string
  iban: string
  /** Per-payee daily transfer ceiling, in PKR. */
  transferLimit: number
  raastEnabled: boolean
  favourite: boolean
}

export type BillerCategory = 'Electricity' | 'Gas' | 'Internet' | 'Mobile' | 'Water' | 'Education'

export interface Biller {
  id: string
  name: string
  category: BillerCategory
  consumerNumber: string
  dueDate: string
  amountDue: number
  tone: 'brand' | 'accent' | 'positive' | 'sky'
}

export type CardKind = 'debit' | 'credit'
export type CardNetwork = 'VISA' | 'Mastercard' | 'PayPak'
export type CardStatus = 'active' | 'frozen' | 'blocked'

export interface BankCard {
  id: string
  accountId: string
  label: string
  kind: CardKind
  network: CardNetwork
  holder: string
  maskedNumber: string
  expiry: string
  pin: string
  status: CardStatus
  ecommerceEnabled: boolean
  contactlessEnabled: boolean
  internationalEnabled: boolean
  dailyLimit: number
  maxLimit: number
  spentToday: number
  /** Tailwind gradient classes for the card face. */
  gradient: string
}

export interface SpendingCategory {
  id: string
  label: string
  amount: number
  percent: number
  colorClass: string
  hex: string
}

export type TransferMode = 'ibft' | 'own'

export interface TransferDraft {
  mode: TransferMode
  fromAccountId: string
  beneficiaryId: string | null
  toAccountId: string | null
  amount: string
  note: string
  raast: boolean
}

export interface BillDraft {
  billerId: string | null
  fromAccountId: string
  amount: string
  standingInstruction: boolean
  scheduledFor: string
}

export interface Merchant {
  id: string
  name: string
  city: string
  category: string
  merchantId: string
}

export interface QrPaymentDraft {
  merchant: Merchant | null
  amount: string
  note: string
}

export interface Branch {
  id: string
  name: string
  type: 'branch' | 'atm'
  address: string
  city: string
  timings: string
  services: string[]
  distanceKm: number
}

export type NotificationKind = 'transaction' | 'security' | 'promo' | 'system'

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  body: string
  timestamp: string
  read: boolean
}

export interface ChatMessage {
  id: string
  from: 'user' | 'assistant'
  text: string
}

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  agentId: string
  /** Route prefixes that should also light up this tab. */
  matches?: string[]
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface ServiceLink {
  href: string
  label: string
  description: string
  icon: LucideIcon
  agentId: string
}
