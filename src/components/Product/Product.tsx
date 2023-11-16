import { Link } from 'react-router-dom'
import RatingStars from 'src/components/RatingStars'
import path from 'src/constants/path.constants'
import { Product as ProductType } from 'src/types/Product.type'
import { convertToCompactNum, formatCurrency, generateNameId } from 'src/utils/utils'

interface ProdctProps {
  product: ProductType
}
export default function Product({ product }: ProdctProps) {
  return (
    <Link
      to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}
      className='bg-white rounded-sm shadow-md cursor-pointer hover:translate-y-[-.0625rem] duration-100 transition-transform'
    >
      <div className='w-full pt-[100%] relative'>
        <img src={product.image} alt={product.name} className='top-0 left-0 absolute w-full h-full' />
      </div>
      <div className='p-2'>
        <div className='text-xs line-clamp-2 min-h-[2rem]'>{product.name}</div>
        <div className='pt-1 text-sm flex gap-1'>
          <div className='text-gray-500 line-through'>
            <span className='text-xs'>₫</span>
            <span>{formatCurrency(product.price_before_discount)}</span>
          </div>
          <div className='text-orange'>
            <span className='text-xs'>₫</span>
            <span>{formatCurrency(product.price)}</span>
          </div>
        </div>
        <div className='flex gap-2 mt-5'>
          <RatingStars rating={product.rating} />
          <div className='text-xs'>
            <span className='mr-1'>Đã bán</span>
            <span>{convertToCompactNum(product.sold)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
