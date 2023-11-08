import React from 'react'

export default function Product() {
  return (
    <div className='bg-white rounded-sm shadow-md cursor-pointer hover:translate-y-[-.0625rem] duration-100 transition-transform'>
      <div className='w-full pt-[100%] relative'>
        <img
          src='https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnkvqdsodksae1_tn'
          alt=''
          className='top-0 left-0 absolute'
        />
      </div>
      <div className='p-2'>
        <div className='text-xs line-clamp-2 min-h-[2rem]'>
          [ELSAMCE15 Giảm 15% CAP 3TR] Smart Tivi Samsung 65 Inch 4K QLED QA65Q60BAKXXV 2022 - Miễn phí lắp đặt
        </div>
        <div className='pt-1 text-sm flex gap-1'>
          <div className='text-gray-500 line-through'>
            <span className='text-xs'>₫</span>
            <span>8.490.000</span>
          </div>
          <div className='text-orange'>
            <span className='text-xs'>₫</span>
            <span>8.490.000</span>
          </div>
        </div>
        <div className='flex gap-2 mt-5'>
          <div className='flex gap-1'>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <svg viewBox='0 0 9.5 8' className='w-3 h-3'>
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
                </div>
              ))}
            <div className='relative'>
              <div className='absolute top-0 left-0 overflow-hidden w-[50%]'>
                <svg viewBox='0 0 9.5 8' className='w-3 h-3'>
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
              </div>
              <svg viewBox='0 0 30 30' className='w-3 h-3'>
                <defs>
                  <linearGradient id='star__hollow' x1='50%' x2='50%' y1='0%' y2='99.0177926%'>
                    <stop offset='0%' stopColor='#FFD211' />
                    <stop offset='100%' stopColor='#FFAD27' />
                  </linearGradient>
                </defs>
                <path
                  fill='none'
                  fillRule='evenodd'
                  stroke='url(#star__hollow)'
                  strokeWidth={2}
                  d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                />
              </svg>
            </div>
          </div>
          <div className='text-xs'>
            <span className='mr-1'>Đã bán</span>
            <span>3k</span>
          </div>
        </div>
      </div>
    </div>
  )
}
