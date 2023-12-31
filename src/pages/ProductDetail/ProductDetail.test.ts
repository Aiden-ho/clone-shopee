import { delay, renderWithRouter } from 'src/utils/utilsTest'
import { describe, test, expect } from 'vitest'

describe('productDetail', () => {
  test('snapshot product detail', async () => {
    renderWithRouter({ route: '/Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba' })
    //deplay để render ra hết trước khi snapshot
    await delay(1000)
    expect(document.body).toMatchSnapshot()
  })
})
