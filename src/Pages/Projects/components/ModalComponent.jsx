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
import ProjectUserModal from "./ProjectUserModal";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { postNewProject } from "../../../Components/db/Redux/api/ProjectSlice";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const ModalComponent = ({ open, handleClose }) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Orta");
  const [selectedStatus, setStatus] = useState("Başlanmadyk");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [value, setValue] = useState("");
  const [workers, setWorkers] = useState([]);
  const [endDateProject, setEndDateProject] = useState(
    workers ? workers.endDate : ""
  );
  const [startDateProject, setStartDateProject] = useState(
    workers ? workers.startDate : ""
  );
  const statusUsers = useSelector((state) => state.users.status);
  const UsersData = useSelector((state) => state.users.data);

  const dispatch = useDispatch();
  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const projectTime = workers.reduce(
      (acc, project) => {
        const projectStart = new Date(project.startDate);
        const projectEnd = new Date(project.endDate);

        // Update earliest start date
        if (!acc.earliestStart || projectStart < acc.earliestStart) {
          acc.earliestStart = projectStart;
        }

        // Update latest end date
        if (!acc.latestEnd || projectEnd > acc.latestEnd) {
          acc.latestEnd = projectEnd;
        }

        return acc;
      },
      { earliestStart: null, latestEnd: null }
    );

    setStartDateProject(projectTime.earliestStart);
    setEndDateProject(projectTime.latestEnd);
  }, [workers]);

  const handleOpenUserModal = (newValues) => {
    if (newValues.length) {
      setOpenUserModal(true);
      setSelectedUsers(newValues);
    } else {
      setUsers(newValues);
    }
  };
  const handleCloseUserModal = (id) => {
    if (id) {
      setUsers((prevUsers) => prevUsers.filter((item) => item.id !== id));
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((item) => item.id !== id)
      );
    } else {
      setUsers(newValues);
    }
    setOpenUserModal(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeStep = (e, newValues) => {
    if (newValues.length < users.length) {
      const removedUsers2 = workers.filter(
        (user) => !newValues.some((newUser) => newUser.id === user.id)
      );

      setUsers(newValues);
      setWorkers(
        workers.filter((user) =>
          newValues.some((newUser) => newUser.id !== user.id)
        )
      );
      setSelectedUsers(
        selectedUsers.filter((user) =>
          newValues.some((newUser) => newUser.id !== user.id)
        )
      );
    } else if (newValues || newValues[0].id) {
      handleOpenUserModal(newValues);
      setUsers(() =>
        newValues.map((user) => ({
          id: user.id ? user.id : user.userId,
          name: user.name,
          surname: user.surname,
        }))
      );
      // setUserId(newValues[newValues.length - 1].id);
    }
  };
  const handleSubmit = () => {
    const body = {
      name: value,
      status: selectedStatus,
      priority: selectedValue,
      startDate: startDateProject,
      endDate: endDateProject,
      tasks: workers,
    };
    if (
      value != "" &&
      selectedValue != "" &&
      startDateProject !== "" &&
      endDateProject != "" &&
      workers.length != 0
    ) {
      dispatch(postNewProject(body));
      handleClose();
      setUsers([]);
      setWorkers([]);
      setValue("");
    } else {
      toast.error("Dogry maglumatyňyzy giriziň!");
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 470,
            bgcolor: "background.paper",
            boxShadow: 24,
            zIndex: 10,
            borderRadius: "10px",
          }}
        >
          <Stack
            bgcolor="#2F6FD0"
            p="15px 20px"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            textTransform="capitalize"
            sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
          >
            <Typography
              color="#fff"
              fontSize={24}
              fontWeight={400}
              fontFamily="DM Sans"
            >
              Täze proýekt
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
          <Stack p="20px 20px 30px " spacing={2}>
            <Stack spacing={2} direction="row">
              <TextField
                label="Proýektiň Ady"
                variant="outlined"
                placeholder="web saýt... "
                autoComplete="off"
                value={value}
                fullWidth
                onChange={handleChange}
                sx={{
                  borderRadius: "8px",
                  height: 56,
                }}
              />
            </Stack>
            <Autocomplete
              id="combo-box-demo"
              multiple
              value={users}
              fullWidth
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={UsersData}
              getOptionLabel={(option) =>
                `${Capitalize(option.name)} ${Capitalize(
                  option.surname == null ? "" : option.surname
                )}`
              }
              onChange={handleChangeStep}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      width: "100%",
                    },
                  }}
                  {...params}
                  label="Ýerine ýetirýän"
                  fullWidth
                  autoComplete="off"
                  placeholder="Adyny ýazyň ýa-da saýlaň"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <>{params.InputProps.endAdornment}</>,
                  }}
                />
              )}
              popupIcon={<AddIcon />}
            />
            <Stack direction="row" width="100%">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    "DesktopDatePicker",
                    "MobileTimePicker",
                    "DatePicker",
                    "MobileDatePicker",
                  ]}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Stack
                    width="100%"
                    direction="row"
                    justifyContent="space-beteen"
                    spacing="16px"
                  >
                    <Stack
                      width="100%"
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Typography
                        fontSize={15}
                        fontWeight={500}
                        textAlign="start"
                        color="#474747"
                      >
                        Başlanýan wagty
                      </Typography>

                      <DatePicker
                        fullWidth
                        value={
                          dayjs(startDateProject).isValid()
                            ? dayjs(startDateProject)
                            : null
                        }
                        onChange={(newValue) => {
                          if (newValue) {
                            setStartDateProject(
                              newValue
                                ? dayjs(newValue).format("YYYY-MM-DD")
                                : dayjs(startDateProject)
                            );
                          } else {
                            setStartDateProject(dayjs(startDateProject));
                          }
                        }}
                        // onChange={(newValue) => {
                        //   if (newValue) {
                        //     setStartDateProject(newValue);
                        //   } else {
                        //     setStartDateProject(null);
                        //   }
                        // }}
                        format="DD.MM.YYYY"
                      />
                    </Stack>
                    <Stack
                      width="100%"
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Typography
                        fontSize={15}
                        fontWeight={500}
                        textAlign="start"
                        color="#474747"
                      >
                        Tamamlanýan wagty
                      </Typography>

                      <DatePicker
                        fullWidth
                        value={
                          dayjs(endDateProject).isValid()
                            ? dayjs(endDateProject)
                            : null
                        }
                        onChange={(newValue) => {
                          if (newValue) {
                            setEndDateProject(
                              newValue
                                ? dayjs(newValue).format("YYYY-MM-DD")
                                : dayjs(endDateProject)
                            );
                          } else {
                            setEndDateProject(dayjs(endDateProject));
                          }
                        }}
                        format="DD.MM.YYYY"
                      />
                    </Stack>
                  </Stack>
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
            <Stack direction="row" width="100%" spacing={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">Wajyplygy</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedValue}
                  onChange={handleChangeSelect}
                  label="Wajyplygy"
                >
                  {/* {priority.PRIORITY &&
                  priority.PRIORITY.map((elem, index) => (
                    <MenuItem key={index} value={10}>{elem.name}</MenuItem>
                  ))} */}
                  <MenuItem value="Ýokary">Ýokary</MenuItem>
                  <MenuItem value="Orta">Orta</MenuItem>
                  <MenuItem value="Pes">Pes</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-label">Statusy</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedStatus}
                  onChange={handleChangeStatus}
                  label="Statusy"
                >
                  {/* {priority.PRIORITY &&
                  priority.PRIORITY.map((elem, index) => (
                    <MenuItem key={index} value={10}>{elem.name}</MenuItem>
                  ))} */}

                  <MenuItem value="Dowam edýän">Dowam edýän</MenuItem>
                  <MenuItem value="Başlanmadyk">Başlanmadyk</MenuItem>
                  <MenuItem value="Tamamlanan">Tamamlanan</MenuItem>
                  <MenuItem value="Ýatyryldy">Ýatyryldy</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack alignItems="end" pt="10px">
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
      <ProjectUserModal
        user={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        openUserModal={openUserModal}
        handleCloseUserModal={handleCloseUserModal}
        setWorkers={setWorkers}
        allUsers={UsersData}
      />
    </>
  );
};

export default ModalComponent;
