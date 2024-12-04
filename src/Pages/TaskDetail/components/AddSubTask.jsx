import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Components/db/Redux/api/UserSlice";
import { Capitalize } from "../../../Components/utils";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AxiosInstance from "../../../Components/db/Redux/api/AxiosHelper";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addNewTask } from "../../../Components/db/Redux/api/ProjectDetailSlice";
import deleteIcon from "../../../../public/images/Delete.png";

const AddSubTask = ({ user, openUserModal, handleCloseUserModal }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskId, setTaskId] = useState(() =>
    JSON.parse(localStorage.getItem("subTaskId"))
  );
  const [users, setUsers] = useState();
  const [priority, setPriority] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Orta");
  const [selectedStatus, setStatus] = useState("Başlanmadyk");
  const [value, setValue] = useState("");
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch();
  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  console.log(task);
  // useEffect(() => {
  //   const getPriority = async () => {
  //     await AxiosInstance.get("/project/status/priority").then((resp) => {
  //       setPriority(resp.data.data);
  //     });
  //   };
  //   getPriority();
  // }, []);

  const handleSubmit = () => {
    const body = {
      projectId: projectId,
      userId: users,
      name: value,
      status: selectedStatus,
      priority: selectedValue,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
    };

    if (
      projectId &&
      value !== "" &&
      selectedStatus != "" &&
      selectedValue !== "" &&
      startDate !== null &&
      endDate !== null
    ) {
      dispatch(addNewTask({ body: body, projectID: projectId }));
      handleCloseUserModal();
      setSelectedValue("");
      setValue("");
      setStatus("");
      setUsers();
    } else {
      toast.error("Dogry maglumatyňyzy giriziň!");
    }
  };
  const handleAddTask = () => {
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
  console.log(tasks);

  const handleDeleteTask = (title) => {
    console.log(title);
    setTasks(
      tasks.filter((task) => {
        console.log(task);

        task !== title;
      })
    );
  };
  return (
    <>
      <Modal
        open={openUserModal}
        onClose={() => {
          setSelectedValue("");
          setValue("");
          setStatus("");
          setUsers();
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
            justifyContent="flex-end"
            alignItems="end"
            textTransform="capitalize"
            sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
          >
            <IconButton
              onClick={() => {
                setSelectedValue("");
                setValue("");
                setStatus("");
                setUsers();
                handleCloseUserModal();
              }}
            >
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
          <Stack p="15px 20px 30px " spacing="10px">
            <Stack p="15px 20px" spacing="10px">
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
                    borderRadius: "8px",
                    color: "#2F6FD0",
                    backgroundColor: "#f0f7ff",
                  }}
                  onClick={handleAddTask}
                >
                  Ýatda sakla
                </Button>
              </Stack>
              <Box
                height="200px"
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
                  <Stack spacing={2} mt="10px">
                    {tasks.map((t, index) => (
                      <Stack
                        direction="row"
                        sx={{
                          padding: "7px",
                          backgroundColor: "#f0f7ff",
                          borderRadius: "5px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography key={index} textAlign="center">
                          {index + 1}. {t.text}
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
                  <Typography sx={{ mt: 2 }}>Ýumuş ýok!</Typography>
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

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Modal,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import deleteIcon from "../../../../public/images/Delete.png";

// const AddSubTask = ({ openUserModal, handleCloseUserModal }) => {
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     return savedTasks ? JSON.parse(savedTasks) : [];
//   });

//   const handleAddTask = () => {
//     if (task.trim() === "") {
//       alert("Ýumuş ýazmaly!");
//       return;
//     }
//     const newTask = {
//       userId: Math.floor(Math.random() * 100), // Replace with actual userId if available
//       taskId: uuidv4(),
//       text: taskText,
//       isCompleted: false,
//     };
//     const newTasks = [...tasks, newTask];
//     setTasks(newTasks);
//     setTask("");
//     localStorage.setItem("tasks", JSON.stringify(newTasks));
//   };
//   console.log(tasks);

//   const handleDeleteTask = (title) => {
//     task.filter((task) => task === title);
//   };
//   return (
//     <>
//       <Modal
//         open={openUserModal}
//         onClose={() => {
//           setTask("");
//           handleCloseUserModal();
//         }}
//         disableAutoFocus
//         BackdropProps={{
//           style: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 650,
//             bgcolor: "background.paper",
//             boxShadow: 14,
//             zIndex: 1000,
//             borderRadius: "10px",
//           }}
//         >
//           <Stack
//             bgcolor="#2F6FD0"
//             p="15px 20px"
//             direction="row"
//             justifyContent="flex-end"
//             alignItems="center"
//             sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
//           >
//             <IconButton
//               onClick={() => {
//                 setTask("");
//                 handleCloseUserModal();
//               }}
//             >
//               <CloseIcon sx={{ color: "#fff" }} />
//             </IconButton>
//           </Stack>
//           <Stack p="15px 20px" spacing="10px">
//             <TextField
//               label="Ýumuş"
//               variant="outlined"
//               placeholder="Ýumuşyň ady"
//               autoComplete="off"
//               value={task}
//               fullWidth
//               onChange={(event) => setTask(event.target.value)}
//               sx={{ borderRadius: "8px", height: 56 }}
//             />
//             <Box p="20px">
//               <Typography variant="h6">Ýumuşlar:</Typography>
//               {tasks.length > 0 ? (
//                 <Stack spacing={2} mt="10px">
//                   {tasks.map((t, index) => (
//                     <Stack
//                       direction="row"
//                       sx={{
//                         padding: "7px",
//                         backgroundColor: "#f0f7ff",
//                         borderRadius: "5px",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Typography key={index} textAlign="center">
//                         {index + 1}. {t}
//                       </Typography>
//                       {console.log(t)}
//                       <IconButton onClick={() => handleDeleteTask(t)}>
//                         <img
//                           style={{ width: 20, height: 20 }}
//                           src={deleteIcon}
//                           alt=""
//                         />
//                       </IconButton>
//                     </Stack>
//                   ))}
//                 </Stack>
//               ) : (
//                 <Typography sx={{ mt: 2 }}>Ýumuş ýok!</Typography>
//               )}
//             </Box>
//             <Stack alignItems="end" pt="10px">
//               <Button
//                 sx={{
//                   border: "1px solid #2F6FD0",
//                   width: 115,
//                   height: 40,
//                   textTransform: "revert",
//                   borderRadius: "20px",
//                   color: "#2F6FD0",
//                   backgroundColor: "#f0f7ff",
//                 }}
//                 onClick={handleAddTask}
//               >
//                 Ýatda sakla
//               </Button>
//             </Stack>
//           </Stack>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default AddSubTask;
