import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { InputLabel, TextField, Button, Select, MenuItem, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import useCategoryList from "./useCategoryList";
// import addTask from "./addTask";

const TaskForm = () => {
    const navigate = useNavigate();

    const categoryList = useCategoryList();
    const priorityList = ["Low", "Medium", "High"];
    const statusList = ["Pending", "Completed"];

    const form = useForm({
        defaultValues: {
            taskName: "",
            dueDate: "",
            category: "",
            priority: "",
            description: ""
        },
        mode: "onTouched"
    });

    const { register, getValues, handleSubmit, formState, reset, control } = form;
    const { errors, isSubmitting, isSubmitSuccessful } = formState;


    // const onSubmit = async () => {
    //     const formData = {
    //         taskName: getValues("taskName"),
    //         dueDate: getValues("dueDate"),
    //         category: getValues("category"),
    //         priority: getValues("priority"),
    //         description: getValues("description")
    //     }

    //     const res = await addTask(formData);
    //     if (res.statusText === "Created"){
    //         // route to homepage
    //         alert("Task added successfully");
    //         navigate("/")
    //     }
    // };

    const handleClear = (event) => {
        event.preventDefault();
        reset();
    };

    useEffect( () => {
        if (isSubmitSuccessful){
            reset;
        }
    }, [isSubmitSuccessful, reset]);
    
    return (
        <>
            <div className="form-container">
                <form className="new-task-form">   
                    <div className="header">
                        <h1>Update Task</h1>
                        <Link to="/" >
                            <IconButton className="icon" aria-label="close" color="secondary">
                                <CloseIcon />
                            </IconButton>
                        </Link>
                    </div>
                    <div className="content">
                        <InputLabel htmlFor="title">
                            Task Name
                        </InputLabel>
                        <TextField 
                            type="text" 
                            id="title"
                            className="form-control"
                            name="title"
                            placeholder="Add new task"
                            {...register("taskName", {required:"Title is required"})}
                        />
                        <p className="errors">{errors.taskName?.message}</p>

                        <InputLabel htmlFor="due-date">
                            Due Date
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({ field: { onChange}  }) => (
                                    <DatePicker
                                        id="due-date"
                                        className="form-control date-picker"
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </LocalizationProvider>

                        <InputLabel htmlFor="category">
                            Category
                        </InputLabel>
                        <div className="new-task-form-select-btn">
                            <Controller
                                    name="category"
                                    control={control}
                                    render={({ field: { onChange, value}  }) => (
                                        <Select id="category" name="category" className="form-control" onChange={onChange} value={value}>
                                            <MenuItem value=""><em>Select</em></MenuItem>
                                            {categoryList.map(item =>(
                                                <MenuItem id="menu-item" key={item._id} value={item.title}>{item.title}</MenuItem>
                                            ))}
                                        </Select>  
                                    )}
                                /> 
                            <Link to="/new-category"><Button variant="contained">New Category</Button></Link>
                        </div>

                        <InputLabel htmlFor="priority">
                            Priority
                        </InputLabel>                            
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field: { onChange, value}  }) => (
                                <Select id="priority" name="priority" className="form-control" onChange={onChange} value={value}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    {priorityList.map((item, index) => (
                                        <MenuItem id="menu-item" key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </Select>  
                            )}
                        />

                        <InputLabel htmlFor="priority">
                            Status
                        </InputLabel>                            
                        <Controller
                            name="status"
                            control={control}
                            render={({ field: { onChange, value}  }) => (
                                <Select id="status" name="status" className="form-control" onChange={onChange} value={value}>
                                    <MenuItem value=""><em>Select</em></MenuItem>
                                    {statusList.map((item, index) => (
                                        <MenuItem id="menu-item" key={index} value={item}>{item}</MenuItem>
                                    ))}
                                </Select>  
                            )}
                        />                   

                        <InputLabel htmlFor="description">
                            Description
                        </InputLabel>
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
                        <Button variant="contained" disabled={isSubmitting}>Add</Button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default TaskForm;