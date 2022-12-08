import React from 'react'
import Button from './Button'

const Search = () => {
    const handleSearch = (e) => {
        e.preventDefault()

    }
  return (
    <form onSubmit={handleSearch} className='flex items-center ml-auto mr-4'>
        <input type="text" className='mx-4 px-2 h-10 text-lg bg-background border-b-2 border-grayLight hover:border-gray-900 focus:border-gray-900 outline-0' placeholder='Search for tasks, reports, messages...' />
        <Button btnStyle='black' btnSize='edgy'>Search</Button>
    </form>
  )
}

export default Search