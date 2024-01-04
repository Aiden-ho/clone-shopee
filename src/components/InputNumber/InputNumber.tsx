import { InputHTMLAttributes, forwardRef, useState } from 'react'
import type {} from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { YupValidationError } from 'src/types/YupValidationError.type'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | YupValidationError
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
    value = '', // Value có init string rỗng để phòng trường hợp ko truyền gì vào thì useState vẫn có giá trị đúng
    ...rest
  }: InputNumberProps,
  ref
) {
  //local state giúp handleChange vẫn hoạt động đúng dù ko nhận vào prop input
  // Nếu value ko được truyền vào thì input sẽ lấy giá tri6 từ local stage
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      //thực thi callback onchange truyền vào
      onChange && onChange(event)
      //Set lại giá trị localstate
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} value={value || localValue} ref={ref} />
      <ErrorMessage classNameError={classNameError} errorMessage={errorMessage} />
    </div>
  )
})

export default InputNumber
