/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>
  errorMessage?: string
  rule?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  className,
  name,
  register,
  errorMessage,
  rule,
  classNameInput = 'p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1rem] text-xs',
  ...rest
}: InputProps) {
  const registerRusult = register && name ? { ...register(name, rule) } : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...registerRusult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
