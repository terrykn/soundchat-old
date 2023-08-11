import "./createPost.css";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";

import MicRoundedIcon from '@mui/icons-material/MicRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import SendIcon from '@mui/icons-material/Send';

import { useTheme } from '@mui/material/styles';
import { Image } from "image-js";

const CreatePost = () => {
    const theme = useTheme();
    const {user} = useContext(AuthContext);

    const desc = useRef();
    const [image, setImage] = useState("");

    const submitHandler = async(e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            profilePicture: user.profilePicture,
            username: user.username,
            desc: desc.current.value,
            img64: image
        };
        try{
            await axios.post("/api/posts", newPost);
            window.location.reload();
        }
        catch(err){
            console.error(err);
        }
    };

    function convertTo64(e){
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("ERROR: ", error);
        }
    }

    return (  
        <Box className="createPost-box" sx={{ backgroundColor: theme.palette.primary.main }}>
            <Grid className="createPost-row" item xs={12}>
                <Avatar sx={{ width: 30, height: 30 }}>
                    <img 
                        src={user.profilePicture} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Avatar>
                <input 
                    ref={desc}
                    className="createPost-bar" 
                    maxLength="30" 
                    placeholder="Post description... (max 30 characters)" 
                />
            </Grid>
            
            <form onSubmit={submitHandler}>
                <Grid className="createPost-row" item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <label htmlFor="audio" style={{ cursor: "pointer" }}>
                            <MicRoundedIcon className="createPost-item" />
                        </label>

                        <label htmlFor="file" style={{ cursor: "pointer" }}>
                            <AddPhotoAlternateRoundedIcon className="createPost-item" />
                        </label>
                        <input
                            id = "file"
                            style = {{ display: "none" }}
                            accept = "image/*"
                            type = "file"
                            onChange = {convertTo64}
                        />
                    </div>
                        
                    <div>
                        <Button type="submit" className="createPost-item" style={{ color: "black", marginTop: ".2rem" }}>
                            <SendIcon />
                        </Button>
                    </div>
                </Grid>

                <Grid className="createPost-row" item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                    {image == "" || image == null ? "" : <img width="120px" height = "100%" src={image} />}
                </Grid>
            </form>
        </Box>
    );
}
export default CreatePost;