import "./sidebar.css";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import SportsBasketballRoundedIcon from '@mui/icons-material/SportsBasketballRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';

const Sidebar = () => {
    const theme = useTheme();
    return (
        <Grid item xs={6} md={2}>
            <Box className="sidebar-box" sx={{ backgroundColor: theme.palette.primary.main }}>
                <ul style={{ listStyle: "none", backgroundColor: "transparent" }}>
                    <li className="sidebar-section">Communities</li>
                    <li className="sidebar-item"><ChairRoundedIcon style={{ marginRight: ".3rem" }} /> Lobby</li>
                    <li className="sidebar-item"><PsychologyAltRoundedIcon style={{ marginRight: ".3rem" }} /> Random</li>
                    <li className="sidebar-item"><SportsEsportsRoundedIcon style={{ marginRight: ".3rem" }} /> Gaming</li>
                    <li className="sidebar-item"><SportsBasketballRoundedIcon style={{ marginRight: ".3rem" }} /> Sports</li>
                    <li className="sidebar-item"><MusicNoteRoundedIcon style={{ marginRight: ".3rem" }} /> Music</li>
                    <li className="sidebar-item"><PetsRoundedIcon style={{ marginRight: ".3rem" }} /> Pets</li>
                </ul>
            </Box>
        </Grid>
    );
}
export default Sidebar;