import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import NonActiveUsers from "./NonActiveUsers";
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkTimeDay,
  postWorkTimeDay,
} from "../../../Components/db/Redux/api/SetWorkTimeSlice";

const WorkTime = () => {
  const time = useSelector((state) => state.workTime.data);
  const status = useSelector((state) => state.workTime.status);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  useEffect(() => {
    dispatch(getWorkTimeDay());
  }, [dispatch]);
  useEffect(() => {
    if (status === "succeeded" && time.length > 0) {
      setStartTime(time[0].startTime);
      setEndTime(time[0].endTime);
    }
  }, [status, time]);
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

  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="auto"
      p="10px"
    >
      <Stack p={1} direction="row" alignItems="center" height="100%">
        <Stack
          backgroundColor="#fff"
          width="40%"
          height="100%"
          borderRadius="20px"
          pb="10px"
          boxShadow="0px 0px 8px -5px rgba(0,0,0,0.75)"
          p="30px 24px 17px"
        >
          <Typography
            textAlign="center"
            fontFamily="DM Sans"
            mb={2}
            fontSize={20}
          >
            Iş wagtyny sazlamak
          </Typography>
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
            toast.error("Ýalnyşlyk")
          ) : status === "succeeded" ? (
            <Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={1}>
                  {/* First TimePicker (Start Time) */}
                  <TimePicker
                    label="Başlanýan wagty"
                    format="HH:mm"
                    value={startTime ? dayjs(startTime, "HH:mm") : null}
                    onChange={(newValue) => {
                      setStartTime(newValue ? newValue.format("HH:mm") : null);
                    }}
                    // onChange={(newValue) => setStartTime(newValue)} // Update the state with selected time
                    renderInput={(params) => <TextField {...params} />}
                    ampm={false}
                  />

                  {/* Second TimePicker (End Time) */}
                  <TimePicker
                    ampm={false}
                    value={endTime ? dayjs(endTime, "HH:mm") : null}
                    onChange={(newValue) => {
                      setEndTime(newValue ? newValue.format("HH:mm") : null);
                    }}
                    label="Tamamlanýan wagty"
                    // value={endTime}
                    // onChange={(newValue) => setEndTime(newValue)} // Update the state with selected time
                    renderInput={(params) => <TextField {...params} />}
                    format="HH:mm"
                  />
                </Stack>
              </LocalizationProvider>
              {/* Button to trigger value retrieval */}
              <Button
                variant="contained"
                onClick={handleGetValues}
                style={{ marginTop: "10px", background: "#9FC2A6" }}
              >
                Ýatda sakla
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </Stack>

        <NonActiveUsers />
        <ToastContainer />
      </Stack>
    </Box>
  );
};

export default WorkTime;
