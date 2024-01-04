import range from 'lodash/range'
import { useEffect, useState } from 'react'
import ErrorMessage from '../ErrorMessage'
import { YupValidationError } from 'src/types/YupValidationError.type'

type DateSelectProps = {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string | YupValidationError
}

export default function DateSelect({ onChange, value, errorMessage }: DateSelectProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: Number(value.getDate()),
        month: Number(value.getMonth()),
        year: Number(value.getFullYear())
      })
    }
  }, [value])

  const handlerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    const newDate = {
      ...date,
      [name]: Number(value)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex flex-wrap pb-7'>
      <div className='w-[20%] text-sm text-gray-500 text-right px-6 pt-2 capitalize'>
        <label htmlFor='dayOfBirth'>Ngày sinh</label>
      </div>
      <div className='w-[80%] text-sm'>
        <div className='flex gap-7'>
          <select
            name='date'
            className='flex-1 rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
            onChange={handlerChange}
            value={value?.getDate() || date.date}
          >
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            className='flex-1 rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
            onChange={handlerChange}
            value={value?.getMonth() || date.month}
          >
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            className='flex-1 rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
            onChange={handlerChange}
            value={value?.getFullYear() || date.year}
          >
            {range(1910, 2025).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <ErrorMessage classNameError={'mt-1 text-red-600 min-h-[1rem] text-xs'} errorMessage={errorMessage} />
      </div>
    </div>
  )
}
