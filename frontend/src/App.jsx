import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SharedLayout from './SharedLayout.jsx';
import Home from './Home.jsx';
import TaskForm from './TaskForm.jsx'
import CategoryForm from './CategoryForm.jsx';
import UpdateTaskForm from "./UpdateTaskForm.jsx";
import SignUp from "./SignUp.jsx";
import Error from './Error.jsx';
import Login from './SignIn.jsx';

import { UserContext } from './Context.jsx';

import "./form.css";
import "./index.css";

export default function App() {
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
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        }
    ]);

    const [userId, setUserId] = useState("");
    
    return(
        <UserContext.Provider value={{ userId, setUserId }}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    )
}

