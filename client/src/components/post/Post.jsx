import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "@mui/material";

import { Box, Grid } from "@mui/material";
import { Avatar } from "@mui/material";

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LyricsRoundedIcon from '@mui/icons-material/LyricsRounded';

axios.defaults.baseURL = "http://localhost:8800";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
};

const Post = ({ postId, post }) => {
    const theme = useTheme();
    const { user } = useContext(AuthContext);

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        try {
            axios.put("api/posts/" + postId + "/like", { userId: user._id });
        } 
        catch(err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        setIsLiked(post.likes.includes(user._id));
    }, [post.userId, post.likes]);
    
    return(

        <div key={postId}>
            <Box className="post-box" sx={{ backgroundColor: theme.palette.primary.main, marginBottom: "1rem" }}>
                <Grid className="post-row" item xs={12}>
                    {/* make a link to profile later */}
                    <Avatar sx={{ width: 30, height: 30 }}>
                        <img 
                            src={post.profilePicture} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </Avatar>
                <p style={{ marginLeft: ".6rem" }}>
                        <strong>{post.username}</strong>: {post.desc}
                </p>
                </Grid>

                <Grid className="post-row" item xs={12}>
                    <p style={{ marginTop: ".6rem", marginBottom: ".3rem", fontSize: ".9rem" }}>{formatDate(post.createdAt)}</p>
                </Grid>

                
                {post.img64 && (<img width="100%" height="100%" src={post.img64} />)}
                {post.audio64 && (<audio src={post.audio64} controls="controls" style={{ width: "100%" }} />)}

                
                <Grid className="post-row" item xs={12} >
                    <FavoriteRoundedIcon className="post-item" onClick={likeHandler} style={{ cursor: "pointer" }} />
                    <p className="post-item" style={{ fontSize: "1rem" }}>{like} likes</p>
                    <LyricsRoundedIcon className="post-item" style={{ cursor: "pointer" }}/>
                    <p className="post-item" style={{ fontSize: "1rem" }}>{post.comment} comments</p>
                </Grid>
            </Box>                            
        </div>
    );
}
export default Post;