import React from 'react'
import { createContext, useState } from "react";

export const TasksContext = createContext({
    tasks: {},
    setTasks: () => {},
//   backlog: [], 
//   setBacklog: () => [],
//   todo: [],
//   setTodo: () => [],
//   inProgress: [],
//   setInProgress: () => [],
//   inReview: [],
//   setInReview: () => [],
//   done: [],
//   setDone: () => [],
    tags: [],
    setTags: () => [],
})
 
export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({
        backlog: [],
        todo: [{
            name: 'Add Tasks',
            id: '1',
            author: 'Artur Reyti',
            time: '1 day ago',
            deadline: '09.12',
            priority: 'high',
            description: 'Create add task functionality.',
            comments: ['Time is ticking...', 'it is not so ease'],
            tag: 'Development'
            },{
                name: 'Complete Dashboard',
                id: '2',
                author: 'Valerii Roman',
                time: '2 days ago',
                deadline: '10.12',
                priority: 'high',
                description: 'Finish dashboard',
                comments: ['God job'],
                tag: 'Development'
            },],
        inProgress: [],
        inReview: [{
            name: 'Off',
            id: '3',
            author: 'Artur Reyti',
            time: '1 day ago',
            deadline: '09.12',
            priority: 'high',
            description: 'Create add task functionality.',
            comments: ['Time is ticking...', 'it is not so ease'],
            tag: 'Development'
            },],
        done: []
    })
//   const [backlog, setBacklog] = useState(['']);
//   const [todo, setTodo] = useState([{
//     name: 'Add Tasks',
//     id: '1',
//     author: 'Artur Reyti',
//     time: '1 day ago',
//     deadline: '09.12',
//     priority: 'high',
//     description: 'Create add task functionality.',
//     comments: ['Time is ticking...', 'it is not so ease'],
//     tag: 'Development'
//     },]);
//   const [inProgress, setInProgress] = useState([{
//     name: 'Off',
//     id: '3',
//     author: 'Artur Reyti',
//     time: '1 day ago',
//     deadline: '09.12',
//     priority: 'high',
//     description: 'Create add task functionality.',
//     comments: ['Time is ticking...', 'it is not so ease'],
//     tag: 'Development'
//     },]);
//   const [inReview, setInReview] = useState([{
//     name: 'Complete Dashboard',
//     id: '2',
//     author: 'Valerii Roman',
//     time: '2 days ago',
//     deadline: '10.12',
//     priority: 'high',
//     description: 'Finish dashboard',
//     comments: ['God job'],
//     tag: 'Development'
//     },]);
//   const [done, setDone] = useState(['']);
    const [tags, setTags] = useState([])

  const value = { tasks, setTasks, tags, setTags }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}