import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { logOut, userStateChange } from '../utils/firebase'
import { UserContext } from '../context/userContext'

const SidebarItem = ({icon, category, navigateTo, count, setSelected, selected, props }) => {
    const navigate = useNavigate()
    const { setCurrentUser } = useContext(UserContext)

    const handleClick = async() => {
        if(category !== 'logout') {
            setSelected(category)
        } else {
            await logOut()
            await userStateChange(setCurrentUser)
        }
        navigate(navigateTo)
    }

  return (
    <div onClick={handleClick} className={`flex items-center cursor-pointer px-2 hover:font-medium ${selected === category ? 'border-l-4 border-gray-900' : ''}`} {...props}>
        <div className={`w-8 h-8 text-grayDark ${selected === category ? 'text-gray-900' : ''}`}>{icon}</div>
        <p className={`capitalize pl-4 text-lg text-grayDark ${selected === category ? 'text-gray-900 font-medium' : ''}`}>{category}</p>
        <div>{count}</div>
    </div>
  )
}

export default SidebarItem