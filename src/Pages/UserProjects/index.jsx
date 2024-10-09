import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Project from "./components/Project";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

const index = () => {
  const [projectName, setProjectName] = useState("");
  const UsersData = useSelector((state) => state.users.data);
  const [openUserModal, setOpenUserModal] = useState(false);

  const navigate = useNavigate();
  const handleChange = (name) => {
    setProjectName(name);
  };
  const handleOpenUserModal = () => {
    setOpenUserModal(true);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };
  return (
    <Box
      height="90vh"
      p="0 15px"
      width="100%"
      backgroundColor="#f4f5f9"
      overflow="auto"
    >
      <Stack
        backgroundColor="#fff"
        width="100%"
        minHeight="96%"
        borderRadius="12px"
        p="20px"
        mt={2}
        boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
      >
        <Stack
          //   height={70}
          backgroundColor="#F6FDFD"
          alignItems="center"
          justifyContent="space-between"
          p="0 20px"
          borderRadius="12px"
          direction="row"
        >
          <Stack width="100%">
            <Typography
              p="5px 10px"
              fontSize="23px"
              fontFamily="DM Sans"
              fontWeight="600"
              textAlign="center"
              width="100%"
            >
              Proýektler
            </Typography>
          </Stack>
        </Stack>
        <Project setProjectName={handleChange} />
      </Stack>
    </Box>
  );
};

export default index;
