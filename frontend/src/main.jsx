import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Home.jsx';
import TaskForm from './TaskForm.jsx'
import CategoryForm from './CategoryForm.jsx';
import Error from './Error.jsx';

// import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/new-task",
        element: <TaskForm />,
      },
      {
        path: "/new-category",
        element: <CategoryForm />,
      },
    ]
  },
  {
    path: "*",
    element: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)