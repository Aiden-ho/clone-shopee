import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path.constants'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface PaginateProps {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2
export default function Paginate({ queryConfig, pageSize }: PaginateProps) {
  const currentPage = Number(queryConfig.page)
  const renderPages = () => {
    let dotsAfter = false
    let dotsBefore = false

    const renderDotsAfter = (index: number) => {
      if (!dotsAfter) {
        dotsAfter = true
        return (
          <span key={index} className='bg-white rounded px-3 py-3 shadow-md mx-2 cursor-pointer '>
            ...
          </span>
        )
      }
    }
    const renderDotsBefore = (index: number) => {
      if (!dotsBefore) {
        dotsBefore = true
        return (
          <span key={index} className='bg-white rounded px-3 py-3 shadow-md mx-2 cursor-pointer '>
            ...
          </span>
        )
      }
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (currentPage <= RANGE * 2 + 1 && pageNumber > currentPage + RANGE && pageNumber <= pageSize - RANGE) {
          return renderDotsAfter(index)
        } else if (currentPage > RANGE * 2 + 1 && currentPage < pageSize - RANGE * 2) {
          if (pageNumber > RANGE && pageNumber < currentPage - RANGE) {
            return renderDotsBefore(index)
          } else if (pageNumber > currentPage + RANGE && pageNumber < pageSize - RANGE) {
            return renderDotsAfter(index)
          }
        } else if (currentPage >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
          return renderDotsBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            key={index}
            className={classNames('rounded px-4 py-3 shadow-md mx-2 cursor-pointer border', {
              'bg-orange text-white': pageNumber === currentPage,
              'bg-white': pageNumber !== currentPage
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='flex flex-wrap mt-6 justify-center mx-auto text-gray-600'>
      {currentPage === 1 ? (
        <span className='bg-gray-50 rounded px-3 py-3 shadow-md mx-2 cursor-not-allowed border'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (currentPage - 1).toString() }).toString()
          }}
          className='bg-white rounded px-3 py-3 shadow-md mx-2 cursor-pointer border'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </Link>
      )}
      {renderPages()}
      {currentPage === pageSize ? (
        <span className='bg-white rounded px-3 py-3 shadow-md mx-2 cursor-not-allowed border'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (currentPage + 1).toString() }).toString()
          }}
          className='bg-white rounded px-3 py-3 shadow-md mx-2 cursor-pointer border'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      )}
    </div>
  )
}
