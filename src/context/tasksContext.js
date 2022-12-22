import React, { useEffect } from 'react'
import { createContext, useState } from "react";

const defaultTasks = {
  backlog: [{
      name: 'Add UI',
      id: '4',
      author: 'Sandra',
      time: '2022-12-14',
      deadline: '2022-12-20',
      priority: 'high',
      description: 'Create design.',
      comments: [],
      tag: {tag:'UI/UX', color: 'pink'}
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
      tag: {tag: 'Development', color: '#ff6347'}
      },{
      name: 'Complete Dashboard',
      id: '2',
      author: 'Valerii Roman',
      time: '2022-12-12',
      deadline: '2022-12-14',
      priority: 'high',
      description: 'Finish dashboard',
      comments: [],
      tag: {tag: 'Testing', color: 'green'}
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
      tag: {tag: 'Development', color: '#ff6347'}
      },],
  done: []
}

export const TasksContext = createContext({
    tasks: {},
    setTasks: () => {},
    tags: [],
    setTags: () => [],
    projects: [], 
    setProjects: () => [],
})
 
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({})
  const [tags, setTags] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const taskArray = JSON.parse(localStorage.getItem('tasks'));
    setTasks(taskArray);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const projectsArray = JSON.parse(localStorage.getItem('projects'));
    setProjects(projectsArray);
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const value = { tasks, setTasks, tags, setTags, projects, setProjects }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}