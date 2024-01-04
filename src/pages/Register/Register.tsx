import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import omit from 'lodash/omit'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerSchema, type RegisterFormDataType } from 'src/utils/ValidateRule'
import Input from 'src/components/Input'
import AuthApi from 'src/apis/auth.api'
import { isUnprocessableEntityError } from 'src/utils/axiosErrorChecker'
import { ErrorRespone } from 'src/types/Util.type'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path.constants'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = RegisterFormDataType

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const { t } = useTranslation(['login', 'error'])
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => AuthApi.registerApi(body),
    onSuccess: (res) => {
      setProfile(res.data.data.user)
      setIsAuthenticated(false)
      navigate(path.home)
    },
    onError: (error) => {
      if (isUnprocessableEntityError<ErrorRespone<Omit<FormData, 'confirm_password'>>>(error)) {
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
      <Helmet>
        <title>Trang đăng ký | Shopee Clone</title>
        <meta name='description' content='Trang đăng ký shopee clone' />
      </Helmet>
      <div className='container lg:bg-register_bg lg:bg-no-repeat lg:bg-cover'>
        <div className='grid grids-cols-1 lg:grid-cols-5 lg:py-24 py-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmitForm} className='p-8 rounded bg-white shadow-sm' noValidate>
              <div className='text-xl'>{t('register_form.title')}</div>
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
                <Button
                  isLoading={registerMutation.isPending}
                  disabled={registerMutation.isPending}
                  className='w-full text-center py-4 px-2 uppercase bg-orange text-white text-sm hover:bg-red-500 flex justify-center items-center align-middle'
                >
                  {t('register_form.button')}
                </Button>
              </div>
              {/* to login */}
              <div className='mt-8'>
                <div className='flex items-center justify-center gap-1'>
                  <span className='text-neutral-300'>{t('register_form.login_invite')}</span>
                  <Link className='text-orange' to={path.login}>
                    {t('register_form.login_nav')}
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
