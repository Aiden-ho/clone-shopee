import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'

export default function AsideFilter() {
  return (
    <div>
      <Link
        to='/'
        className='flex flex-row gap-3 items-center align-middle capitalize font-semibold text-gray-800 tracking-tight py-3'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        <span>Tất cả danh mục</span>
      </Link>
      <div className='bg-gray-200 h-[1px] w-full my-2'></div>
      <ul className='text-sm'>
        <li className='py-2 px-3'>
          <Link to='/' className='text-orange font-semibold relative'>
            <svg
              viewBox='0 0 4 7'
              className='fill-orange h-2 w-2 absolute left-[-12px] top-1/2 transform -translate-y-1/2'
            >
              <polygon points='4 3.5 0 0 0 7'></polygon>
            </svg>
            Thiết bị điện tử
          </Link>
        </li>
        <li className='py-2 px-3'>
          <Link to='/'>Thiết bị đeo thông minh</Link>
        </li>
        <li className='py-2 px-3'>
          <Link to='/'>Phụ kiện tivi</Link>
        </li>
        <li className='py-2 px-3'>
          <Link to='/'>Máy Game Console</Link>
        </li>
      </ul>
      <div className='flex flex-row gap-3 items-center align-middle uppercase font-semibold text-gray-800 tracking-tight my-6'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-3 h-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        Bộ Lọc Tìm Kiếm
      </div>
      <div className='text-sm capitalize'>
        <span>Khoảng giá</span>
        <form className='mt-5'>
          <div className='flex flex-row items-start gap-3 '>
            <Input
              className='grow'
              name='pricefrom'
              type='number'
              clasNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
              placeholder='₫ TỪ'
            />
            <div className='h-[1px] bg-gray-400 mt-3 w-5 flex-shrink-0'></div>
            <Input
              className='grow'
              name='pricefrom'
              type='number'
              clasNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm appearance-none'
              placeholder='₫ ĐẾN'
            />
          </div>

          <Button className='uppercase w-full text-white bg-orange hover:opacity-90 py-[5px]'>Áp dụng</Button>
        </form>
      </div>
      <div className='bg-gray-200 h-[1px] w-full my-6'></div>
      <div className='text-sm capitalize'>
        <span>Đánh giá</span>
        <div className='mt-5'>
          <div className='flex gap-1 items-center py-1 px-3'>
            <div className='flex gap-2'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg key={index} viewBox='0 0 9.5 8' className='w-4 h-4'>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
            </div>
            <span>Trở lên</span>
          </div>
          <div className='flex gap-1 items-center py-1 px-3'>
            <div className='flex gap-2'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg key={index} viewBox='0 0 9.5 8' className='w-4 h-4'>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
            </div>
            <span>Trở lên</span>
          </div>
        </div>
      </div>
      <div className='bg-gray-200 h-[1px] w-full my-6'></div>
      <Button className='uppercase w-full text-white bg-orange hover:opacity-90 py-[5px] text-sm'>Xóa tất cả</Button>
    </div>
  )
}
