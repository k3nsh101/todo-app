import { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { InputLabel, TextField, Button, Select, MenuItem, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from "dayjs";

import useCategoryList from "./useCategoryList";
import useTask from "./useTask";
import updateTask from "./updateTask";

import { UserContext } from "./Context";


const TaskForm = () => {
    const { userId, setUserId } = useContext(UserContext);
    const { taskId } = useParams();

    const taskData = useTask(userId, taskId);
    if (!taskData.categoryID){
        taskData.categoryID = {
            title: ""
        }
    }

    // category = categoryList.find((item) => item.title === taskData.categoryID.title).title;

    const navigate = useNavigate();

    const categoryList = useCategoryList();
    const priorityList = ["Low", "Medium", "High"];
    const statusList = ["Pending", "Completed"];

    const form = useForm({
        defaultValues: {
            taskName: "",
            category: "",
            priority: "",
            description: "",
            status: "Pending",
        },
        mode: "onTouched"
    });

    const [alert, setAlert] = useState({
        open: false,
        content: "",
        severity: ""
    });

    const { register, getValues, setValue, handleSubmit, formState, reset, control } = form;
    const { errors, isSubmitting, isSubmitSuccessful } = formState;

    // MUI expects the same values as in the array which is used to populate the Select component
    const category = categoryList.find((item) => item.title === taskData.categoryID.title)
    const categoryTitle = category ? category.title: ""

    useEffect(() => {
        if (taskData.title) {
            setValue("taskName", taskData.title);
            setValue("category", categoryTitle);
            
            if (taskData.dueDate) {
                setValue("dueDate", dayjs(taskData.dueDate));
            }

            setValue("priority", taskData.priority);
            setValue("status", taskData.status);
            setValue("description", taskData.description);
        }
    }, [categoryTitle, setValue, taskData.description, taskData.dueDate, taskData.priority, taskData.status, taskData.title]);


    const onSubmit = async () => {
        const formData = {
            userId,
            taskId,
            taskName: getValues("taskName"),
            dueDate: getValues("dueDate"),
            category: getValues("category"),
            priority: getValues("priority"),
            status: getValues("status"),
            description: getValues("description")
        }

        const res = await updateTask(formData);
        
        if (res.statusText === "OK"){
            // route to homepage
            setAlert({
                open: true,
                severity: "success",
                content: "Task updated successfully."
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
                            id="title"
                            className="form-control"
                            name="title"
                            placeholder="Update task name"
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
                                render={({ field: { onChange, value }  }) => (
                                    <DatePicker
                                        id="due-date"
                                        className="form-control date-picker"
                                        value={value}
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
                            placeholder="Update your description..."
                            {...register("description")}
                            multiline
                            minRows={3}
                        />
                    </div>
                    <div className="form-btn">
                        <Button variant="contained" onClick={handleClear}>Clear</Button>
                        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>Update</Button>
                    </div>
                </form>
            </div>
            {alert ? <Snackbar open={alert.open} onClose={handleAlertClose} autoHideDuration={2000} anchorOrigin={{vertical:"top", horizontal:"center"}}>
                    <Alert severity={alert.severity}>{alert.content}</Alert>
                </Snackbar> : <></>}
        </>
    )
}


export default TaskForm;