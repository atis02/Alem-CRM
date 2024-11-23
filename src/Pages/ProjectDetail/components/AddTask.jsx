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

const AddTask = ({
  projectId,
  allUsers,
  openUserModal,
  handleCloseUserModal,
}) => {
  const [users, setUsers] = useState();
  const [priority, setPriority] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
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
  useEffect(() => {
    const getPriority = async () => {
      await AxiosInstance.get("/project/status/priority").then((resp) => {
        setPriority(resp.data.data);
      });
    };
    getPriority();
  }, []);

  const handleChangeStep = (e) => {
    setUsers(e.target.value);
  };
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
            //   p: 4,
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
            <FormControl>
              <InputLabel id="age-label">Işgär</InputLabel>
              <Select
                labelId="age-label"
                value={users}
                label="Işgärler"
                onChange={handleChangeStep}
              >
                {allUsers.map((elem) => (
                  <MenuItem value={elem.id}>
                    {elem.name} {elem.surname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                    pt={0}
                    width="100%"
                    direction="row"
                    // justifyContent="space-beteen"
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
                        onChange={(newValue) => {
                          if (newValue) {
                            setStartDate(newValue);
                          } else {
                            setStartDate(null);
                          }
                        }}
                        format="DD.MM.YYYY"
                      />
                    </Stack>
                    <Stack
                      pt={0}
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
                        onChange={(newValue) => {
                          if (newValue) {
                            setEndDate(newValue);
                          } else {
                            setEndDate(null);
                          }
                        }}
                        format="DD.MM.YYYY"
                      />
                    </Stack>
                  </Stack>
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
            <TextField
              label="Etmeli işi"
              variant="outlined"
              placeholder="web saýt... "
              autoComplete="off"
              value={value}
              fullWidth
              onChange={(event) => setValue(event.target.value)}
              sx={{
                borderRadius: "8px",
                height: 56,
              }}
            />

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
    </>
  );
};

export default AddTask;
