import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
// import "../styles/common.css";

function Home() {
  const [data, setData] = useState(null);
  const API_BASE_URL = "http://localhost:8000/api/";
  const navigate = useNavigate();
  var currentUser = null;

  useEffect(() => {
    axios
      .get(API_BASE_URL + "test/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box align="center">
      <Container className="container">
        <Typography
          align="left"
          sx={{
            fontSize: "10rem",
            fontWeight: 500,
            color: "var(--off-white-color)",
            fontFamily: "AccentFont",
          }}
        >
          WORDLER
        </Typography>
        <Typography align="left" className="typography">
          An <span className="highlight">easy</span> way to learn{" "}
          <span className="highlight">difficult</span> words.
        </Typography>
        <Box display="flex">
          {/* <Button
            variant="contained"
            className="button contained"
            onClick={() => {
              navigate("/login");
              console.log("Login button pressed");
            }}
          >
            Login
          </Button> */}
          <Button
            variant="outlined"
            className="button outlined"
            onClick={() => {
              if (currentUser == null) {
                navigate("/login");
              } else {
                navigate("/play");
              }
            }}
            sx={{ mt: 7, width: 300 }}
          >
            Play
          </Button>
        </Box>
        {data && (
          <Box textAlign="center" mt={4}>
            <Typography className="typography">{data.message}</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Home;
