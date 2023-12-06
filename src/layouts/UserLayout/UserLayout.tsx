import React from 'react'
import NavSideUser from 'src/components/NavSideUser'

interface Props {
  children?: React.ReactNode
}

export default function UserLayout({ children }: Props) {
  return (
    <div className='bg-slate-50 py-5'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-2'>
            <NavSideUser />
          </div>
          <div className='col-span-10'>{children}</div>
        </div>
      </div>
    </div>
  )
}
