
import CreatePost from "../create post/CreatePost";
import "./feed.css";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import { Box, Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import { useTheme } from "@mui/material";

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LyricsRoundedIcon from '@mui/icons-material/LyricsRounded';

axios.defaults.baseURL = "http://localhost:8800";



const Feed = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const theme = useTheme();

    useEffect(() => {
        axios
            .get("/api/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const getUser = (userId) => {
        return axios
            .get(`/api/users?userId=${userId}`)
            .then((response) => response.data)
            .catch((err) => {
                console.error(err);
                return null;
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); 
    };

    return (
        
        <Grid item xs={6} md={6}>
            <Grid item xs={6} md={6} style={{ marginBottom: "1rem"}}>
                <CreatePost />
            </Grid>
            <Grid item xs={6} md={6}>
                <div>
                    {posts.map((post) => {
                        const postUser = getUser(post.userId);
                        if(!postUser) return null;

                        return(
                            <div key={post._id}>
                                <Box className="feed-box" sx={{ backgroundColor: theme.palette.primary.main, marginBottom: "1rem" }}>
                                    <Grid className="feed-row" item xs={12}>
                                        <Avatar sx={{ width: 30, height: 30 }}>
                                            <img src={postUser.profilePicture} />
                                        </Avatar>
                                        <p style={{ marginLeft: ".6rem" }}>
                                            <strong>{post.username}</strong>: {post.desc}
                                        </p>
                                    </Grid>

                                    <Grid className="feed-row" item xs={12}>
                                        <p style={{ marginTop: ".6rem", fontSize: ".9rem" }}>{formatDate(post.createdAt)}</p>
                                    </Grid>

                                    <Grid className="feed-row" item xs={12} style={{ 
                                            backgroundImage: `url(${post.img})`,
                                            height: "12rem",
                                            width: "100%",
                                            backgroundSize: "cover",
                                            marginTop: ".6rem",
                                        
                                        }}
                                    />

                                    

                                    <Grid className="feed-row" item xs={12}>
                                        <FavoriteRoundedIcon className="feed-item" />
                                        <LyricsRoundedIcon className="feed-item" />
                                    </Grid>
                                </Box>                            
                            </div>
                        );
                    })}
                </div>

            </Grid>
        </Grid>
        
    );
}
export default Feed;