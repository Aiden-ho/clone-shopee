export function ProductSkeleton() {
  return (
    <div className='bg-white rounded-sm'>
      <div className='w-full pt-[100%] relative animate-pulse'>
        <div className='flex items-center justify-center bg-gray-300 top-0 left-0 absolute w-full h-full'>
          <svg
            className='w-10 h-10 text-gray-200'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 18'
          >
            <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
          </svg>
        </div>
      </div>
      <div className='p-2'>
        <div className='bg-gray-200 rounded-sm w-full mb-1 h-2'></div>
        <div className='bg-gray-200 rounded-sm w-[80%] mb-4 h-2'></div>
        <div className='pt-1 text-sm flex flex-col gap-1'>
          <div className='bg-gray-200 rounded-sm w-full h-2'></div>
          <div className='bg-gray-200 rounded-sm w-full h-2'></div>
        </div>
        <div className='flex gap-2 mt-5 '>
          <div className='bg-gray-200 rounded-sm w-full h-2'></div>
          <div className='bg-gray-200 rounded-sm w-full h-2'></div>
        </div>
      </div>
    </div>
  )
}

function SidefilterSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='flex flex-row gap-3 items-end align-middle capitalize font-semibold tracking-tight py-3'>
        <svg
          className='w-6 h-6 text-gray-200'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 18'
        >
          <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
        </svg>
        <span className='w-full'>
          <div className='bg-gray-200 rounded-sm w-full mb-1 h-3'></div>
        </span>
      </div>
      <div className='bg-gray-200 h-[1px] w-full my-2.5'></div>
      <ul className='text-sm'>
        <li className='py-2 px-3'>
          <div className='bg-gray-200 rounded-sm w-full mb-1 h-2'></div>
        </li>
        <li className='py-2 px-3'>
          <div className='bg-gray-200 rounded-sm w-full mb-1 h-2'></div>
        </li>
        <li className='py-2 px-3'>
          <div className='bg-gray-200 rounded-sm w-full mb-1 h-2'></div>
        </li>
      </ul>
      <div className='flex flex-row gap-3 items-center align-middle uppercase font-semibold text-gray-800 tracking-tight my-6'>
        <svg
          className='w-6 h-6 text-gray-200'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 18'
        >
          <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
        </svg>
        <div className='bg-gray-200 rounded-sm w-full mb-1 h-3'></div>
      </div>
      <div className='text-sm capitalize'>
        <div className='bg-gray-200 rounded-sm w-full mb-1 h-2.5'></div>
        <form className='mt-5'>
          <div className='flex flex-row items-start gap-3 mb-3'>
            <div className='bg-gray-200 rounded-sm w-full mb-1 h-6'></div>
            <div className='h-[1px] bg-gray-400 mt-3 w-2 flex-shrink-0'></div>
            <div className='bg-gray-200 rounded-sm w-full mb-1 h-6'></div>
          </div>
          <div className='bg-gray-200 rounded-sm w-full mb-1 h-7'></div>
        </form>
      </div>
      <div className='bg-gray-200 h-[1px] w-full my-6'></div>
      <div className='text-sm'>
        <div className='bg-gray-200 rounded-sm w-full mb-1 h-2.5'></div>
        <div className='mt-5'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='bg-gray-200 rounded-sm w-full mb-3 h-2'></div>
            ))}
        </div>
      </div>
      <div className='bg-gray-200 h-[1px] w-full my-6'></div>
      <div className='bg-gray-200 rounded-sm w-full mb-1 h-7'></div>
    </div>
  )
}

function PagiSkeleton() {
  return (
    <div className='flex flex-wrap mt-6 justify-center mx-auto text-gray-600 animate-pulse'>
      <div className='bg-gray-200 mb-1 w-6 h-6 rounded px-4 py-4 shadow-md mx-2 border'></div>
      <div className='bg-gray-200 mb-1 w-6 h-6 rounded px-4 py-4 shadow-md mx-2 border'></div>
      <div className='bg-gray-200 mb-1 w-6 h-6 rounded px-4 py-4 shadow-md mx-2 border'></div>
    </div>
  )
}

export default function LoadingSkeleton() {
  return (
    <div className='bg-slate-50 py-5'>
      <div className='grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 lg:gap-6'>
        <div className='col-span-12 lg:col-span-2'>
          <div className='hidden lg:block'>
            <SidefilterSkeleton />
          </div>
          <div className='lg:hidden flex flex-col gap-2'>
            <div className='bg-gray-200 rounded-sm w-full mb-1 h-10'></div>
            <div className='bg-gray-200 rounded-sm w-full mb-1 h-10'></div>
            <div className='bg-gray-200 rounded-sm w-full mb-1 h-10'></div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-10'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
          </div>
        </div>
      </div>
      <PagiSkeleton />
    </div>
  )
}
