import { Popover, Transition } from '@headlessui/react'
import React, { useContext } from 'react'
import { TasksContext } from '../context/tasksContext'
import Button from './Button'

const ProjectSettingsPopover = () => {
  const { projects, setProjects, selectedProject } = useContext(TasksContext)

  const deleteProject = () => {
    const newProjects = projects.filter(project => Object.keys(project)[0] !== selectedProject)
    setProjects(newProjects)
  }

  return (
    <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-x-1"
        enterTo="opacity-100 -translate-x-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 -translate-x-0"
        leaveTo="opacity-0 -translate-x-1" 
    >
        <Popover.Panel className="left-9 -top-8 w-24 text-sm z-20 rounded-sm flex flex-col absolute bg-background shadow-lg ring-1 border border-black ring-black ring-opacity-5">
            <Button btnStyle='default' btnSize='edgy' onClick={deleteProject}>delete</Button>
        </Popover.Panel>                    
    </Transition>
  )
}

export default ProjectSettingsPopover