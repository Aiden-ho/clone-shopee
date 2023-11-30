import useRouterHook from './useRouterHook'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AutoScrollToTop from './components/AutoScrollToTop'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/app.context'
import { localStorageEvenTarget } from 'src/utils/auth'
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
    <div>
      <AutoScrollToTop />
      {routerElements}
      <ToastContainer />
    </div>
  )
}

export default App
