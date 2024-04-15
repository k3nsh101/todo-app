import { useState } from "react";

import dayjs from "dayjs";

import { List, ListItemButton, ListItemText, ListItemIcon, IconButton} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';

import { currentTaskContext } from "./currentTaskContext";
import Popup from "./Popup";
import TaskDetails from "./TaskDetails";
import getTasks from "./useTasksList";
import deleteTask from "./deleteTask";
import "./home.css";

export default function TaskSummary() {
    const tasks_list = getTasks();

    const [openPopup, setOpenPopup] = useState(false);
    const [taskId, setTaskId] = useState("");

    const [checked, setChecked] = useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

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
            alert("Task deleted successfully");
            window.location.reload();
        }    
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
            <currentTaskContext.Provider value={{taskId, setTaskId}}>
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
                                        onChange={handleToggle}
                                        inputProps={{ 'aria-labelledby': id }}
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
                </div>
            </currentTaskContext.Provider>
        </>
    )
}