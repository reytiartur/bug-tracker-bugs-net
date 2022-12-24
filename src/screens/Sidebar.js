import React, { useState } from 'react'
import SidebarItem from '../components/SidebarItem'
import { CircleStackIcon } from '@heroicons/react/24/outline'
import { BugAntIcon } from '@heroicons/react/24/outline'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import ProjectsSelector from '../components/ProjectsSelector'

const Sidebar = () => {
    const [selected, setSelected] = useState('projects')

  return (
    <div className='z-10 col-start-1 col-end-2 row-span-full flex flex-col px-8 py-6 border-r border-grayLight'>
        <img src="" alt="" className='my-6' />
        <div className="flex flex-col gap-4">
            <ProjectsSelector setSelected={setSelected} selected={selected} />
            <SidebarItem icon={<CircleStackIcon />} category='backlog' navigateTo='/backlog' setSelected={setSelected} selected={selected} />
            <SidebarItem icon={<BugAntIcon />} category='reports' navigateTo='/reports' setSelected={setSelected} selected={selected} />
            <SidebarItem icon={<ChatBubbleLeftRightIcon />} category='messages' navigateTo='/messages' setSelected={setSelected} selected={selected} />
        </div>
        <div className="flex flex-col gap-4 mt-auto mb-8">
            <SidebarItem icon={<Cog8ToothIcon />} category='setting' navigateTo='/setting' setSelected={setSelected} selected={selected}  />
            <SidebarItem icon={<ArrowLeftOnRectangleIcon />} category='logout' navigateTo='/' setSelected={setSelected} selected={selected} />    
        </div>
    </div>
  )
}

export default Sidebar