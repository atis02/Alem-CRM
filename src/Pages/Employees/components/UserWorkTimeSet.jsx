import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grow,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { changeLoginPassword } from "../../../Components/db/Redux/api/StandartSlice";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  postWorkTimeDay,
  updateWorkTime,
} from "../../../Components/db/Redux/api/SetWorkTimeSlice";

const style = {
  position: "absolute",
  justifyContent: "space-between",
  top: "30%",
  left: "37%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 220,
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 2,
  borderRadius: "8px",
};
const user = JSON.parse(localStorage.getItem("CRM_USER"));

const UserWorkTimeSet = ({ open, handleClose, userDetails }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [newPassUser, setNewPassUser] = useState("");
  const [textFieldValues, setTextFieldValues] = useState({
    field1: "",
    field2: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails != null) {
      setNewPassUser(userDetails);
      setEndTime(userDetails.workTime && userDetails.workTime.endTime);
      setStartTime(userDetails.workTime && userDetails.workTime.startTime);
    }
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTextFieldValues({ ...textFieldValues, [name]: value });
  };
  const handleGetValues = (id) => {
    const body = {
      id: id,
      permissionUserId: user.id,
      userId: userDetails.id,
      startTime: startTime,
      endTime: endTime,
    };
    if (startTime !== null && endTime !== null) {
      dispatch(updateWorkTime(body));
      handleClose();
    } else {
      toast.error("Wagtlary giriz!");
    }
  };
  const handleSubmit = () => {
    const body = {
      editorId: user.id,
      userId: newPassUser.id,
      newLogin: textFieldValues.field1,
      newPassword: textFieldValues.field2,
    };
    if (
      user &&
      newPassUser !== "" &&
      textFieldValues.field1 !== "" &&
      textFieldValues.field2 !== ""
    ) {
      dispatch(changeLoginPassword(body));
      handleClose();
      setTextFieldValues({ field1: "", field2: "" });
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Grow in={open}>
          <Box sx={style}>
            <Typography variant="h6" textAlign="center" mb={2}>
              {newPassUser.name} {newPassUser.surname}
            </Typography>
            <Stack spacing={2}>
              {/* <TextField
                label="Täze Login"
                name="field1"
                value={textFieldValues.field1}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Täze Açar söz"
                name="field2"
                value={textFieldValues.field2}
                onChange={handleInputChange}
                fullWidth
              /> */}
              <Stack pt={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack direction="row" spacing={1}>
                    <TimePicker
                      label="Başlanýan wagty"
                      format="HH:mm"
                      value={startTime ? dayjs(startTime, "HH:mm") : null}
                      onChange={(newValue) => {
                        setStartTime(
                          newValue ? newValue.format("HH:mm") : null
                        );
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
                {/* <Button
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
                </Button> */}
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                pt={2}
                justifyContent="flex-end"
              >
                <Button onClick={handleClose} variant="outlined">
                  Yza
                </Button>
                <Button
                  onClick={() =>
                    handleGetValues(
                      userDetails.workTime && userDetails.workTime.id
                    )
                  }
                  variant="contained"
                >
                  Çalyşmak
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grow>
      </Modal>
    </>
  );
};

export default UserWorkTimeSet;
