import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/userContext';
import { TasksProvider } from './context/tasksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </UserProvider>
  </React.StrictMode>
);
