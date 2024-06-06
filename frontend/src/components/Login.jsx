import React from "react";
import { Button, Container, Typography, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
// import "../styles/common.css";

function Login() {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(`Nickname: ${nickname}, Password: ${password}`);
  };

  return (
    <Container className="container">
      <Typography className="subheading" align="center">
        Login to your account to play
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nickname"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="text-field"
            InputProps={{
              classes: {
                input: "text-field-input",
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="text-field"
            InputProps={{
              classes: {
                input: "text-field-input",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            className="button contained"
            sx={{ mt: 4 }}
            fullWidth
          >
            Login
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
              gap: 1,
            }}
          >
            <Typography className="typography" align="center">
              Don't have an account?
            </Typography>
            <Typography
              className="clickable-highlight"
              align="center"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
