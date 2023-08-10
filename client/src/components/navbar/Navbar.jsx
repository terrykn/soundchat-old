import './navbar.css';
import SignOutButton from './SignOutButton';

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';

import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const theme = useTheme();
    
    return(
        <Box className="navbar-container" style={{ display: "flex", justifyContent: "space-between", backgroundColor: theme.palette.primary.main }}>
            <div style={{ marginLeft: "2rem", display: "flex", alignItems: "center", backgroundColor: theme.palette.primary.main }}>
                <a href="/" style={{ textDecoration: "none", backgroundColor: theme.palette.primary.main }}>
                    <Avatar className="navbar-item" sx={{ width: 40, height: 40 }}>
                        <img src='/assets/audiochat_logo.png' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.primary.main }}/>
                    </Avatar>
                </a>
                <SearchIcon style={{ color: "black", marginLeft: ".6rem", cursor: "pointer", backgroundColor: theme.palette.primary.main }}/>
                <input className="search-bar" placeholder="Search..." />
            </div>

            <div style={{ marginRight: "2rem", display: "flex", alignItems: "center", backgroundColor: theme.palette.primary.main }}>
                <NotificationsIcon className="navbar-item" style={{ backgroundColor: theme.palette.primary.main }} />
                <MailIcon className="navbar-item" style={{ backgroundColor: theme.palette.primary.main }} />
                <PeopleIcon className="navbar-item" style={{ backgroundColor: theme.palette.primary.main }} />
                <SignOutButton />
                <a href="/profile/${user.username}" style={{ backgroundColor: theme.palette.primary.main }}>
                    <Avatar className="navbar-item" sx={{ width: 30, height: 30 }}>
                        <img 
                            src={user.profilePicture} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </Avatar>
                </a>
            </div>
        </Box>
        /*
        <AppBar position="static" elevation={5} sx={{ boxShadow: 0, mb: 2, backgroundColor: theme.palette.primary.main }}> 
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <a href="/" style={{ textDecoration: "none" }}>
                        <Avatar className="navbar-item" sx={{ width: 40, height: 40 }}>
                            <img src='/assets/audiochat_logo.png' style={{ width: '100%', height: '100%'}}/>
                        </Avatar>
                    </a>

                    <SearchIcon style={{ color: "#4c45c0", marginLeft: ".6rem", cursor: "pointer" }}/>
                    <input className="search-bar" placeholder="Search..." style={{ color: "white" }} />
                    
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <NotificationsIcon className="navbar-item" />
                    <MailIcon className="navbar-item" />
                    <PeopleIcon className="navbar-item" />
                    <SignOutButton />
                    <a href="/profile/${user.username}">
                        <Avatar className="navbar-item" sx={{ width: 30, height: 30 }}>
                            <img src={user.profilePicture} />
                        </Avatar>
                    </a>
                </div>
            </Toolbar>
        </AppBar>
        */
    );
}
export default Navbar;