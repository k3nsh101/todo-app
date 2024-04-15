import { Link } from "react-router-dom";

import { TextField, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import TaskSummary from "./TaskSummary";

export default function Home() {
    return(
        <>
            <div className="home-search-btn">
                <TextField id="outlined-basic" className="search-bar" label="Search Task" variant="outlined" />
                <Link to="/new-task" >
                <Button variant="contained" startIcon={<AddIcon />}>
                    New Task
                </Button>
                </Link>
            </div>
            <TaskSummary />
        </>
    )
}