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
