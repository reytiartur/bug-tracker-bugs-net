import React, { Fragment, useEffect, useState } from 'react'
import { ArrowsPointingOutIcon, PencilIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSortable } from '@dnd-kit/sortable';
import { Dialog, Transition } from '@headlessui/react';
import NewTaskDialog from './NewTaskDialog';

const TaskCard = ({ id, task, title, container }) => {
    const { attributes, listeners, setActivatorNodeRef, isDragging } = useSortable({id});
    const [deadline, setDeadline] = useState()
    const [color, setColor] = useState()
    const [time, setTime] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isTaskOpen, setIsTaskOpen] = useState(false)

    const openTaskModal = () => {
        setIsTaskOpen(true)
    }

    const style = {cursor: isDragging ? 'grabbing' : 'grab'}

    const handleEdit = (task) => {

    }

    const handleDeadline = () => {
        const date = Math.ceil((new Date(task.deadline) - new Date()) / (60*60*24*1000));
        if(date >= 2) {
            setDeadline(task.deadline)
            setColor('');
        } else if(date === 1) {
            setDeadline('tomorrow')
            setColor('');
        } else if(date === 0) {
            setDeadline('today')
            setColor('text-orange-400')
        } else if(date < -1) {
            setDeadline(task.deadline)
            setColor('');
        } else if(date <= 0) {
            setDeadline('yesterday')
            setColor('text-red-500');
        }
    }

    useEffect(() => {
        handleDeadline()
    }, [task.deadline])

    const handleTimeAgo = () => {
        const time = Math.floor((new Date() - new Date(task.time)) / (60*1000));
        if(time <= 1){
            setTime('now')
        } else if(time > 1 && time < 60) {
            setTime(`${time} minutes ago`)
        } else if(Math.floor(time / 60) >= 24) {
            setTime(`${Math.floor((time / 60) / 24)} days ago`)
        } else if(time >= 60) {
            setTime(`${Math.floor(time / 60)} hours ago`)
        }
    }

    useEffect(() => {
        handleTimeAgo()
    }, [])

    console.log(task)


    return (
        <Fragment>
            <div className="py-4 px-3 2xl:py-6 border-b-2 border-grayLight flex flex-col gap-1">
                <div className="flex justify-between gap-3">
                    <div className="flex gap-1">
                        <p className="">Due to</p>
                        <p className={`font-medium ${color}`}>{deadline}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <PencilIcon className='w-4 h-4 outline-none cursor-pointer' onClick={openTaskModal} />
                        <ArrowsPointingOutIcon className='rotate-45 w-4 h-4 outline-none' style={style} ref={setActivatorNodeRef} {...listeners} {...attributes} />
                    </div>
                </div>
                <p className="font-medium">{task.name}</p>
                <p className="text-sm text-grayDark">{task.author}, {time}</p>
                <p className="mt-1 text-sm">{task.description}</p>
                <div className="flex justify-between items-center">
                    <p className="text-sm">#{task.tag}</p>
                    <ChatBubbleLeftIcon className='w-5 h-5 ml-auto cursor-pointer text-grayLight' onClick={() => setIsOpen(true)} />
                    <p className="pl-2 text-medium font-medium">{task.comments.length ? task.comments.length : null}</p>
                </div>
            </div>

            <Transition as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1" 
                appear 
                show={isOpen} 
            >           
                <Dialog as="div" className="fixed inset-0 bg-black/50 flex justify-center items z-20" open={isOpen} onClose={() => setIsOpen(false)}>
                    <Dialog.Panel className="w-[400px] h-[400px] absolute transform left-1/2 -translate-x-1/2 top-1/3 bg-background rounded-lg shadow-lg ring-1 border border-black ring-black ring-opacity-5 p-3">
                        <Dialog.Title className="text-center font-medium text-lg flex items-center justify-between px-2">
                            <p className="">Comments </p>
                            <XMarkIcon className='w-5 h-5 text-black hover:text-red-600' onClick={() => setIsOpen(false)} />
                        </Dialog.Title>
                        <Dialog.Description className='mt-3'>
                            {task.comments.map(comment => {
                                <div className="">
                                    <div className="">
                                        <img src={comment.img} alt="avatar" className='rounded-full w-4 h-4' />
                                        <p className="">{comment.author}</p>
                                        <p className="">{comment.text}</p>
                                    </div>
                                    <p className="">

                                    </p>
                                </div>
                            })}
                        </Dialog.Description>
                    </Dialog.Panel>
                </Dialog>
            </Transition>

            <NewTaskDialog id={container} isTaskOpen={isTaskOpen} setIsTaskOpen={setIsTaskOpen} title={title} task={task} />
        </Fragment>
    )
}

export default TaskCard