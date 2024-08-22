import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Box,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Button,
  Modal,
  TextField,
  InputLabel,
} from "@mui/material";
import { Avatar, CssBaseline, Typography } from "@mui/material";


const StudentDataTable = () => {
  //Shivanjali made this changes
  const componentPDF = useRef();

  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batches, setBatches] = useState([]);

  const [selectedTrainer, setSelectedTrainer] = useState("");

  // update batch.................
  const [trainerName, setTrainerName] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batchName, setBatchName] = useState("");
  const [batchTime, setBatchTime] = useState("12:00");
  const [batchObjectId, setBatchObjectId] = useState("");
  const [batchModalOpen, setbatchModalOpen] = useState(false);

  // update student....................
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentBatch, setStudentBatch] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("2024-07-14");
  const [studentModalOpen, setStudentModalOpen] = useState(false);

  // update batch.............................
  const handleOpen = async (Id) => {
    setbatchModalOpen(true);
    // let result = await fetch(`http://localhost:5001/update-batch/${Id}`);
    let result = await fetch(`${window.location.origin}/update-batch/${Id}`);
    result = await result.json();
    setBatchId(result.id);
    setBatchName(result.batch);
    setTrainerName(result.name);
    setBatchTime(result.time);
  };

  const updateBatch = async () => {
    let data = {
      id: batchId,
      name: trainerName,
      batch: batchName,
      time: batchTime,
    };
    let result = await fetch(
      // `http://localhost:5001/update-batch/${batchObjectId}`,
      `${window.location.origin}/update-batch/${batchObjectId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    console.log(result);
    setbatchModalOpen(false);
    alert("Data Successfully updated")      

    // navigate("/admin");
  };

  // ------------------x-------------------x-------------
  const handleClose = () => {
    setbatchModalOpen(false);
    setStudentModalOpen(false);
  };

  // update Student.............................
  const handleStudentOpen = async (Id) => {
    setStudentModalOpen(true);
    // let result = await fetch(`http://localhost:5001/update-student/${Id}`);
    let result = await fetch(`${window.location.origin}/update-student/${Id}`);
    result = await result.json();
    setStudentId(result.id);
    setStudentBatch(result.batch);
    setStudentName(result.name);
    setEmail(result.email);
    setDOB(result.dob);
  };

  const updateStudent = async () => {
    let userName = studentName.toLowerCase().replace(/ /g, "");
    let next = dob.split("-");
    let final = `${userName}@${next[0]}`;

    let data1 = {
      name: studentName,
      email: email,
      id: studentId,
      password: final,
      batch: studentBatch,
      dob: dob,
    };
    try {
      let result = await fetch(
        // `http://localhost:5001/update-user-student/${studentId}`,
        `${window.location.origin}/update-user-student/${studentId}`,
        {
          method: "PUT",
          body: JSON.stringify(data1),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    let data2 = {
      name: studentName,
      id: studentId,
      batch: studentBatch,
    };
    try {
      let result = await fetch(
        `${window.location.origin}/update-student/${studentId}`,
        {
          method: "PUT",
          body: JSON.stringify(data2),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      console.log(result);
      alert("Data Successfully updated")      
    } catch (error) {
      console.log(error);
    }

    setStudentModalOpen(false);
    
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // const response = await axios.get("http://localhost:5001/students");
        const response = await axios.get(`${window.location.origin}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const batches = async () => {
      try {
        const batchData = await fetch(`${window.location.origin}/batch`);
        const data = await batchData.json();
        setBatches(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    batches();
    fetchStudents();
  }, []);

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const handleTrainerChange = (e) => {
    setSelectedTrainer(e.target.value);
  };


  // delete student........................
  const deleteStudent = async (id) => {
    try {
      // let result = await fetch(`http://localhost:5001/delete-student/${id}`, {
        let result = await fetch(`${window.location.origin}/delete-student/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      if (result) {
        alert("Student Deleted");
      }
    } catch (error) {
      console.error(error);
    }

    try {
      // let result = await fetch(`http://localhost:5001/delete-user/${id}`, {
        let result = await fetch(`${window.location.origin}/delete-user/${id}`, {
        method: "DELETE",
      });
      result = await result.json();
      if (result) {
        alert("Account Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = selectedBatch
    ? students.filter((student) => student.batch === selectedBatch)
    : students;

  const filteredBatches = selectedTrainer
    ? batches.filter((batch) => batch.name === selectedTrainer)
    : batches;

  const filteredTrainers = Array.from(
    new Set(batches.map((item) => item.name))
  );


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  const tableStyle = {
    fontSize: { xs: "9px", md: "" }
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <CssBaseline />
        <Grid
          container

          sx={{
            display: "flex",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "5px 5px 8px #cecece",
            minHeight: "400px",
            overflow: "auto",
          }}
        >
          {/* show Students */}

          <Grid
            item
            xs={12}
            sx={{
              paddingRight: { xs: 0, md: "10px" },
              overflow: "auto",
              maxHeight: "400px",
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  marginBottom: "15px",
                  margin: "auto",
                }}
              ></Avatar>
              <Typography variant="h6" textAlign={"center"} mt={2}>
                All Student Data
              </Typography>
            </Box>

            <Box component="div" sx={{ mt: 3, display: "flex" }}>
              <Grid container spacing={2}>
                <Grid item md={12} lg={12} xs={12}>
                  <Typography variant="div">Select Batch</Typography>
                  <FormControl fullWidth>
                    <Select value={selectedBatch} onChange={handleBatchChange}>
                      <MenuItem value="" selected>
                        All Batches
                      </MenuItem>
                      {batches.map((item) => (
                        <MenuItem value={item.batch}>{item.time} {item.batch} </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={12} lg={12} xs={12}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" sx={tableStyle}>
                          <b>ID</b>
                        </TableCell>
                        <TableCell align="center" sx={tableStyle} >
                          <b>Name</b>
                        </TableCell>
                        <TableCell align="center" sx={tableStyle}>
                          <b>Batch</b>
                        </TableCell>
                        <TableCell align="center" sx={tableStyle}>
                          <b>Action</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell align="center" sx={tableStyle}>{student.id}</TableCell>
                          <TableCell align="center" sx={tableStyle}>{student.name}</TableCell>
                          <TableCell align="center" sx={tableStyle}>{student.batch}</TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              color="success"
                              variant="outlined"
                              sx={{fontSize: { xs: "8px", md: "" }}}
                              onClick={() => {
                                handleStudentOpen(student.id);
                              }}
                            >
                              Update
                            </Button>

                            <Button
                              size="small"
                              color="error"
                              variant="outlined"
                              sx={{
                                marginLeft: { xs: "0", md: "10px" },
                                fontSize: { xs: "8px", md: "" }
                              }}
                              onClick={() => deleteStudent(student.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* show batch */}

          <Grid
            item
            // md={6}
            xs={12}
            sx={{
              paddingLeft: { xs: 0, md: "10px" },
              marginTop: "40px",
              overflow: "auto",
              maxHeight: "400px",
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  marginBottom: "15px",
                  margin: "auto",
                }}
              ></Avatar>
              <Typography variant="h6" textAlign={"center"} mt={2}>
                All Batch Data
              </Typography>
            </Box>
            <Box
              component="form"
              sx={{ mt: 3, width: "100%" }}
            >
              <Box component="div" sx={{ mt: 3, display: "flex" }}>
                <Grid container spacing={2}>
                  <Grid item md={12} lg={12} xs={12}>
                    <Typography variant="div">Select Trainer</Typography>
                    <FormControl fullWidth>
                      <Select
                        value={selectedTrainer}
                        onChange={handleTrainerChange}
                      >
                        <MenuItem value="" selected>
                          All Trainers
                        </MenuItem>
                        {filteredTrainers.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item md={12} lg={12} xs={12}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" sx={tableStyle}>
                            <b>ID</b>
                          </TableCell>
                          <TableCell align="center" sx={tableStyle}>
                            <b>Name</b>
                          </TableCell>
                          <TableCell align="center" sx={tableStyle}>
                            <b>Time</b>
                          </TableCell>
                          <TableCell align="center" sx={tableStyle}>
                            <b>Action</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredBatches.map((batch) => (
                          <TableRow key={batch.id}>
                            <TableCell align="center" sx={tableStyle}>{batch.id}</TableCell>
                            <TableCell align="center" sx={tableStyle}>{batch.batch}</TableCell>
                            <TableCell align="center" sx={tableStyle}>{batch.time}</TableCell>
                            <TableCell align="center" >
                              <Button
                                size="small"
                                color="success"
                                variant="outlined"
                                sx={tableStyle}
                                onClick={() => {
                                  handleOpen(batch._id);
                                  setBatchObjectId(batch._id);
                                }}
                              >
                                Update
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* update student modal */}
      <Modal
        open={studentModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Student Id"
                name="id"
                type="number"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="DOB"
                name="dob"
                type="date"
                value={dob}
                // value={studentId}
                onChange={(e) => setDOB(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth disabled>
                <InputLabel>Select Batch</InputLabel>
                <Select
                  label="Select Batch"
                  value={studentBatch}
                  onChange={(e) => setStudentBatch(e.target.value)}
                  required
                >
                  {batches.map((item) => (
                    <MenuItem value={item.batch}>{item.batch}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                onClick={updateStudent}
                fullWidth
                variant="contained"
              >
                Update Student
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* batch update modal */}
      <Modal
        open={batchModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Batch Id"
                name="id"
                type="number"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Trainer Name"
                name="name"
                type="text"
                value={trainerName}
                onChange={(e) => setTrainerName(trainerName)}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Time"
                name="date"
                type="time"
                ampm={true}
                value={batchTime}
                onChange={(e) => setBatchTime(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Batch"
                name="batch"
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                onClick={updateBatch}
                fullWidth
                variant="contained"
              >
                Update Batch
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default StudentDataTable;
