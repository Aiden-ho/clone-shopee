import config from 'src/constants/config.contants'

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
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

// Lấy id từ nameID
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[1]
}

//loại bỏ các khoảng trống liên tiếp
export const beautySearchString = (search: string) => {
  const beauty_string = removeSpecialCharacter(search).replace(/ +(?= )/g, '')
  return beauty_string.toLowerCase()
}

//hide Email
export const hideEmail = (email?: string) => {
  if (email) {
    return email.replace(/(?<=^[A-Za-z0-9]{2}).*?(?=@)/gm, '*')
  }
}

//nối url cho avatar
export const getAvatarURL = (avatarName?: string) =>
  avatarName ? `${config.BaseURL}/images/${avatarName}` : 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png'

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
