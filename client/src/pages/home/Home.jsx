import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import "./home.css"

import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <Navbar />
      
      <div className="grid-container">
        <Grid 
          container 
          spacing={1} 
          style={{ justifyContent: "center" }}
        >
          <Grid item xs={0} md={2.5} style={{ width: "100%" }}>
            <Box style={{ flex: 1}}></Box>
          </Grid>
          <Sidebar />
          <Feed />

        </Grid>
      </div>
    </div>
  );
}