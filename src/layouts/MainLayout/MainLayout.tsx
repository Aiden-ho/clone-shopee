import React from 'react'
import Footer from 'src/components/footer'
import Header from 'src/components/header'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
