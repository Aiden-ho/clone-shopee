import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import getRule from 'src/utils/RegisterValidateRule'

type FormData = {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>()

  const rules = getRule(getValues)

  const handleSubmitForm = handleSubmit((data) => {
    // console.log(data)
  })
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4 lg:bg-register_bg lg:bg-no-repeat lg:bg-cover'>
        <div className='grid grids-cols-1 lg:grid-cols-5 lg:py-24 py-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form onSubmit={handleSubmitForm} className='p-8 rounded bg-white shadow-sm' noValidate>
              <div className='text-xl'>Đăng ký</div>
              {/* email */}
              <div className='mt-8'>
                <input
                  type='email'
                  className='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-xs'>{errors.email?.message}</div>
              </div>
              {/* password */}
              <div className='mt-3'>
                <input
                  type='password'
                  className='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
                  placeholder='Password'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-xs'>{errors.password?.message}</div>
              </div>
              {/* confirm password */}
              <div className='mt-3'>
                <input
                  type='password'
                  className='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
                  placeholder='Confirm Password'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-xs'>{errors.confirm_password?.message}</div>
              </div>

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
