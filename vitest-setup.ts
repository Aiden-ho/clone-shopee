import * as matchers from '@testing-library/jest-dom/matchers'
import { expect, vi, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import authRequests from './src/msw/Auth.msw'
import userRequests from './src/msw/User.msw'
import productRequests from './src/msw/Product.msw'

// Extend matchers của jest-dom vào vitest để sử dụng
expect.extend(matchers)

//Server setup
const server = setupServer(...authRequests, ...userRequests, ...productRequests)

beforeAll(() => {
  // Start server before all tests
  server.listen({ onUnhandledRequest: 'warn' })
  // implement scrollTo mock before all tests
  global.scrollTo = vi.fn
})

afterAll(() => {
  //  Close server after all tests
  server.close()
  //clear mock after all tests
  vi.clearAllMocks()
})

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
