import { useState } from "react";
import { Link } from "react-router-dom";

import addCategory from "./addCategory";

const CategoryForm = () => {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add a post request to /category endpoint
        if (!category){
            alert('Enter a category title');
        }
        else {
            const res = await addCategory(category, description);
            if (res.ok){
                alert("Category added successfully.");
                // add routing to homepage
            }
        }
    };

    const handleClear = (event) => {
        event.preventDefault();
        setCategory("");
        setDescription("");
    }
    
    return (
        <>
            <div className="header">
                <img src="" alt="homepage image link" />
                <h3>Add Category</h3>
            </div>
            <form className="new-category-form">   
                <div className="content">
                    <label htmlFor="title">
                        Category Title
                        <br />
                        <input 
                            type="text" 
                            id="title" 
                            value={category} 
                            placeholder="Add new category"
                            onChange={e => setCategory(e.target.value)}
                        />
                    </label><br />
                    
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
                    <Link to="/new-task"><button>Back</button></Link>
                </div>
            </form>
        </>
    )
}


export default CategoryForm;