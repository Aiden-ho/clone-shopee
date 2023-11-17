import Button from '../Button'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface QuantityControllerProps extends InputNumberProps {
  classNameWraper?: string
  max?: number
  onDecrease?: (value: string) => void
  onIncrease?: (value: string) => void
  onType?: (value: string) => void //thay thế onchange vì tránh over wirte và tránh lỗi vì InputNumberProps có onChange nhận vào event thay vì value
  onOutFocus?: (value: string) => void //thay thế onblur vì tránh over wirte
}

export default function QuantityController({
  onType,
  onDecrease,
  onIncrease,
  max,
  classNameWraper,
  value,
  onOutFocus,
  ...rest
}: QuantityControllerProps) {
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   let _value = Number(event.target.value)

  //   onType && onType(_value)
  // }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onType) {
      onType(value)
    }
  }

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onOutFocus && onOutFocus(_value.toString())
  }

  const hanldeOnIncrease = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value.toString())
  }
  const hanldeOnDecrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value.toString())
  }

  const turnOfSubmit = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault()

  return (
    <form className={`${classNameWraper} flex items-center`} onSubmit={turnOfSubmit}>
      <Button
        className='border w-8 h-8 flex items-center justify-center rounded-sm border-gray-300'
        onClick={hanldeOnDecrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
        </svg>
      </Button>
      <InputNumber
        classNameInput='h-8 w-14 px-2 border-y border-gray-300 text-center'
        classNameError='hidden'
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        {...rest}
      />
      <Button
        className='border w-8 h-8 flex items-center justify-center rounded-sm border-gray-300'
        onClick={hanldeOnIncrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
        </svg>
      </Button>
    </form>
  )
}
