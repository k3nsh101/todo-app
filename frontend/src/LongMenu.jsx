import { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { currentTaskContext } from "./currentTaskContext";

export default function LongMenu({options}) {
    const { taskId, setTaskId} = useContext(currentTaskContext);

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (option) => {
        setAnchorEl(null);
        if (option === "Update"){
            // pass task_id
            navigate(`/update-task/${taskId.taskId}`);
        }
        else if (option === "Exit"){
            // implement close
        }
        
    };

    return (
        <div className="task-item-right">
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreHorizIcon />
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            {options.map((option) => (
            <MenuItem key={option} onClick={() => handleClose(option)}>
                {option}
            </MenuItem>
            ))}
        </Menu>
        </div>
    );
}