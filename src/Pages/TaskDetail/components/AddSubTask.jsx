import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Capitalize } from "../../../Components/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteIcon from "../../../../public/images/Delete.png";
import { createSubTasks } from "../../../Components/db/Redux/api/SubTaskSlice";

const AddSubTask = ({ user, openUserModal, handleCloseUserModal }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskId, setTaskId] = useState(() =>
    JSON.parse(localStorage.getItem("subTaskId"))
  );
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const body = {
      subTasks: tasks,
      taskId: taskId.id,
      userId: taskId.user && taskId.user.id,
    };
    if (tasks.length) {
      dispatch(createSubTasks(body));
      handleCloseUserModal();
      setTasks([]);
    } else {
      toast.error("Ýumuş giriziň!");
    }
  };
  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      toast.error("Ýumuş ýazmaly!");
      return;
    }
    const newTask = {
      userId: user,
      taskId: taskId.id,
      text: task,
      isCompleted: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setTask("");
    // localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDeleteTask = (title) => {
    setTasks(
      tasks.filter((task) => {
        task !== title;
      })
    );
  };
  return (
    <>
      <Modal
        open={openUserModal}
        onClose={() => {
          handleCloseUserModal();
        }}
        disableAutoFocus
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 650,
            height: 440,
            bgcolor: "background.paper",
            boxShadow: 14,
            zIndex: 1000,
            borderRadius: "10px",
          }}
        >
          <Stack
            bgcolor="#2F6FD0"
            p="15px 20px"
            direction="row"
            justifyContent="space-between"
            alignItems="end"
            textTransform="capitalize"
            sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
          >
            <Typography color="#fff" fontSize={22}>
              Täze ýumuş
            </Typography>
            <IconButton
              onClick={() => {
                handleCloseUserModal();
              }}
            >
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
          <Stack p="15px 20px 30px " spacing="10px">
            <Stack p="15px 20px" spacing="10px">
              <form onSubmit={handleAddTask}>
                <Stack
                  alignItems="center"
                  spacing={1}
                  justifyContent="space-between"
                  // pt="10px"
                  width="100%"
                  direction="row"
                >
                  <TextField
                    // label="Ýumuş"
                    variant="outlined"
                    placeholder="Ýumuşyň ady"
                    autoComplete="off"
                    value={task}
                    fullWidth
                    onChange={(event) => setTask(event.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "35px",
                        width: "100%",
                        // backgroundColor: "#F6FAFD",
                        height: 45,
                      },
                    }}
                  />
                  <Button
                    sx={{
                      border: "1px solid #2F6FD0",
                      width: 115,
                      height: 40,
                      textTransform: "revert",
                      borderRadius: "35px",
                      color: "#2F6FD0",
                      backgroundColor: "#f0f7ff",
                    }}
                    onClick={handleAddTask}
                  >
                    Goşmak
                  </Button>
                </Stack>
              </form>

              <Box
                minHeight="200px"
                maxHeight="200px"
                sx={{
                  overflow: "scroll",
                  p: 1,
                  "&::-webkit-scrollbar": {
                    backgroundColor: "lightblue",
                    width: "5px",
                    borderRadius: "10px",

                    height: "0px",
                    // display: "none",
                  },
                }}
              >
                {/* <Typography variant="h6">Ýumuşlar:</Typography> */}
                {tasks.length > 0 ? (
                  <Stack spacing={1} mt="10px">
                    {tasks.map((t, index) => (
                      <Stack
                        direction="row"
                        sx={{
                          padding: "2px",
                          backgroundColor: "#f0f7ff",
                          borderRadius: "5px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          key={index}
                          // whiteSpace="nowrap"
                          textAlign="center"
                        >
                          {index + 1}. {Capitalize(t.text)}
                        </Typography>
                        <IconButton onClick={() => handleDeleteTask(t)}>
                          <img
                            style={{ width: 20, height: 20 }}
                            src={deleteIcon}
                            alt=""
                          />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography sx={{ mt: 2, textAlign: "center" }}>
                    Ýumuş goşuň!
                  </Typography>
                )}
              </Box>
            </Stack>
            <Stack alignItems="end">
              <Button
                sx={{
                  border: "1px solid #2F6FD0",
                  width: 115,
                  height: 40,
                  textTransform: "revert",
                  borderRadius: "20px",
                  color: "#2F6FD0",
                  backgroundColor: "#f0f7ff",
                }}
                onClick={handleSubmit}
              >
                Ýatda sakla
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AddSubTask;
