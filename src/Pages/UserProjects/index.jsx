import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Project from "./components/Project";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "./components/ModalComponent";

const index = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const UsersData = useSelector((state) => state.users.data);
  const [openUserModal, setOpenUserModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      backgroundColor="#fff"
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
          <Button
            sx={{
              color: "#F8F9FA",
              textTransform: "revert",
              background: "#2F6FD0",
              "&:hover": { background: "#2F6FD0" },
              gap: "10px",
              width: 190,
              height: 45,
              borderRadius: "20px",
            }}
            variant="outlined"
            onClick={handleOpen}
          >
            <AddIcon />
            Täze proýekt
          </Button>
        </Stack>
        <Project setProjectName={handleChange} />
        <ModalComponent open={open} handleClose={handleClose} />
      </Stack>
    </Box>
  );
};

export default index;
