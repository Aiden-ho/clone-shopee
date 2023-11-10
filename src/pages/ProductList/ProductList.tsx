import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProduct from './SortProduct'
import ProductApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import { Fragment } from 'react'
import Paginate from 'src/components/Paginate'
import { ProductParams } from 'src/types/Product.type'

// Do useQueryParams chỉ trả về giá trị string và createSearchParams chỉ làm việc với string
//  nên cần chuyển đổi 1 type toàn string từ productParams thay vì dùng trực tiếp
export type QueryConfig = {
  [key in keyof ProductParams]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit || 1,
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      category: queryParams.category,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => ProductApi.getProducts(queryConfig as ProductParams),
    placeholderData: keepPreviousData
  })

  return (
    <div className='bg-slate-50 py-5'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-2'>
            <AsideFilter />
          </div>
          <div className='col-span-10'>
            <SortProduct />
            {data ? (
              <Fragment>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                  {data.data.data.products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
                <Paginate queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              </Fragment>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
