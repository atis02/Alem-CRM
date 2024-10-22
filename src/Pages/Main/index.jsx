import React from "react";
import UserCalendar from "../UserCalendar";
import Employees from "../Employees";
import { Box } from "@mui/material";

const index = () => {
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  return (
    <Box
      height="100vh"
      width="100%"
      className="notes"
      backgroundColor="#f5f6fa"
      overflow="auto"
    >
      {user.role === "USER" ? <UserCalendar /> : <Employees />}
    </Box>
  );
};

export default index;
