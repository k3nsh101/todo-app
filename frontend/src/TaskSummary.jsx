import { useState } from "react";

import dayjs from "dayjs";

import { List, ListItemButton, ListItemText, ListItemIcon, IconButton, Alert} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';

import { TaskContext } from "./Context";
import Popup from "./Popup";

import TaskDetails from "./TaskDetails";
import getTasks from "./useTasksList";
import deleteTask from "./deleteTask";
import checkTask from "./checkTask";

import "./home.css";

export default function TaskSummary() {
    const tasks_list = getTasks();

    const [openPopup, setOpenPopup] = useState(false);
    const [taskId, setTaskId] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const [checked, setChecked] = useState(false);

    const handleChange = async (event, id) => {
        setChecked(event.target.checked);
        const res = await checkTask(id);
        if (res.statusText === "OK"){
            setAlertContent("Task completed");
            setAlert(true);
            setTimeout(handleAlertClose, 1000);
        }
    }

    const handleTaskClick = (task_id) => {
        setTaskId(prevState => {
            return {
                ...prevState,
                taskId: task_id
            }
        });
        setOpenPopup(true);
    };

    const handleDeleteClick = async (task_id) => {
        const res = await deleteTask(task_id);
        if (res.statusText === "OK"){
            setAlertContent("Task deleted successfully");
            setAlert(true);
            setTimeout(handleAlertClose, 2000);
        }    
    }

    const handleAlertClose = () => {
        setAlertContent("");
        setAlert(false);
        window.location.reload();
    }

    const handleClose = () => {
        setTaskId(prevState => {
            return {
                ...prevState,
                taskId: ""
            }
        });
        setOpenPopup(false);
    };

    return (
        <>
            <TaskContext.Provider value={{taskId, setTaskId}}>
                <div className="tasks-container">
                    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                    {tasks_list.map((task) => {
                        const id = task._id;
                        const title = task.title;
                        const dueDate = task.dueDate ? dayjs(task.dueDate).format("MMM DD") : "Not Specified";                        

                        return (
                            
                            <ListItem
                                key={id}
                                // secondaryAction={
                                //     <IconButton edge="end" aria-label="comments">
                                //         <CommentIcon />
                                //     </IconButton>
                                // }
                                disablePadding
                                >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => handleChange(event, id)}

                                    />
                                </ListItemIcon>
                                <ListItemButton id={id} role={undefined} onClick={() => handleTaskClick(id)} dense>
                                    <ListItemText primary={title} secondary={dueDate} />
                                </ListItemButton>
                                <IconButton size="large" onClick={() => handleDeleteClick(id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        );
                    })}
                    </List>
                    <Popup
                        openPopup={openPopup}
                        setOpen={setOpenPopup}
                        closePopup={handleClose}
                    >
                        <TaskDetails />
                    </Popup>
                    {alert ? <Alert severity="success" onClose={handleAlertClose}>{alertContent}</Alert> : <></>}
                </div>
            </TaskContext.Provider>
        </>
    )
}