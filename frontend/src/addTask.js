const addTask = async function(title, dueDate, category, priority, description) {
    const res = fetch(
        "http://localhost:3000/tasks",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                dueDate,
                category,
                priority,
                description,
            })
        }
    );
    return res;
}

export default addTask;