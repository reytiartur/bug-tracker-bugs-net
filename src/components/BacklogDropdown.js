import { Dialog, Listbox, Transition } from '@headlessui/react'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { CheckIcon } from '@heroicons/react/20/solid'
import Button from './Button'

const BacklogDropdown = ({container, isTaskOpen, setIsTaskOpen, title}) => {
    const { tasks, setTasks, projects, setProjects, selectedProject } = useContext(TasksContext)
    const [task, setTask] = useState(null)

    const handleChoose = (id) => {
        const selected = tasks.backlog.filter(item => item.id === id)[0]
        setTask(selected)
    }

    const handleNewTask = () => {
        const newTasks = {...tasks, [container]: [...tasks[container], task]}

        setTasks(newTasks)
        const index = projects.findIndex(obj => obj[selectedProject]);
        setProjects(
            projects.map((obj, i) => {
            return i === index ? {[selectedProject]: newTasks} : obj
        }))
        setTask(null)
        setIsTaskOpen(false)
    }

    return (
        <Transition as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1" 
            appear 
            show={isTaskOpen} 
        > 
            <Dialog as="div" className="fixed inset-0 bg-black/50 flex justify-center items z-20" open={isTaskOpen} onClose={() => setIsTaskOpen(false)}>
                <Dialog.Panel className="w-[400px] h-72 flex flex-col overflow-hidden absolute transform left-1/2 -translate-x-1/2 top-1/3 bg-background rounded-lg shadow-lg ring-1 border border-black ring-black ring-opacity-5 p-3">
                    <Dialog.Title className='text-lg mb-2 font-medium text-center capitalize'>Adding task to "{title?.toUpperCase()}</Dialog.Title>
                    <div className='overflow-y-auto flex flex-col gap-1'>
                        {tasks?.backlog?.map(item => (
                            <div key={item.id} onClick={() => handleChoose(item.id)} className={`px-3 py-2 cursor-pointer hover:bg-primary flex rounded-full ${item.id === task?.id && 'border-2 border-primaryDark'}`}>
                                <p className='font-medium'>{item.name}</p>
                                <p className='uppercase ml-auto text-xs border text-center rounded-full px-2 py-1 border-grayLight bg-grayLight'>{item.priority}</p>
                                <CheckIcon className="hidden ui-selected:block" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-auto mb-2" />
                    <Button btnStyle='black' btnSize='full' onClick={handleNewTask}>Add Task</Button>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}

export default BacklogDropdown