// Get the available tasks

import axios from "axios";
axios.defaults.withCredentials = true;

import { useState, useEffect } from "react";

export default function useTasksList(userId) {
    const [tasksList, setTasksList] = useState([]);

    useEffect(() => {
        getPendingTasksList();

        async function getPendingTasksList() {
            const res = await axios.get(`http://localhost:3000/users/${userId}/tasks`);
            
            const tasks = await res.data;
    
            setTasksList(tasks);
        }
    }, [userId]);
    return tasksList;
}
