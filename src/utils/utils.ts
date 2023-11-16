//Chuyển đổi tiền tệ
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(Number(currency))
}

//Chuyển thành social style (dạng tối giản của chữ số theo 'en')
export function convertToCompactNum(num: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(Number(num))
    .replace('.', ',')
    .toLowerCase()
}

//Tính khoản % giảm giá
export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

//Xóa những kí tự đặc biệt
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

//Tạo NameId để làm url thân thiện hơn
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}

// Lấy id từ nameID
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i.')
  return arr[1]
}
