import Button from 'src/components/Button'
import { QueryConfig } from '../ProductList'
import { orderBy, sortBy } from 'src/constants/product'
import { ProductParams } from 'src/types/Product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path.constants'
import { useState } from 'react'
import { omit } from 'lodash'
interface SortProductProps {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProduct({ queryConfig, pageSize }: SortProductProps) {
  const [isPriceSort, setIsPriceSort] = useState<boolean>(false)
  const { sort_by = sortBy.createdAt, page, order } = queryConfig
  const currentPage = Number(page)
  const sortNavigate = useNavigate()

  const isActivedSortBy = (sortbyValue: Exclude<ProductParams['sort_by'], undefined>) => {
    return sort_by === sortbyValue
  }

  const isActivedOrder = (orderbyValue: Exclude<ProductParams['order'], undefined>) => {
    return order === orderbyValue
  }

  const hanldeSortAction = (sortbyValue: Exclude<ProductParams['sort_by'], undefined>) => {
    sortNavigate({
      pathname: path.home,
      search: createSearchParams(omit({ ...queryConfig, sort_by: sortbyValue, page: '1' }, ['order'])).toString()
    })
  }

  const hanldePriceOrderAction = (orderbyValue: Exclude<ProductParams['order'], undefined>) => {
    setIsPriceSort(false)
    sortNavigate({
      pathname: path.home,
      search: createSearchParams({ ...queryConfig, sort_by: sortBy.price, order: orderbyValue }).toString()
    })
  }

  return (
    <div className='bg-gray-200 py-3 px-5 mb-2 text-sm'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center flex-row gap-3'>
          <span className='text-gray-600 mr-2'>Sắp xếp theo</span>
          <Button
            onClick={() => hanldeSortAction(sortBy.view)}
            className={classNames('rounded-sm shadow-sm px-5 h-9', {
              'bg-orange text-white': isActivedSortBy(sortBy.view),
              'bg-white text-gray-600 hover:bg-gray-50': !isActivedSortBy(sortBy.view)
            })}
          >
            Phổ Biến
          </Button>
          <Button
            onClick={() => hanldeSortAction(sortBy.createdAt)}
            className={classNames('rounded-sm shadow-sm px-5 h-9', {
              'bg-orange text-white': isActivedSortBy(sortBy.createdAt),
              'bg-white text-gray-600 hover:bg-gray-50': !isActivedSortBy(sortBy.createdAt)
            })}
          >
            Mới Nhất
          </Button>
          <Button
            onClick={() => hanldeSortAction(sortBy.sold)}
            className={classNames('rounded-sm shadow-sm px-5 h-9', {
              'bg-orange text-white': isActivedSortBy(sortBy.sold),
              'bg-white text-gray-600 hover:bg-gray-50': !isActivedSortBy(sortBy.sold)
            })}
          >
            Bán chạy
          </Button>
          <div
            onMouseEnter={() => setIsPriceSort(true)}
            onMouseLeave={() => setIsPriceSort(false)}
            className='flex justify-between items-center bg-white text-sm rounded-sm pl-5 pr-3 h-9 min-w-[12.5rem] cursor-pointer relative'
          >
            <span className='text-gray-600'>
              {order && order === orderBy.asc && 'Giá: Thấp đến cao'}
              {order && order === orderBy.desc && 'Giá: Cao đến thấp'}
              {!order && 'Giá'}
            </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
            {isPriceSort && (
              <div className='absolute w-full top-[100%] left-0 bg-white  z-10'>
                <Button
                  className={classNames(' pl-5 pr-3 h-8 leading-8 w-full', {
                    'text-orange': isActivedOrder(orderBy.asc),
                    'hover:text-orange': !isActivedOrder(orderBy.asc)
                  })}
                  onClick={() => hanldePriceOrderAction(orderBy.asc)}
                  classChild='flex justify-between items-center'
                >
                  Giá: Thấp đến cao
                  {isActivedOrder(orderBy.asc) && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                    </svg>
                  )}
                </Button>
                <Button
                  className={classNames(' pl-5 pr-3 h-8 leading-8 w-full', {
                    'text-orange': isActivedOrder(orderBy.desc),
                    'hover:text-orange': !isActivedOrder(orderBy.desc)
                  })}
                  classChild='flex justify-between items-center'
                  onClick={() => hanldePriceOrderAction(orderBy.desc)}
                >
                  Giá: Cao đến thấp
                  {isActivedOrder(orderBy.desc) && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                    </svg>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div>
            <span className='text-orange'>{currentPage}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='flex'>
            {currentPage === 1 ? (
              <div className='p-2 bg-gray-100 border-[1px] border-gray-300 rounded-sm cursor-not-allowed text-gray-400'>
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
              </div>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (currentPage - 1).toString() }).toString()
                }}
                className='p-2 bg-gray-50 hover:bg-white border-[1px] border-gray-300 rounded-sm text-gray-600'
              >
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
              </Link>
            )}
            {currentPage === pageSize ? (
              <div className='p-2 bg-gray-100 border-[1px] border-gray-300 rounded-sm cursor-not-allowed text-gray-400'>
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
              </div>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (currentPage + 1).toString() }).toString()
                }}
                className='p-2 bg-gray-50 hover:bg-white border-[1px] border-gray-300 rounded-sm text-gray-600'
              >
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
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
