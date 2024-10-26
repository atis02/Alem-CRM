import { Box, Stack } from "@mui/material";
import React from "react";
import ProjectHead from "./components/ProjectHead";
import Projects from "./components/Projects";
import UserProjects from "../UserProjects";
const index = () => {
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  return (
    <Box
      height="100%"
      p={user.role === "USER" ? 0 : 2}
      width="100%"
      backgroundColor="#f4f5f9"
      overflow="auto"
    >
      {user.role === "ADMIN" ? (
        <>
          <ProjectHead />
          <Projects />
        </>
      ) : (
        <UserProjects />
      )}
    </Box>
  );
};

export default index;
