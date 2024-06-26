import axios from "axios";
axios.defaults.withCredentials = true;

export default async function updateTask(formData) {
    const {userId, taskId, taskName, dueDate, category, priority, status, description} = formData;
    const res = await axios.put(
        `http://localhost:3000/users/${userId}/tasks/${taskId}`,
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