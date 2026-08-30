'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export interface ToastState {
  message: string
  tone: 'success' | 'info'
}

export interface UseToast {
  toast: ToastState | null
  showToast: (message: string, tone?: ToastState['tone']) => void
  dismissToast: () => void
}

/** Transient confirmation banner used by the mock service requests. */
export function useToast(duration = 4000): UseToast {
  const [toast, setToast] = useState<ToastState | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismissToast = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    setToast(null)
  }, [])

  const showToast = useCallback(
    (message: string, tone: ToastState['tone'] = 'success') => {
      if (timer.current) clearTimeout(timer.current)
      setToast({ message, tone })
      timer.current = setTimeout(() => setToast(null), duration)
    },
    [duration],
  )

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  return { toast, showToast, dismissToast }
}
