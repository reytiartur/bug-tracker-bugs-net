import React, { useContext, useState } from 'react'
import TasksColumn from './TasksColumn'
import { DndContext, DragOverlay, MouseSensor, rectIntersection, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from '@dnd-kit/sortable';
import { TasksContext } from '../context/tasksContext';
import TaskCard from './TaskCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { tasks, setTasks, projects, setProjects, selectedProject } = useContext(TasksContext)
    const [activeId, setActiveId] = useState(null);
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const sensors = useSensors(mouseSensor, touchSensor)
    const fullArray = Array.from(Object.values(tasks).flat())
    const navigate = useNavigate()

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

            const index = projects.findIndex(obj => obj[selectedProject]);
            setProjects(
                projects.map((obj, i) => {
                const [[key, project]] = Object.entries(obj)
                const oldIndex = active.data.current.sortable.index;
                const newIndex = over.id in project ? project[overContainer].length + 1 : over.data.current.sortable.index;
                let newItem = moveBetweenContainers(project, activeContainer, oldIndex, overContainer, newIndex, active.id)
                return i === index ? {[key]: {...newItem}} : obj
            }))
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

            const index = projects.findIndex(obj => obj[selectedProject]);
            setProjects(
                projects.map((obj, i) => {
                const [[key, project]] = Object.entries(obj)
                return i === index ? {[key]: {...project, [overContainer]: arrayMove(project[overContainer], oldIndex, newIndex)}} : obj
            }))
        } else {            
            setTasks((prevTasks) => {
                const oldIndex = tasks[activeContainer].findIndex(obj => obj.id === active.id);
                const newIndex = tasks[overContainer].length;
                return moveBetweenContainers(
                    prevTasks,
                    activeContainer,
                    oldIndex,
                    overContainer,
                    newIndex,
                    active.id
                )
            })

            const index = projects.findIndex(obj => obj[selectedProject]);
            setProjects(
                projects.map((obj, i) => {
                const [[key, project]] = Object.entries(obj)
                const oldIndex = project[activeContainer].findIndex(obj => obj.id === active.id);
                const newIndex = project[overContainer].length;
                let newItem = moveBetweenContainers(project, activeContainer, oldIndex, overContainer, newIndex, active.id)
                return i === index ? {[key]: {...newItem}} : obj
            }))
        }

        setActiveId(null);
    }

    return (
        <div className='relative grid grid-cols-4 gap-6 2xl:gap-10 px-6 2xl:px-14 grow-0 shrink-0 basis-5/6 overflow-hidden'>
            {tasks.backlog?.length ? (<DndContext sensors={sensors} collisionDetection={rectIntersection} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragCancel={handleDragCancel} onDragEnd={handleDragEnd}>
                <TasksColumn key='to do' title='to do' id='todo' tasks={tasks?.todo} />
                <TasksColumn key='in progress' title='in progress' id='inProgress' tasks={tasks?.inProgress} />
                <TasksColumn key='in review' title='in review' id='inReview' tasks={tasks?.inReview} />
                <TasksColumn key='done' title='done' id='done' tasks={tasks?.done} />
                <DragOverlay>{activeId ? <TaskCard id={activeId} task={fullArray?.filter(task => task?.id === activeId)[0]} /> : null}</DragOverlay>
            </DndContext>) : !tasks.backlog?.length ? (
            <div className='flex items-center col-span-full justify-center'>
                <div className="flex gap-1">
                    <p className="">There are no tasks in your backlog yet. Please, </p>
                    <p className="underline underline-offset-4 font-medium hover:text-primaryDark cursor-pointer" onClick={() => navigate('/backlog')}>go to Backlog</p>
                    <p className=""> and create your first task.</p>
                </div>
            </div>) : null}
        </div>
    )
}

export default Dashboard