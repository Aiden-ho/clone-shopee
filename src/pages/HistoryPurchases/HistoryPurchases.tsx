import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useMemo } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import path from 'src/constants/path.constants'
import { purchaseStatusConst } from 'src/constants/purchase.constants'
import { AppContext } from 'src/context/app.context'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchasesListStatus } from 'src/types/Purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import noProduct from 'src/assets/images/no-product.png'
import find from 'lodash/find'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function HistoryPurchases() {
  const queryParams: { status?: string } = useQueryParams()
  const statusNumber = Number(queryParams.status) || purchaseStatusConst.all
  const { isAuthenticated } = useContext(AppContext)
  const { t } = useTranslation('user')

  const purchaseTabs = useMemo(
    () => [
      { status: purchaseStatusConst.all, name: t('purchase.all') },
      { status: purchaseStatusConst.waitForComfirmation, name: t('purchase.confirm') },
      { status: purchaseStatusConst.readyToPick, name: t('purchase.ship') },
      { status: purchaseStatusConst.delivering, name: t('purchase.receive') },
      { status: purchaseStatusConst.delivered, name: t('purchase.completed') },
      { status: purchaseStatusConst.cancled, name: t('purchase.cancelled') }
    ],
    [t]
  )

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
      <Helmet>
        <title>Trang Đơn hàng | Shopee Clone</title>
        <meta name='description' content='Trang đơn hàng shopee clone' />
      </Helmet>
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
                    <span>{t('purchase.total')}: </span>
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
              {t('purchase.empty_note')} <span className='font-semibold'>&quot;{getNameStatus()}&quot;</span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
