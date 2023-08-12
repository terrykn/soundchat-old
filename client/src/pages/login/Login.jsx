import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { LinearProgress } from "@mui/material";

export default function Login() {
    const username = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall(
            { username: username.current.value, password: password.current.value },
            dispatch
        );
    };

    const handleGuestLogin = () => {
        loginCall(
            { username: "guest", password: "guest" },
            dispatch
        )
    }

    return (
        <Grid container component="main" sx={{ height: '100vh '}}>
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
                        <TextField margin="normal" fullWidth label="Username" inputRef={username} type="username" required variant="standard" />
                        <TextField margin="normal" fullWidth label="Password" inputRef={password} type="password" required minLength="6" variant="standard" />
                        
                        <Button type="submit" 
                            disabled={isFetching}
                            fullWidth variant="contained" 
                            sx={{ mt: 1, mb: 1, backgroundColor: '#00b300', '&:hover': {backgroundColor: '#009900'}}}
                            >
                                {isFetching ? (<LinearProgress />):("Sign In")}
                        </Button>

                        <Grid container style={{ marginTop: ".5rem" }}>
                            <Grid item xs>
                                <a href="/register">Don't have an account yet?</a>
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