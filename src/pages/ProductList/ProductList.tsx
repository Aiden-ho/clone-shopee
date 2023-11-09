import { useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProduct from './SortProduct'
import ProductApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => ProductApi.getProducts(queryParams)
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
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
              {data ? data.data.data.products.map((product) => <Product key={product._id} product={product} />) : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
