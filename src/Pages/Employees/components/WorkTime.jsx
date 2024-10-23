import { Box, Stack } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import NonActiveUsers from "./NonActiveUsers";

const WorkTime = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="auto"
      p="10px"
    >
      <Stack
        p={1}
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        height="70%"
      >
        <Stack
          backgroundColor="#fff"
          width="40%"
          height="62vh"
          borderRadius="20px"
          pb="10px"
          boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
          p="30px 24px 17px"
        ></Stack>
        <Stack
          backgroundColor="#fff"
          width="57%"
          height="62vh"
          borderRadius="20px"
          pb="20px"
          boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
        >
          <ToastContainer />
        </Stack>
      </Stack>
      <NonActiveUsers />
    </Box>
  );
};

export default WorkTime;
