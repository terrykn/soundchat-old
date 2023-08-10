import "./createPost.css";

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";

import MicRoundedIcon from '@mui/icons-material/MicRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import SendIcon from '@mui/icons-material/Send';

import { useTheme } from '@mui/material/styles';

const CreatePost = () => {
    const theme = useTheme();
    const {user} = useContext(AuthContext);

    const desc = useRef();

    const [file, setFile] = useState(null);
    const [audio, setAudio] = useState(null);

    const submitHandler = async(e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            profilePicture: user.profilePicture,
            username: user.username,
            desc: desc.current.value,
        };
        if(file) {
            const data = new FormData();
            data.append("file", file);
            try{
                const response = await axios.post("/api/upload", data);
                newPost.img = file.name;
                newPost.imgFileName = response.data.filename;
            }
            catch(err){
                console.error(err);
            }
        }
        if(audio) {
            const audioData = new FormData();
            audioData.append("file", audio);
            try {
                const resp = await axios.post("/api/upload", audioData);
                newPost.audio = audio.name;
                newPost.audioFileName = resp.data.filename;
            } 
            catch(err){
                console.error(err);
            }
        }
        try{
            await axios.post("/api/posts", newPost);
            window.location.reload();
        }
        catch(err){
            console.error(err);
        }

    };

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

                        
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="audio"
                            accept=".mp3,.wav" 

                            onChange={(e) => setAudio(e.target.files[0])}
                        />
                        <label htmlFor="file" style={{ cursor: "pointer" }}>
                            <AddPhotoAlternateRoundedIcon className="createPost-item" />
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"

                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    

                    <div>

                    </div>
                        
                    <div>
                        <Button type="submit" className="createPost-item" style={{ color: "black", marginTop: ".2rem" }}>
                            <SendIcon />
                        </Button>
                    </div>
                </Grid>
            </form>
        </Box>
    );
}
export default CreatePost;