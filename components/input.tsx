import { forwardRef, type InputHTMLAttributes } from 'react'
import { type FieldError } from 'react-hook-form'

import { cn } from '@/utils/classnames'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'htmlFor'> & {
  label: string
  error?: FieldError
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, name, error, ...props }, ref) => {
    return (
      <div className='group relative'>
        <input
          ref={ref}
          {...props}
          name={name}
          id={name}
          className='peer w-full rounded-full border border-zinc-200 bg-white px-4 py-2 text-base text-zinc-800 outline-none placeholder:text-transparent'
          placeholder={label}
        />
        <label
          htmlFor={name}
          className={cn(
            'absolute -top-2 left-2 cursor-text text-xs text-zinc-500 transition-all',
            'peer-focus-visible:-top-2 peer-focus-visible:left-2 peer-focus-visible:cursor-default peer-focus-visible:text-xs peer-focus-visible:text-zinc-700',
            'peer-placeholder-shown:left-4 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base',
          )}
        >
          {label}
        </label>
        {error && <span className='text-sm text-primary'>{error.message}</span>}
      </div>
    )
  },
)
Input.displayName = 'Input'
