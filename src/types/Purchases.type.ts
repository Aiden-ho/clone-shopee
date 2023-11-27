import { Product } from './Product.type'

//Dùng để làm status cho từng purchase
export type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5

// Dùng để làm status để render list purchase
export type PurchasesListStatus = PurchasesStatus | 0

export interface Purchase {
  buy_count: number
  price: number
  price_before_discount: number
  status: number
  _id: string
  user: string
  product: Product
  createdAt: string
  updatedAt: string
  __v: number
}

export interface DeletePurchase {
  deleted_count: number
}
