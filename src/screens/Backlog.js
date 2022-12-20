import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import NewTaskDialog from '../components/NewTaskDialog'
import TaskCard from '../components/TaskCard'
import { TasksContext } from '../context/tasksContext'

const Backlog = () => {
  const { tasks } = useContext(TasksContext)
  const [isTaskOpen, setIsTaskOpen] = useState(false)

  const openTaskModal = () => {
    setIsTaskOpen(true)
  }

  return (
    <div className='col-[2_/_-1] row-span-full flex flex-col'>
      <Header />
      <div className="h-full overflow-hidden flex flex-col">
        <p className="uppercase text-center font-medium text-2xl mb-1">backlog</p>
        <p className="text-center font-light mb-2 text-sm text-grayLight">{tasks.backlog.length} tasks</p>
        <div className="w-56 self-center">
          <Button btnStyle='black' btnSize='edgy' onClick={openTaskModal}><PlusCircleIcon className='text-primary h-6 w-6 mr-2 group-hover:text-primaryDark'/> Create New Task</Button>
        </div>
        <div className="h-3 w-full self-center border-b-2 border-grayDark" />
        <div className="grid grid-cols-4 px-6 gap-6 2xl:gap-10 2xl:px-14 grow-0 shrink-0 overflow-y-auto">
          {tasks?.backlog?.map(task => (
            <TaskCard key={task.name} id={task.id} title='backlog' task={task} container='backlog' /> 
          ))}
        </div>
  
        <NewTaskDialog container='backlog' isTaskOpen={isTaskOpen} setIsTaskOpen={setIsTaskOpen} title='backlog' />
      </div>
    </div>
  )
}

export default Backlog