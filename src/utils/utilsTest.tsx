import { waitFor, screen, render, type waitForOptions } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { expect } from 'vitest'
import config from 'src/constants/config.contants'
import { AppProvider, getInitialAppContext } from 'src/context/app.context'

//Tạo 1 hàm delay với promise và time out
export const delay = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, timeout)
  })

// Hàm logScreen để thay thế screen debug thủ công
// Nhận vào 2 time số là element cần debug và options của waitFor
// element cần debug với default là cả html
// options là optional param
export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  //destructuring timeout trong options nếu có, không thì sẽ lấy mặc định của waitFor
  const { timeout = 1000 } = options || {}
  await waitFor(
    async () => {
      // Nên trong này dùng delay để tạo khoảng chờ trước khi debug để lấy đủ body
      // timeout - 100 để đảm bảo delay trả ra trước khi timeout của waitFor hết => tránh lỗi
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      ...options,
      timeout // Ghi đè timeout nếu có
    }
  )
  //Log body bằng debug
  screen.debug(body, 99999999)
}

//util này giúp customer react query client mà không làm ảnh hưởng đến source code
// Cần đảm bảo rằng QueryClientProvider ở source được move ra ngoài main/index.tsx vì nếu đặt trong App.tsx thì không thì custome được nữa
const createWrapper = () => {
  // Tạo 1 queryclient cho môi trường test
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      },
      mutations: {
        retry: 0
      }
    }
  })
  // util này là 1 HOC nên sẽ trả về 1 func component có đính kèm wrapper bao quanh children
  const Provider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }

  return Provider
}
// Chạy util createWrapper
const CustomeQueryClientProvider = createWrapper()

//util làm vai trò render và khai báo userEvent để dùng nhiều nơi
// nhận vào 1 object chứa route, nếu không truyền gì thì giá trị default là { route = '/' }
export const renderWithRouter = ({ route = '/' } = {}) => {
  // Để dùng BrowserRouter thì cần phải pushState thủ công vào history
  window.history.pushState({}, 'Test Router', route)
  const user = userEvent.setup()
  // Thay vì dùng MemoryRouter thì dùng BrowserRouter để matcher với nhiều case hơn
  // Trả về 1 object gồm những attr mà render trả về và userEvent

  const defaultValueContext = getInitialAppContext()
  console.log(defaultValueContext)
  return {
    ...render(
      // cấu hình queryClient cho App
      <CustomeQueryClientProvider>
        <AppProvider defaultValue={defaultValueContext}>
          <App />
        </AppProvider>
      </CustomeQueryClientProvider>,
      { wrapper: BrowserRouter }
    ),
    user
  }
}

//Util lấy BaseURL cho MSW
export const getBaseURL = (path: string) => {
  const baseURL = config.BaseURL
  return `${baseURL}${path}`
}
