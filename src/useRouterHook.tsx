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
          <Suspense>
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
              <Suspense>
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
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.user,
      element: (
        <MainLayout>
          <UserLayout>
            <ProtectedRoute />
          </UserLayout>
        </MainLayout>
      ),
      children: [
        {
          path: path.profile,
          element: (
            <Suspense>
              <Profile />
            </Suspense>
          )
        },
        {
          path: path.purchases,
          element: (
            <Suspense>
              <HistoryPurchases />
            </Suspense>
          )
        },
        {
          path: path.passwords,
          element: (
            <Suspense>
              <ChangePasswords />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
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
