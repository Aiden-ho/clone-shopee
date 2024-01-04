import { InputHTMLAttributes } from 'react'
import { FieldPath, FieldValues, useController, type UseControllerProps } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'

export interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}

/**
 * - Input này sử dụng UseController của react-hook-form
 * - Nhận vào string và number tùy theo type
 * - Không thể sử dụng kết hợp với các input extenal khác
 */

// Phần generic dùng để lấy generic từ control và gợi ý value cần có cho name props
// Cần tìm hiểu thêm
function InputV2<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseControllerProps<TFieldValues, TName> & InputV2Props) {
  // Thay vì sử dụng field quản lý từ bên ngoài thì usecontroller quảng lí field từ bên trong component
  // Do đó ko có trường hợp coder quên truyền value, nên ko cần localValue luôn
  // Nếu có nhu cầu truyền value từ bên ngoài vào thì cần customize sao cho hợp lý
  const {
    className,
    type,
    classNameInput = 'p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1rem] text-xs',
    onChange,
    ...rest
  } = props
  const { field, fieldState } = useController(props) // Khi vực lấy các giá trị cũng như event tương tác với stage của input này
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: valueForm } = event.target
    //Nếu type là number thì phải thoải những điều kiện lọc chỉ nhận số hoặc rỗng
    const numberCodittion = type === 'number' && (/^\d+$/.test(valueForm) || valueForm === '')
    // nếu type khác number thì không cần , để dùng cho cả string
    if (numberCodittion || type !== 'number') {
      //thực thi callback onchange truyền vào
      onChange && onChange(event)
      //set lại giá trị state cho react form hook
      field.onChange(valueForm)
    }
  }

  return (
    <div className={className}>
      {/* vì rest và field đều có onChange, value... nên nếu muốn ghi đè thì phải để sau hai thằng này */}
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} />
      <ErrorMessage classNameError={classNameError} errorMessage={fieldState.error?.message} />
    </div>
  )
}

export default InputV2
