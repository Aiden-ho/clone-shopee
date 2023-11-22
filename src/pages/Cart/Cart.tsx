import { useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path.constants'
import { purchaseStatusConst } from 'src/constants/purchase.constants'
import { Purchases } from 'src/types/Purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'

interface PurchasesDataExtend extends Purchases {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [purchasesDataExtend, setPurchasesDataExtend] = useState<PurchasesDataExtend[]>([])

  const { data: purchasesData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatusConst.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: purchaseStatusConst.inCart })
  })

  useEffect(() => {
    setPurchasesDataExtend(
      purchasesData?.data.data.map((purchase) => ({ ...purchase, disabled: false, checked: false })) || []
    )
  }, [purchasesData])

  const handleCheck = (indexPurchase: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasesDataExtend(
      produce((draft) => {
        draft[indexPurchase].checked = event.target.checked
      })
    )
  }

  return (
    <div className='bg-slate-50 py-5'>
      <div className='container'>
        {purchasesDataExtend && purchasesDataExtend.length > 0 && (
          <Fragment>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                {/* header table */}
                <div className='grid grid-cols-12 bg-white shadow rounded-sm py-5 px-9 text-sm capitalize text-gray-500 mb-4'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <form className='flex items-center flex-shrink-0 justify-center pr-4'>
                        <input type='checkbox' className='w-5 h-5 accent-orange cursor-pointer' />
                      </form>
                      <div className='flex-grow'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5  text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số Lượng</div>
                      <div className='col-span-1'>Số Tiền</div>
                      <div className='col-span-1'>Thao Tác</div>
                    </div>
                  </div>
                </div>
                {/* body table */}
                <div className='bg-white shadow rounded-sm text-sm capitalize text-gray-500 mb-4'>
                  {purchasesDataExtend.map((purchase, index) => {
                    const { _id, product, buy_count } = purchase
                    const productLink = `${path.home}${generateNameId({ name: product.name, id: product._id })}`
                    return (
                      <div
                        key={_id}
                        className=' grid grid-cols-12 items-center rounded-sm border-b border-gray-200 text-center text-sm  py-5 px-9 text-gray-500 last:border-b-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-4'>
                              <input type='checkbox' className='h-5 w-5 accent-orange' onChange={handleCheck(index)} />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link className='h-20 w-20 flex-shrink-0' to={productLink}>
                                  <img alt={product.name} src={product.image} />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2'>
                                  <Link to={productLink} className='text-left line-clamp-2 text-gray-800'>
                                    {product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 text-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center gap-2 h-full'>
                                <span className='text-sm line-through text-gray-400'>
                                  ₫{formatCurrency(product.price_before_discount)}
                                </span>
                                <span className='text-sm text-gray-800'>₫{formatCurrency(product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController max={product.quantity} />
                            </div>
                            <div className='col-span-1'>
                              <div className='flex items-center justify-center h-full text-orange'>
                                ₫{formatCurrency(product.price * buy_count)}
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <div className='flex items-center justify-center h-full'>
                                <Button className='text-black hover:text-orange'>Xóa</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            {/* sumary sticky*/}
            <div className='bg-white shadow rounded-sm md-2 py-5 px-9 grid grid-cols-12 sticky bottom-0'>
              <div className='col-span-6'>
                <div className='flex items-center h-full align-middle'>
                  <form className='flex items-center flex-shrink-0 justify-center pr-4'>
                    <input type='checkbox' className='w-5 h-5 accent-orange cursor-pointer' />
                  </form>
                  <div className='flex-grow capitalize'>Chọn Tất Cả ({purchasesDataExtend.length})</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='flex h-full align-middle justify-end'>
                  <div className='flex items-center mr-4'>
                    <span className='mr-2'>Tổng thanh toán (0 Sản phẩm):</span>
                    <span className='text-2xl text-orange'>₫0</span>
                  </div>
                  <Button className='bg-orange text-white text-sm rounded-sm shadow-sm w-52 py-3'>Mua Hàng</Button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}
