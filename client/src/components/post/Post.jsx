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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
};

const Post = ({ postId, post }) => {
    const theme = useTheme();
    
    return(
        <div key={postId}>
            <Box className="post-box" sx={{ backgroundColor: theme.palette.primary.main, marginBottom: "1rem" }}>
                <Grid className="post-row" item xs={12}>
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
                <p style={{ marginTop: ".6rem", fontSize: ".9rem" }}>{formatDate(post.createdAt)}</p>
                </Grid>

                <Grid className="post-row" item xs={12} style={{ 
                    backgroundImage: `url(${post.img})`,
                    height: "12rem",
                    width: "100%",
                    backgroundSize: "cover",
                    marginTop: ".6rem",             
                    }}
                />

                <Grid className="post-row" item xs={12}>
                    <FavoriteRoundedIcon className="post-item" />
                    <LyricsRoundedIcon className="post-item" />
                </Grid>
            </Box>                            
        </div>
    );


    /*
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
        const res = await axios.get(`/api/users?userId=${post.userId}`);
        setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
        axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };
    return (
        <div className="post">
        <div className="postWrapper">
            <div className="postTop">
            <div className="postTopLeft">
                <Link to={`/api/profile/${user.username}`}>
                <img
                    className="postProfileImg"
                    src={user.profilePicture}
                    alt=""
                />
                </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{post.createdAt}</span>
            </div>
            <div className="postTopRight">
                <QuestionMarkIcon />
            </div>
            </div>
            <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={"/api/post/" + post.img} alt="" />
            </div>
            <div className="postBottom">
            <div className="postBottomLeft">
                <QuestionMarkIcon onclick={likeHandler} />
                <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
            </div>
            </div>
        </div>
        </div>
        */
    
}
export default Post;