import { ReactNode, Component, ErrorInfo } from 'react'
//Dùng để bắt các lỗi liên quan đến
// - Lỗi trong quá trình rendering
// - Lỗi trong lifecycle
// - Lỗi trong constructor

// Lưu ý Error Boundary không bắt được các lỗi
// - Event handler (function handle event)
// - Code bất đồng bộ (bên trong bất đồng bộ, tuy nhiên những bất đồng bộ ảnh làm rendering lại như state thì bắt được)
// - Server side rendering
// - Lỗi trong Error Boundary (lỗi bên trong class ErrorBoundary)

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

// Khi khai báo interface cho state thì sẽ tự add vào ở class
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // Có state là hasError (có thể đổi tên nếu muốn, mặc định react dùng hasError)
    //state này như status có lỗi hay không
    this.state = { hasError: false }
  }

  //Trong quá trình rendering mà có lỗi gì thì func này sẽ chạy (quan trọng nhất)
  //Đây cũng là nơi update state hoặc làm gì đó khi lỗi
  //Kiểu Error là kiểu của React, biến _ là biến error nhưng do ko dùng nên rename thành _ (1 quy ước của dev)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  //Nơi nhận diện lỗi xem đó là lỗi gì (optional)
  //Biến ErrorInfo cũng là biết của react
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    //Sau khi nhận diện lỗi, có thể log vào db, console.log hoặc api để tracking
    console.log('unCaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <section className='bg-white h-screen flex justify-center items-center'>
          <div className='py-16 px-6'>
            <div className='mx-auto text-center'>
              <h1 className='text-orange mb-4 text-7xl tracking-tight font-bold lg:text-9xl'>LỖI</h1>
              <p className='mb-4 text-3xl tracking-tight font-semibold text-gray-600 md:text-4xl'>
                Hệ thống đang cập nhật
              </p>
              <p className='mb-4 text-lg font-light text-gray-600 dark:text-gray-400'>
                Chúng tôi xin lỗi về sự bất tiện này. Xin vui lòng trở lại sau.
              </p>
            </div>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}
