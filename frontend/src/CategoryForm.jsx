import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { InputLabel, TextField, Button, IconButton, Snackbar, Alert } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import addCategory from "./addCategory";

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

    const [alert, setAlert] = useState({
        open: false,
        content: "",
        severity: ""
    });

    const onSubmit = async () => {
        // Add a post request to /category endpoint
        const category = getValues("title");
        const description = getValues("description");
        const res = await addCategory(category, description);

        if (res.data.message === "Category already exists"){
            setAlert({
                open: true,
                severity: "warning",
                content: "Category already exists"
            })            
        }
        else if (res.statusText === "Created"){
            setAlert({
                open: true,
                severity: "success",
                content: "Category added successfully."
            })
            setTimeout(() => navigate("/") , 2500);
        }
    };

    const handleAlertClose = () => {
        setAlert({
            open: false,
            severity: "",
            content: ""
        })
    }

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
            <div className="form-container">
                <form className="new-category-form" noValidate>  
                <   div className="header">
                        <h1>New Category</h1>
                        <Link to="/new-task" >
                            <IconButton className="icon" aria-label="close" color="secondary">
                                <CloseIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <div className="content">
                        <InputLabel htmlFor="title" className="label">
                            Category Title
                        </InputLabel>
                        <TextField
                                id="title" 
                                className="form-control"
                                placeholder="Add new category"
                                {...register("title", {required:"Title is required"})}               
                            />
                        <p className="errors">{errors.title?.message}</p>

                        <InputLabel htmlFor="description" className="label">
                            Description
                        </InputLabel>
                        <div className="textfield-button-container">

                        </div>
                        <TextField
                                name="description" 
                                id="description" 
                                className="form-control"
                                placeholder="Add your description..."
                                {...register("description")}
                                multiline
                                minRows={3}
                            />
                    </div> 
                    <div className="form-btn">
                        <Button variant="contained" onClick={handleClear}>Clear</Button>
                        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>Add</Button>
                    </div>
                </form>  
                {alert ? <Snackbar open={alert.open} onClose={handleAlertClose} autoHideDuration={2000} anchorOrigin={{vertical:"top", horizontal:"center"}}>
                    <Alert severity={alert.severity}>{alert.content}</Alert>
                </Snackbar> : <></>}
            </div>              
        </>
    )
}