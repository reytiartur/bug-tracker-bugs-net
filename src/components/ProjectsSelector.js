import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardDocumentListIcon, ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { Disclosure, Popover, Transition } from '@headlessui/react'
import { TasksContext } from '../context/tasksContext'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import ProjectSettingsPopover from './ProjectSettingsPopover'

const ProjectsSelector = ({ setSelected, selected }) => {
  const { setTasks, projects, setProjects } = useContext(TasksContext)
  const [input, setInput] = useState('')
  const { selectedProject, setSelectedProject } = useContext(TasksContext)

  const navigate = useNavigate()

  const handleClick = () => {        
    setSelected('projects')
  }

  const handleSelect = (project) => {
    setSelectedProject(project)
    navigate(`/projects`)
    tasksSetter(project, projects)
  }

  const handleNewProject = () => {
    const newProjects = [...projects, {[input]: {backlog: [], todo: [], inProgress: [], inReview: [], done: []} }];
    setProjects(newProjects)
    setSelectedProject(input)
    tasksSetter(input, newProjects)
    navigate(`/projects`)
    setInput('')
  }

  const tasksSetter = (findKey, projects) => {
    const obj = projects?.find(project => Object.keys(project)[0] === findKey)
    const taskArray = Object.values(obj)[0] ?? []
    setTasks(taskArray)
  }

  return (
  <Disclosure>
    <Disclosure.Button onClick={handleClick} className={`flex items-center cursor-pointer px-2 hover:font-medium ${selected === 'projects' ? 'border-l-4 border-gray-900' : ''}`}>
      <div className={`w-8 h-8 text-grayDark ${selected === 'projects' ? 'text-gray-900' : ''}`}>{<ClipboardDocumentListIcon />}</div>
      <p className={`capitalize pl-4 text-lg text-grayDark ${selected === 'projects' ? 'text-gray-900 font-medium' : ''}`}>projects</p>
      <ChevronDownIcon className='w-6 ml-auto mr-2 ui-open:rotate-180 transition duration-200' />
    </Disclosure.Button>
    <Transition 
      enter="transition duration-300 ease-out"
      enterFrom="transform scale-80 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-100 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-80 opacity-0"
    >
      <Disclosure.Panel className="w-full text-gray-900 flex flex-col" >
        {projects?.map(project => Object.keys(project).map(key => (
          <div className={`w-4/5 py-2 hover:font-medium cursor-pointer self-end pl-2 flex items-center justify-between ${selectedProject === key ? 'bg-gray-900 text-gray-50 font-medium' : ''}`} onClick={() => handleSelect(key)} key={key}>
            <p>{key}</p>
            <Popover className='relative z-10'>
              <Popover.Button className='flex items-center'><EllipsisHorizontalIcon className='w-8 h-6 pr-2 hover:text-zinc-400'/></Popover.Button>
              <ProjectSettingsPopover />
            </Popover>
          </div>
        )))}
        <div className="flex gap-2 h-7 mt-2 w-4/5 ml-auto">
          <input type='text' className='w-4/5 bg-background rounded-md px-2 py-1 text-sm border-2 border-grayDark' placeholder='New Project' value={input} onChange={(e) => setInput(e.target.value)}></input>
          <button className='bg-black p-1 rounded-full flex items-center justify-center hover:bg-zinc-700' onClick={() => handleNewProject()}><PlusCircleIcon className='text-primary h-5 w-5 group-hover:text-primaryDark'/></button>      
        </div>
      </Disclosure.Panel>
    </Transition>
  </Disclosure>
  )
}

export default ProjectsSelector