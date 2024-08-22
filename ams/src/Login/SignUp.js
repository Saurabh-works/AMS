import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { name, email, password, role };
    try {
      // let result = await fetch("http://localhost:5001/signup", {
        let result = await fetch(`${window.location.origin}/signup`, {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      alert("Account created successfully")
      navigate('/')
      
    } catch (error) {
      console.error("Error registering user", error);
      alert("Error registering user");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {/* main container */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0px 0px 10px #cecece",
            padding: "25px",
          }}
        >
          {/* icon */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* title */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          {/* main form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* name */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              {/* user id */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  autoComplete="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              {/* password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon color="primary" />
                          ) : (
                            <VisibilityIcon color="primary" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* select roll */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Select Roll</InputLabel>
                  <Select
                    label="Select Roll"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="student">Student</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              
            </Grid>

            {/* sign up button */}
            <Button type="submit" fullWidth variant="contained" sx={{mt:2,  mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              {/* sign in */}
              <Grid item>
                <Link variant="body2" color="primary">
                  Already have an account?{" "}
                  <NavLink to="/login">Sign In</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;
