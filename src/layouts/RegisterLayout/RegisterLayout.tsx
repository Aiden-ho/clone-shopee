import HeaderRegister from 'src/components/HeaderRegister'
import Footer from 'src/components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <HeaderRegister />
      {children}
      <Footer></Footer>
    </div>
  )
}
