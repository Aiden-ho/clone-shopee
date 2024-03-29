import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import NavSideUser from 'src/components/NavSideUser'

interface Props {
  children?: React.ReactNode
}

function UserLayoutInner({ children }: Props) {
  return (
    <div className='bg-slate-50 py-5'>
      <div className='container'>
        <div className='grid grid-cols-4 md:grid-cols-8  lg:grid-cols-12 gap-6'>
          <div className='col-span-4 md:col-span-8 lg:col-span-2'>
            <NavSideUser />
          </div>
          <div className='col-span-4 md:col-span-8 lg:col-span-10'>
            {children}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

const UserLayout = memo(UserLayoutInner)

export default UserLayout
