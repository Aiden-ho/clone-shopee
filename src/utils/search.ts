export const getSearchHistoryToLS = () => {
  const result = localStorage.getItem('searchcurrentHistory')
  return result ? JSON.parse(result) : []
}

export const setSearchHistoryToLS = (currentHistory: string[]) => {
  localStorage.setItem('searchHistory', JSON.stringify(currentHistory))
}

const handleUniqueValue = (array: string[], keyWord: string) => {
  const index = array.indexOf(keyWord)
  if (index > -1) {
    array.splice(index, 1)
  }

  return array
}

export const HandleSearchHistory = (keyWord: string, currentHistory: string[]) => {
  if (currentHistory.length > 0) {
    currentHistory = handleUniqueValue(currentHistory, keyWord)
    currentHistory.push(keyWord)
    if (currentHistory.length > 5) {
      currentHistory.shift()
    }
  } else {
    currentHistory.push(keyWord)
  }

  return currentHistory
}
