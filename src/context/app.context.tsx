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
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null,
  profile: getProfileToLS(),
  setProfile: () => null,
  historySearch: getSearchHistoryToLS(),
  setHistorySearch: () => null,
  purchasesDataExtend: [],
  setPurchasesDataExtend: () => null
}

export const AppContext = createContext(initialAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  // Dùng để lưu history dù search ở cart
  const [historySearch, setHistorySearch] = useState<string[] | []>(initialAppContext.historySearch)
  //Chuyển purchaseEstend qua đây để có không mấy checked khi chuyển trang
  // Chỉ mất khi reload
  const [purchasesDataExtend, setPurchasesDataExtend] = useState<PurchaseDataExtend[]>([])

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      profile,
      setProfile,
      historySearch,
      setHistorySearch,
      purchasesDataExtend,
      setPurchasesDataExtend
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
