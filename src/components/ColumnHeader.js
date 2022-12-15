import React, { Fragment, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Button from './Button'
import NewTaskDialog from './NewTaskDialog';

const ColumnHeader = ({ title, id }) => {
    const [isTaskOpen, setIsTaskOpen] = useState(false)

    const openTaskModal = () => {
        setIsTaskOpen(true)
    }


  return (
    <Fragment>
        <p className="uppercase text-center font-medium text-xl mb-3">{title}</p>
        <Button btnStyle='black' btnSize='edgy' onClick={openTaskModal}><PlusCircleIcon className='text-primary h-6 w-6 mr-2 group-hover:text-primaryDark'/> Add New</Button>
        
        <NewTaskDialog id={id} isTaskOpen={isTaskOpen} setIsTaskOpen={setIsTaskOpen} title={title} />
    </Fragment>
  )
}

export default ColumnHeader