import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import UserAPi from 'src/apis/user.api'
import Button from 'src/components/Button'
import DateSelect from 'src/components/DateSelect'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/context/app.context'
import { profileFormDataType, profileSchema } from 'src/utils/ValidateRule'
import { setProfileToLS } from 'src/utils/auth'

type FormData = profileFormDataType

export default function Profile() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      date_of_birth: new Date(1990, 0, 1) // 1/1/1990
    },
    resolver: yupResolver<FormData>(profileSchema)
  })
  const { setProfile } = useContext(AppContext)
  const { data: dataProfile, refetch } = useQuery({ queryKey: ['profile'], queryFn: () => UserAPi.getProfile() })
  const profile = dataProfile?.data.data

  const profileMutation = useMutation({
    mutationFn: UserAPi.uploadProfile
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('address', profile.address)
      setValue('phone', profile.phone)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const hanldeOnSubmit = handleSubmit(async (data) => {
    const res = await profileMutation.mutateAsync({ ...data, date_of_birth: data.date_of_birth?.toISOString() })
    refetch()
    setProfile(res.data.data)
    setProfileToLS(res.data.data)
    toast.success(res.data.message)
  })

  return (
    <div className='bg-white shadow-sm rounded-sm px-8 pb-3'>
      <div className='min-h-[81px] py-4 border-b-[1px] flex flex-col items-start justify-center'>
        <p className='text-gray-800 capitalize text-lg font-medium'>Hồ sơ của tôi</p>
        <p className='text-gray-500 text-sm'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <form className='flex flex-col-reverse md:flex-row md:items-start gap-8' onSubmit={hanldeOnSubmit}>
        <div className='py-7 flex-grow'>
          <div className='flex items-center flex-wrap pb-7 justify-center'>
            <div className='w-[20%] text-sm text-gray-500 text-right px-6 capitalize'>Email</div>
            <div className='w-[80%] text-sm'>ho*************@gmail.com</div>
          </div>
          <div className='flex flex-wrap pb-3'>
            <div className='w-[20%] text-sm text-gray-500 text-right px-6 pt-2 capitalize'>
              <label htmlFor='name'>Tên</label>
            </div>
            <div className='w-[80%] text-sm'>
              <Input
                id='name'
                name='name'
                classNameInput='w-full rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
                register={register}
                placeholder='Tên người dùng'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='flex flex-wrap pb-3'>
            <div className='w-[20%] text-sm text-gray-500 text-right px-6 pt-2 capitalize'>
              <label htmlFor='phone'>Số điện thoại</label>
            </div>
            <div className='w-[80%] text-sm'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    id='phone'
                    classNameInput='w-full rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    {...field}
                    onChange={field.onChange}
                    value={field.value}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex flex-wrap pb-3'>
            <div className='w-[20%] text-sm text-gray-500 text-right px-6 pt-2 capitalize'>
              <label htmlFor='phone'>Địa chỉ</label>
            </div>
            <div className='w-[80%] text-sm'>
              <Input
                id='address'
                name='address'
                classNameInput='w-full rounded-sm outline-none border border-gray-300 px-3 py-2 focus:border-gray-500 focus:shadow-sm'
                register={register}
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect onChange={field.onChange} value={field.value} errorMessage={errors.date_of_birth?.message} />
            )}
          />

          <div className='flex items-center flex-wrap justify-center'>
            <div className='w-[20%]'></div>
            <div className='w-[80%]'>
              <Button type='submit' className='bg-orange px-6 py-3 text-white rounded-sm hover:bg-orange/90'>
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='md:w-80 py-7'>
          <div className='border-l-[1px] w-full flex flex-col justify-center items-center gap-3'>
            <div className='h-24 w-24 mb-3'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
                alt='avatar'
                className='w-full h-full rounded'
              />
            </div>
            <input type='file' name='avatar' className='hidden' accept='.jpg, .jpeg, .png' />
            <Button
              type='button'
              className='border border-gray-300 hover:bg-gray-100 px-4 py-2 text-sm text-gray-500 rounded-sm'
            >
              Chọn Ảnh
            </Button>
            <div className='flex flex-col items-start'>
              <span className='text-sm text-gray-400'>Dụng lượng file tối đa 1 MB</span>
              <span className='text-sm text-gray-400'>Định dạng:.JPEG, .PNG</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
