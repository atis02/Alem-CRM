import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProjectHead from "../Projects/components/ProjectHead";
import Project from "./components/Project";
import AddTask from "./components/AddTask";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useSelector } from "react-redux";

const Index = () => {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
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
      p={1}
      width="100%"
      backgroundColor="#fff"
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
        boxShadow="0px 0px 8px -5px rgba(0,0,0,0.75)"
      >
        <Stack
          backgroundColor="#F6FDFD"
          alignItems="center"
          sx={{
            ...(user.role === "USER"
              ? ""
              : { justifyContent: "space-between" }),
          }}
          p="10px 20px"
          borderRadius="12px"
          direction="row"
        >
          <Stack direction="row" alignItems="center" spacing={2}>
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
            </Link>
            <Typography
              width="100%"
              textAlign="center"
              fontSize="24px"
              fontFamily="DM Sans"
              fontWeight="500"
            >
              {projectName !== "" && projectName}
            </Typography>
          </Stack>

          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              ...(user.role === "USER"
                ? { display: "none" }
                : { display: "block" }),
            }}
          >
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
              onClick={handleOpenUserModal}
            >
              <PersonAddAltIcon />
              Ýerine Ýetirýän
            </Button>
          </Stack>
        </Stack>
        <Project setProjectName={handleChange} setProjectId={setProjectId} />
        {user.role === "USER" ? (
          ""
        ) : (
          <AddTask
            openUserModal={openUserModal}
            handleCloseUserModal={handleCloseUserModal}
            allUsers={UsersData}
            projectId={projectId}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Index;
