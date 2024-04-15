import axios from "axios";

export default async function deleteTask(taskID) {
    const res = await axios.delete(`http://localhost:3000/tasks/${taskID}`);
    return res;
}