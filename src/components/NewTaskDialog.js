import React, { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import Input from './Input';
import { Transition } from '@headlessui/react'
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { TasksContext } from '../context/tasksContext';
import Button from './Button';

const NewTaskDialog = ({ container, isTaskOpen, setIsTaskOpen, title, ...props }) => {
    const defaultInputs = {name: '', deadline: '', description: '', priority: 'high', tag: { tag: '', color: ''}}
    const { setTasks, tags, setTags, projects, setProjects, selectedProject } = useContext(TasksContext)
    const [color, setColor] = useState('fff');
    const { currentUser } = useContext(UserContext)
    const [isInputOpen, setIsInputOpen] = useState(false)
    const [inputs, setInputs] = useState(defaultInputs)
    const [task, setTask] = useState(props?.task)
    
        
    const openInputModal = () => {
        setIsInputOpen(true)
    }
    
    const closeInputModal = () => {
        setIsInputOpen(false)
    }

    const closeTaskModal = () => {
        closeInputModal()
        setIsTaskOpen(false)
        setInputs(defaultInputs)
        setTask(props?.task)
    }

    const handleCreateTask = (e) => {
        e.preventDefault()

        const { name, deadline, description, tag, priority } = inputs
        const id = Date.now();
        const time = new Date()
        const author = currentUser.userName;

        setTasks((prevTasks) => 
            ({...prevTasks, [container]: [...prevTasks[container], {name, description, id, author, time, deadline, priority, comments:[], tag: tag}]})
        )

        const index = projects.findIndex(obj => obj[selectedProject]);
        setProjects(
            projects.map((obj, i) => {
                const [[key, project]] = Object.entries(obj)
                return i === index ? {[key]:{ ...project, backlog: [...project.backlog, {name, description, id, author, time, deadline, priority, comments:[], tag: tag}]}} : obj;
            })
        )

        closeTaskModal()
    }

    const handleNewTag = (e) => {
        e.preventDefault()
        const { tag } = e.target.elements
        setInputs((prevState) => ({...prevState, tag: {tag: tag.value, color: color}}))
        setTags((prevState) => ([{tag: tag.value, color: color}, ...prevState]))
        setColor('fff')
        closeInputModal()
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        setInputs({...inputs, [id]: value})
    }

    useEffect(() => {
        setInputs(task ? task : defaultInputs)
    }, [isTaskOpen, task])

    const handleEditTask = (e) => {
        e.preventDefault()

        setTasks((prevTasks) => {
            const item = prevTasks[container].filter(item => item.id === task.id)[0]
            const index = prevTasks[container].indexOf(item)
            const { name, deadline, description, tag, priority } = inputs
            const newTask = {name, deadline, description, tag: tag, author: task.author, id:task.id, time: task.time, priority}
            return {...prevTasks, [container]: [...prevTasks[container].slice(0, index), newTask, ...prevTasks[container].slice(index + 1)]}
        })

        setProjects(
            projects.map((obj, i) => {
                const index = projects.findIndex(obj => obj[selectedProject]);
                if(i === index) {
                    const [[key, project]] = Object.entries(obj)
                    const item = project.backlog.find(item => item.id === task.id)
                    const itemIndex = project.backlog.indexOf(item)
                    const { name, deadline, description, tag, priority } = inputs
                    const newTask = {name, deadline, description, tag: tag, author: task.author, id:task.id, time: task.time, priority}
                    return {[key]:{ ...project, backlog: [...project.backlog.slice(0, itemIndex), newTask, ...project.backlog.slice(itemIndex + 1)]}}
                } else return obj
            })
        )

        closeTaskModal()
    }


  return (
    <Fragment>
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
            <Dialog as="div" className="fixed inset-0 bg-black/50 flex justify-center items z-20" onClose={closeTaskModal}>
                <Dialog.Panel className="w-[400px] absolute transform left-1/2 -translate-x-1/2 top-1/3 bg-background rounded-lg shadow-lg ring-1 border border-black ring-black ring-opacity-5 p-3">
                    <Dialog.Title className="text-center font-medium text-lg capitalize">Adding task to "{title?.toUpperCase()}"</Dialog.Title>
                    <form onSubmit={task ? (e) => handleEditTask(e) : (e) => handleCreateTask(e)} className='flex flex-col px-3 my-2'>
                        <Input label='Task Name' type='text' id='name' autoComplete='off' value={inputs.name} onChange={(e) => handleChange(e)} required  />

                        <label htmlFor="description" className='text-lg pl-1 font-medium'>Task Description</label>
                        <textarea id='description' rows='3' className='mb-1 resize-none bg-background rounded-md px-2 py-1 border-2 border-grayDark' value={inputs.description} onChange={(e) => handleChange(e)} />
                        
                        {title === 'backlog' ? (
                            <>
                                <label htmlFor="priority" className='text-lg pl-1 font-medium'>Priority</label>
                                <select id="priority" className='bg-background rounded-md px-2 py-1 border-2 border-grayDark uppercase' onChange={(e) => handleChange(e)} required>
                                    <option key='high' className='uppercase'>high</option>
                                    <option key='medium' className='uppercase'>medium</option>
                                    <option key='low' className='uppercase'>low</option>
                                </select>
                            </>
                        ) : null}

                        <Input label='Deadline' type='date' id='deadline' value={inputs.deadline} onChange={(e) => handleChange(e)} required />

                        <div className="flex justify-between items-center px-1">
                            <label htmlFor="tag" className='text-lg pl-1 font-medium '>#Tag</label>
                            <Button btnStyle='default' btnSize='minimal' type='button' onClick={openInputModal}>New Tag</Button>
                        </div>
                        
                        <select id="tag" className='mb-6 bg-background rounded-md px-2 py-1 border-2 border-grayDark' style={{color: tags[0]?.color}} defaultValue={tags[0]?.tag} onChange={(e) => handleChange(e)} required>
                            {tags.map(value => (
                                <option key={value.tag + value.color} style={{color: value.color}}>{value.tag}</option>
                            ))}
                        </select>

                        <Button btnStyle='black' btnSize='full' type='submit'>{props?.task ? 'Save' : 'Add Task'}</Button>
                    </form>
                </Dialog.Panel>
            </Dialog>
        </Transition>

        <Transition appear show={isInputOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 bg-black/50 flex justify-center items z-30" onClose={closeInputModal}>
                <Dialog.Panel className='absolute transform left-1/2 -translate-x-1/2 top-1/3 z-30 px-4 pt-4 pb-6 flex flex-col items-center gap-6 bg-background rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                    <Dialog.Title className="text-center font-medium text-lg capitalize">Set new #tag</Dialog.Title>
                    <form onSubmit={handleNewTag} className='flex gap-3 items-center'>
                        <input type="color" id="color" onChange={e => setColor(e.target.value)} />
                        <Input type="text" id="tag" autoComplete='off' autoFocus maxLength='10' style={{color: color}} />
                        <Button btnStyle='outline' btnSize='minimal' type='submit'>Add</Button>
                    </form>
                    <Button btnStyle='black' btnSize='full' type='button' onClick={closeInputModal}>Close</Button>                   
                </Dialog.Panel>
            </Dialog>
        </Transition>
    </Fragment>  
  )
}

export default NewTaskDialog