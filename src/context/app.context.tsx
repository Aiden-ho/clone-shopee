import { createContext, useMemo, useState } from 'react'
import { PurchaseDataExtend } from 'src/types/Purchases.type'
import { User } from 'src/types/User.type'
import { getAccessTokenToLS, getProfileToLS } from 'src/utils/auth'
import { getSearchHistoryToLS } from 'src/utils/search'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  historySearch: string[]
  setHistorySearch: React.Dispatch<React.SetStateAction<string[] | []>>
  purchasesDataExtend: PurchaseDataExtend[]
  setPurchasesDataExtend: React.Dispatch<React.SetStateAction<PurchaseDataExtend[] | []>>
  reset: () => void
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null,
  profile: getProfileToLS(),
  setProfile: () => null,
  historySearch: getSearchHistoryToLS(),
  setHistorySearch: () => null,
  purchasesDataExtend: [],
  setPurchasesDataExtend: () => null,
  reset: () => null
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export function AppProvider({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)
  // Dùng để lưu history dù search ở cart
  const [historySearch, setHistorySearch] = useState<string[] | []>(defaultValue.historySearch)
  //Chuyển purchaseEstend qua đây để có không mấy checked khi chuyển trang
  // Chỉ mất khi reload
  const [purchasesDataExtend, setPurchasesDataExtend] = useState<PurchaseDataExtend[]>(defaultValue.purchasesDataExtend)

  const reset = () => {
    setIsAuthenticated(false)
    setPurchasesDataExtend([])
    setProfile(null)
  }

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      profile,
      setProfile,
      historySearch,
      setHistorySearch,
      purchasesDataExtend,
      setPurchasesDataExtend,
      reset
    }),
    [
      isAuthenticated,
      setIsAuthenticated,
      profile,
      setProfile,
      historySearch,
      setHistorySearch,
      purchasesDataExtend,
      setPurchasesDataExtend
    ]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
