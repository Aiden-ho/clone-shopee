import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path.constants'
import { purchaseStatusConst } from 'src/constants/purchase.constants'
import { Purchase } from 'src/types/Purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import classNames from 'classnames'

interface PurchaseDataExtend extends Omit<Purchase, 'buy_count'> {
  disabled: boolean
  checked: boolean
  buy_count: string
  total_price: number
}

export default function Cart() {
  const [purchasesDataExtend, setPurchasesDataExtend] = useState<PurchaseDataExtend[]>([])
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const { data: purchasesData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatusConst.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: purchaseStatusConst.inCart })
  })

  const purchaseUpdateMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.updatePurchase(body),
    onSuccess: () => refetch()
  })
  const purchaseBuyMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }[]) => purchasesApi.buyPurchase(body),
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message)
    }
  })
  const purchaseRemoveMutation = useMutation({
    mutationFn: (body: string[]) => purchasesApi.deletePurchase(body),
    onSuccess: () => refetch()
  })

  const purchasesDataApi = purchasesData?.data.data
  const checkedPurchases = purchasesDataExtend.filter((item) => item.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((total, item) => {
    return total + item.price * Number(item.buy_count)
  }, 0)
  const totalCheckedPurchasesSaving = checkedPurchases.reduce((total, item) => {
    return total + (item.price_before_discount - item.price) * Number(item.buy_count)
  }, 0)

  useEffect(() => {
    setPurchasesDataExtend((prev) => {
      const prevPurchase = keyBy(prev, '_id')
      return (
        purchasesDataApi?.map((purchase) => ({
          ...purchase,
          buy_count: String(purchase.buy_count),
          disabled: false,
          checked: prevPurchase[purchase._id]?.checked || false,
          total_price: prevPurchase[purchase._id]?.price * purchase.buy_count || 0
        })) || []
      )
    })
  }, [purchasesDataApi])

  useEffect(() => {
    setIsAllChecked(purchasesDataExtend.every((purchase) => purchase.checked))
  }, [purchasesDataExtend])

  const handleCheck = (indexPurchase: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasesDataExtend(
      produce((draft) => {
        draft[indexPurchase].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setPurchasesDataExtend(
      produce((draft) => {
        draft.map((item) => {
          item.checked = !isAllChecked
        })
      })
    )
  }

  const handleQuantityChange = (indexPurchase: number, value: string, enable: boolean) => {
    if (enable) {
      const purchase = purchasesDataExtend[indexPurchase]
      setPurchasesDataExtend(
        produce((draft) => {
          draft[indexPurchase].disabled = true
        })
      )
      purchaseUpdateMutation.mutate({ product_id: purchase.product._id, buy_count: Number(value) })
    }
  }

  const handleQuantityType = (indexPurchase: number) => (value: string) => {
    setPurchasesDataExtend(
      produce((draft) => {
        if (draft[indexPurchase].product.quantity >= Number(value)) draft[indexPurchase].buy_count = value
      })
    )
  }

  const handleRemovePruchase = (purchaseId: string) => {
    purchaseRemoveMutation.mutate([purchaseId])
  }

  const handleRemovePruchases = () => {
    const purchaseIds = checkedPurchases.map((item) => item._id)
    purchaseRemoveMutation.mutate(purchaseIds)
  }

  const handleBuyPurchase = () => {
    if (checkedPurchasesCount > 0) {
      const bodyBuy = checkedPurchases.map((item) => ({
        product_id: item.product._id,
        buy_count: Number(item.buy_count)
      }))
      purchaseBuyMutation.mutate(bodyBuy)
    }
  }

  return (
    <div className='bg-slate-50 py-5'>
      <div className='container'>
        {purchasesData && purchasesData.data.data.length > 0 && (
          <Fragment>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                {/* header table */}
                <div className='grid grid-cols-12 bg-white shadow rounded-sm py-5 px-9 text-sm capitalize text-gray-500 mb-4'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <form className='flex items-center flex-shrink-0 justify-center pr-4'>
                        <input
                          type='checkbox'
                          className='w-5 h-5 accent-orange cursor-pointer'
                          onChange={handleCheckAll}
                          checked={isAllChecked}
                        />
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
                    const { _id, product, checked, disabled, buy_count, total_price } = purchase
                    const productLink = `${path.home}${generateNameId({ name: product.name, id: product._id })}`
                    return (
                      <div
                        key={_id}
                        className=' grid grid-cols-12 items-center rounded-sm border-b border-gray-200 text-center text-sm  py-5 px-9 text-gray-500 last:border-b-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-4'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={checked}
                                onChange={handleCheck(index)}
                              />
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
                              <QuantityController
                                max={product.quantity}
                                onIncrease={(value) =>
                                  handleQuantityChange(index, value, Number(value) < product.quantity)
                                }
                                onDecrease={(value) => handleQuantityChange(index, value, Number(value) > 1)}
                                onType={handleQuantityType(index)}
                                value={buy_count}
                                onOutFocus={(value) =>
                                  handleQuantityChange(
                                    index,
                                    value,
                                    Number(value) !== (purchasesDataApi as Purchase[])[index].buy_count
                                  )
                                }
                                disabled={disabled}
                              />
                            </div>
                            <div className='col-span-1'>
                              <div className='flex items-center justify-center h-full text-orange'>
                                {`₫${formatCurrency(total_price)}`}
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <div className='flex items-center justify-center h-full'>
                                <Button
                                  className='text-black hover:text-orange'
                                  onClick={() => handleRemovePruchase(_id)}
                                >
                                  Xóa
                                </Button>
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
                    <input
                      type='checkbox'
                      className='w-5 h-5 accent-orange cursor-pointer'
                      onChange={handleCheckAll}
                      checked={isAllChecked}
                    />
                  </form>
                  <div data-test={checkedPurchasesCount} className='capitalize pr-4'>
                    Chọn Tất Cả ({checkedPurchasesCount})
                  </div>
                  <Button
                    className={classNames('', {
                      'text-black hover:text-orange': checkedPurchasesCount > 0,
                      'text-gray-500 ': checkedPurchasesCount === 0
                    })}
                    onClick={handleRemovePruchases}
                    disabled={checkedPurchasesCount > 0 ? false : true}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='flex h-full align-middle justify-end items-center'>
                  <div className='flex flex-col mr-4 gap-1'>
                    <div className='flex items-center'>
                      <span className='mr-2'>Tổng thanh toán ({checkedPurchasesCount} Sản phẩm):</span>
                      <span className='text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasesPrice)}</span>
                    </div>
                    <div className='text-xs text-right'>
                      {totalCheckedPurchasesSaving > 0 && (
                        <Fragment>
                          <span className='mr-2'>Tiết kiệm :</span>
                          <span className='text-sm text-orange'>₫{formatCurrency(totalCheckedPurchasesSaving)}</span>
                        </Fragment>
                      )}
                    </div>
                  </div>
                  <Button
                    className='bg-orange text-white text-sm rounded-sm shadow-sm w-52 h-[44px] py-3'
                    onClick={handleBuyPurchase}
                    disabled={purchaseBuyMutation.isPending}
                  >
                    Mua Hàng
                  </Button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}
