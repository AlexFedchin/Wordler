import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import { Typography, Box, AppBar, Toolbar } from '@mui/material';
import './styles/app.css';

function App() {
  return (
    <Router>
      <Box>
        <AppBar position="static" className="app-bar">
          <Toolbar style={{ justifyContent: 'center' }}>
            <Link to="/">
              <Typography className="global-header">Wordler</Typography>
            </Link>
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
