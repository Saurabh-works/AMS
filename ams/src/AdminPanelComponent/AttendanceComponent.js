import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const AttendanceComponent = () => {
  const [students, setStudents] = useState([]);
  const [batch, setBatch] = useState("");
  const [date, setDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [rowColors, setRowColors] = useState({});
  const [batches, setBatches] = useState([]);

  const handleColorChange = (id, color) => {
    setRowColors((prevColors) => ({
      ...prevColors,
      [id]: color,
    }));
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // const response = await fetch("http://localhost:5001/students");
        const response = await fetch(`${window.location.origin}/students`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }

      try {
        // const batchData = await fetch("http://localhost:5001/batch");
        const batchData = await fetch(`${window.location.origin}/batch`);
        const data = await batchData.json();
        setBatches(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    if (!batch || !date) {
      alert("Please select both batch and date.");
      return;
    }

    const attendanceData = Object.keys(attendance)
      .filter((studentId) =>
        students.some(
          (student) => student.id === studentId && student.batch === batch
        )
      )
      .map((studentId) => ({
        studentId,
        status: attendance[studentId],
      }));

    const newAttendance = {
      date,
      batch,
      records: attendanceData,
    };

    try {
      // const response = await fetch("http://localhost:5001/attendance", {
      const response = await fetch(`${window.location.origin}/attendance`, {

        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAttendance),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  // Filter students based on selected batch
  const filteredStudents = students.filter(
    (student) => student.batch === batch
  );

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box component="div" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item md={6} lg={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Batch</InputLabel>
              <Select
                label="Select Batch"
                value={batch}
                onChange={handleBatchChange}
                required
              >
                {batches.map((item) => (
                  <MenuItem value={item.batch}>{item.time} {item.batch}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} lg={6} xs={12}>
            <FormControl fullWidth>
              <TextField type="date" value={date} onChange={handleDateChange} />
            </FormControl>
          </Grid>
          <Grid item md={12} lg={12} xs={12}>
            <TableContainer component={Paper} sx={{ textAlign: "center" }}>
              <Table
                sx={{ textAlign: "center" }}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>ID</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Batch</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Remark</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      sx={{ backgroundColor: rowColors[student.id] }}
                    >
                      <TableCell align="center">{student.id}</TableCell>
                      <TableCell align="center">{student.name}</TableCell>
                      <TableCell align="center">{student.batch}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ me: 3, fontSize: { xs: "8px", md: "" } }}
                          onClick={() => {
                            handleAttendance(student.id, "Present");
                            handleColorChange(student.id, "#e8f5e9");
                          }}
                        >
                          Present
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          sx={{
                            marginLeft: { xs: "0", md: "10px" },
                            fontSize: { xs: "8px", md: "" },
                          }}
                          onClick={() => {
                            handleAttendance(student.id, "Absent");
                            handleColorChange(student.id, "#ffebee");
                          }}
                        >
                          Absent
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={12} lg={12} xs={12}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Submit Attendance
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AttendanceComponent;
