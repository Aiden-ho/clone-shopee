import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import DOMPurify from 'dompurify'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductApi from 'src/apis/product.api'
import purchasesApi from 'src/apis/purchases.api'
import Button from 'src/components/Button'
import Product from 'src/components/Product'
import QuantityController from 'src/components/QuantityController'
import RatingStars from 'src/components/RatingStars'
import { purchaseStatusConst } from 'src/constants/purchase.constants'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { Product as ProductType } from 'src/types/Product.type'
import { convertToCompactNum, formatCurrency, getIdFromNameId, rateSale } from 'src/utils/utils'
import path from 'src/constants/path.constants'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'
import LoadingSkeleton from './components/LoadingSkeleton/LoadingSkeleton'

const rangeSlide = 5

export default function ProductDetail() {
  // chỉ có 1 input nên dùng state thay vì form hook
  const [quantity, setQuantity] = useState<string>('1')
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { t } = useTranslation('product')
  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductApi.getProductDetail(id as string)
  })

  const product = productData?.data.data
  const [rangeIndexSlide, setRangeIndexSlide] = useState<number[]>([0, rangeSlide])
  const [activeImage, setActiveImage] = useState<string>('')
  const currentSlideImages = useMemo(
    () => (product && product.images ? product.images.slice(...rangeIndexSlide) : []),
    [product, rangeIndexSlide]
  )
  const activeImgRef = useRef<HTMLImageElement>(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const queryConfig: Pick<QueryConfig, 'page' | 'limit' | 'category'> = {
    limit: '20',
    page: '1',
    category: product?.category._id
  }
  const { data: productListData, isLoading } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => ProductApi.getProducts(queryConfig),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.addToCart(body)
  })

  const handleAddToCart = (product_id: string) => {
    const buy_count = Number(quantity)
    addToCartMutation.mutate(
      { product_id, buy_count },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatusConst.inCart }] })
        }
      }
    )
  }

  const handleChangeActiveImage = (src: string) => {
    setActiveImage(src)
  }

  const handleNextButtonSlide = () => {
    if (rangeIndexSlide[1] < (product as ProductType).images.length) {
      setRangeIndexSlide((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const handlePrevButtonSlide = () => {
    if (rangeIndexSlide[0] > 0) {
      setRangeIndexSlide((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleQuatity = (value: string) => {
    setQuantity(value)
  }

  const handleZoomInActiveImg = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = activeImgRef.current as HTMLImageElement
    //Cung cấp thông tin về vị trí của element
    const rect = event.currentTarget.getBoundingClientRect()
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleZoomOutActiveImg = () => {
    activeImgRef.current?.removeAttribute('style')
  }

  const hanldeBuyNow = async (product_id: string) => {
    const buy_count = Number(quantity)
    const res = await addToCartMutation.mutateAsync({ product_id, buy_count })
    const purchase = res.data.data
    navigate(path.cart, { state: { idPurchaseBuyNow: purchase._id } })
  }

  return (
    <div className='bg-slate-50 py-5'>
      {!isLoading ? (
        product && (
          <Fragment>
            <Helmet>
              <title>Chi tiết sản phẩm | Shopee Clone</title>
              <meta
                name='description'
                content={convert(product.description, {
                  limits: {
                    maxInputLength: 150
                  }
                })}
              />
            </Helmet>
            <div className='container bg-white p-4'>
              <div className='grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-10'>
                <div className='col-span-4 md:col-span-4 lg:col-span-5'>
                  <div
                    className='w-full relative pt-[100%] bg-gray-50 overflow-hidden cursor-zoom-in'
                    onMouseMove={handleZoomInActiveImg}
                    onMouseLeave={handleZoomOutActiveImg}
                  >
                    <img
                      src={activeImage}
                      alt={product.name}
                      className='absolute top-0 left-0 object-cover h-full w-full pointer-events-none'
                      ref={activeImgRef}
                    />
                  </div>
                  <div className='relative w-full'>
                    {product.images.length > rangeSlide && (
                      <Fragment>
                        <Button
                          className='absolute bg-gray-500/30 text-white top-[50%] right-0 h-10 w-6 z-[1] translate-y-[-50%] hover:bg-gray-500/50'
                          onClick={handleNextButtonSlide}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-7 h-7'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                          </svg>
                        </Button>
                        <Button
                          className='absolute bg-gray-500/30 text-white top-[50%] left-0 h-10 w-6 z-[1] translate-y-[-50%] hover:bg-gray-500/50'
                          onClick={handlePrevButtonSlide}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-7 h-7'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                          </svg>
                        </Button>
                      </Fragment>
                    )}

                    <div className='grid grid-cols-5 gap-2 mt-4'>
                      {currentSlideImages.map((item) => {
                        const isActive = item === activeImage
                        return (
                          <div
                            key={item}
                            className='relative col-span-1 pt-[100%] shadow cursor-pointer rounded-sm'
                            onMouseEnter={() => handleChangeActiveImage(item)}
                          >
                            <img
                              src={item}
                              alt={product.name}
                              className='absolute top-0 left-0 object-cover h-full w-full'
                            />
                            {isActive && <div className='absolute border-2 border-orange inset-0'></div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className='col-span-4 md:col-span-4 lg:col-span-7'>
                  <h1 className='text-xl font-medium'>{product.name}</h1>
                  <div className='flex pt-3'>
                    <div className='flex gap-1 items-center pr-4'>
                      <span className='text-orange border-b border-orange'>{convertToCompactNum(product.rating)}</span>
                      <RatingStars
                        rating={product.rating}
                        classNameFilled='w-4 h-4 fill-orange text-orange'
                        classNameNoFilled='w-4 h-4 text-orange'
                      />
                    </div>
                    <div className='flex md:flex-col lg:flex-row gap-1 items-center px-4 border-l border-gray-300'>
                      <span className='border-b border-gray-900'>{convertToCompactNum(product.sold)}</span>
                      <span className='text-gray-500 font-normal text-xs md:text-sm'>{t('sold')}</span>
                    </div>
                    <div className='flex md:flex-col lg:flex-row gap-1 items-center px-4 border-l border-gray-300'>
                      <span className='border-b border-gray-900'>{convertToCompactNum(product.view)}</span>
                      <span className='text-gray-500 font-normal text-xs md:text-sm'>{t('view')}</span>
                    </div>
                  </div>
                  <div className='mt-8 bg-gray-100 w-full flex items-center rounded-sm py-7 px-4'>
                    <div className='mr-3'>
                      <span className=' text-gray-400'>₫</span>
                      <span className='text-gray-400 line-through'>
                        {formatCurrency(product.price_before_discount)}
                      </span>
                    </div>
                    <div className='flex items-center text-orange text-3xl font-medium mr-3'>
                      <span>₫</span>
                      <h3>{formatCurrency(product.price)}</h3>
                    </div>
                    <div className='uppercase bg-orange shadow text-xs text-white px-1 rounded-sm'>
                      {rateSale(product.price_before_discount, product.price)} {t('off')}
                    </div>
                  </div>
                  <div className='mt-8 flex items-center'>
                    <span className='capitalize text-gray-500 text-sm w-24'>{t('quantity')}</span>
                    <div className='flex items-center gap-4'>
                      <QuantityController
                        onDecrease={handleQuatity}
                        onIncrease={handleQuatity}
                        onType={handleQuatity}
                        onOutFocus={handleQuatity}
                        value={quantity}
                        max={product.quantity}
                      />
                      <span className='text-sm text-gray-500'>
                        {product.quantity} {t('available')}
                      </span>
                    </div>
                  </div>
                  <div className='mt-8 flex gap-4'>
                    <Button
                      className='flex-1 md:flex-initial lg:flex-initial border border-orange bg-orange/10 rounded-sm px-5 py-3 shadow-sm'
                      classChild='flex items-center justify-center gap-2'
                      onClick={() => handleAddToCart(product._id)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5 text-orange'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                        />
                      </svg>
                      <span className='text-orange'>{t('add_button')}</span>
                    </Button>
                    <Button
                      className='bg-orange rounded-sm px-5 py-3 shadow-sm text-white'
                      onClick={() => hanldeBuyNow(product._id)}
                    >
                      {t('buy_button')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='container bg-white p-4 mt-8'>
              <div className=' bg-gray-100 w-full flex items-center rounded-sm py-2 px-3 text-lg uppercase'>
                {t('describe')}
              </div>
              <div
                className='mt-4 text-sm leading-loose'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              ></div>
            </div>
            {productListData && (
              <div className='mt-4 container px-4 lg:px-0'>
                <div className=' flex items-center rounded-sm py-3 text-lg uppercase text-gray-600'>
                  {t('similar_products')}
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                  {productListData.data.data.products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        )
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  )
}
