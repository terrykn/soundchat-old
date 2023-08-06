import "./sidebar.css";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
    const theme = useTheme();
    return (
        <Grid item xs={6} md={2}>
            <Box className="sidebar-box" sx={{ backgroundColor: theme.palette.primary.main }}>
                <ul style={{ listStyle: "none", backgroundColor: "transparent" }}>
                    <li className="sidebar-section">Trending</li>
                    <li className="sidebar-item">#Pokemon</li>
                    <li className="sidebar-item">#HappyBirthday</li>
                    <li className="sidebar-item">#Monday</li>
                    
                    <li className="sidebar-section">Communities</li>
                    <li className="sidebar-item">Lobby</li>
                    <li className="sidebar-item">Random Thoughts</li>
                    <li className="sidebar-item">Gaming</li>
                    <li className="sidebar-item">Music</li>
                    <li className="sidebar-item">Pets</li>
                </ul>
            </Box>
        </Grid>
    );
}
export default Sidebar;