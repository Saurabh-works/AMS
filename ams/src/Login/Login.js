import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
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
  Icon,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
      if (JSON.parse(auth).role === 'admin') {
        navigate("/admin");
      }else{
        navigate("/student");
      } 
    } 
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {


      let result = await fetch(`${window.location.origin}/login`, {
        method: "post",
        body: JSON.stringify({ email, password,role }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);

        localStorage.setItem("user", JSON.stringify(result));
  

      if (result) {
        if (result.role === "admin") {
          navigate("/admin");
        } else if (result.role === "student") {
          navigate("/student");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching users", error);
      alert("Error logging in");
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
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "25px",
            boxShadow: "0px 0px 10px #cecece",
          }}
        >
          {/* icon */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* Title */}
          <Typography component="h1" variant="h5">
            Signin
          </Typography>

          {/* main form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* user id */}
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              type="text"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* password */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
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
                      {/* show password */}
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

            {/* select roll */}
            <FormControl margin="normal" fullWidth>
              <InputLabel>Select Role</InputLabel>
              <Select
                label="Select Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="student">Student</MenuItem>
              </Select>
            </FormControl>            

            {/* sig in button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* forgot password */}
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>

              {/* sign up */}
              <Grid item>
                <Link variant="body2" color="primary">
                  Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
