import { createContext, useMemo, useState } from 'react'
import { User } from 'src/types/User.type'
import { getAccessTokenToLS, getProfileToLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null,
  profile: getProfileToLS(),
  setProfile: () => null
}

export const AppContext = createContext(initialAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  const contextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, profile, setProfile }),
    [isAuthenticated, setIsAuthenticated, profile, setProfile]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
