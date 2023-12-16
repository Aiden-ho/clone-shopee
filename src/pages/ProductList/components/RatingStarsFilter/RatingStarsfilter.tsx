import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path.constants'
import classNames from 'classnames'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface RatingStarsFilterProps {
  queryConfig: QueryConfig
}

export default function RatingStarsfilter({ queryConfig }: RatingStarsFilterProps) {
  const { t } = useTranslation('home')
  const renderStars = (row_index: number) => {
    const stars = 5

    return Array(stars)
      .fill(0)
      .map((_, star_index) => {
        if (star_index < stars - row_index) {
          return (
            <svg key={star_index} viewBox='0 0 9.5 8' className='w-4 h-4'>
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
          )
        } else {
          return (
            <svg viewBox='0 0 30 30' className='w-4 h-4' key={star_index}>
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
          )
        }
      })
  }

  return (
    <div>
      {Array(5)
        .fill(0)
        .map((_, row_index) => (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: '1',
                rating_filter: (5 - row_index).toString()
              }).toString()
            }}
            className={classNames('flex gap-1 items-center py-1 px-3  cursor-pointer rounded-xl', {
              'hover:bg-gray-100': Number(queryConfig.rating_filter) !== 5 - row_index,
              'bg-gray-100 shadow-sm': Number(queryConfig.rating_filter) === 5 - row_index
            })}
            key={row_index}
          >
            <div className='flex gap-1'>{renderStars(row_index)}</div>
            {row_index >= 1 && <span>{t('asidefilter.filter.rating.rating_range')}</span>}
          </Link>
        ))}
    </div>
  )
}
