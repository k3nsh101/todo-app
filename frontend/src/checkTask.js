import axios from "axios";
axios.defaults.withCredentials = true;

export default async function checkTask(userId, taskId){
    const res = await axios.put(
        `http://localhost:3000/users/${userId}/tasks/${taskId}`,
        {
            status: "Completed",
        },
    );

    return res;
}