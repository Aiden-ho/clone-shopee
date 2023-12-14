import { ProductParams } from 'src/types/Product.type'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import useQueryParams from 'src/hooks/useQueryParams'

// Do useQueryParams chỉ trả về giá trị string và createSearchParams chỉ làm việc với string
//  nên cần chuyển đổi 1 type toàn string từ productParams thay vì dùng trực tiếp
export type QueryConfig = {
  [key in keyof ProductParams]: string
}
export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit,
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
  return queryConfig
}
