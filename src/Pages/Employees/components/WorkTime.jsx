import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import NonActiveUsers from "./NonActiveUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkTimeDay,
  postWorkTimeDay,
} from "../../../Components/db/Redux/api/SetWorkTimeSlice";
import { getHolidays } from "../../../Components/db/Redux/api/HolidaySlice";
import ModeratorModal from "../../UserCalendar/components/ModeratorModal";
import AddIcon from "@mui/icons-material/Add";
import { Capitalize } from "../../../Components/utils";
import { getUsers } from "../../../Components/db/Redux/api/UserSlice";
import NewPassLoginUpdate from "./NewPassLoginUpdate";

const WorkTime = () => {
  const [users, setUsers] = useState(null);
  const [openNewPass, setOpenNewPass] = useState(false);
  const UsersData = useSelector((state) => state.users.data);
  const [moderatorModalOpen, setModeratorModalOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getWorkTimeDay());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setUsers(newValue);
  };
  // useEffect(() => {
  //   if (status === "succeeded" && time.length > 0) {
  //     setStartTime(time[0].startTime);
  //     setEndTime(time[0].endTime);
  //   }
  // }, [status, time]);
  const handleGetValues = () => {
    const body = {
      userId: user.id,
      startTime: startTime,
      endTime: endTime,
    };
    if (startTime !== null && endTime !== null) {
      dispatch(postWorkTimeDay(body));
    } else {
      toast.error("Wagtlary giriz!");
    }
  };
  useEffect(() => {
    dispatch(getHolidays());
  }, [dispatch]);

  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#fff"
      overflow="auto"
      p="10px"
    >
      <Stack p={1} direction="row" alignItems="center" height="100%">
        <Stack
          backgroundColor="#fff"
          width="30%"
          height="100%"
          borderRadius="20px"
          pb="10px"
          boxShadow="0px 0px 8px -5px rgba(0,0,0,0.75)"
          p="30px 24px 17px"
        >
          <Button
            variant="contained"
            sx={{
              ...(user.role == "USER" && { display: "none" }),
              // width: "10%",
              textTransform: "revert",
              height: "45px",
              mb: 3,
              fontSize: 17,
              border: "0.5px solid #2F6FD0",
              "&:hover": {
                border: "0.5px solid #2F6FD0",
              },
            }}
            onClick={() => setModeratorModalOpen(true)}
          >
            <AddIcon
              sx={{
                color: "#fff",
                width: 25,
                height: 25,
              }}
            />
            Baýramçylyk güni goşmak
          </Button>
          <ModeratorModal
            open={moderatorModalOpen}
            handleClose={() => setModeratorModalOpen(false)}
          />
          {/* <Typography
            textAlign="center"
            fontFamily="DM Sans"
            mb={2}
            fontSize={20}
          >
            Iş wagtyny sazlamak
          </Typography> */}
          {/* {status === "loading..." ? (
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
            toast.error("Ýalnyşlyk")
          ) : status === "succeeded" ? (
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={1}>
                  <TimePicker
                    label="Başlanýan wagty"
                    format="HH:mm"
                    value={startTime ? dayjs(startTime, "HH:mm") : null}
                    onChange={(newValue) => {
                      setStartTime(newValue ? newValue.format("HH:mm") : null);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    ampm={false}
                  />

                  <TimePicker
                    ampm={false}
                    value={endTime ? dayjs(endTime, "HH:mm") : null}
                    onChange={(newValue) => {
                      setEndTime(newValue ? newValue.format("HH:mm") : null);
                    }}
                    label="Tamamlanýan wagty"
                    renderInput={(params) => <TextField {...params} />}
                    format="HH:mm"
                  />
                </Stack>
              </LocalizationProvider>
              <Button
                variant="contained"
                onClick={handleGetValues}
                style={{
                  marginTop: "10px",
                  textTransform: "revert",
                  fontSize: 17,
                  background: "#2F6FD0",
                  height: 43,
                }}
              >
                Ýatda sakla
              </Button>
            </Stack>
          ) : (
            ""
          )} */}
          <Typography
            textAlign="center"
            fontFamily="DM Sans"
            mb={2}
            // mt={1}
            fontSize={20}
          >
            Ulanyjy login we parol çalyşmak
          </Typography>
          <Autocomplete
            rows={4}
            value={users}
            fullWidth
            options={UsersData}
            getOptionLabel={(option) =>
              `${Capitalize(option.name)} ${Capitalize(option.surname || "")}`
            }
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    width: "100%",
                  },
                }}
                {...params}
                label="Adyny ýazyň ýa-da saýlaň"
                fullWidth
                autoComplete="off"
                placeholder="Ady ýa-da Familiýasy"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                }}
              />
            )}
          />
          <Button
            variant="contained"
            sx={{
              ...(user.role == "USER" && { display: "none" }),
              textTransform: "revert",
              mt: 2,
              fontSize: 17,
              border: "0.5px solid #2F6FD0",
              "&:hover": {
                border: "0.5px solid #2F6FD0",
              },
            }}
            onClick={() => {
              users !== null
                ? setOpenNewPass(true)
                : toast.error("Ulanyjy saýlaň!");
            }}
          >
            Çalyşmak
          </Button>
        </Stack>
        <NewPassLoginUpdate
          open={openNewPass}
          handleClose={() => setOpenNewPass(false)}
          userData={users}
        />
        <NonActiveUsers />
        <ToastContainer />
      </Stack>
    </Box>
  );
};

export default WorkTime;
