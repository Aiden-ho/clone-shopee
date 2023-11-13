import { Category } from 'src/types/Category.type'
import { SuccessRespone } from 'src/types/Util.type'
import http from 'src/utils/http'

const categoryApi = {
  getCategories: () => {
    return http.get<SuccessRespone<Category[]>>('/categories')
  }
}

export default categoryApi
