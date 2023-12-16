import { AxiosError } from 'axios'
import { describe, expect, it } from 'vitest'
import {
  isUnprocessableEntityError,
  checkAxiosError,
  isUnauthorizedError,
  isTokenExpireError
} from '../axiosErrorChecker'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// describe dùng để mô tả tập hợp các ngữ cảnh
// hoặc 1 đơn vị cần test: Ví dụ function, component
describe('checkAxiosError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('checkAxiosError trả về boolean', () => {
    // expect dùng để mong đợi giá trị trả về
    expect(checkAxiosError(new Error())).toBe(false)
    expect(checkAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isUnprocessableEntityError', () => {
  it('isUnprocessableEntityError trả về boolean', () => {
    expect(
      isUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          data: null,
          status: HttpStatusCode.ServiceUnavailable
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(false)

    expect(
      isUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          data: null,
          status: HttpStatusCode.UnprocessableEntity
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})

describe('isUnauthorizedError', () => {
  it('isUnauthorizedError trả về boolean', () => {
    expect(
      isUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          data: null,
          status: HttpStatusCode.ServiceUnavailable
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(false)

    expect(
      isUnauthorizedError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          data: null,
          status: HttpStatusCode.Unauthorized
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})

describe('isTokenExpireError', () => {
  it('isTokenExpireError trả về boolean', () => {
    expect(
      isTokenExpireError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          data: null,
          status: HttpStatusCode.ServiceUnavailable
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(false)

    expect(
      isTokenExpireError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          data: {
            data: {
              name: 'EXPIRED_TOKEN'
            }
          },
          status: HttpStatusCode.Unauthorized
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      )
    ).toBe(true)
  })
})
