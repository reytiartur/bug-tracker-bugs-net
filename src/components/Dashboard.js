import React, { useContext, useEffect, useState } from 'react'
import TasksColumn from './TasksColumn'
import { DndContext, DragOverlay, MouseSensor, rectIntersection, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from '@dnd-kit/sortable';
import { TasksContext } from '../context/tasksContext';
import TaskCard from './TaskCard';

const Dashboard = () => {
    const { tasks, setTasks } = useContext(TasksContext)
    const [activeId, setActiveId] = useState(null);
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const sensors = useSensors(mouseSensor, touchSensor)
    const fullArray = Array.from(Object.values(tasks).flat())


    const moveBetweenContainers = (tasks, activeContainer, oldIndex, overContainer, newIndex, taskId) => {
        const task = tasks[activeContainer].filter(task => task.id === taskId)[0]

        return {
            ...tasks,
            [activeContainer]: [...tasks[activeContainer].slice(0, oldIndex), ...tasks[activeContainer].slice(oldIndex + 1)],
            [overContainer]: [...tasks[overContainer].slice(0, newIndex), task, ...tasks[overContainer].slice(newIndex)]
        };
    };

    const handleDragStart = ({ active }) => setActiveId(active.id);

    const handleDragCancel = () => setActiveId(null);

    const handleDragOver = ({active, over}) => {
        const overId = over?.id;

        if (!overId) {
            return;
        }

        const { containerId: activeContainer } = active.data.current.sortable
        const overContainer = over.data?.current?.sortable?.containerId || over.id
        
        if (!activeContainer || !overContainer) return;

        if (activeContainer !== overContainer) {
            setTasks((prevTasks) => {
                const oldIndex = active.data.current.sortable.index;
                const newIndex = over.id in prevTasks ? prevTasks[overContainer].length + 1 : over.data.current.sortable.index;
        
                return moveBetweenContainers(
                    prevTasks,
                    activeContainer,
                    oldIndex,
                    overContainer,
                    newIndex,
                    active.id
                );
            });
        }
    }

    const handleDragEnd = ({active, over}) => {
        const { containerId: activeContainer } = active.data.current.sortable
        const overContainer = over.data?.current?.sortable?.containerId || over.id

        if (!activeContainer || !overContainer) return;

        if (activeContainer === overContainer) {
            const oldIndex = tasks[activeContainer].findIndex(obj => obj.id === active.id);
            const newIndex = tasks[overContainer].findIndex(obj => obj.id === over.id);

            setTasks((prevTasks) => ({
                ...prevTasks,
                [overContainer]: arrayMove(prevTasks[overContainer], oldIndex, newIndex)
            }));
        } else {
            const oldIndex = tasks[activeContainer].findIndex(obj => obj.id === active.id);
            const newIndex = tasks[overContainer].length;

            setTasks((prevTasks) => {
                return moveBetweenContainers(
                    prevTasks,
                    activeContainer,
                    oldIndex,
                    overContainer,
                    newIndex,
                    active.id
                )
            })
        }

        setActiveId(null);
    }

    return (
        <div className='relative grid grid-cols-4 gap-6 2xl:gap-10 px-6 2xl:px-14 grow-0 shrink-0 basis-5/6 overflow-hidden'>
            <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragCancel={handleDragCancel} onDragEnd={handleDragEnd}>
                <TasksColumn key='to do' title='to do' id='todo' tasks={tasks.todo} />
                <TasksColumn key='in progress' title='in progress' id='inProgress' tasks={tasks.inProgress} />
                <TasksColumn key='in review' title='in review' id='inReview' tasks={tasks.inReview} />
                <TasksColumn key='done' title='done' id='done' tasks={tasks.done} />
                <DragOverlay>{activeId ? <TaskCard id={activeId} task={fullArray.filter(task => task?.id === activeId)[0]} /> : null}</DragOverlay>
            </DndContext>
        </div>
    )
}

export default Dashboard