import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { omit } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { schema, RegisterFormSchema } from 'src/utils/RegisterValidateRule'
import Input from 'src/components/Input'
import { registerApi } from 'src/apis/auth.api'
import { isUnprocessableEntityError } from 'src/utils/axiosErrorChecker'
import { ResponseApi } from 'src/types/Util.type'

type FormData = RegisterFormSchema

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerApi(body),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      if (isUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
        const errorFrom = error.response?.data.data

        if (errorFrom) {
          // Nếu là lỗi cụ thể từ server thì set lại error cho field tương ứng
          Object.keys(errorFrom).forEach((key) => {
            setError(key as keyof Omit<FormData, 'confirm_password'>, {
              message: errorFrom[key as keyof Omit<FormData, 'confirm_password'>],
              // Type để nhận biết nguồn lỗi
              type: 'server'
            })
          })
        }
      }
    }
  })

  const handleSubmitForm = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])

    registerMutation.mutate(body)
  })

  return (
    <div className='bg-orange'>
      <div className='container lg:bg-register_bg lg:bg-no-repeat lg:bg-cover'>
        <div className='grid grids-cols-1 lg:grid-cols-5 lg:py-24 py-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmitForm} className='p-8 rounded bg-white shadow-sm' noValidate>
              <div className='text-xl'>Đăng ký</div>
              {/* email */}
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
                name='email'
              />
              {/* password */}
              <Input
                className='mt-3'
                type='password'
                placeholder='Password'
                register={register}
                errorMessage={errors.password?.message}
                name='password'
              />
              {/* confirm password */}
              <Input
                className='mt-3'
                type='password'
                placeholder='Confirm Password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                name='confirm_password'
              />

              {/* button */}
              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-orange text-white text-sm hover:bg-red-500'>
                  Đăng ký
                </button>
              </div>
              {/* to login */}
              <div className='mt-8'>
                <div className='flex items-center justify-center gap-1'>
                  <span className='text-neutral-300'>Bạn đã có tài khoản?</span>
                  <Link className='text-orange' to='/login'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
