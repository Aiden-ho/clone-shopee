import { Product, ProductList, ProductParams } from 'src/types/Product.type'
import { SuccessRespone } from 'src/types/Util.type'
import http from 'src/utils/http'

const url = '/products'
const ProductApi = {
  getProducts: (params: ProductParams) => {
    return http.get<SuccessRespone<ProductList>>(url, { params })
  },
  getProductDetail: (id: string) => {
    return http.get<SuccessRespone<Product>>(`${url}/${id}`)
  }
}

export default ProductApi
