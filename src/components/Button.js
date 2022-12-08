import React from 'react'

const Button = ({btnStyle, btnSize, children, ...props}) => {
    const buttonType = {
        default: 'text-grayDark bg-transparent hover:text-primaryDark',
        outline: 'border border-primaryDark text-primaryDark bg-transparent hover:border-primary hover:text-primary',
        colored: 'border border-primaryDark text-background bg-primaryDark hover:border-primary hover:text-grayLight hover:bg-primary',
        google: 'border border-[#4285f4] bg-[#4285f4] text-white',
        black: 'border border-gray-900 bg-gray-900 text-gray-50 hover:border-zinc-700 hover:bg-zinc-700'
    }

    const buttonSize = {
      minimal: 'w-max rounded-lg',
      full: 'w-full rounded-lg',
      edgy: 'w-full'
    }

  return (
    <button className={`flex items-center justify-center text-lg px-4 py-1  ${buttonType[btnStyle]} ${buttonSize[btnSize]} cursor-pointer transition duration-200`} {...props}>{children}</button>
  )
}

export default Button