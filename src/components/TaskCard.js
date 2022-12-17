import React, { Fragment, useContext, useEffect, useState } from 'react'
import { ArrowsPointingOutIcon, PencilIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { useSortable } from '@dnd-kit/sortable';
import { Transition, Popover } from '@headlessui/react';
import NewTaskDialog from './NewTaskDialog';
import Input from './Input';
import Button from './Button';
import { TasksContext } from '../context/tasksContext';
import { UserContext } from '../context/userContext';

const TaskCard = ({ id, task, title, container }) => {
    const { attributes, listeners, setActivatorNodeRef, isDragging } = useSortable({id});
    const [deadline, setDeadline] = useState()
    const [color, setColor] = useState()
    const [time, setTime] = useState()
    const [isTaskOpen, setIsTaskOpen] = useState(false)
    const [comment, setComment] = useState('')
    const { setTasks } = useContext(TasksContext)
    const { currentUser } = useContext(UserContext)
    
    const openTaskModal = () => {
        setIsTaskOpen(true)
    }

    const style = {cursor: isDragging ? 'grabbing' : 'grab'}

    const handleComment = () => {

        setTasks((prevTasks) => {
            const currentTask = prevTasks[container].filter(item => item.id === task.id)[0]
            const index = prevTasks[container].indexOf(currentTask)
            const newTask = {...task, comments:[...task.comments, { author:currentUser.userName, text:comment, img:currentUser.imgUrl}]}

            return {...prevTasks, [container]:[...prevTasks[container].slice(0, index), newTask, ...prevTasks[container].slice(index + 1)]}
        })

        setComment('')
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
            setColor('text-yellow-400')
        } else if(date < -1) {
            setDeadline(task.deadline)
            setColor('text-red-500');
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
                    <p className="ml-auto pr-2 text-medium font-medium">{task.comments?.length ? task.comments.length : null}</p>
                    <Popover className="flex self-center z-20">
                        <Popover.Button><ChatBubbleLeftIcon className='w-5 h-5 cursor-pointer text-grayLight ui-open:text-primary' /></Popover.Button>
                        <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1" 
                        appear 
                        >   
                            <Popover.Panel className="w-[400px] h-[400px] flex flex-col absolute transform left-1/2 -translate-x-1/2 top-1/3 bg-background rounded-lg shadow-lg ring-1 border border-black ring-black ring-opacity-5 p-3">
                                <p className="text-center font-medium text-lg px-2">Comments </p>
                                <div className='mt-3'>
                                    {task.comments.map(comment => (
                                        <div key={comment.text + comment.author} className="px-3 flex items-center gap-3 my-2">
                                            <img src={comment.img} className='rounded-full w-8 h-8' />
                                            <div className="flex flex-col">
                                                <p className="text-primaryDark font-medium">{comment.author}</p>
                                                <p className="text-sm">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex h-10 mt-auto mb-2 gap-2">
                                    <Input type='text' placeholder="Add comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                                    <Button btnSize='minimal' btnStyle='black' onClick={() => handleComment()}>Send</Button>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </div>
            </div>            

            <NewTaskDialog id={container} isTaskOpen={isTaskOpen} setIsTaskOpen={setIsTaskOpen} title={title} task={task} />
        </Fragment>
    )
}

export default TaskCard