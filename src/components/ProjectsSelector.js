import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardDocumentListIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Disclosure, Transition } from '@headlessui/react'
import AddButton from './AddButton'

const ProjectsSelector = ({ setSelected, selected }) => {
  const [selectedProject, setSelectedProject] = useState('')
  const projects = ['111', '222']

  const navigate = useNavigate()

  const handleClick = () => {        
      setSelected('projects')
  }

  const handleSelect = (project) => {
    setSelectedProject(project)
    navigate(`/projects`)
    // navigate(`/${project}`)
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
        {!projects ? (<AddButton />) : projects.map(project => (
          <div className={`w-4/5 py-2 hover:font-medium cursor-pointer self-end pl-2 ${selectedProject === project ? 'bg-gray-900 text-gray-50 font-medium' : ''}`} onClick={() => handleSelect(project)} key={project}>{project}</div>
        ))}
      </Disclosure.Panel>
    </Transition>
  </Disclosure>
  )
}

export default ProjectsSelector