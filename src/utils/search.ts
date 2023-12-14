import uniq from 'lodash/uniq'

export const getSearchHistoryToLS = () => {
  const result = localStorage.getItem('searchHistory')
  return result ? JSON.parse(result) : []
}

export const setSearchHistoryToLS = (currentHistory: string[]) => {
  localStorage.setItem('searchHistory', JSON.stringify(currentHistory))
}

const handleUniqueValue = (array: string[]) => {
  const reversedArray = array.reverse()
  return uniq(reversedArray)
}

export const HandleSearchHistory = (keyWord: string, currentHistory: string[]) => {
  console.log(currentHistory)
  if (currentHistory.length > 0) {
    currentHistory.push(keyWord)
    currentHistory = handleUniqueValue(currentHistory)
    if (currentHistory.length > 5) {
      currentHistory.shift()
    }
  } else {
    currentHistory.push(keyWord)
  }

  return currentHistory
}
