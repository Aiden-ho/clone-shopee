import { createContext, useMemo, useState } from 'react'
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
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null,
  profile: getProfileToLS(),
  setProfile: () => null,
  historySearch: getSearchHistoryToLS(),
  setHistorySearch: () => null
}

export const AppContext = createContext(initialAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [historySearch, setHistorySearch] = useState<string[] | []>(initialAppContext.historySearch)

  const contextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, profile, setProfile, historySearch, setHistorySearch }),
    [isAuthenticated, setIsAuthenticated, profile, setProfile, historySearch, setHistorySearch]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
