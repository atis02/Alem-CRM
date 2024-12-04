import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Grow,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { turkmenLocaleText } from "../../../Components/utils";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import {
  createHoliday,
  getHolidays,
} from "../../../Components/db/Redux/api/HolidaySlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModeratorModal = ({ open, handleClose, startDate, endDate }) => {
  const [holidayText, setHolidayText] = useState("");
  const [dateHoliday, setDateHoliday] = useState("");
  const [selectedColor, setSelectedColor] = useState("#05dac5");
  const dispatch = useDispatch();

  const data = useSelector((state) => state.holidays.data.data);
  const status = useSelector((state) => state.holidays.status);
  const error = useSelector((state) => state.holidays.error);

  const [colors, setColors] = useState([
    { color: "#05dac5", id: 1 },
    { color: "#4CAF50", id: 2 },
    { color: "#FF9E58", id: 3 },
    { color: "#1E88E5", id: 4 },
  ]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const handleAddHoliday = () => {
    const body = {
      name: holidayText,
      date: dayjs(dateHoliday).format("YYYY-MM-DD"),
      color: selectedColor,
      startDate: startDate,
      endDate: endDate,
    };
    if (holidayText !== "" && dateHoliday !== "") {
      dispatch(createHoliday(body));
      handleClose();
    } else {
      toast.error("Maglumatlary giriz!");
    }
  };
  useEffect(() => {
    dispatch(getHolidays());
  }, [dispatch]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Grow in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "35%",
            left: "35%",
            transform: "translate(-50%, -50%)",
            width: 550,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Stack alignItems="end" p="0">
            <IconButton onClick={handleClose} sx={{ p: 0 }}>
              <CloseIcon
                sx={{
                  width: 28,
                  height: 28,
                  color: "gray",
                  p: 0,
                }}
              />
            </IconButton>
          </Stack>
          <Stack>
            <Stack spacing="10px" width="100%">
              <Typography
                fontWeight={600}
                fontFamily="Montserrat"
                color="#474747"
                fontSize={15}
                mb="9px"
              >
                Baýramçylyk ady
              </Typography>
              <TextField
                id="outlined-basic"
                label="Text"
                type="text"
                variant="outlined"
                value={holidayText}
                autoComplete="off"
                name="username"
                onChange={(e) => setHolidayText(e.target.value)}
                sx={{
                  fontFamily: "Montserrat",
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    borderRadius: "100px",
                    background: "#F5F6FA",
                  },
                  width: "100%",
                }}
                InputLabelProps={{
                  sx: {
                    color: "#757575", // Set the label color
                  },
                }}
              />
            </Stack>
            <Stack direction="row">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="tk"
                localeText={turkmenLocaleText}
              >
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
                    width: "100%",
                  }}
                >
                  <Stack
                    width="100%"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing="16px"
                  >
                    <Stack
                      width="50%"
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Typography
                        fontSize={15}
                        fontWeight={600}
                        textAlign="start"
                        fontFamily="Montserrat"
                        color="#474747"
                        mb="5px"
                      >
                        Senesi
                      </Typography>

                      <DatePicker
                        //   disabled={dayjs(selectedDay, "YYYY-MM-DD").isValid()}
                        //   value={
                        //     dayjs(selectedDay, "YYYY-MM-DD").isValid()
                        //       ? dayjs(selectedDay, "YYYY-MM-DD")
                        //       : null
                        //   }
                        onChange={(newValue) => {
                          if (newValue) {
                            setDateHoliday(
                              dayjs(newValue).format("YYYY-MM-DD")
                            );
                          } else {
                            setDateHoliday(null);
                          }
                        }}
                        format="DD.MM.YYYY"
                        fullWidth
                        slotProps={{
                          textField: {
                            size: "small",
                            InputProps: {
                              sx: {
                                borderRadius: "35px",
                                backgroundColor: "#F5F6FA",
                                width: "100%",
                                height: 55,
                                border: "1px solid #ccc",
                              },
                            },
                          },
                        }}
                      />
                    </Stack>
                    <Stack
                      pt={3}
                      width="50%"
                      direction="row"
                      justifyContent="space-between"
                      spacing="9px"
                    >
                      {colors.map((item) => (
                        <Stack
                          key={item.color}
                          onClick={() => handleColorClick(item.color)}
                          style={{
                            backgroundColor: item.color,
                            width: "52px",
                            height: "52px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "100%",
                            color: "#fff",
                          }}
                        >
                          {selectedColor === item.color ? <CheckIcon /> : ""}
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </DemoContainer>
              </LocalizationProvider>
            </Stack>
          </Stack>
          <Stack alignItems="end">
            <Button
              variant="outlined"
              //   onClick={handleClose}
              sx={{ mt: 2, textTransform: "revert", fontSize: 16 }}
              onClick={handleAddHoliday}
            >
              Ýatda sakla
            </Button>
          </Stack>
        </Box>
      </Grow>
    </Modal>
  );
};

export default ModeratorModal;
