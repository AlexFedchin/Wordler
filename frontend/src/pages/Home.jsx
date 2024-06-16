import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import FilledButton from "../components/FilledButton";
import SectionSubheading from "../components/SectionSubheading";

function Home() {
  const [data, setData] = useState(null);
  const API_BASE_URL = "http://localhost:8000/api/";
  const navigate = useNavigate();
  const { user } = useUser();

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
    <Box
      sx={{
        padding: "24px",
        margin: "0px",
        bgcolor: "transparent",
        borderRadius: "10px",
        width: "100wv",
      }}
    >
      <Typography
        align="left"
        sx={{
          fontSize: "800%",
          fontWeight: 500,
          color: "var(--off-white-color)",
          fontFamily: "AccentFont",
        }}
      >
        WORDLER
      </Typography>
      <Typography
        align="left"
        sx={{
          fontSize: "x-large",
          color: "var(--off-white-color)",
          fontFamily: "TextFont",
        }}
      >
        An{" "}
        <span
          style={{
            fontSize: "x-large",
            color: "var(--accent-color)",
            fontFamily: "TextFont",
          }}
        >
          easy
        </span>{" "}
        way to learn{" "}
        <span
          style={{
            fontSize: "x-large",
            color: "var(--accent-color)",
            fontFamily: "TextFont",
          }}
        >
          difficult
        </span>{" "}
        words.
      </Typography>
      <Box display="flex">
        <FilledButton
          text="Play"
          onClick={() => {
            if (user == null) {
              navigate("/login");
            } else {
              navigate("/play");
            }
          }}
          width={300}
          fontSize="20px"
          mt="40px"
        />
      </Box>
      {data && (
        <Typography
          sx={{
            fontSize: "24px",
            color: "var(--off-white-color)",
            fontFamily: "TextFont",
            mt: 4,
            textAlign: "center",
          }}
        >
          {data.message}
        </Typography>
      )}
      {user && (
        <SectionSubheading
          text={"Hello, " + user.nickname + "!"}
        ></SectionSubheading>
      )}
    </Box>
  );
}

export default Home;
