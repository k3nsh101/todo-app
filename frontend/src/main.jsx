import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SharedLayout from './SharedLayout.jsx';
import Home from './Home.jsx';
import TaskForm from './TaskForm.jsx'
import CategoryForm from './CategoryForm.jsx';
import UpdateTaskForm from "./UpdateTaskForm.jsx";
import Error from './Error.jsx';

import "./form.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new-task",
        element: <TaskForm />,
      },
      {
        path: "/new-category",
        element: <CategoryForm />,
      },
      {
        path: "/update-task/:taskId",
        element: <UpdateTaskForm />,
      },
      {
        path: "*",
        element: <Error />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)