import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProjectHead from "../Projects/components/ProjectHead";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Project from "./components/Project";
import { useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import AddIcon from "@mui/icons-material/Add";

const index = () => {
  const [projectName, setProjectName] = useState("");
  const UsersData = useSelector((state) => state.users.data);
  const [openUserModal, setOpenUserModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

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
      height="100vh"
      p={2}
      width="100%"
      backgroundColor="#f4f5f9"
      overflow="auto"
    >
      {user.role === "USER" ? "" : <ProjectHead />}
      <Stack
        backgroundColor="#fff"
        width="100%"
        minHeight={user.role === "USER" ? "97%" : "80%"}
        borderRadius="12px"
        p="20px"
        mt={2}
        boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
      >
        <Stack
          //   height={70}
          backgroundColor="#F6FDFD"
          alignItems="center"
          sx={{
            ...(user.role === "USER"
              ? ""
              : { justifyContent: "space-between" }),
          }}
          p="0 20px"
          borderRadius="12px"
          direction="row"
        >
          <Stack>
            <Link
              to="#"
              onClick={() => navigate(-1)}
              style={{
                textDecoration: "none",
                color: "#474747",
                display: "flex",
                height: "100%",
                alignItems: "center",
                gap: "10px",
                padding: "15px 0",
              }}
            >
              <ArrowBackIcon />
              <Typography
                p="5px 10px"
                fontSize="23px"
                fontFamily="DM Sans"
                fontWeight="600"
                sx={{
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Proýektler
              </Typography>
            </Link>
          </Stack>
          <Typography
            width="90%"
            textAlign="center"
            fontSize="24px"
            fontFamily="DM Sans"
            fontWeight="600"
          >
            {projectName !== "" && projectName[0].name}
          </Typography>
          <Stack
            // width="20%"
            height="100%"
            // direction="row"
            // pt={2}
            // spacing={4}
            alignItems="center"
            justifyContent="center"
            sx={{
              ...(user.role === "USER"
                ? { display: "none" }
                : { display: "block" }),
            }}
          >
            <IconButton
              sx={{ color: "#757575", width: 45, height: 45 }}
              onClick={handleOpenUserModal}
            >
              <AddIcon sx={{ color: "#000", width: 30, height: 30 }} />
            </IconButton>
          </Stack>
        </Stack>
        <Project setProjectName={handleChange} />
        {user.role === "USER" ? (
          ""
        ) : (
          <AddTask
            openUserModal={openUserModal}
            handleCloseUserModal={handleCloseUserModal}
            allUsers={UsersData}
            projectId={projectName !== "" && projectName[0].id}
          />
        )}
      </Stack>
    </Box>
  );
};

export default index;
