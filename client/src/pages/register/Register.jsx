import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from "@mui/material/LinearProgress";

import { useTheme } from "@mui/material";

import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

axios.defaults.baseURL = "http://localhost:8800";

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repeatPassword = useRef();
    const navigate = useNavigate();
    const { isFetching, dispatch } = useContext(AuthContext);

    const theme = useTheme();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (repeatPassword.current.value !== password.current.value) {
        repeatPassword.current.setCustomValidity("Passwords don't match!");
        } else {
        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };
        try {
            await axios.post("/api/auth/register", user);
            navigate("/login");
        } catch(err) {
            console.log(err);
        }
        }
    };

    const handleGuestLogin = () => {
        loginCall(
            { username: "guest", password: "guest" },
            dispatch
        )
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url('/assets/stacked_radios.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>

                    <Avatar sx={{ width: 70, height: 70 }}>
                        <img src='/assets/audiochat_logo.png' style={{ width: '100%', height: '100%'}}/>
                    </Avatar>

                    <Typography variant="h5">
                        SoundChat
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField margin="normal" fullWidth label="Email" inputRef={email} type="email" required variant="standard" />
                        <TextField margin="normal" fullWidth label="Username" inputRef={username} type="username" required variant="standard" />
                        <TextField margin="normal" fullWidth label="Password" inputRef={password} type="password" required minLength="6" variant="standard" />
                        <TextField margin="normal" fullWidth label="Repeat Password" inputRef={repeatPassword} type="password" required minLength="6" variant="standard" />
                        
                        <Button type="submit" 
                            fullWidth variant="contained" 
                            sx={{ mt: 1, mb: 1, backgroundColor: '#00b300', '&:hover': {backgroundColor: '#009900'}}}>
                                Register
                            </Button>

                        <Grid container>
                            <Grid item xs>
                                <a href="/login">Already have an account?</a>
                            </Grid>
                        </Grid>

                        <Grid container style={{ marginTop: ".5rem" }}>
                            <Grid item xs>
                                <button 
                                    disabled={isFetching}
                                    fullWidth variant="contained" 
                                    sx={{ mt: 1, mb: 1, backgroundColor: '#00b300', '&:hover': {backgroundColor: '#009900'}}}
                                    onClick={handleGuestLogin}
                                    >
                                        {isFetching ? (<LinearProgress />):("Try the site as a Guest?")}
                                </button>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
export default Register;