// navigation bar
import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { Box, Button, Snackbar, Alert } from "@mui/material";

import { UserContext } from "./Context";
import logout from "./logout";

import logo from "/logo.webp";

import "./sharedlayout.css";


export default function SharedLayout() {
    const userId = useContext(UserContext).userId;
    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        open: false,
        content: "",
        severity: ""
    });

    const handleAlertClose = () => {
        setAlert({
            open: false,
            severity: "",
            content: ""
        })
    }

    const handleLogout = async () => {
        try {
            const res = await logout();
            setAlert({
                open: true,
                severity: "success",
                content: "Logging out."
            })
            setTimeout(() => navigate("/login") , 1000);

        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    };

    return(
        <>
        { userId ?
            <>
            <header>
                <div className="container">
                    <Link to="/">
                        <Box
                            className="heading-logo"
                            component="img"
                            sx={{
                                maxHeight: { xs: 233, md: 150 },
                                maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="Homepage Logo."
                            src={logo}
                        />
                    </Link>
                    <div className="settings">
                        <Button className="logout" onClick={handleLogout}>Logout</Button>
                    </div>
                </div>

                <nav>
                    {/* navigation bar */}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            </> : <h2>Not authenticated</h2>}
            {alert ? <Snackbar open={alert.open} onClose={handleAlertClose} autoHideDuration={1000} anchorOrigin={{vertical:"top", horizontal:"center"}}>
                    <Alert severity={alert.severity}>{alert.content}</Alert>
                </Snackbar> : <></>} 
        </>
    )

}
