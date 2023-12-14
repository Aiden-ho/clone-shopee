import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import path from 'src/constants/path.constants'
import { purchaseStatusConst } from 'src/constants/purchase.constants'
import { AppContext } from 'src/context/app.context'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchasesListStatus } from 'src/types/Purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import noProduct from 'src/assets/images/no-product.png'
import { find } from 'lodash'

const purchaseTabs = [
  { status: purchaseStatusConst.all, name: 'Tất cả' },
  { status: purchaseStatusConst.waitForComfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatusConst.readyToPick, name: 'Chờ lấy hàng' },
  { status: purchaseStatusConst.delivering, name: 'Đang giao' },
  { status: purchaseStatusConst.delivered, name: 'Đã giao' },
  { status: purchaseStatusConst.cancled, name: 'Đã hủy' }
]

export default function HistoryPurchases() {
  const queryParams: { status?: string } = useQueryParams()
  const statusNumber = Number(queryParams.status) || purchaseStatusConst.all
  const { isAuthenticated } = useContext(AppContext)

  const { data: purchasesData } = useQuery({
    queryKey: ['purchases', { status: statusNumber }],
    queryFn: () => purchasesApi.getPurchases({ status: statusNumber as PurchasesListStatus }),
    enabled: isAuthenticated
  })

  const purchases = purchasesData?.data.data

  const getNameStatus = () => {
    const obj = find(purchaseTabs, (item) => item.status === statusNumber)
    if (obj) return obj.name
  }

  return (
    <div>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
        {purchaseTabs.map((item, index) => (
          <Link
            to={{
              pathname: path.purchases,
              search: createSearchParams({ status: String(item.status) }).toString()
            }}
            key={index}
            className={classNames('flex-grow text-center bg-white p-4', {
              'text-gray-500': statusNumber !== item.status,
              'text-orange border-b-2 border-orange': statusNumber === item.status
            })}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className='bg-white shadow-sm rounded-sm px-4 py-3 mt-3'>
        {purchases && purchases.length ? (
          purchases.map((item) => {
            const { _id, product, buy_count } = item
            return (
              <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`} key={_id}>
                <div className='border-t-[1px] py-3'>
                  <div className='flex'>
                    {/* img */}
                    <div className='w-20 h-20 border-[1px]'>
                      <img src={product.image} alt={product.name} className=' w-full h-full' />
                    </div>
                    {/* info */}
                    <div className='pl-3 flex-grow'>
                      <p>{product.name}</p>
                      <p className='text-sm text-gray-500'>{product.category.name}</p>
                      <p className='text-sm'>x{buy_count}</p>
                    </div>
                    {/* price */}
                    <div className='text-sm flex gap-1 flex-shrink-0'>
                      <div className='text-gray-500 line-through'>
                        <span className='text-xs'>₫</span>
                        <span>{formatCurrency(product.price_before_discount)}</span>
                      </div>
                      <div className='text-orange'>
                        <span className='text-xs'>₫</span>
                        <span>{formatCurrency(product.price)}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end gap-1'>
                    <span>Tổng Tiền: </span>
                    <div className='text-orange'>
                      <span className='text-xs'>₫</span>
                      <span>{formatCurrency(product.price * buy_count)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        ) : (
          <div className='flex flex-col items-center justify-center  h-[300px]'>
            <img className='w-24 h-24 pb-2' src={noProduct} alt='empty cart' />
            <span className='text-gray-500'>
              Chưa có đơn <span className='font-semibold'>&quot;{getNameStatus()}&quot;</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
