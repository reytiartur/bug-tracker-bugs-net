import React from 'react'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { useSortable } from '@dnd-kit/sortable';

const TaskCard = ({ id, task }) => {
    const { attributes, listeners, setActivatorNodeRef } = useSortable({id});

    
    return (
        <div className="py-4 border-b-2 border-grayLight">
            <div className="">
                <p className="">{task.deadline}</p>
                <p className="">{task.priority}</p>
            </div>
            <ArrowsPointingOutIcon className='rotate-45 w-5 h-5 outline-none' ref={setActivatorNodeRef} {...listeners} {...attributes} />
            <p className="">{task.name}</p>
            <div className="">
                <p className="">{task.author}</p>
                <p className="">{task.time}</p>
            </div>
        </div>  
    )
}

export default TaskCard