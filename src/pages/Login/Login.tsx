import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginFormDataType } from 'src/utils/ValidateRule'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { isUnprocessableEntityError } from 'src/utils/axiosErrorChecker'
import { ErrorRespone } from 'src/types/Util.type'
import AuthApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path.constants'

type FormData = LoginFormDataType

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => AuthApi.loginApi(body),
    onSuccess: (res) => {
      setProfile(res.data.data.user)
      setIsAuthenticated(true)
      navigate(path.home)
    },
    onError: (error) => {
      if (isUnprocessableEntityError<ErrorRespone<FormData>>(error)) {
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
                <Button
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                  className='w-full text-center py-4 px-2 uppercase bg-orange text-white text-sm hover:bg-red-500 flex justify-center items-center align-middle'
                >
                  Đăng nhập
                </Button>
              </div>
              {/* to register */}
              <div className='mt-8'>
                <div className='flex items-center justify-center gap-1'>
                  <span className='text-neutral-300'>Bạn chưa có tài khoản?</span>
                  <Link className='text-orange' to={path.register}>
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
