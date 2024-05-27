import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import { Typography, Box, AppBar, Toolbar } from '@mui/material';

function App() {
  return (
    <Router>
      <Box>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: 'center' }}>
            <Typography variant="h4" fontWeight={500}>
              Wordler
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
