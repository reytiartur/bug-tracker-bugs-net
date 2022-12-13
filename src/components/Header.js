import React from 'react'
import Filter from './Filter'
import ProfileInfo from './ProfileInfo'
import Search from './Search'

const Header = () => {
  return (
    <div className='flex relative grow-0 shrink-0 basis-1/6'>
        <ProfileInfo />
        <Search />
        <Filter />
    </div>
  )
}

export default Header