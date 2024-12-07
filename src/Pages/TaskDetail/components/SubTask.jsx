import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSubTask,
  getSubTasks,
  updateSubTask,
} from "../../../Components/db/Redux/api/SubTaskSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Capitalize } from "../../../Components/utils";
import deleteIcon from "../../../../public/images/Delete.png";

const SubTask = () => {
  const [task, setTask] = useState(
    () => JSON.parse(localStorage.getItem("subTaskId")) || {}
  );
  const status = useSelector((state) => state.subTask.status);
  const error = useSelector((state) => state.subTask.error);
  const data = useSelector((state) => state.subTask.data.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      taskId: task.id,
      userId: task.user && task.user.id,
    };
    dispatch(getSubTasks(body));
  }, [dispatch, task]);

  const handleCheckboxChange = (subTask, isCompleted) => {
    const body = {
      id: subTask.id,
      isCompleted: !isCompleted, // Toggle the current state
      taskId: task.id,
      text: subTask.text,
      userId: task.user && task.user.id,
    };

    dispatch(updateSubTask(body));
  };
  const handleDeleteTask = (id) => {
    const body = {
      subTaskId: [id],
      taskId: task.id,
      userId: task.user && task.user.id,
    };

    if (id) {
      dispatch(deleteSubTask(body));
    }
  };
  return (
    <Box>
      <Stack>
        {status === "loading..." ? (
          <Stack
            direction="column"
            height="90%"
            alignItems="center"
            sx={{ gap: "10px", mt: 10 }}
          >
            <CircularProgress />
            Loading...
          </Stack>
        ) : status === "failed" ? (
          toast.error(error)
        ) : status === "succeeded" ? (
          <Stack
            sx={{
              overflow: "auto",
              height: "94%",
              minHeight: "340px",
            }}
          >
            {!data.length ? (
              <Typography textAlign="center" mt={5} fontSize={18} width="100%">
                Ýumuş ýok
              </Typography>
            ) : (
              <Stack
                alignItems="center"
                // justifyContent="center"
                // direction="row"
                // flexWrap="wrap"
                // gap="15px"
              >
                {data.map((item, index) => (
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    direction="row"
                    width="50%"
                    sx={{
                      padding: "2px",
                      backgroundColor: "#f0f7ff",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    mt={2}
                    key={item.id}
                  >
                    <Stack alignItems="center" spacing={1} direction="row">
                      <Checkbox
                        checked={item.isCompleted}
                        onChange={() =>
                          handleCheckboxChange(item, item.isCompleted)
                        }
                      />
                      <Typography
                        sx={{
                          color: "#5F6368",
                          textDecoration: item.isCompleted
                            ? "line-through"
                            : "none",
                          textAlign: "justify",
                        }}
                      >
                        {/* {index + 1} */}
                        {Capitalize(item.text)}
                      </Typography>
                    </Stack>
                    <IconButton onClick={() => handleDeleteTask(item.id)}>
                      <img
                        style={{ width: 20, height: 20 }}
                        src={deleteIcon}
                        alt=""
                      />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            )}
          </Stack>
        ) : (
          ""
        )}
        {/* <UpdateProjectUserModal
        user={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        openUserModal={openUserModal}
        handleCloseUserModal={() => setOpenUserModal(false)}
        setWorkers={setWorkers}
      /> */}
      </Stack>
    </Box>
  );
};

export default SubTask;
