import { Listbox } from '@headlessui/react'
import React, { useContext, useEffect, useState } from 'react'
import { TasksContext } from '../context/tasksContext'
import { CheckIcon } from '@heroicons/react/20/solid'

const BacklogDropdown = ({setTask}) => {
    const { tasks } = useContext(TasksContext)
    const [input, setInput] = useState('Select from Backlog')

    const handleChoose = (e) => {
        setTask(e)
        setInput(e.name)
    }

    return (
        <div className="">
            <p className='text-lg pl-1 font-medium'>Select from Backlog</p>
            <Listbox value={input} onChange={(e) => handleChoose(e)}>
                <Listbox.Button className='h-10 w-full z-30 bg-background text-lg rounded-md px-2 py-1 border-2 border-grayDark'>{input}</Listbox.Button>
                <Listbox.Options className='z-50 h-max w-full cursor-pointer bg-background rounded-md border-2 border-grayDark overflow-hidden'>
                    {tasks.backlog.map(task => (
                        <Listbox.Option key={task.id} value={task} className='ui-active:bg-primaryDark ui-active:text-white px-3 py-1 flex '>
                            <p className='font-medium'>{task.name}</p>
                            <p className='uppercase ml-auto border rounded-full px-2 border-grayLight bg-grayLight'>{task.priority}</p>
                            <CheckIcon className="hidden ui-selected:block" />
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export default BacklogDropdown