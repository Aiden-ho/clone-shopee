import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import { changePasswordFormDataType, changePasswordSchema } from 'src/utils/ValidateRule'
import { toast } from 'react-toastify'
import { isUnprocessableEntityError } from 'src/utils/axiosErrorChecker'
import { ErrorRespone } from 'src/types/Util.type'
import Button from 'src/components/Button'
import UserAPi from 'src/apis/user.api'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

type FormData = changePasswordFormDataType

export default function ChangePasswords() {
  const { t } = useTranslation('user')
  const profileMutation = useMutation({
    mutationFn: UserAPi.uploadProfile
  })

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_new_password: ''
    },
    resolver: yupResolver<FormData>(changePasswordSchema)
  })

  const hanldeOnSubmit = handleSubmit(async (data) => {
    try {
      const res = await profileMutation.mutateAsync(omit(data, ['confirm_new_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      // Vì error avatr có thể là 413 , có thể là 422 nên cần phải kiểm tra để quăn lỗi
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

  return (
    <div className='bg-white shadow-sm rounded-sm px-8 pb-3' onSubmit={hanldeOnSubmit}>
      <Helmet>
        <title>Trang đổi mật khẩu | Shopee Clone</title>
        <meta name='description' content='Trang đổi mật khẩu shopee clone' />
      </Helmet>
      <div className='min-h-[81px] py-4 border-b-[1px] flex flex-col items-start justify-center'>
        <p className='text-gray-800 capitalize text-lg font-medium'>{t('password.title')}</p>
        <p className='text-gray-500 text-sm'>{t('password.sub_title')}</p>
      </div>
      <form className='flex flex-col-reverse md:flex-row md:items-start gap-8'>
        <div className='py-7 flex-grow'>
          <div className='flex flex-col lg:flex-row flex-wrap pb-3'>
            <div className='lg:w-[20%] text-sm text-gray-500 lg:text-right mb-1 lg:mb-0 lg:px-6 pt-2 capitalize'>
              <label htmlFor='password'>{t('password.current_pass')}</label>
            </div>
            <div className='lg:w-[80%] text-sm'>
              <Input
                id='password'
                name='password'
                type='password'
                classNameInput='w-full rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
                register={register}
                placeholder={t('password.current_pass_holder')}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row flex-wrap pb-3'>
            <div className='lg:w-[20%] text-sm text-gray-500 lg:text-right mb-1 lg:mb-0 lg:px-6 pt-2 capitalize'>
              <label htmlFor='new_password'>{t('password.new_pass')}</label>
            </div>
            <div className='lg:w-[80%] text-sm'>
              <Input
                id='new_password'
                name='new_password'
                type='password'
                classNameInput='w-full rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
                register={register}
                placeholder={t('password.new_pass_holder')}
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row flex-wrap pb-3'>
            <div className='lg:w-[20%] text-sm text-gray-500 lg:text-right mb-1 lg:mb-0 lg:px-6 pt-2 capitalize'>
              <label htmlFor='confirm_new_password'>{t('password.confirm_new_pass')}</label>
            </div>
            <div className='lg:w-[80%] text-sm'>
              <Input
                id='confirm_new_password'
                name='confirm_new_password'
                type='password'
                classNameInput='w-full rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
                register={register}
                placeholder={t('password.confirm_new_pass_holder')}
                errorMessage={errors.confirm_new_password?.message}
              />
            </div>
          </div>
          <div className='flex items-center flex-wrap lg:justify-center'>
            <div className='w-[20%] hidden lg:block'></div>
            <div className='lg:w-[80%]'>
              <Button type='submit' className='bg-orange px-6 py-3 text-white rounded-sm hover:bg-orange/90'>
                {t('password.save_btn')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
