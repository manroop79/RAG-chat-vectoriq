import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const VARIANT_STYLES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'border border-transparent bg-cyan-500 text-slate-950 hover:border-cyan-400 hover:bg-slate-950 hover:text-cyan-200 focus-visible:ring-cyan-300 disabled:bg-cyan-500/40',
  secondary:
    'border border-slate-800 bg-slate-800 text-slate-100 hover:border-cyan-400 hover:bg-slate-950 hover:text-cyan-200 focus-visible:ring-cyan-400/40 disabled:bg-slate-800/40',
  ghost:
    'border border-transparent bg-transparent text-slate-300 hover:border-cyan-400 hover:bg-slate-950 hover:text-cyan-200 focus-visible:ring-slate-600 disabled:text-slate-500',
}

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => (
  <button
    {...props}
    className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${className}`}
  />
)

