import React from 'react'

const Input = ({type, label, ...props}) => {
  return (
    <div className='flex flex-col'>
        {label && <label className='text-lg pl-1 font-medium' htmlFor={label}>{label}</label>}
        <input className='bg-background text-lg rounded-md px-2 py-1 border-2 border-grayDark' type={type} {...props} />
    </div>
  )
}

export default Input