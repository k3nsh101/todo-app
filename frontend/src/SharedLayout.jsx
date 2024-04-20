// navigation bar
import { Link, Outlet } from "react-router-dom";
import { Box, Button } from "@mui/material";

import logout from "./logout";

import logo from "/logo.webp";

import "./sharedlayout.css";

export default function SharedLayout() {
    const handleLogout = async () => {
        try {
            const res = await logout();
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    };

    return(
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
        </>
    )

}
