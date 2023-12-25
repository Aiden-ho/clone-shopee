import { getBaseURL } from 'src/utils/utilsTest'
import { HttpResponse, http } from 'msw'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { URL_PRODUCT } from 'src/apis/product.api'

const products = {
  message: 'Lấy các sản phẩm thành công',
  data: {
    products: [
      {
        _id: '60afb2426ef5b902180aacb9',
        images: [
          'https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg',
          'https://api-ecom.duthanhduoc.com/images/b997dac2-2674-4e20-b5ee-459566b077e7.jpg',
          'https://api-ecom.duthanhduoc.com/images/ac328d77-6014-4a2d-8626-924ac35876df.jpg',
          'https://api-ecom.duthanhduoc.com/images/5061fefa-bded-4fb0-80e5-3623656a4816.jpg',
          'https://api-ecom.duthanhduoc.com/images/02c08a86-4d9b-437b-ae02-f1d49cf2933b.jpg',
          'https://api-ecom.duthanhduoc.com/images/12c405e3-b24f-46ef-8969-54050e1022e9.jpg',
          'https://api-ecom.duthanhduoc.com/images/d448057c-3d3d-45d2-a9bc-e984bc80555f.jpg'
        ],
        price: 2590000,
        rating: 4.2,
        price_before_discount: 3490000,
        quantity: 73,
        sold: 6800,
        view: 34608,
        name: 'Điện thoại OPPO A12 (3GB/32GB) - Hàng chính hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg',
        createdAt: '2021-05-27T14:52:50.392Z',
        updatedAt: '2023-12-23T16:44:46.244Z'
      },
      {
        _id: '60afb14d6ef5b902180aacb7',
        images: [
          'https://api-ecom.duthanhduoc.com/images/51ef469d-0eb5-48fb-958d-ce2b9c664adc.jpg',
          'https://api-ecom.duthanhduoc.com/images/32d2b004-6a6c-4605-af12-8f8f2e4f6aff.jpg',
          'https://api-ecom.duthanhduoc.com/images/00f74b87-0750-4cc9-9b91-24907a2b1721.jpg',
          'https://api-ecom.duthanhduoc.com/images/f08f305b-e237-444d-9f1e-430ce15acd96.jpg',
          'https://api-ecom.duthanhduoc.com/images/2442b133-7801-47a5-ae7d-5fc5196a1a51.jpg',
          'https://api-ecom.duthanhduoc.com/images/19a98c2f-3ab4-4d72-bbc9-3525fd89859c.jpg',
          'https://api-ecom.duthanhduoc.com/images/9123a99f-e71c-49e7-a87b-974541fcb607.jpg'
        ],
        price: 2130000,
        rating: 5,
        price_before_discount: 2690000,
        quantity: 269,
        sold: 5600,
        view: 7716,
        name: 'Điện Thoại Realme C11 (2GB/32GB) - Hàng Chính Hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/51ef469d-0eb5-48fb-958d-ce2b9c664adc.jpg',
        createdAt: '2021-05-27T14:48:45.577Z',
        updatedAt: '2023-12-23T14:23:09.821Z'
      },
      {
        _id: '60afb07e6ef5b902180aacb6',
        images: [
          'https://api-ecom.duthanhduoc.com/images/4e9c8364-7604-4b61-8658-9f18655bae40.jpg',
          'https://api-ecom.duthanhduoc.com/images/794c2b24-922a-4cc2-8c24-87551af917df.jpg',
          'https://api-ecom.duthanhduoc.com/images/e5ae5753-c153-4a29-9254-48cde48f814f.jpg',
          'https://api-ecom.duthanhduoc.com/images/24ceb22a-d9a2-4936-a53d-1d8c508b5eeb.jpg',
          'https://api-ecom.duthanhduoc.com/images/db1900e0-245c-437f-9e7e-9a5f15045d0f.jpg',
          'https://api-ecom.duthanhduoc.com/images/d4be2e97-e131-4cc6-93ed-432593ba9245.jpg',
          'https://api-ecom.duthanhduoc.com/images/1866d116-06a0-4657-936e-256c8ed09bd0.jpg',
          'https://api-ecom.duthanhduoc.com/images/77c6c7ec-25dc-4d5e-b572-22e7916c1cb2.jpg',
          'https://api-ecom.duthanhduoc.com/images/6492ca72-6451-414c-8653-f31693ebe1e6.jpg'
        ],
        price: 1949000,
        rating: 5,
        price_before_discount: 1990000,
        quantity: 409,
        sold: 1000,
        view: 6302,
        name: 'Điện Thoại Xiaomi Redmi 9A 2GB/32GB - Hàng Chính Hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/4e9c8364-7604-4b61-8658-9f18655bae40.jpg',
        createdAt: '2021-05-27T14:45:18.517Z',
        updatedAt: '2023-12-22T19:43:42.149Z'
      }
    ],
    pagination: {
      page: 1,
      limit: 10,
      page_size: 1
    }
  }
}

const getRequest = http.get(getBaseURL(URL_PRODUCT), () => {
  return HttpResponse.json(products, { status: HttpStatusCode.Ok })
})

const productRequests = [getRequest]

export default productRequests
