/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

type Props = {
  className: string
  name: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  register: UseFormRegister<any>
  errorMessage?: string
  rule?: RegisterOptions
}

export default function Input({ className, name, type, placeholder, register, errorMessage, rule }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
        placeholder={placeholder}
        {...register(name, rule)}
      />
      <div className='mt-1 text-red-600 min-h-[1rem] text-xs'>{errorMessage}</div>
    </div>
  )
}
