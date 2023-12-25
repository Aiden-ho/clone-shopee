import { screen, waitFor } from '@testing-library/react'
import { type UserEvent } from '@testing-library/user-event'
import path from 'src/constants/path.constants'
import { renderWithRouter } from 'src/utils/utilsTest'
import { describe, test, expect, beforeAll } from 'vitest'

describe('Login Test', () => {
  let event: UserEvent
  let emailInput: HTMLInputElement
  let passInput: HTMLInputElement
  let btn_submit: HTMLButtonElement
  beforeAll(async () => {
    const { user } = renderWithRouter({ route: path.login })
    event = user
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    btn_submit = document.querySelector('form button') as HTMLButtonElement
  })

  test('form Login required', async () => {
    const btn_submit = document.querySelector('form button')
    await event.click(btn_submit as HTMLButtonElement)
    expect(await screen.findByText('Vui lòng nhập email')).toBeTruthy()
    expect(await screen.findByText('Vui lòng nhập mật khẩu')).toBeTruthy()
  })

  test('form login with wrong input value', async () => {
    await event.type(emailInput, 'test@gmail')
    await event.type(passInput, '123')
    await event.click(btn_submit)

    expect(await screen.findByText('Email không đúng định dạng')).toBeTruthy()
    expect(await screen.findByText('Mật khẩu tối thiểu 5 kí tự')).toBeTruthy()
  })

  test('form login with right input value', async () => {
    await event.type(emailInput, 'k01@gmail.com')
    await event.type(passInput, '123123')
    await event.click(btn_submit)

    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeNull()
      expect(screen.queryByText('Mật khẩu tối thiểu 5 kí tự')).toBeNull()
    })

    await waitFor(() => {
      //Verify vào đúng trang chủ
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
  })
})
