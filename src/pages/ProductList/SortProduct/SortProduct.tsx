import Button from 'src/components/Button'

export default function SortProduct() {
  return (
    <div className='bg-gray-200 py-3 px-5 mb-2 text-sm'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center flex-row gap-3'>
          <span className='text-gray-600 mr-2'>Sắp xếp theo</span>
          <Button className='bg-white rounded-sm shadow-sm px-5 h-9'>Phổ Biến</Button>
          <Button className='bg-white rounded-sm shadow-sm px-5 h-9'>Mới Nhất</Button>
          <Button className='bg-orange text-white rounded-sm shadow-sm px-5 h-9'>Bán chạy</Button>
          <select defaultValue='' className='bg-white text-sm rounded-sm block px-5 h-9 outline-none'>
            <option value=''>Giá</option>
            <option value='US'>Giá: Thấp đến cao</option>
            <option value='CA'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex gap-2 items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/1</span>
          </div>
          <div>
            <Button className='p-2 bg-white border-[1px] border-gray-300 rounded-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Button>
            <Button className='p-2 bg-white border-[1px] border-gray-300 rounded-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
