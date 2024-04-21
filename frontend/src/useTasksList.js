// Get the available tasks

import axios from "axios";
axios.defaults.withCredentials = true;

import { useState, useEffect } from "react";

export default function useTasksList() {
    const [tasksList, setTasksList] = useState([]);

    useEffect(() => {
        getTasksList();

        async function getTasksList() {
            const res = await axios.get(
                "http://localhost:3000/tasks",
            );
            
            const tasks = await res.data;
    
            setTasksList(tasks);
        }
    }, []);
    return tasksList;
}
