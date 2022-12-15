import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import TaskCard from './TaskCard';

const Draggable = ({ id, task, title, container }) => {
    const { setNodeRef, transform, transition, isDragging } = useSortable({id});

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

  return (
    <div ref={setNodeRef} style={style}>
        <TaskCard id={id} task={task} title={title} container={container} />
    </div>
  )
}

export default Draggable