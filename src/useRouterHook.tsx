import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import path from './constants/path.constants'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import HistoryPurchases from './pages/HistoryPurchases'
import ChangePasswords from './pages/ChangePasswords'
import UserLayout from './layouts/UserLayout'

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

export default function useRouterHook() {
  const routerElement = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
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
        { path: path.profile, element: <Profile /> },
        { path: path.purchases, element: <HistoryPurchases /> },
        { path: path.passwords, element: <ChangePasswords /> }
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
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])

  return routerElement
}
