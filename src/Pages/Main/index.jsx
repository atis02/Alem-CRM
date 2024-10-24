import React, { useEffect } from "react";
import UserCalendar from "../UserCalendar";
import Employees from "../Employees";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const index = () => {
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  const navigate = useNavigate();
  useEffect(() => {
    user.role === "ADMIN" ? navigate("/employees") : "";
  }, [user]);
  return (
    <Box
      height="100vh"
      width="100%"
      className="notes"
      backgroundColor="#f5f6fa"
      overflow="auto"
    >
      {user.role === "USER" ? (
        <UserCalendar />
      ) : user.role === "MODERATOR" ? (
        <UserCalendar />
      ) : user.role === "ADMIN" ? (
        <Employees />
      ) : (
        ""
      )}
    </Box>
  );
};

export default index;
