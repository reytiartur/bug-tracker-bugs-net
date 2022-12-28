import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'

const ProfileInfo = () => {
    const { currentUser } = useContext(UserContext)
    const { userName, photoURL } = currentUser;

    const name = userName?.split(' ');
    const initials = name?.map(word => word.charAt(0)).join('')

  return (
    <div className='py-6 pl-6 flex flex-col justify-center items-center'>
        <div className="rounded-full overflow-hidden object-cover flex items-center justify-center bg-grayDark w-16 h-16">
            {photoURL ? <img src={photoURL} alt="" /> : <div className="flex items-center justify-center text-gray-50 text-xl font-medium">{initials}</div> }
        </div>
        <p className='font-xl text-gray-900 mt-2 font-medium'>{userName}</p>
    </div>
  )
}

export default ProfileInfo