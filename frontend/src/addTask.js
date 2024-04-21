import axios from "axios";
axios.defaults.withCredentials = true;

const addTask = async function(formData) {
    const {taskName, dueDate, category, priority, description} = formData;
    
    const res = await axios.post(
        "http://localhost:3000/tasks",
        {
            title: taskName,
            dueDate,
            category,
            priority,
            description,
        });
    return res;
}

export default addTask;