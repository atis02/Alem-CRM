import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import SubTask from "./components/SubTask";
import { useDispatch } from "react-redux";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  deleteProjectTask,
  getProjectDetail,
} from "../../Components/db/Redux/api/ProjectDetailSlice";
import { Capitalize } from "../../Components/utils";
import AddSubTask from "./components/AddSubTask";
import { ToastContainer } from "react-toastify";

const index = () => {
  const [openUserModal, setOpenUserModal] = useState(false);

  const { projectId, subId } = useParams();
  const [projectName, setProjectName] = useState(() =>
    JSON.parse(localStorage.getItem("subTaskId"))
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const status = useSelector((state) => state.projectDetail.status);
  // const error = useSelector((state) => state.projectDetail.error);
  // const data = useSelector((state) => state.projectDetail.data);

  console.log(projectName);

  // useEffect(() => {
  //   status === "succeeded" && setProjectName(data[0].name);
  // }, [data]);
  // useEffect(() => {
  //   dispatch(getProjectDetail(projectId));
  // }, [dispatch]);
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
      {/* {user.role === "USER" ? "" : <ProjectHead />} */}
      <ToastContainer />

      <Stack
        backgroundColor="#fff"
        width="100%"
        // minHeight={user.role === "USER" ? "97%" : "80%"}
        minHeight="97%"
        borderRadius="12px"
        p="20px"
        mt={2}
        boxShadow="0px 0px 8px -5px rgba(0,0,0,0.75)"
      >
        <Stack
          backgroundColor="#F6FDFD"
          alignItems="center"
          //   sx={{
          //     ...(user.role === "USER"
          //       ? ""
          //       : { justifyContent: "space-between" }),
          //   }}
          sx={{
            justifyContent: "space-between",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
              {projectName &&
                `${Capitalize(projectName.name)} (${projectName.user.name} ${
                  projectName.user.surname
                })`}
            </Typography>
          </Stack>

          <Stack
            alignItems="center"
            justifyContent="center"
            // sx={{
            //   ...(user.role === "USER"
            //     ? { display: "none" }
            //     : { display: "block" }),
            // }}
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
              <AddTaskIcon />
              Ýumuş
            </Button>
          </Stack>
        </Stack>
        <SubTask />
        {/* <Project setProjectName={handleChange} setProjectId={setProjectId} />
        {user.role === "USER" ? (
          ""
        ) : (
          )} */}
        <AddSubTask
          openUserModal={openUserModal}
          handleCloseUserModal={handleCloseUserModal}
          // taskId={taskId}
          user={projectName.user.id}
        />
      </Stack>
    </Box>
  );
};

export default index;
