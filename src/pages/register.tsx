import {useState} from "react";
import axios from "axios"
import {Button, Grid, Input, Paper} from "@mui/material";
import {Link} from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    axios({
      method: "post",
      data:
        {
          username: username,
          password: password
        },
      withCredentials: true,
      url: process.env.REACT_APP_SERVER_ADDRESS + "/register"
    }).then((res) => console.log("Register: ", res))
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{minHeight: '100vh', backgroundColor: "#b4d3ff"}}
    >
      <Paper style={{padding: '50px', backgroundColor: "#d2ffb4"}}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{minHeight: '100%'}}
        >
          <h1>Register</h1>
          <Input onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
          <Input onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
          <div style={{marginTop: "20px"}}>
            <Button variant="contained" onClick={handleRegister}>Submit</Button>
            <Link to="/login" style={{textDecoration: "none"}}>
              <Button variant="contained">Login</Button>
            </Link>
          </div>
        </Grid>
      </Paper>
    </Grid>
  )
}