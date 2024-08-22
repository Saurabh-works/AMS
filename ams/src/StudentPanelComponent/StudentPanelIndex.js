import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import StudentReport from "./StudentReport";
import MenuIcon from "@mui/icons-material/Menu";
import ShowStudentAttendance from "./ShowStudentAttendance";
import SchoolIcon from "@mui/icons-material/School";
import PieChartIcon from "@mui/icons-material/PieChart";
import { useNavigate } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const StudentPanelIndex = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const [box, setbox] = useState(<StudentReport />);

  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const drawewr = (
    <Box onClick={drawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {/* Logo */}
        <ListItemButton sx={{ width: "180px", marginTop: "8px" }}>
          <img
            src="https://radiantitservices.in/assets/images/logo.png"
            alt="company logo"
          />
        </ListItemButton>

        
        {/* Monthly Attendence */}
        <ListItemButton
          sx={{
            backgroundColor: "white",
            borderRadius: "30px",
            marginBottom: "10px",
            width: "180px",
          }}
          onClick={() => setbox(<StudentReport />)}
        >
          <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
            <PieChartIcon />
          </Avatar>
          <Typography variant="body2">Monthly Attendence</Typography>
        </ListItemButton>

        {/* Student Attendence */}
        <ListItemButton
          sx={{
            backgroundColor: "white",
            borderRadius: "30px",
            width: "180px",
            marginBottom: "10px",
          }}
          onClick={() => setbox(<ShowStudentAttendance />)}
        >
          <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
            <SchoolIcon />
          </Avatar>
          <Typography variant="body2">Student Attendence</Typography>
        </ListItemButton>




        {/* LogOut */}

        <ListItemButton
          onClick={logout}
          sx={{
            backgroundColor: "white",
            borderRadius: "30px",
            marginBottom: "10px",
            width: "180px",
          }}
        >
          <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
            <LogoutIcon />
          </Avatar>
          <Typography variant="body2">LogOut</Typography>
        </ListItemButton>
      </List>
    </Box>
  );
  return (
    <div style={{ backgroundColor: "#f3f3f3", margin: "0", padding: "0" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ marginBottom: "25px" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            sx={{
              color: "white",
              display: { xs: "bolck", md: "none" },
            }}
            onClick={drawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <IconButton>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD78tIncXSE0NtnNasmNdK9wKE8zOV8xW88Q&s" />
          </IconButton>
          <IconButton sx={{ p: 0, marginLeft: "auto" }}>
            <Typography color={"white"} sx={{ marginRight: "15px" }}>
              {JSON.parse(auth).name}
            </Typography>
            <Avatar sx={{backgroundColor:"white"}}>
              <AccountCircleIcon sx={{color:"#607d8b"}} fontSize="large"/>
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* mobile nav */}
      <Box component={"nav"}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={drawerToggle}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "200px",
              backgroundColor: "#f3f3f3",
            },
          }}
        >
          {drawewr}
        </Drawer>
      </Box>
      <Grid container spacing={2} p={2} justifyContent={"space-around"}>
        {/* Sidebar */}
        <Grid item md={2} sx={{ display: { xs: "none", md: "block" } }}>
          <List>


            {/* Student Monthly Attendence */}
            <ListItemButton
              sx={{
                backgroundColor: "white",
                borderRadius: "30px",
                marginBottom: "10px",
              }}
              onClick={() => setbox(<StudentReport />)}
            >
              <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
                <PieChartIcon />
              </Avatar>
              <Typography variant="body2">
                Student Monthly Attendence
              </Typography>
            </ListItemButton>

            {/* Student Attendence */}
            <ListItemButton
              sx={{
                backgroundColor: "white",
                borderRadius: "30px",
                marginBottom: "10px",
              }}
              onClick={() => setbox(<ShowStudentAttendance />)}
            >
              <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
                <SchoolIcon />
              </Avatar>
              <Typography variant="body2">Student Attendence</Typography>
            </ListItemButton>



            {/* LogOut */}
            <ListItemButton
              onClick={logout}
              sx={{
                backgroundColor: "white",
                borderRadius: "30px",
                marginBottom: "10px",
              }}
            >
              <Avatar sx={{ marginRight: "15px", bgcolor: "primary.main" }}>
                <LogoutIcon />
              </Avatar>
              <Typography variant="body2">LogOut</Typography>
            </ListItemButton>
          </List>
        </Grid>

        {/* Right Side Container */}
        <Grid container md={10}>
          {box}
        </Grid>
      </Grid>

      <Grid
        container
        md={12}
        justifyContent={"center"}
        sx={{ backgroundColor: "white" }}
        pt={4}
        pb={4}
      >
        <Box component={"footer"}>
          <Typography variant="body2">
            <Box sx={{ display: "flex", justifyContent: "center" }} mb={1}>
              <IconButton
                href="https://www.instagram.com/radiant_it_services/"
                target="blank"
              >
                <InstagramIcon sx={{ color: "primary.main" }} />
              </IconButton>
              <IconButton
                href="https://www.facebook.com/RadiantITServices"
                target="blank"
              >
                <FacebookIcon sx={{ color: "primary.main" }} />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/company/radiant-it-services/"
                target="blank"
              >
                <LinkedInIcon sx={{ color: "primary.main" }} />
              </IconButton>
              <IconButton
                href="https://www.youtube.com/@radiantitservices"
                target="blank"
              >
                <YouTubeIcon sx={{ color: "primary.main" }} />
              </IconButton>
            </Box>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a className="text-dark" href="https://radiantitservices.in/">
              Radiant IT Services Pvt. Ltd.
            </a>
          </Typography>
        </Box>
      </Grid>
    </div>
  );
};

export default StudentPanelIndex;
