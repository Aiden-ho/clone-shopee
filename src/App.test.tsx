import { describe, test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { MemoryRouter } from 'react-router-dom'
import { logScreen, renderWithRouter } from './utils/utilsTest'
import path from './constants/path.constants'

describe('APP test', () => {
  test('App render and router', async () => {
    const { user } = renderWithRouter()

    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */
    await waitFor(() => {
      //Verify vào đúng trang chủ
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })

    //Verify chuyển trang
    await user.click(screen.getByText('Đăng nhập'))
    await waitFor(() => {
      ////Verify title trang Đăng nhập
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
      //Verify có form  đăng nhập
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
    })

    // screen.debug(document.body.parentElement as HTMLElement, 999999)
  })

  test('404 page', async () => {
    const bad_url = '/bad/url'

    render(
      <MemoryRouter initialEntries={[bad_url]}>
        <App />
      </MemoryRouter>
    )

    // await waitFor(() => {
    //   expect(screen.getByText(/Trang không tồn tại./i)).toBeInTheDocument()
    // })

    // Log bằng util thay vì thủ công
    // await logScreen()
  })

  test('enter register by url', async () => {
    //dùng util thay vì gọi thủ công
    renderWithRouter({ route: path.register })

    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
