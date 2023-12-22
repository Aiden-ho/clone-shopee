import * as matchers from '@testing-library/jest-dom/matchers'
import { expect, vi, beforeAll, afterAll } from 'vitest'

// Extend matchers của jest-dom vào vitest để sử dụng
expect.extend(matchers)

beforeAll(() => {
  global.scrollTo = vi.fn
})

afterAll(() => {
  vi.clearAllMocks()
})
