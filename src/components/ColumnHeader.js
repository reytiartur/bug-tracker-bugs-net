import React, { Fragment, useContext, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Button from './Button'
import { TasksContext } from '../context/tasksContext';
import BacklogDropdown from './BacklogDropdown';

const ColumnHeader = ({ title, id }) => {
  const [isTaskOpen, setIsTaskOpen] = useState(false)
  const { tasks } = useContext(TasksContext)

  const openTaskModal = () => {
    setIsTaskOpen(true)
  }


  return (
    <Fragment>
      <p className="uppercase text-center font-medium text-xl mb-1">{title}</p>
      <p className="text-center font-light mb-2 text-sm text-grayLight">{tasks[id].length} tasks</p>
      <Button btnStyle='black' btnSize='edgy' onClick={openTaskModal}><PlusCircleIcon className='text-primary h-6 w-6 mr-2 group-hover:text-primaryDark'/> Add New</Button>
      
      <BacklogDropdown container={id} isTaskOpen={isTaskOpen} setIsTaskOpen={setIsTaskOpen} title={title} />
    </Fragment>
  )
}

export default ColumnHeader