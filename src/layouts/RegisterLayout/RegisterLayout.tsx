import HeaderRegister from 'src/components/HeaderRegister'
import Footer from 'src/components/footer'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <HeaderRegister />
      RegisterLayout {children}
      <Footer></Footer>
    </div>
  )
}
