import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'
import { omit } from 'lodash'
import Button from 'src/components/Button'
import { Category } from 'src/types/Category.type'
import { QueryConfig } from '../../ProductList'
import path from 'src/constants/path.constants'
import InputNumber from 'src/components/InputNumber'
import { priceRangeSchema, type PriceRangeFormDataType } from 'src/utils/ValidateRule'
import { yupResolver } from '@hookform/resolvers/yup'
import RatingStarsfilter from '../RatingStarsFilter'
import { NoUndefinedFiled } from 'src/types/Util.type'
import { ObjectSchema } from 'yup'

interface AsideFilterProps {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedFiled<PriceRangeFormDataType>

export default function AsideFilter(props: AsideFilterProps) {
  const { categories, queryConfig } = props

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver<FormData>(priceRangeSchema as ObjectSchema<FormData>)
  })

  const navigate = useNavigate()

  const handleOnSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const removeAllFilter = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit({ ...queryConfig, page: '1' }, ['category', 'price_min', 'price_max', 'rating_filter'])
      ).toString()
    })
  }

  return (
    <div>
      <div className='flex flex-row gap-3 items-center align-middle capitalize font-semibold text-gray-800 tracking-tight py-3'>
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
      </div>
      <div className='bg-gray-200 h-[1px] w-full my-2'></div>
      <ul className='text-sm'>
        <li className='py-2 px-3'>
          <Link
            className={classNames('relative font-semibold', {
              'text-orange': !queryConfig.category,
              'text-gray-600': queryConfig.category
            })}
            to={{
              pathname: path.home,
              search: createSearchParams(omit({ ...queryConfig, page: '1' }, ['category'])).toString()
            }}
          >
            Tất cả sản phẩm
            {!queryConfig.category && (
              <svg
                viewBox='0 0 4 7'
                className='fill-orange h-2 w-2 absolute left-[-12px] top-1/2 transform -translate-y-1/2'
              >
                <polygon points='4 3.5 0 0 0 7'></polygon>
              </svg>
            )}
          </Link>
        </li>
        {categories.map((cateItem) => (
          <li key={cateItem._id} className='py-2 px-3'>
            <Link
              className={classNames('relative', {
                'text-orange font-semibold': queryConfig.category === cateItem._id,
                'text-gray-600': queryConfig.category !== cateItem._id
              })}
              to={{
                pathname: path.home,
                search: createSearchParams({ ...queryConfig, category: cateItem._id, page: '1' }).toString()
              }}
            >
              {cateItem.name}
              {queryConfig.category === cateItem._id && (
                <svg
                  viewBox='0 0 4 7'
                  className='fill-orange h-2 w-2 absolute left-[-12px] top-1/2 transform -translate-y-1/2'
                >
                  <polygon points='4 3.5 0 0 0 7'></polygon>
                </svg>
              )}
            </Link>
          </li>
        ))}
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
        <form className='mt-5' onSubmit={handleOnSubmit}>
          <div className='flex flex-row items-start gap-3 '>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => (
                <InputNumber
                  className='grow'
                  type='text'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm'
                  classNameError='hidden'
                  placeholder='₫ TỪ'
                  onChange={(event) => {
                    field.onChange(event)
                    //trigger validate lại max nếu sửa min
                    trigger('price_max')
                  }}
                  value={field.value}
                  ref={field.ref}
                />
              )}
            />

            <div className='h-[1px] bg-gray-400 mt-3 w-2 flex-shrink-0'></div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => (
                <InputNumber
                  className='grow'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm appearance-none'
                  classNameError='hidden'
                  placeholder='₫ ĐẾN'
                  onChange={(event) => {
                    field.onChange(event)
                    //trigger validate lại min nếu sửa max
                    trigger('price_min')
                  }}
                  value={field.value}
                  ref={field.ref}
                />
              )}
            />
          </div>
          <div className='mt-1 mb-2 text-red-600 min-h-[1rem] text-xs text-center'>{errors.price_min?.message}</div>
          <Button className='uppercase w-full text-white bg-orange hover:opacity-90 py-[5px]'>Áp dụng</Button>
        </form>
      </div>
      <div className='bg-gray-200 h-[1px] w-full my-6'></div>
      <div className='text-sm'>
        <span>Đánh giá</span>
        <div className='mt-5'>
          <RatingStarsfilter queryConfig={queryConfig} />
        </div>
      </div>
      <div className='bg-gray-200 h-[1px] w-full my-6'></div>
      <Button
        className='uppercase w-full text-white bg-orange hover:opacity-90 py-[5px] text-sm'
        onClick={removeAllFilter}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
