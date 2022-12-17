import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import Draggable from './Draggable';
import ColumnHeader from './ColumnHeader';

const TasksColumn = ({ title, id, tasks }) => {
    const { setNodeRef } = useDroppable({id});

  return (
    <div className=''>
        <ColumnHeader title={title} id={id} />

        <div className="h-3 w-full border-b-2 border-grayDark" />

        <SortableContext items={tasks} id={id} strategy={verticalListSortingStrategy}>
            <div ref={setNodeRef} className='min-h-full'>  
               {tasks.map(task => (
                  <Draggable key={task.name} id={task.id} task={task} title={title} container={id} />
                ))} 
            </div>            
        </SortableContext>  
    </div>
  )
}

export default TasksColumn