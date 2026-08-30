import { cn } from '@/lib/cn'
import type { AvatarTone } from '@/lib/types'

const TONES: Record<AvatarTone | 'brand', string> = {
  lavender: 'bg-[#e6e0fb] text-[#6a5aa8]',
  peach: 'bg-[#f8ded0] text-[#a2643f]',
  mint: 'bg-[#d2f1e5] text-positive-600',
  sky: 'bg-[#d9e8fa] text-[#3d6bb5]',
  cyan: 'bg-accent-100 text-accent-600',
  brand: 'bg-brand-50 text-brand-700',
}

const SIZES = {
  sm: 'h-8 w-8 text-2xs',
  md: 'h-10 w-10 text-xs',
  lg: 'h-12 w-12 text-sm',
  xl: 'h-16 w-16 text-lg',
} as const

export interface AvatarProps {
  initials: string
  tone?: AvatarTone | 'brand'
  size?: keyof typeof SIZES
  className?: string
  square?: boolean
}

export function Avatar({ initials, tone = 'brand', size = 'md', className, square }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid shrink-0 place-items-center font-bold uppercase',
        square ? 'rounded-xl' : 'rounded-full',
        TONES[tone],
        SIZES[size],
        className,
      )}
    >
      {initials}
    </span>
  )
}
