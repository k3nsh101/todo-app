import { useContext } from "react";

import { InputLabel, Card } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import dayjs from "dayjs";

import LongMenu from "./LongMenu";
import { TaskContext } from "./Context";

import useTask from "./useTask";

import "./taskdetails.css";

export default function TaskDetails() {
    const { taskId, setTaskId} = useContext(TaskContext);
    const task = useTask(taskId.taskId);
    const options = ["Update", "Exit"];

    if (!task.categoryID){
        task.categoryID = {
            title: "Not Specified"
        }
    }

    return (
        <>
            <Card className="task-container" variant="outlined" sx={{ minWidth: 500 }} >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} rowSpacing={2}>
                        <Grid className="task-item" xs={10}>
                            <Chip label={task.categoryID.title} color="secondary"/>
                        </Grid>
                        <Grid xs={2} className="task-item">
                            <LongMenu options={options} />
                        </Grid>
                        <Grid xs={12} className="task-item">
                            <h2>{task.title}</h2>
                        </Grid>
                        <Grid xs={12} className="task-item">
                            <InputLabel> {task.description} </InputLabel>
                        </Grid>
                        <Grid xs={8} className="task-item">
                            <InputLabel> {dayjs(task.dueDate).format("ddd MMM DD")} </InputLabel>
                        </Grid>
                        <Grid xs={4} className="task-item">
                            <InputLabel className="task-item-right"> {task.status} </InputLabel>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    )
}