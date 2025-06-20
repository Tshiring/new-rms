import React from 'react'
import Dashboard from '../../Dashboard'
import {Outlet } from 'react-router'
const Superadmindash = () => {
  return (
    <>
       <div className="flex">
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
</>
  )
}

export default Superadmindash