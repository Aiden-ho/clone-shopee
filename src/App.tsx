import useRouterHook from './useRouterHook'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AutoScrollToTop from './components/AutoScrollToTop'
import { useContext, useEffect } from 'react'
import { AppContext, AppProvider } from './context/app.context'
import { localStorageEvenTarget } from 'src/utils/auth'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'

//Cải thiện seo
import { HelmetProvider } from 'react-helmet-async'

function App() {
  const routerElements = useRouterHook()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    // Sau khi tạo event mới bên auth, thì bên này sẽ lắng nghe
    // Khi lắng nghe được event này chạy được dispath và thực hiện func reset lại context liên quang
    localStorageEvenTarget.addEventListener('clearLS', reset)

    return () => {
      //khi dùng xong thì xóa event listener
      localStorageEvenTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <HelmetProvider>
      <AppProvider>
        <ErrorBoundary>
          <div>
            <AutoScrollToTop />
            {routerElements}
            <ToastContainer />
          </div>
        </ErrorBoundary>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
