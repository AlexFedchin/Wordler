import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [data, setData] = useState(null);
  const API_BASE_URL = 'http://localhost:8000/api/';
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_BASE_URL + 'test/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box>
      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" align="center" fontWeight={400}>
          What is Wordler?
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
          Wordler is an online language learning platform which helps you
          remember the words that you need. It is really simple: put in the
          words that you want to know and their translation and play games to
          remember them perfectly!
        </Typography>
        <Box display="flex" justifyContent="center" my={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/login');
              console.log('Login button pressed');
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate('/register');
              console.log('Register button pressed');
            }}
            sx={{ mx: 4 }}
          >
            Register
          </Button>
        </Box>
        {data && (
          <Box textAlign="center" mt={4}>
            <Typography>{data.message}</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Home;
