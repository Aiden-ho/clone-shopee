import HeaderRegister from 'src/components/HeaderRegister'
import Footer from 'src/components/Footer'
import { Outlet } from 'react-router-dom'
import { memo } from 'react'

interface Props {
  children?: React.ReactNode
}

function RegisterLayoutInner({ children }: Props) {
  return (
    <div>
      <HeaderRegister />
      {children}
      <Outlet />
      <Footer></Footer>
    </div>
  )
}

const RegisterLayout = memo(RegisterLayoutInner)

export default RegisterLayout
