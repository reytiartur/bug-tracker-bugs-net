import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Application = () => {
  return (
    <div className='grid grid-cols-5 h-full'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Application