import { Link } from 'react-router-dom'
import path from 'src/constants/path.constants'

export default function NotFound() {
  return (
    <section className='bg-white'>
      <div className='mx-auto py-16 px-6'>
        <div className='mx-auto text-center'>
          <h1 className='text-gray-500 mb-4 text-7xl tracking-tight font-bold lg:text-9xl'>404</h1>
          <p className='mb-4 text-3xl tracking-tight font-semibold text-gray-600 md:text-4xl'>Trang không tồn tại.</p>
          <p className='mb-4 text-lg font-light text-gray-600 dark:text-gray-400'>
            Xin lỗi, chúng tôi không tìm thấy trang. Bạn sẽ tìm thấy nhiều thứ thú vị hơn ở trang chủ.
          </p>
          <Link
            to={path.home}
            className='bg-orange inline-flex text-white bg-primary-600 font-medium rounded-sm px-5 py-2.5 text-center my-4'
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </section>
  )
}
