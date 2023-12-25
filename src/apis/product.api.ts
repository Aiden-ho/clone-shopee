import { Product, ProductList, ProductParams } from 'src/types/Product.type'
import { SuccessRespone } from 'src/types/Util.type'
import http from 'src/utils/http'

export const URL_PRODUCT = '/products'
const ProductApi = {
  getProducts: (params: ProductParams) => {
    return http.get<SuccessRespone<ProductList>>(URL_PRODUCT, { params })
  },
  getProductDetail: (id: string) => {
    return http.get<SuccessRespone<Product>>(`${URL_PRODUCT}/${id}`)
  }
}

export default ProductApi
