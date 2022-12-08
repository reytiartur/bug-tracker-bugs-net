import React from 'react'
import Filter from './Filter'
import ProfileInfo from './ProfileInfo'
import Search from './Search'

const Header = () => {
  return (
    <div className='flex relative'>
        <ProfileInfo />
        <Search />
        <Filter />
    </div>
  )
}

export default Header