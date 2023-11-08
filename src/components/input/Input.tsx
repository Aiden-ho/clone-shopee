/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

type Props = {
  className: string
  name: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  register?: UseFormRegister<any>
  errorMessage?: string
  rule?: RegisterOptions
  clasNameInput?: string
  classNameError?: string
}

export default function Input({
  className,
  name,
  type,
  placeholder,
  register,
  errorMessage,
  rule,
  clasNameInput = 'p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1rem] text-xs'
}: Props) {
  const registerRusult = register && name ? { ...register(name, rule) } : {}
  return (
    <div className={className}>
      <input type={type} className={clasNameInput} placeholder={placeholder} {...registerRusult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
