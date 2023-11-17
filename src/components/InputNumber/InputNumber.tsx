import { InputHTMLAttributes, forwardRef } from 'react'
import type {} from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}
// Nếu dùng anonymous cho callback thì ts sẽ báo lỗi
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberforwardRef(
  {
    className,
    errorMessage,
    classNameInput = 'p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1rem] text-xs',
    onChange,
    ...rest
  }: InputNumberProps,
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
