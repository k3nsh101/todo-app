import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


import addCategory from "./addCategory";

import "./CategoryForm.css"

// Add server side validation to duplicate categories with same title,
// add isSubmitSuccessful and validation in the frontend

export default function CategoryForm() {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            title: "",
            description: ""
        },
        mode: "onTouched"
    });
    const { register, getValues, handleSubmit, formState, reset } = form;
    const { errors, isSubmitting, isSubmitSuccessful } = formState;

    const onSubmit = async () => {
        // Add a post request to /category endpoint
        const category = getValues("title");
        const description = getValues("description");
        const res = await addCategory(category, description);
        if (res.ok){
            alert("Category added successfully.");
            navigate("/")
        }
    };

    const handleClear = (event) => {
        event.preventDefault();
        reset()
    }

    useEffect( () => {
        if (isSubmitSuccessful){
            reset;
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <>
            <div className="header">
                <h1>Add Category</h1>
            </div>
            <form className="new-category-form" onSubmit={handleSubmit(onSubmit)} noValidate>  
                <div className="content">
                    <label htmlFor="title">
                        Category Title
                    </label>
                    <input
                            type="text" 
                            id="title" 
                            placeholder="Add new category"
                            {...register("title", {required:"Title is required"})}                            
                        />
                    <p className="errors">{errors.title?.message}</p>

                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea
                            name="description" 
                            id="description" 
                            cols="30" rows="10"
                            placeholder="Add your description..."
                            {...register("description")}
                            minRows={3}
                            
                        ></textarea>
                </div> 
                <div className="form-submit">
                    <button onClick={handleClear}>Clear</button>
                    <button disabled={isSubmitting}>Add</button>
                    <Link to="/new-task"><button>Back</button></Link>
                </div>
            </form>                
        </>
    )
}