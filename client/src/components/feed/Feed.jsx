
import CreatePost from "../create post/CreatePost";
import Post from "../post/Post";
import "./feed.css";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import { Grid } from "@mui/material";
import { useTheme } from "@mui/material";

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

    return (
        
        <Grid item xs={6} md={6}>
            <Grid item xs={6} md={6} style={{ marginBottom: "1rem"}}>
                <CreatePost />
            </Grid>
            <Grid item xs={6} md={6}>
                <div>
                    {posts.map((post) => {
                        return(
                            <div>
                                <Post postId={post._id} post={post} />
                            </div>

                            
                        );
                    })}
                </div>
            </Grid>
        </Grid>
    );
}
export default Feed;