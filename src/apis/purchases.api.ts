import { DeletePurchase, Purchase, PurchasesListStatus } from 'src/types/Purchases.type'
import { SuccessRespone } from 'src/types/Util.type'
import http from 'src/utils/http'

const url = '/purchases'

const purchasesApi = {
  getPurchases: (params: { status: PurchasesListStatus }) => {
    return http.get<SuccessRespone<Purchase[]>>(url, { params })
  },
  addToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<SuccessRespone<Purchase>>(`${url}/add-to-cart`, body)
  },
  updatePurchase: (body: { product_id: string; buy_count: number }) => {
    return http.put<SuccessRespone<Purchase>>(`${url}/update-purchase`, body)
  },
  buyPurchase: (body: Array<{ product_id: string; buy_count: number }>) => {
    return http.post<SuccessRespone<Purchase>>(`${url}/buy-products`, body)
  },
  deletePurchase: (purchaseIds: Array<string>) => {
    return http.delete<SuccessRespone<DeletePurchase>>(`${url}`, { data: purchaseIds })
  }
}

export default purchasesApi
