import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const Navbar = () => {
    const navigation = useNavigate()


  return (
    <nav className='flex justify-between items-center py-3 px-8'>
        <img src="" alt="" />
        <div className="flex items-center gap-3">
            <Button onClick={() => navigation('/signin')} btnStyle='default' btnSize='minimal'>Sign In</Button>
            <Button onClick={() => navigation('/signup')} btnStyle='colored' btnSize='minimal'>Sign Up</Button>
        </div>
    </nav>
  )
}

export default Navbar