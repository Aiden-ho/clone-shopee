import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from '../../components/Product'
import SortProduct from './components/SortProduct'
import ProductApi from 'src/apis/product.api'
import Paginate from 'src/components/Paginate'
import { ProductParams } from 'src/types/Product.type'
import categoryApi from 'src/apis/categories.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import NoProductNotice from './components/NoProductNotice'
import { Helmet } from 'react-helmet-async'
import ExpandFilter from './components/ExpandFilter'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => ProductApi.getProducts(queryConfig as ProductParams),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })

  const { data: CategoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories()
  })

  return (
    <div className='bg-slate-50 py-5'>
      <Helmet>
        <title>Trang chủ | Shopee Clone</title>
        <meta name='description' content='Trang chủ shopee clone' />
      </Helmet>
      <div className='container'>
        {productsData && productsData.data.data.products.length > 0 ? (
          <div className='grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 lg:gap-6'>
            <div className='col-span-12 lg:col-span-2'>
              <div className='hidden lg:block'>
                {CategoriesData && <AsideFilter categories={CategoriesData.data.data} queryConfig={queryConfig} />}
              </div>
              {CategoriesData && <ExpandFilter categories={CategoriesData.data.data} queryConfig={queryConfig} />}
            </div>
            <div className='col-span-12 lg:col-span-10'>
              <SortProduct queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                {productsData.data.data.products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        ) : (
          <NoProductNotice queryConfig={queryConfig} />
        )}
      </div>
    </div>
  )
}
