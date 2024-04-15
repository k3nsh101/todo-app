// navigation bar
import { Box} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import logo from "/logo.webp";

export default function SharedLayout() {
    return(
        <>
            <header>
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
