import useRouterHook from './useRouterHook'

function App() {
  const routerElements = useRouterHook()

  return <div>{routerElements}</div>
}

export default App
