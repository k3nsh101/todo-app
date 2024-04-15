import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import dayjs from "dayjs";

import { List, ListItemButton, ListItemText, ListItemIcon} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';

import Popup from "./Popup";
import TaskDetails from "./TaskDetails";
import getTasks from "./useTasksList";
import "./home.css";

export default function TaskSummary() {
    let tasks_list = getTasks();
    tasks_list = tasks_list.map((task, index) => {
        return {...task, index}
    });

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
        setTaskId(task_id);
        setOpenPopup(true);

    };

    const handleClose = () => {
        setOpenPopup(false);

    };

    return (
        <>
            <div className="tasks-container">
                <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                {tasks_list.map((task) => {
                    const id = task._id;
                    const title = task.title;
                    const dueDate = dayjs(task.dueDate).format("MMM DD");

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
                        </ListItem>
                    );
                })}
                </List>
                <Popup
                    openPopup={openPopup}
                    setOpen={setOpenPopup}
                    closePopup={handleClose}
                >
                    <TaskDetails taskId={taskId}/>
                </Popup>
            </div>
        </>
    )
}