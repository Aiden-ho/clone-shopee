import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoginFormSchema, schema } from 'src/utils/RegisterValidateRule'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { isUnprocessableEntityError } from 'src/utils/axiosErrorChecker'
import { ResponseApi } from 'src/types/Util.type'
import { loginApi } from 'src/apis/auth.api'

type FormData = LoginFormSchema

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema.omit(['confirm_password']))
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => loginApi(body),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      if (isUnprocessableEntityError<ResponseApi<FormData>>(error)) {
        const errorFrom = error.response?.data.data

        if (errorFrom) {
          // Nếu là lỗi cụ thể từ server thì set lại error cho field tương ứng
          Object.keys(errorFrom).forEach((key) => {
            setError(key as keyof FormData, {
              message: errorFrom[key as keyof FormData],
              // Type để nhận biết nguồn lỗi
              type: 'server'
            })
          })
        }
      }
    }
  })

  const handleSubmitForm = handleSubmit((body) => {
    loginMutation.mutate(body)
  })

  return (
    <div className='bg-orange'>
      <div className='container lg:bg-register_bg lg:bg-no-repeat  lg:bg-cover'>
        <div className='grid grids-cols-1 lg:grid-cols-5 lg:py-24 py-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmitForm} className='p-8 rounded bg-white shadow-sm' noValidate>
              <div className='text-xl'>Đăng nhập</div>
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
              {/* button */}
              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-orange text-white text-sm hover:bg-red-500'>
                  Đăng nhập
                </button>
              </div>
              {/* to register */}
              <div className='mt-8'>
                <div className='flex items-center justify-center gap-1'>
                  <span className='text-neutral-300'>Bạn chưa có tài khoản?</span>
                  <Link className='text-orange' to='/register'>
                    Đăng ký
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
