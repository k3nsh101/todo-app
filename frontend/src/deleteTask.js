import axios from "axios";
axios.defaults.withCredentials = true;

export default async function deleteTask(userId, taskId) {
    const res = await axios.delete(`http://localhost:3000/users/${userId}/tasks/${taskId}`);
    return res;
}