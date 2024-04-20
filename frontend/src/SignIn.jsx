import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TextField, Stack, Button, IconButton, Avatar, Box, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import authenticateUser from "./authenticateUser";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const res = await authenticateUser(
                data.get("username"),
                data.get("password")
            )
    
            if (res.status == 200){
                navigate("/");
            }
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <>
        <Box>
            
        </Box>    
        <Box display="flex" justifyContent="center">
            <Stack
                direction="column" 
                spacing={2} 
                justifyContent="center"
                alignItems="center"
                component="form" noValidate onSubmit={handleSubmit}

                sx={{
                    width: "300px",
                    maxWidth: "90%",
                    minHeight: "100vh"
                }}
            >
                {/* <Typography variant="h6" color="text.secondary">
                    Welcome to Taskify!
                </Typography> */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Sign In
                </Typography>
                <TextField fullWidth required label="Username" id="username" name="username" />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel required htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">Sign In</Button>
                <Typography variant="body2">
                    New on our platform? <Link to="/signup" >Create an account</Link>
                </Typography>
            </Stack>    
        </Box>     
        </>
    );
}