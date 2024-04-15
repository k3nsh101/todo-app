import axios from "axios";

export default async function updateTask(formData) {
    const {taskId, taskName, dueDate, category, priority, status, description} = formData;
    const res = await axios.put(
        `http://localhost:3000/tasks/${taskId}`,
        {
            title: taskName,
            dueDate,
            category,
            priority,
            status,
            description,
        });

    return res;
}