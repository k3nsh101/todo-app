import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import useCategoryList from "./useCategoryList";
import addTask from "./addTask";

const CategoryForm = () => {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");

    const categoryList = useCategoryList();
    const priorityList = ["Low", "Medium", "High"];


    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = addTask(title, dueDate, category, priority, description);
        if (res.ok){
            // route to homepage
            console.log(res);
            <Navigate to="/add-task"/>
        }
    };

    const handleClear = (event) => {
        event.preventDefault();
        setTitle("");
        setDueDate("");
        setCategory("");
        setPriority("");
        setDescription("");
    };
    
    return (
        <>
            <div className="header">
                <img src="" alt="homepage image link" />
                <h3>New Task</h3>
            </div>
            <form className="new-task-form">   
                <div className="content">
                    <label htmlFor="title">
                        Task Name
                        <br />
                        <input 
                            type="text" 
                            id="title" 
                            value={title} 
                            placeholder="Add new task"
                            onChange={e => setTitle(e.target.value)}
                        />
                    </label>
                    <br />

                    <label htmlFor="due-date">
                        Due Date
                        <br />
                        <input 
                            type="date" 
                            name="dueDate"
                            id="due-date"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                        />
                    </label>
                    <br />

                    <label htmlFor="category">
                        Category
                        <br />
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                            {categoryList.map(item =>(
                                <option key={item._id} value={item.title}>{item.title}</option>
                            ))}
                        </select>   
                        <Link to="/new-category"><button>New Category</button></Link>
                    </label>
                    <br />

                    <label htmlFor="priority">
                        Priority
                        <br />
                        <select id="priority" value={priority} onChange={e => setPriority(e.target.value)}>
                            {priorityList.map((item, index) => (
                                <option key={index} value={item} onChange={e => setPriority(e.target.value)}>{item}</option>
                            ))}
                        </select> 
                    </label>
                    <br />

                    <label htmlFor="description">
                        Description
                        <br />
                        <textarea 
                            name="description" 
                            id="description" 
                            value={description} 
                            cols="30" rows="10"
                            placeholder="Add your description..."
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </label>
                    <br />
                </div>
                <div className="form-submit">
                    <button onClick={handleClear}>Clear</button>
                    <button onClick={handleSubmit}>Add</button>
                </div>
            </form>
        </>
    )
}


export default CategoryForm;