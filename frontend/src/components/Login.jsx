import React from 'react';
import { Button, Container, Typography, TextField, Box } from '@mui/material';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <Container className="container">
      <Typography className="subheading" align="center">
        Login
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
            className="text-field"
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
            margin="dense"
            sx={{ mt: 2 }}
            className="text-field"
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
        </form>
      </Box>
    </Container>
  );
}

export default Login;
