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
import {
  postNewProject,
  updateProject,
} from "../../../Components/db/Redux/api/ProjectSlice";
import { toast } from "react-toastify";
import UpdateProjectUserModal from "../../ProjectDetail/components/UpdateProjectUserModal";
import moment from "moment";
import dayjs from "dayjs";

const UpdateModalComponent = ({ open, handleClose, details }) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    details ? details.priority : "Pes"
  );
  const [selectedStatus, setStatus] = useState(
    details ? details.status : "Başlanmadyk"
  );
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  // const [users, setUsers] = useState([]);
  // const [selectedUsers, setSelectedUsers] = useState(
  //   details ? details.users : []
  // );
  // const [userId, setUserId] = useState("");
  const [value, setValue] = useState(details?.name || "");
  const [endDateProject, setEndDateProject] = useState(
    details
      ? details.startdate && moment(details.enddate).format("YYYY-MM-DD")
      : null
  );
  const [startDateProject, setStartDateProject] = useState(
    details
      ? details.startdate && moment(details.startdate).format("YYYY-MM-DD")
      : null
  );
  const statusUsers = useSelector((state) => state.users.status);
  const UsersData = useSelector((state) => state.users.data);
  useEffect(() => {
    if (details) {
      setValue(details.name || "");
      setSelectedValue(details.priority || "");
      setStatus(details.status || "");
      setStartDateProject(details.startdate || "");
      setEndDateProject(details.enddate || "");
    }
  }, [details]);
  const dispatch = useDispatch();
  const [workers, setWorkers] = useState([]);

  const handleChangeSelect = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleOpenUserModal = (newValues) => {
    setOpenUserModal(true);
    setSelectedUsers(newValues);
  };
  const handleCloseUserModal = (id) => {
    id
      ? setUsers((prevUsers) => prevUsers.filter((item) => item.id !== id))
      : setUsers((prevUsers) => prevUsers);
    setOpenUserModal(false);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangeStep = (e, newValues) => {
    if (newValues) {
      //   handleOpenUserModal(newValues);
      //   setUsers(() =>
      //     newValues.map((user) => ({
      //       id: user.id ? user.id : user.userId,
      //       name: user.name,
      //       surname: user.surname,
      //     }))
      //   );
      //   setUserId(newValues.id);
    }
  };
  const handleSubmit = () => {
    const body = {
      userId: user.id,
      projectId: details && details.project_id,
      archived: false,
      name: value,
      status: selectedStatus,
      priority: selectedValue,
      startDate: dayjs(startDateProject).format("YYYY-MM-DD"),
      endDate: dayjs(endDateProject).format("YYYY-MM-DD"),
    };

    if (
      value != "" &&
      selectedValue != "" &&
      startDateProject !== null &&
      endDateProject != null
    ) {
      dispatch(updateProject(body));
      handleClose();
    } else {
      toast.error("Dogry maglumatyňyzy giriziň!");
    }
  };
  return (
    <>
      {/* {details ? ( */}
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
              maxWidth="100%"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {details && details.name}
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
                // defaultValue={details && details.name}
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
              defaultValue={details && details.users}
              fullWidth
              options={UsersData}
              getOptionLabel={(option) =>
                `${Capitalize(option.name)} ${Capitalize(
                  option.surname == null ? "" : option.surname
                )}`
              }
              disabled
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
                        defaultValue={
                          dayjs(details && details.startdate).isValid()
                            ? dayjs(details && details.startdate)
                            : null
                        }
                        onChange={(newValue) => {
                          if (newValue) {
                            setStartDateProject(
                              newValue
                                ? dayjs(newValue).format("YYYY-MM-DD")
                                : dayjs(details && details.startdate)
                            );
                          } else {
                            setStartDateProject(
                              dayjs(details && details.startdate)
                            );
                          }
                        }}
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
                        defaultValue={
                          dayjs(details && details.enddate).isValid()
                            ? dayjs(details && details.enddate)
                            : null
                        }
                        onChange={(newValue) => {
                          if (newValue) {
                            setEndDateProject(
                              newValue
                                ? dayjs(newValue).format("YYYY-MM-DD")
                                : null
                            );
                          } else {
                            setEndDateProject(null);
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
      {/* ) : (
        ""
      )} */}
    </>
  );
};

export default UpdateModalComponent;
