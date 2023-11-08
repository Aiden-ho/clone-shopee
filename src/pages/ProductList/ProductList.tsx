import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProduct from './SortProduct'

export default function ProductList() {
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
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <Product key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
