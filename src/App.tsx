import useRouterHook from './useRouterHook'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AutoScrollToTop from './components/AutoScrollToTop'

function App() {
  const routerElements = useRouterHook()

  return (
    <div>
      <AutoScrollToTop />
      {routerElements}
      <ToastContainer />
    </div>
  )
}

export default App
