import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ShowBatchAttendance = () => {
  const [batch, setBatch] = useState("");
  const [month, setMonth] = useState("");
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const componentPDF = useRef();

  const [selectedTrainer, setSelectedTrainer] = useState("");
  const auth = localStorage.getItem("user");

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        // const batchData = await fetch("http://localhost:5001/batch");
        const batchData = await fetch(`${window.location.origin}/batch`);
        const data = await batchData.json();
        setBatches(data);
        setSelectedTrainer(JSON.parse(auth).name)
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    fetchBatches();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!batch || !month) {
      setError("Please select both batch and month.");
      setOpen(true);
      return;
    }
    
    try {
      const response = await axios.get(
        // `http://localhost:5001/attendance-summary/${month}/${batch}`
        `${window.location.origin}/attendance-summary/${month}/${batch}`
      );
      setAttendanceDetails(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch attendance data.");
      setOpen(true);
      setAttendanceDetails([]);
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "attendance-report",
  });

  const filteredBatches = selectedTrainer
  ? batches.filter((batch) => batch.name === selectedTrainer)
  : batches;

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
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
            boxShadow: "5px 5px 8px #cecece",
            minHeight: "450px",
            overflow: "auto",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", marginBottom: "15px" }}>
            <AssessmentIcon />
          </Avatar>

          <Typography variant="h6" textAlign="center">
            Batch Attendance
          </Typography>

          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{ mt: 3, display: "flex", justifyContent: "center", width: '100%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Batch</InputLabel>
                  <Select
                    label="Select Batch"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    required
                  >
                    {filteredBatches.map((item) => (
                      <MenuItem key={item.batch} value={item.batch}>{item.time} {item.batch}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Select Month"
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

              {error && (
                <Snackbar
                  open={open}
                  autoHideDuration={5000}
                  onClose={handleClose}
                >
                  <Alert severity="error">{error}</Alert>
                </Snackbar>
              )}

              {attendanceDetails.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Typography align="center" variant="h6">
                      Attendance Details
                    </Typography>
                    <TableContainer component={Paper} sx={{ textAlign: "center" }}>
                      <Table stickyHeader aria-label="attendance table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center"><b>ID</b></TableCell>
                            <TableCell align="center"><b>Name</b></TableCell>
                            <TableCell align="center"><b>Total Present</b></TableCell>
                            <TableCell align="center"><b>Total Absent</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {attendanceDetails.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell align="center"><Typography variant="body2">{student.id}</Typography></TableCell>
                              <TableCell align="center"><Typography variant="body2">{student.name}</Typography></TableCell>
                              <TableCell align="center"><Typography variant="body2">{student.presentCount}</Typography></TableCell>
                              <TableCell align="center"><Typography variant="body2">{student.absentCount}</Typography></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography align="center" variant="h6" sx={{ mt: 3, mb:2 }}>
                      Attendance Bar Chart
                    </Typography>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={attendanceDetails} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="presentCount" fill="#1e88e5" />
                        <Bar dataKey="absentCount" fill="#ff5722" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </div>
    </Container>
  );
};

export default ShowBatchAttendance;
