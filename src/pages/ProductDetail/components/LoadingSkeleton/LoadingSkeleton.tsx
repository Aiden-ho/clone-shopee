import { Fragment } from 'react'
import { ProductSkeleton } from 'src/pages/ProductList/components/LoadingSkeleton/LoadingSkeleton'
import { getRandomInt } from 'src/utils/utils'

export default function LoadingSkeleton() {
  return (
    <Fragment>
      <div className='container bg-white p-4 animate-pulse'>
        <div className='grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-10'>
          <div className='col-span-4 md:col-span-4 lg:col-span-5'>
            <div className='align-middle pt-[100%] bg-gray-300 overflow-hidden w-full relative'>
              <svg
                className='absolute top-[50%] right-[50%] translate-x-[50%] w-10 h-10 text-gray-200'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
            <div className='relative w-full'>
              <div className='grid grid-cols-5 gap-2 mt-4'>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className='relative col-span-1 pt-[100%] bg-gray-300  shadow rounded-sm'>
                      <svg
                        className='absolute top-[30%] right-[50%] translate-x-[40%] w-6 h-6 lg:w-10 lg:h-10 text-gray-200'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 20 18'
                      >
                        <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                      </svg>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='col-span-4 md:col-span-4 lg:col-span-7'>
            <div className='bg-gray-200 rounded-sm w-full mb-1 h-6'></div>
            <div className='flex pt-3'>
              <div className='flex gap-1 items-center pr-4 min-w-[5rem] lg:min-w-[10rem]'>
                <div className='bg-gray-200 rounded-sm w-full mb-1 h-2'></div>
              </div>
              <div className='flex md:flex-col lg:flex-row gap-1 items-center px-4 border-l border-gray-300 min-w-[6rem] lg:min-w-[10rem]'>
                <div className='bg-gray-200 rounded-sm w-full mb-1 h-2'></div>
              </div>
              <div className='flex md:flex-col lg:flex-row gap-1 items-center px-4 border-l border-gray-300 min-w-[6rem] lg:min-w-[10rem]'>
                <div className='bg-gray-200 rounded-sm w-full mb-1 h-2'></div>
              </div>
            </div>
            <div className='mt-8 bg-gray-100 w-full flex items-center rounded-sm py-7 px-4'>
              <div className='mr-3 min-w-[5rem] lg:min-w-[10rem]'>
                <div className='bg-gray-200 rounded-sm w-full mb-1 h-3'></div>
              </div>
              <div className='flex items-center text-orange text-3xl font-medium mr-3 min-w-[5rem] lg:min-w-[10rem]'>
                <div className='bg-gray-200 rounded-sm w-full mb-1 h-3'></div>
              </div>
              <div className='text-xs text-white px-1 rounded-sm min-w-[3rem] '>
                <div className='bg-gray-200 rounded-sm w-full mb-1 h-2'></div>
              </div>
            </div>
            <div className='mt-8 flex items-center gap-4'>
              <span className='capitalize text-gray-500 text-sm w-16'>
                <div className='bg-gray-200 rounded-sm w-full mb-1 h-2.5'></div>
              </span>
              <div className='flex items-center gap-4'>
                <div className='bg-gray-200 rounded-sm min-w-[7rem] lg:min-w-[10rem] mb-1 h-10'></div>
                <span className='text-sm text-gray-500 min-w-[5rem] lg:min-w-[7rem]'>
                  <div className='bg-gray-200 rounded-sm w-full mb-1 h-2.5'></div>
                </span>
              </div>
            </div>
            <div className='mt-8 flex gap-4'>
              <div className='flex-1 md:flex-initial lg:flex-initial '>
                <div className='bg-gray-200 rounded-sm min-w-[7rem] lg:min-w-[10rem] mb-1 h-10'></div>
              </div>
              <div className='bg-gray-200 rounded-sm min-w-[7rem] lg:min-w-[10rem] mb-1 h-10'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='container bg-white p-4 mt-8'>
        <div className=' bg-gray-100 w-full flex items-center rounded-sm py-2 px-3 text-lg uppercase'>
          <div className='bg-gray-200 rounded-sm w-[20%] mb-1 h-4'></div>
        </div>
        <div className='mt-4 flex flex-wrap gap-3'>
          {Array(30)
            .fill(0)
            .map((_, index) => {
              const width = getRandomInt(20, 50)
              return (
                <div key={index} className='bg-gray-200 rounded-sm w-full h-2.5' style={{ width: `${width}rem` }}></div>
              )
            })}
        </div>
        <div className='mt-4 container px-4 lg:px-0'>
          <div className=' flex items-center rounded-sm py-3 text-lg uppercase text-gray-600'>
            <div className='bg-gray-200 rounded-sm w-[20%] mb-1 h-4'></div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
            {Array(10)
              .fill(0)
              .map((_, index) => {
                return <ProductSkeleton key={index} />
              })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
