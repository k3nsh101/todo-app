import axios from "axios";
axios.defaults.withCredentials = true;

export default async function checkTask(taskId){
    const res = await axios.put(
        `http://localhost:3000/tasks/${taskId}`,
        {
            status: "Completed",
        },
    );

    return res;
}