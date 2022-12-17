import React from 'react'
import { createContext, useState } from "react";

export const TasksContext = createContext({
    tasks: {},
    setTasks: () => {},
    tags: [],
    setTags: () => [],
})
 
export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({
        backlog: [{
            name: 'Add UI',
            id: '4',
            author: 'Sandra',
            time: '2022-12-14',
            deadline: '2022-12-20',
            priority: 'high',
            description: 'Create design.',
            comments: [],
            tag: 'UI/UX'
            }],
        todo: [{
            name: 'Add Tasks',
            id: '1',
            author: 'Artur Reyti',
            time: '2022-12-14',
            deadline: '2022-12-15',
            priority: 'high',
            description: 'Create add task functionality.',
            comments: [{author: "Valerii", text:'Time is ticking...', img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'},{author: "Sandra", text:'it is not so ease', img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'}],
            tag: 'Development'
            },{
            name: 'Complete Dashboard',
            id: '2',
            author: 'Valerii Roman',
            time: '2022-12-12',
            deadline: '2022-12-14',
            priority: 'high',
            description: 'Finish dashboard',
            comments: [],
            tag: 'Development'
            },],
        inProgress: [],
        inReview: [{
            name: 'Off',
            id: '3',
            author: 'Artur Reyti',
            time: '2022-12-14',
            deadline: '2022-12-20',
            priority: 'high',
            description: 'Create add task functionality.',
            comments: [],
            tag: 'Development'
            },],
        done: []
    })

  const [tags, setTags] = useState([])

  const value = { tasks, setTasks, tags, setTags }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}