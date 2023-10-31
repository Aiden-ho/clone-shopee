import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4 lg:bg-register_bg lg:bg-no-repeat  lg:bg-cover'>
        <div className='grid grids-cols-1 lg:grid-cols-5 lg:py-24 py-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form action='' className='p-8 rounded bg-white shadow-sm'>
              <div className='text-xl'>Đăng nhập</div>
              {/* email */}
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
                  placeholder='Email'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-xs'></div>
              </div>
              {/* password */}
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='p-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
                  placeholder='Password'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-xs'></div>
              </div>
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
