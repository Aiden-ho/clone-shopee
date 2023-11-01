import useRouterHook from './useRouterHook'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routerElements = useRouterHook()

  return (
    <div>
      {routerElements}
      <ToastContainer />
    </div>
  )
}

export default App
