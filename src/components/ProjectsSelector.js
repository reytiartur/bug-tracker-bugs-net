import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

const ProjectsSelector = ({ setSelected, selected }) => {
    const navigate = useNavigate()

    const handleClick = () => {        
        setSelected('projects')
        navigate('projects')
    }

  return (
    <div onClick={handleClick} className={`flex items-center cursor-pointer px-2 hover:font-medium ${selected === 'projects' ? 'border-l-4 border-gray-900' : ''}`}>
        <div className={`w-8 h-8 text-grayDark ${selected === 'projects' ? 'text-gray-900' : ''}`}>{<ClipboardDocumentListIcon />}</div>
        <p className={`capitalize pl-4 text-lg text-grayDark ${selected === 'projects' ? 'text-gray-900 font-medium' : ''}`}>projects</p>
    </div>
  )
}

export default ProjectsSelector