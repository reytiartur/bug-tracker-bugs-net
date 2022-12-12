import React, { Fragment, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react'
import { useContext } from 'react';
import { TasksContext } from '../context/tasksContext';
import Input from './Input';
import { UserContext } from '../context/userContext';
import { Dialog } from '@headlessui/react'
import Button from './Button'

const ColumnHeader = ({ title, id }) => {
    const { setTasks, tags, setTags } = useContext(TasksContext)
    const { currentUser } = useContext(UserContext)
    let [isInputOpen, setIsInputOpen] = useState(false)
    let [isTaskOpen, setIsTaskOpen] = useState(false)

    const handleSubmit = (e, container) => {
        e.preventDefault()
        const {name, deadline, description, tag } = e.target.elements
        const id = new Date.now();
        const time = new Date.now();
        const author = currentUser.userName;

        setTasks((prevTasks) => 
            ({...prevTasks, [container]: [...prevTasks[container], {name: name.value, description: description.value, id, author, time, deadline: deadline.value, comments:[], tag: tag.value}]
        }))

        closeTaskModal()
    }

    const closeInputModal = () => {
        setIsInputOpen(false)
    }
    
    const openInputModal = () => {
        setIsInputOpen(true)
    }

    const closeTaskModal = () => {
        closeInputModal()
        setIsTaskOpen(false)
    }
    
    const openTaskModal = () => {
        setIsTaskOpen(true)
    }

    const handleNewTag = (e) => {
        e.preventDefault()
        const { tag } = e.target.elements
        setTags((prevState) => ([tag.value, ...prevState]))
        closeInputModal()
    }


  return (
    <Fragment>
        <p className="uppercase text-center font-medium text-xl mb-3">{title}</p>
        <Button btnStyle='black' btnSize='edgy' onClick={openTaskModal}><PlusCircleIcon className='text-primary h-6 w-6 mr-2 group-hover:text-primaryDark'/> Add New</Button>
        
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
                    <Dialog.Title className="text-center font-medium text-lg capitalize">Adding task to "{title.toUpperCase()}"</Dialog.Title>
                    <form onSubmit={(e) => handleSubmit(e, id)} className='flex flex-col px-3 my-2'>
                        <Input label='Task Name' type='text' id='name' autocomplete='off' />

                        <label htmlFor="description" className='text-lg pl-1 font-medium'>Task Description</label>
                        <textarea id='description' rows='3' className='mb-1 resize-none bg-background rounded-md px-2 py-1 border-2 border-grayDark' />

                        <Input label='Deadline' type='date' id='deadline' />

                        <div className="flex justify-between items-center px-1">
                            <label htmlFor="tag" className='text-lg pl-1 font-medium '>#Tag</label>
                            <Button btnStyle='default' btnSize='minimal' type='button' onClick={openInputModal}>New Tag</Button>
                        </div>
                        
                        <select id="tag" className='mb-6 bg-background rounded-md px-2 py-1 border-2 border-grayDark'>
                            {tags.map(value => (
                                <option value={value}>{value}</option>
                            ))}
                        </select>

                        <Button btnStyle='black' btnSize='full' type='submit'>Create Task</Button>
                    </form>
                </Dialog.Panel>
            </Dialog>
        </Transition>


        <Transition appear show={isInputOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 bg-black/50 flex justify-center items z-30" onClose={closeInputModal}>
                <Dialog.Panel className='absolute transform left-1/2 -translate-x-1/2 top-1/3 z-30 px-4 pt-4 pb-6 flex flex-col items-center gap-6 bg-background rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                    <Dialog.Title className="text-center font-medium text-lg capitalize">Set new #tag</Dialog.Title>
                    <form onSubmit={handleNewTag} className='flex gap-3 items-stretch'>
                        <Input type="text" id="tag" autocomplete='off' />
                        <Button btnStyle='outline' btnSize='minimal' type='submit'>Add</Button>
                    </form>
                    <Button btnStyle='black' btnSize='full' type='button' onClick={closeInputModal}>Close</Button>
                    
                </Dialog.Panel>
            </Dialog>
        </Transition>
    </Fragment>
  )
}

export default ColumnHeader