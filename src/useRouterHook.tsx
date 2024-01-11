import { Navigate, Outlet, useRoutes, useParams } from 'react-router-dom'
import { useContext, lazy, Suspense } from 'react'
import { AppContext } from './context/app.context'
import path from './constants/path.constants'
// import ProductList from './pages/ProductList'
// import Login from './pages/Login'
// import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
// import Profile from './pages/Profile'
// import ProductDetail from './pages/ProductDetail'
// import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
// import HistoryPurchases from './pages/HistoryPurchases'
// import ChangePasswords from './pages/ChangePasswords'
import UserLayout from './layouts/UserLayout'
// import NotFound from './pages/NotFound/NotFound'
import { getIdFromNameId } from './utils/utils'
import LoadingSpiner from './components/LoadingSpiner'

//Lazy load
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Profile'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const HistoryPurchases = lazy(() => import('./pages/HistoryPurchases'))
const ChangePasswords = lazy(() => import('./pages/ChangePasswords'))
const ProductList = lazy(() => import('./pages/ProductList'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

// protect user's route
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

//reject route
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

//check 404 of route path
function CheckLegalDetailRoute() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  return id ? <Outlet /> : <Navigate to={path.notFound} />
}

export default function useRouterHook() {
  const routerElement = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingSpiner />}>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <CheckLegalDetailRoute />,
      children: [
        {
          path: path.productDetail,
          element: (
            <MainLayout>
              <Suspense fallback={<LoadingSpiner />}>
                <ProductDetail />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense fallback={<LoadingSpiner />}>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.user,
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense fallback={<LoadingSpiner />}>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.purchases,
                  element: (
                    <Suspense fallback={<LoadingSpiner />}>
                      <HistoryPurchases />
                    </Suspense>
                  )
                },
                {
                  path: path.passwords,
                  element: (
                    <Suspense fallback={<LoadingSpiner />}>
                      <ChangePasswords />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense fallback={<LoadingSpiner />}>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense fallback={<LoadingSpiner />}>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: path.notFound,
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: <Navigate to={path.notFound} />
    }
  ])

  return routerElement
}
