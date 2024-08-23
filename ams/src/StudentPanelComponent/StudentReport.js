import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import PieChartIcon from "@mui/icons-material/PieChart";
import { pieArcLabelClasses } from "@mui/x-charts"; // Correct import
import { useReactToPrint } from "react-to-print";
import { useWindowSize } from "../custom-hooks/useWindowSize";


const StudentReport = () => {
  const [batch, setBatch] = useState("");
  const [studentId, setStudentId] = useState("");
  const [month, setMonth] = useState("");
  const [student, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState({
    present: 0,
    absent: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const [auth, setAuth] = useState([]);

  const [chartWidth, setChartWidth] = useState(500);
  const [width, height] = useWindowSize();

  const componentPDF = useRef(null);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      setStudentId(JSON.parse(auth).id);
      setBatch(JSON.parse(auth).batch);
    }

    const batches = async () => {
      try {
        // const batchData = await fetch("http://localhost:5001/batch");
        const batchData = await fetch(`${window.location.origin}/batch`);
        const data = await batchData.json();
        setBatches(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    batches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!batch || !studentId || !month) {
      setErrorMessage("Please enter batch, student ID, and month.");
      setOpen(true);
      return;
    }
    await fetchStudent(studentId, batch);
  };

  const fetchStudent = async (id, batch) => {
    try {
      const response = await axios.get(
        // `http://localhost:5001/student-report/${id}/${batch}`
        `${window.location.origin}/student-report/${id}/${batch}`
      );
      const studentData = response.data;
      setStudent(studentData);
      setErrorMessage("");
      fetchAttendance(batch, id, month); // Fetch attendance after fetching student details
    } catch (error) {
      console.error("Error fetching student:", error);
      setErrorMessage(
        error.response?.data?.message || "Error fetching student data."
      );
      setStudent(null);
      setOpen(true);
    }
  };

  const fetchAttendance = async (batch, id, month) => {
    try {
      const response = await axios.get(
        // `http://localhost:5001/attendance-report/${batch}/${id}/${month}`
        `${window.location.origin}/attendance-report/${batch}/${id}/${month}`
      );
      const { attendanceData, totalAttendance } = response.data;
      setAttendanceData(attendanceData);
      setTotalAttendance(totalAttendance);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setErrorMessage("Error fetching attendance data.");
      setOpen(true);
      setAttendanceData([]);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "StudentDataTable",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  useEffect(() => {
    if (width < 500) {
      setChartWidth(300);
    } else {
      setChartWidth(500);
    }
  });

  return (
    <Container component={"div"} maxWidth="lg" sx={{ mt: 3 }}>
      <Typography
        variant="h6"
        marginRight={"auto"}
        color={"primary.main"}
        sx={{ paddingBottom: "10px"}}
      >
        Hi, Welcome back ...
      </Typography>
      <div ref={componentPDF}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            minHeight: "300px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}>
            <PieChartIcon />
          </Avatar>

          <Typography variant="h6" textAlign={"center"}>
            Student Monthly Attendance Report
          </Typography>

          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Batch"
                  name="batch"
                  type="text"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  disabled
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="User Id"
                  name="id"
                  type="number"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  disabled
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Fetch Attendance
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={generatePDF}
                >
                  Save as PDF
                </Button>
              </Grid>

              {errorMessage && (
                <Snackbar
                  open={open}
                  autoHideDuration={5000}
                  onClose={handleClose}
                >
                  <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
              )}

              {student && (
                <Grid item xs={12} md={7} mt={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Card
                        sx={{
                          minWidth: "275px",
                          maxWidth: "350px",
                          maxHeight: "500px",
                          overflow: "auto",
                        }}
                      >
                        <CardContent>
                          <Box mb={1}>
                            <Typography variant="h6" align="center">
                              Student Details
                            </Typography>
                            <Typography variant="body2">
                              ID: {student.id}
                            </Typography>
                            <Typography variant="body2">
                              Name: {student.name}
                            </Typography>
                            <Typography variant="body2">
                              Batch: {student.batch}
                            </Typography>
                          </Box>
                          <Divider />
                          <Box mt={1}>
                            <Typography align="center">
                              Attendance Report for {month}
                            </Typography>
                            <TableContainer
                              component={"paper"}
                              sx={{ textAlign: "center" }}
                            >
                              <Table
                                sx={{ textAlign: "center" }}
                                stickyHeader
                                aria-label="sticky table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center">
                                      <b>Date</b>
                                    </TableCell>
                                    <TableCell align="center">
                                      <b>Status</b>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {attendanceData.map((record, index) => (
                                    <TableRow key={index}>
                                      <TableCell align="center">
                                        {record.date}
                                      </TableCell>
                                      <TableCell align="center">
                                        {record.status}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                          <Divider />
                          <Box mt={1}>
                            <Typography align="center">
                              Total Attendance
                            </Typography>
                            <Typography variant="body2">
                              Present: {totalAttendance.present}
                            </Typography>
                            <Typography variant="body2">
                              Absent: {totalAttendance.absent}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <PieChart
                        series={[
                          {
                            data: [
                              {
                                id: 0,
                                value: totalAttendance.present,
                                label: "Present",
                              },
                              {
                                id: 1,
                                value: totalAttendance.absent,
                                label: "Absent",
                              },
                            ],
                            arcLabel: (item) => `${item.label} (${item.value})`,
                            arcLabelMinAngle: 45,
                            highlightScope: {
                              faded: "global",
                              highlighted: "item",
                            },
                            faded: {
                              innerRadius: 30,
                              additionalRadius: -30,
                              color: "gray",
                            },
                          },
                        ]}
                        sx={{
                          [`& .${pieArcLabelClasses.root}`]: {
                            fill: "white",
                            fontWeight: "bold",
                          },
                        }}
                        width={chartWidth}
                        height={270}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default StudentReport;
