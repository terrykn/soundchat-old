import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.css';

import { useTheme } from '@mui/material';

const SignOutButton = () => {
  const handleSignOut = () => {
    localStorage.clear(); // or sessionStorage.clear();
    window.location.reload();
  };
  const theme = useTheme();

  return (
    <a href="/login" style={{ color: "inherit", backgroundColor: theme.palette.primary.main }}>
      <LogoutIcon className="navbar-item" style={{ backgroundColor: theme.palette.primary.main, cursor: "pointer" }} onClick={handleSignOut} />
    </a>
  );
};

export default SignOutButton;