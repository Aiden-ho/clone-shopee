import { waitFor } from '@testing-library/react'
import path from 'src/constants/path.constants'
import { access_token } from 'src/msw/Auth.msw'
import { setAccessTokenToLS } from 'src/utils/auth'
import { delay, renderWithRouter } from 'src/utils/utilsTest'
import { describe, test, expect } from 'vitest'

describe('Profile', () => {
  test('Authenticated Page', async () => {
    setAccessTokenToLS(access_token)
    renderWithRouter({ route: path.profile })
    await delay(3000)
    // expect(document.body).toMatchSnapshot()
    await waitFor(() => {
      //Verify vào đúng trang chủ
      expect(document.querySelector('title')?.textContent).toBe('Trang hồ sơ | Shopee Clone')
      // expect((document.querySelector('form input[id="name"]') as HTMLInputElement).value).toBe('Kiet Ho')
    })
  })
})
