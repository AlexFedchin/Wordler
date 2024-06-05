import React from "react";
import { Button, Container, Typography, TextField, Box } from "@mui/material";
import "../styles/login.css";
// import "../styles/common.css";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <Container className="container">
      <Typography className="subheading" align="center">
        LOGIN
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            sx={{ mt: 2 }}
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
              gap: 2,
            }}
          >
            <Typography className="typography" align="center">
              Don't have an account?
            </Typography>
            <Typography className="highlight" align="center">
              Register
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
