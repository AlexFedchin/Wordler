import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FilledButton from '../components/FilledButton';
import CustomTextField from '../components/CustomTextField';

function Login() {
  const [nickname, setNickname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:8000/api/';

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(API_BASE_URL + 'users/')
      .then((response) => {
        const existingUsers = response.data;
        const user = existingUsers.find(
          (user) => user.nickname === nickname && user.password === password
        );
        if (user) {
          console.log('Logged in as:', user);
          setError('');
        } else {
          setPassword('');
          setError('Wrong nickname or password');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setPassword('');
        setNickname('');
        setError('Something went wrong. Try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      sx={{
        padding: '24px',
        backgroundColor: 'transparent',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subheading of the section */}
      <Typography
        align="center"
        sx={{
          fontSize: '40px',
          fontWeight: 500,
          color: 'var(--off-white-color)',
          fontFamily: 'AccentFont',
          marginBottom: '24px',
          marginTop: '48px',
        }}
      >
        Login to Play
      </Typography>
      {/* Box for the form */}
      <Box padding={2} minWidth={'600px'}>
        <form onSubmit={handleSubmit}>
          {/* Nickname TextField */}
          <CustomTextField
            label="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {/* Password TextField */}
          <CustomTextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            showPassword={showPassword}
            onToggleShowPassword={handleClickShowPassword}
            mb="16px"
          />

          {/* Error message display */}
          {error && (
            <Typography
              align="center"
              fullWidth
              sx={{
                mt: 0,
                fontSize: 'x-large',
                color: 'var(--error-color)',
                fontFamily: 'TextFont',
              }}
            >
              {error}
            </Typography>
          )}
          {/* Login button */}
          <FilledButton
            onClick={handleSubmit}
            width="100%"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            mt="16px"
            isLoading={loading}
            text={'Login'}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 2,
              gap: 1,
            }}
          >
            <Typography
              align="center"
              sx={{
                fontSize: 'x-large',
                color: 'var(--off-white-color)',
                fontFamily: 'TextFont',
              }}
            >
              Don't have an account?
            </Typography>
            <Typography
              align="center"
              onClick={() => {
                navigate('/register');
              }}
              sx={{
                fontSize: 'x-large',
                color: 'var(--accent-color)',
                fontFamily: 'TextFont',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textShadow: '0 0 10px var(--accent-color)',
                  transition: 'text-shadow 0.3s ease',
                },
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
