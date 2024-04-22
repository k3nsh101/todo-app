// Get the specific task

import axios from "axios";
axios.defaults.withCredentials = true;

import { useState, useEffect } from "react";

export default function useTask(userId, taskId) {
    const [taskData, setTaskData] = useState({
        title: "",
        dueData: "",
        categoryID: {
            title: "",
            description: ""
        },
        priority: "",
        description: "",
        status: "Pending",
    });

    useEffect(() => {
        getTask();

        async function getTask() {
            const res = await axios.get(
                `http://localhost:3000/users/${userId}/tasks/${taskId}`
            );

            const tasks = await res.data[0];
            setTaskData(tasks);
        }
    }, [userId, taskId]);

    return taskData;
}
