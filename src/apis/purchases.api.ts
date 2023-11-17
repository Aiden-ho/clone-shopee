import { Purchases, PurchasesStatus } from 'src/types/Purchases.type'
import { SuccessRespone } from 'src/types/Util.type'
import http from 'src/utils/http'

const url = '/purchases'

const purchasesApi = {
  getPurchases: (params: { status: PurchasesStatus }) => {
    return http.get<SuccessRespone<Purchases[]>>(url, { params })
  },
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessRespone<Purchases>>(`${url}/add-to-cart`, body)
  }
}

export default purchasesApi
