import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Fragment, useEffect, useState, useContext, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import purchasesApi from 'src/apis/purchases.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path.constants'
import { purchaseStatusConst } from 'src/constants/purchase.constants'
import { Purchase } from 'src/types/Purchases.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import classNames from 'classnames'
import { AppContext } from 'src/context/app.context'
import noProduct from 'src/assets/images/no-product.png'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function Cart() {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const { purchasesDataExtend, setPurchasesDataExtend } = useContext(AppContext)
  const location = useLocation()
  const { t } = useTranslation('cart')
  const idPurchaseBuyNow = (location.state as { idPurchaseBuyNow: string | null })?.idPurchaseBuyNow
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
  const checkedPurchases = useMemo(() => purchasesDataExtend.filter((item) => item.checked), [purchasesDataExtend])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = useMemo(
    () =>
      checkedPurchases.reduce((total, item) => {
        return total + item.price * Number(item.buy_count)
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchasesSaving = useMemo(
    () =>
      checkedPurchases.reduce((total, item) => {
        return total + (item.price_before_discount - item.price) * Number(item.buy_count)
      }, 0),
    [checkedPurchases]
  )

  useEffect(() => {
    setPurchasesDataExtend((prev) => {
      const prevPurchase = keyBy(prev, '_id')
      return (
        purchasesDataApi?.map((purchase) => {
          const isIdPurchaseBuyNow = idPurchaseBuyNow === purchase._id
          return {
            ...purchase,
            buy_count: String(purchase.buy_count),
            disabled: false,
            checked: isIdPurchaseBuyNow || prevPurchase[purchase._id]?.checked || false,
            total_price: prevPurchase[purchase._id]?.price * purchase.buy_count || 0
          }
        }) || []
      )
    })
  }, [idPurchaseBuyNow, purchasesDataApi, setPurchasesDataExtend])

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

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

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
      <Helmet>
        <title>Giỏ hàng | Shopee Clone</title>
        <meta name='description' content='Giỏ hàng shopee clone' />
      </Helmet>
      <div className='container'>
        {purchasesData && purchasesData.data.data.length > 0 ? (
          <Fragment>
            <div>
              <div>
                {/* header table */}
                <div className='grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 bg-white shadow rounded-sm py-4 px-4 lg:py-5 lg:px-9 text-sm capitalize text-gray-500 mb-4'>
                  <div className='col-span-4 md:col-span-8 lg:col-span-6'>
                    <div className='flex items-center'>
                      <form className='flex items-center flex-shrink-0 justify-center pr-4'>
                        <input
                          type='checkbox'
                          className='w-4 h-4 md:w-5 md:h-5 accent-orange cursor-pointer'
                          onChange={handleCheckAll}
                          checked={isAllChecked}
                        />
                      </form>
                      <div className='flex-grow'>{t('cart.table_head.product')}</div>
                    </div>
                  </div>
                  <div className='col-span-6 hidden lg:block'>
                    <div className='grid grid-cols-5  text-center'>
                      <div className='col-span-2'>{t('cart.table_head.price')}</div>
                      <div className='col-span-1'>{t('cart.table_head.quantity')}</div>
                      <div className='col-span-1'>{t('cart.table_head.amount')}</div>
                      <div className='col-span-1'>{t('cart.table_head.action')}</div>
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
                        className=' grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 items-center rounded-sm border-b border-gray-200 text-center text-sm  py-4 px-4 lg:py-5 lg:px-9  text-gray-500 last:border-b-0'
                      >
                        <div className='col-span-4 md:col-span-8 lg:col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-start lg:items-center justify-center pr-4'>
                              <input
                                type='checkbox'
                                className='w-4 h-4 md:w-5 md:h-5 accent-orange'
                                checked={checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link className='h-20 w-20 flex-shrink-0' to={productLink}>
                                  <img alt={product.name} src={product.image} />
                                </Link>
                                <div className='flex-grow flex flex-col justify-between px-2 md:pt-1 pb-2'>
                                  <Link
                                    to={productLink}
                                    className='text-left line-clamp-2 text-gray-800 text-sm md:text-base'
                                  >
                                    {product.name}
                                  </Link>
                                  {/* product action mobile */}
                                  <div className='flex flex-col items-start gap-3 md:items-start md:justify-between text-center lg:hidden mt-2'>
                                    <div className='flex-grow'>
                                      <div className='flex items-center justify-start gap-2 h-full'>
                                        <span className='text-sm line-through text-gray-400'>
                                          ₫{formatCurrency(product.price_before_discount)}
                                        </span>
                                        <span className='text-sm text-gray-800'>₫{formatCurrency(product.price)}</span>
                                      </div>
                                    </div>
                                    <div className='flex-grow'>
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
                                    <div className=' w-full'>
                                      <div className='flex items-center justify-between h-full text-orange'>
                                        {`₫${formatCurrency(total_price)}`}
                                        <Button
                                          className='text-black font-bold hover:text-orange'
                                          onClick={() => handleRemovePruchase(_id)}
                                        >
                                          {t('cart.delete_button')}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6 hidden lg:block'>
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
                                  {t('cart.delete_button')}
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
            <div className='bg-white shadow rounded-sm md-2 py-4 px-4 lg:py-5 lg:px-9 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 sticky bottom-0'>
              <div className='col-span-4 md:col-span-3 lg:col-span-6'>
                <div className='flex items-center h-full align-middle'>
                  <form className='flex items-center flex-shrink-0 justify-center pr-4'>
                    <input
                      type='checkbox'
                      className='w-4 h-4 md:w-5 md:h-5 accent-orange cursor-pointer'
                      onChange={handleCheckAll}
                      checked={isAllChecked}
                    />
                  </form>
                  <div data-test={checkedPurchasesCount} className='capitalize pr-4 text-xs'>
                    {t('cart.summarize.all')} <span className='hidden lg:inline'>({checkedPurchasesCount})</span>
                  </div>
                  <Button
                    className={classNames('text-sm', {
                      'text-black hover:text-orange': checkedPurchasesCount > 0,
                      'text-gray-500 ': checkedPurchasesCount === 0
                    })}
                    onClick={handleRemovePruchases}
                    disabled={checkedPurchasesCount > 0 ? false : true}
                  >
                    {t('cart.delete_button')}
                  </Button>
                </div>
              </div>
              <div className='col-span-4 md:col-span-5 lg:col-span-6'>
                <div className='flex flex-col md:flex-row h-full align-middle lg:justify-end justify-between items-center'>
                  <div className='flex flex-col lg:mr-4 gap-1 w-full md:w-auto my-2'>
                    <div className='flex items-center justify-between'>
                      <span className='mr-2 text-xs'>
                        {t('cart.summarize.Total_price')}{' '}
                        <span className='hidden lg:inline'>
                          ({checkedPurchasesCount} {t('cart.summarize.product')})
                        </span>
                        :
                      </span>
                      <span className='md:text-base lg:text-2xl text-orange'>
                        ₫{formatCurrency(totalCheckedPurchasesPrice)}
                      </span>
                    </div>
                    <div className='text-xs text-right'>
                      {totalCheckedPurchasesSaving > 0 && (
                        <Fragment>
                          <span className='mr-2'>{t('cart.summarize.save')} :</span>
                          <span className='text-xs lg:text-sm text-orange'>
                            ₫{formatCurrency(totalCheckedPurchasesSaving)}
                          </span>
                        </Fragment>
                      )}
                    </div>
                  </div>
                  <Button
                    className='bg-orange text-white text-sm rounded-sm shadow-sm w-full md:w-52 md:h-[44px] px-4 py-3'
                    onClick={handleBuyPurchase}
                    disabled={purchaseBuyMutation.isPending}
                  >
                    {t('cart.summarize.buy_button')}
                    <span className='inline lg:hidden mx-1'>({checkedPurchasesCount})</span>
                  </Button>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className='flex align-middle items-center justify-center min-h-[30rem] '>
            <div className='text-center '>
              <img src={noProduct} alt='no-purchase' className='w-24 h-24 mx-auto' />
              <div className='font-medium text-gray-400 mt-5'>{t('cart.empty_notice')}</div>
              <div className=' mt-5 '>
                <Link
                  to={path.home}
                  className='bg-orange hover:bg-orange/90 transition-all uppercase py-2 px-6 text-white rounded-sm'
                >
                  {t('cart.empty_nav_button')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
