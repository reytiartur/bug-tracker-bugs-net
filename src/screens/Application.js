import React from 'react'
import Sidebar from './Sidebar'

const Application = () => {
  return (
    <div className='grid grid-cols-5 h-full'>
      <Sidebar />
      {/* <MainView /> */}
    </div>
  )
}

export default Application