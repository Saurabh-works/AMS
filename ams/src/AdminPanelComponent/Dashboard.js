import React, { useEffect, useState } from "react";
import AttendanceComponent from "./AttendanceComponent";
import { Avatar, Box, Grid, Typography } from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import LayersIcon from "@mui/icons-material/Layers";
import ArticleIcon from "@mui/icons-material/Article";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function Dashboard() {

  const [totalStudents, setTotalStudents] = useState("")
  const [totalBatches, setTotalBatches] = useState("")


  useEffect(()=>{
    const fetchStudents = async () => {
      try {
        // const response = await fetch("http://localhost:5001/students");
        const response = await fetch(`${window.location.origin}/students`);
        const data = await response.json();
        setTotalStudents(data.length);
      } catch (error) {
        console.error("Error fetching students:", error);
      }}

      const batches = async () => {
        try {
          // const batchData = await fetch("http://localhost:5001/batch");
          const batchData = await fetch(`${window.location.origin}/batch`);
          const data = await batchData.json();
          setTotalBatches(data.length);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
  
      batches()
      fetchStudents();
  })

  return (
    <div style={{ backgroundColor: "#f3f3f3", margin: "0", padding: "0" }}>
      <Grid container md={12} justifyContent={"space-around"}>
        {/* cards */}
        <Typography
          variant="h6"
          marginRight={"auto"}
          color={"primary.main"}
          sx={{ paddingLeft: "25px", marginTop: "25px" }}
        >
          Hi, Welcome back ...
        </Typography>

        <Grid
          container
          mt={3}
          md={11.5}
          sm={12}
          justifyContent={"space-between"}
          // columnGap={0.2}
          sx={{
            justifyContent: { xs: "space-around", md: "space-between" },
            rowGap: 1,
          }}
        >
          {/* Total Students */}
          <Grid
            item
            sx={{
              backgroundColor: "#d0e9fd",
              height: "150px",
              borderRadius: "15px",
              boxShadow: "5px 5px 8px #cecece",
            }}
            md={2.7}
            xs={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box component={"div"} textAlign={"center"}>
              <Avatar sx={{ bgcolor: "#aecaeb", margin: "auto" }}>
                <GroupsIcon sx={{ color: "#153c9f" }} />
              </Avatar>
              <Typography variant="h6" mt={1}>
                {totalStudents}
              </Typography>
              <Typography variant="body2">Total Students</Typography>
            </Box>
          </Grid>

          {/* Total Batches */}
          <Grid
            item
            sx={{
              backgroundColor: "#d0f2fe",
              height: "150px",
              borderRadius: "15px",
              boxShadow: "5px 5px 8px #cecece",
            }}
            md={2.7}
            xs={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box component={"div"} textAlign={"center"}>
              <Avatar sx={{ margin: "auto", bgcolor: "#b2d4fa" }}>
                <LayersIcon sx={{ color: "#085cbd" }} />
              </Avatar>
              <Typography variant="h6" mt={1}>
                {totalBatches}
              </Typography>
              <Typography variant="body2">Total Batches</Typography>
            </Box>
          </Grid>

          {/* Report */}
          <Grid
            item
            sx={{
              backgroundColor: "#fef7cb",
              height: "150px",
              borderRadius: "15px",
              boxShadow: "5px 5px 8px #cecece",
            }}
            md={2.7}
            xs={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box component={"div"} textAlign={"center"}>
              <Avatar sx={{ margin: "auto", bgcolor: "#efdfac" }}>
                <ArticleIcon sx={{ color: "#ab8414" }} />
              </Avatar>
              <Typography variant="h6" mt={1}>
                7
              </Typography>
              <Typography variant="body2">Report</Typography>
            </Box>
          </Grid>

          {/* Assignment Submited */}
          <Grid
            item
            sx={{
              backgroundColor: "#ffe7da",
              height: "150px",
              borderRadius: "15px",
              boxShadow: "5px 5px 8px #cecece",
            }}
            md={2.7}
            xs={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box component={"div"} textAlign={"center"}>
              <Avatar sx={{ margin: "auto", bgcolor: "#fcc5c0" }}>
                <BorderColorIcon sx={{ color: "#a62736" }} />
              </Avatar>
              <Typography variant="h6" mt={1}>
                23
              </Typography>
              <Typography variant="body2">Assignment Submited</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Attendence */}
        <Grid
          item
          mt={3}
          md={11.5}
          pb={3}
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "10px 10px 8px #cecece",
            maxHeight: "500px",
            overflow: "auto",
          }}
        >
          <AttendanceComponent></AttendanceComponent>
        </Grid>
      </Grid>
    </div>
  );
}
export default Dashboard;
