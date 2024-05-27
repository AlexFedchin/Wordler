import React from 'react';
import { Button, Container, Typography, TextField, Box } from '@mui/material';

function Registration() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
    console.log(
      `Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`
    );
  };

  return (
    <Container>
      <Typography variant="h4" align="center" fontWeight={400}>
        Register
      </Typography>
      <Box display="flex" justifyContent="center" mt={4}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
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
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            size="small"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            fullWidth
            margin="dense"
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Registration;
