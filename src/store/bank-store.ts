'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  ASSISTANT_FALLBACK,
  ASSISTANT_REPLIES,
  accounts,
  beneficiaries as seedBeneficiaries,
  cards as seedCards,
  notifications as seedNotifications,
} from '@/lib/mock-data'
import type {
  Account,
  AppNotification,
  BankCard,
  Beneficiary,
  BillDraft,
  ChatMessage,
  Merchant,
  QrPaymentDraft,
  TransferDraft,
  TransferMode,
} from '@/lib/types'

const DEFAULT_ACCOUNT_ID = accounts[0].id

const emptyTransfer: TransferDraft = {
  mode: 'ibft',
  fromAccountId: DEFAULT_ACCOUNT_ID,
  beneficiaryId: seedBeneficiaries[0].id,
  toAccountId: accounts[1].id,
  amount: '',
  note: '',
  raast: true,
}

const emptyBill: BillDraft = {
  billerId: null,
  fromAccountId: DEFAULT_ACCOUNT_ID,
  amount: '',
  standingInstruction: false,
  scheduledFor: '',
}

const emptyQr: QrPaymentDraft = {
  merchant: null,
  amount: '',
  note: '',
}

export interface BankState {
  /** Mock session flag — no credentials are ever checked or stored. */
  isAuthenticated: boolean
  hydrated: boolean
  selectedAccountId: string
  showBalance: boolean
  beneficiaries: Beneficiary[]
  cards: BankCard[]
  notifications: AppNotification[]
  transfer: TransferDraft
  bill: BillDraft
  qr: QrPaymentDraft
  chat: ChatMessage[]
  chatOpen: boolean

  login: () => void
  logout: () => void
  setHydrated: () => void

  selectAccount: (accountId: string) => void
  toggleBalance: () => void

  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id' | 'initials' | 'tone'>) => Beneficiary
  removeBeneficiary: (beneficiaryId: string) => void
  toggleFavourite: (beneficiaryId: string) => void

  updateCard: (cardId: string, patch: Partial<BankCard>) => void

  setTransfer: (patch: Partial<TransferDraft>) => void
  setTransferMode: (mode: TransferMode) => void
  resetTransfer: () => void

  setBill: (patch: Partial<BillDraft>) => void
  resetBill: () => void

  setQr: (patch: Partial<QrPaymentDraft>) => void
  selectMerchant: (merchant: Merchant) => void
  resetQr: () => void

  openChat: () => void
  closeChat: () => void
  sendChatMessage: (text: string) => void
  clearChat: () => void

  markNotificationRead: (notificationId: string) => void
  markAllNotificationsRead: () => void
}

const AVATAR_TONES = ['lavender', 'peach', 'mint', 'sky', 'cyan'] as const

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

/** Canned, fully local assistant reply — no network request is ever made. */
function assistantReply(text: string): string {
  return ASSISTANT_REPLIES.find((entry) => entry.match.test(text))?.reply ?? ASSISTANT_FALLBACK
}

let messageCounter = 0
function nextId(prefix: string): string {
  messageCounter += 1
  return `${prefix}-${messageCounter}`
}

export const useBankStore = create<BankState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      hydrated: false,
      selectedAccountId: DEFAULT_ACCOUNT_ID,
      showBalance: true,
      beneficiaries: seedBeneficiaries,
      cards: seedCards,
      notifications: seedNotifications,
      transfer: emptyTransfer,
      bill: emptyBill,
      qr: emptyQr,
      chat: [],
      chatOpen: false,

      login: () => set({ isAuthenticated: true }),
      logout: () =>
        set({
          isAuthenticated: false,
          selectedAccountId: DEFAULT_ACCOUNT_ID,
          transfer: emptyTransfer,
          bill: emptyBill,
          qr: emptyQr,
          chat: [],
          chatOpen: false,
        }),
      setHydrated: () => set({ hydrated: true }),

      selectAccount: (accountId) =>
        set((state) => ({
          selectedAccountId: accountId,
          transfer: { ...state.transfer, fromAccountId: accountId },
          bill: { ...state.bill, fromAccountId: accountId },
        })),
      toggleBalance: () => set((state) => ({ showBalance: !state.showBalance })),

      addBeneficiary: (input) => {
        const beneficiary: Beneficiary = {
          ...input,
          id: nextId('beneficiary'),
          initials: initialsFor(input.name),
          tone: AVATAR_TONES[get().beneficiaries.length % AVATAR_TONES.length],
        }
        set((state) => ({ beneficiaries: [...state.beneficiaries, beneficiary] }))
        return beneficiary
      },
      removeBeneficiary: (beneficiaryId) =>
        set((state) => ({
          beneficiaries: state.beneficiaries.filter((entry) => entry.id !== beneficiaryId),
          transfer:
            state.transfer.beneficiaryId === beneficiaryId
              ? { ...state.transfer, beneficiaryId: null }
              : state.transfer,
        })),
      toggleFavourite: (beneficiaryId) =>
        set((state) => ({
          beneficiaries: state.beneficiaries.map((entry) =>
            entry.id === beneficiaryId ? { ...entry, favourite: !entry.favourite } : entry,
          ),
        })),

      updateCard: (cardId, patch) =>
        set((state) => ({
          cards: state.cards.map((card) => (card.id === cardId ? { ...card, ...patch } : card)),
        })),

      setTransfer: (patch) => set((state) => ({ transfer: { ...state.transfer, ...patch } })),
      setTransferMode: (mode) => set((state) => ({ transfer: { ...state.transfer, mode } })),
      resetTransfer: () =>
        set((state) => ({ transfer: { ...emptyTransfer, fromAccountId: state.selectedAccountId } })),

      setBill: (patch) => set((state) => ({ bill: { ...state.bill, ...patch } })),
      resetBill: () => set((state) => ({ bill: { ...emptyBill, fromAccountId: state.selectedAccountId } })),

      setQr: (patch) => set((state) => ({ qr: { ...state.qr, ...patch } })),
      selectMerchant: (merchant) => set((state) => ({ qr: { ...state.qr, merchant } })),
      resetQr: () => set({ qr: emptyQr }),

      openChat: () => set({ chatOpen: true }),
      closeChat: () => set({ chatOpen: false }),
      sendChatMessage: (text) =>
        set((state) => ({
          chat: [
            ...state.chat,
            { id: nextId('msg'), from: 'user', text },
            { id: nextId('msg'), from: 'assistant', text: assistantReply(text) },
          ],
        })),
      clearChat: () => set({ chat: [] }),

      markNotificationRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((entry) =>
            entry.id === notificationId ? { ...entry, read: true } : entry,
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((entry) => ({ ...entry, read: true })),
        })),
    }),
    {
      name: 'zenith-ui',
      storage: createJSONStorage(() => localStorage),
      // Only session-shaped preferences persist; drafts always start clean.
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        selectedAccountId: state.selectedAccountId,
        showBalance: state.showBalance,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
)

export function selectAccounts(): Account[] {
  return accounts
}
