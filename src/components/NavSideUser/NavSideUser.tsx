import React from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constants'

export default function NavSideUser() {
  return (
    <div>
      <div className='flex items-center gap-3 border-b-[1px] min-h-[81px] py-4'>
        <div className='h-12 w-12 flex-shrink-0'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/1053/1053244.png'
            alt='avatar'
            className='w-full h-full rounded'
          />
        </div>
        <div className='flex-grow'>
          <div className='text-sm font-semibold text-gray-800 mb-1'>Kiet Ho</div>
          <Link
            to={path.profile}
            className='flex items-center align-bottom font-medium text-sm text-gray-400 hover:text-gray-500 gap-1'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5'>
              <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z' />
              <path d='M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z' />
            </svg>

            <span>Sửa Hồ Sơ</span>
          </Link>
        </div>
      </div>
      <div className='flex flex-col gap-3 py-4'>
        <Link to={path.profile}>
          <div className='flex align-middle items-center hover:text-orange'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5 stroke-blue-500 mr-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
            <span className='text-sm capitalize'>Tài khoản của tôi</span>
          </div>
        </Link>
        <Link to={path.passwords}>
          <div className='flex align-middle items-center hover:text-orange'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5 stroke-green-500 mr-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
            <span className='text-sm capitalize'>Thay đổi mật khẩu</span>
          </div>
        </Link>
        <Link to={path.purchases}>
          <div className='flex align-middle items-center hover:text-orange'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5 stroke-orange mr-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
              />
            </svg>
            <span className='text-sm capitalize'>Đơn mua</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
