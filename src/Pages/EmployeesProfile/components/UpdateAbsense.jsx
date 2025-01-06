import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addAbsense,
  getAbsenseForUser,
  updateAbsense,
} from "../../../Components/db/Redux/api/AbsenseSlice";
import { Capitalize } from "../../../Components/utils";

// Component
const UpdateAbsense = ({ open, handleCloseModal, data, absenseData }) => {
  const [absensingData, setAbsenseData] = useState(absenseData);
  const [fromDate, setFromDate] = useState(
    absenseData ? dayjs(absenseData.startDate).format("DD.MM.YYYY") : null
  );
  const [toDate, setToDate] = useState(
    absenseData ? dayjs(absenseData.endDate).format("DD.MM.YYYY") : null
  );
  const [textInput, setTextInput] = useState();
  // absenseData && absensingData.reason
  const [selectedColor, setSelectedColor] = useState("#7551E9");
  const [colors, setColors] = useState([
    { color: "#7551E9", id: 1 },
    { color: "#E951BF", id: 2 },
    { color: "#FF9E58", id: 3 },
    { color: "#9FC2A5", id: 4 },
  ]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const turkmenLocaleText = {
    // Customize any text that appears on the date or time pickers
    cancelButtonLabel: "Yza",
    clearButtonLabel: "Arassala",
    okButtonLabel: "Bolýar",
    todayButtonLabel: "Şu gün",
    selectTimeLabel: "Wagty saýlaň",
    // Add translations for any other labels if needed
  };

  useEffect(() => {
    if (absenseData) {
      setFromDate(absenseData.startDate);
      setToDate(absenseData.endDate);
      setTextInput(absenseData.reason || "");
      setAbsenseData(absenseData || "");
      setSelectedColor(absenseData.color || "");
    }
  }, [absenseData]);

  // Disable dates in the past or already marked

  //   const shouldDisableDate = React.useCallback(
  //     (date) => {
  //       const today = dayjs().startOf("day");
  //       const isPastDate = date.isBefore(today, "day");
  //       const fromDateDisable = fromDate && date.isSame(fromDate, "day");
  //       const toDateDisable = toDate && date.isSame(toDate, "day");
  //       const isUnavailable = absenseData?.some(
  //         ({ startDate, endDate }) =>
  //           dayjs(startDate).isSameOrBefore(date, "day") &&
  //           dayjs(endDate).isSameOrAfter(date, "day")
  //       );
  //       return isPastDate || isUnavailable || fromDateDisable || toDateDisable;
  //     },
  //     [absenseData, fromDate, toDate] // Include `fromDate` and `toDate` in the dependency array to update when they change
  //   );
  //   const shouldDisableDateFrom = React.useCallback(
  //     (date) => {
  //       const today = dayjs().startOf("day");
  //       const isPastDate = date.isBefore(today, "day");
  //       const isUnavailable = absenseData?.some(
  //         ({ startDate, endDate }) =>
  //           dayjs(startDate).isSameOrBefore(date, "day") &&
  //           dayjs(endDate).isSameOrAfter(date, "day")
  //       );
  //       const toDateDisable = toDate && date.isSame(toDate, "day");
  //       return isPastDate || isUnavailable || toDateDisable;
  //     },
  //     [absenseData, fromDate, toDate] // Include `fromDate` and `toDate` in the dependency array to update when they change
  //   );

  const handleSubmit = (id) => {
    if (!fromDate || !toDate || !textInput) {
      toast.error("Maglumatlary giriz!");
      return;
    }
    // if (absensingData.startDate.isSame(absensingData.endDate, "day")) {
    //   toast.error("Seneler deň bolup bilmeýär!");
    //   return;
    // }
    // if (fromDate.isSame(toDate, "day")) {
    //   toast.error("Seneler deň bolup bilmeýär!");
    //   return;
    // }

    dispatch(
      updateAbsense({
        permissionUserId: user.id,
        absenceId: id,
        userId: data.id,
        startDate: dayjs(fromDate).format("YYYY-MM-DD"),
        endDate: dayjs(toDate).format("YYYY-MM-DD"),
        reason: textInput,
        color: selectedColor,
      })
    );
    handleCloseModal();
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={turkmenLocaleText}
      adapterLocale="tk"
    >
      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: "20px 25px",
          }}
        >
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Stack></Stack>
            <Typography variant="h6">
              {" "}
              {absensingData && Capitalize(absensingData.reason)}
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <DatePicker
            label="Başlanýan senesi"
            // value={fromDate}
            defaultValue={
              dayjs(absenseData ? absenseData.startDate : null).isValid()
                ? dayjs(absenseData ? absenseData.startDate : null)
                : null
            }
            // defaultValue={dayjs(fromDate).isValid() ? dayjs(fromDate) : null}
            sx={{
              width: "100%",
            }}
            // shouldDisableDate={shouldDisableDateFrom}
            onChange={(newValue) => setFromDate(newValue)}
          />
          <DatePicker
            label="Tamamlanýan senesi"
            // value={toDate}
            defaultValue={
              dayjs(absenseData ? absenseData.endDate : null).isValid()
                ? dayjs(absenseData ? absenseData.endDate : null)
                : null
            }
            // disabled={fromDate === toDate}
            sx={{
              width: "100%",
              mt: 2,
            }}
            // shouldDisableDate={shouldDisableDate}
            onChange={(newValue) => setToDate(newValue)}
          />
          <TextField
            label="Sebäp"
            variant="outlined"
            fullWidth
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Stack
            direction="row"
            mt={2}
            justifyContent="space-between"
            spacing="9px"
          >
            {colors.map((item) => (
              <Stack
                key={item.color}
                onClick={() => handleColorClick(item.color)}
                sx={{
                  backgroundColor: item.color,
                  width: { lg: 52, md: 52, sm: 45, xs: 40 },
                  height: {
                    lg: 52,
                    md: 52,
                    sm: 45,
                    xs: 40,
                  },

                  // width: 52,
                  // height: 52,
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
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleSubmit(absensingData.id)}
            sx={{ mt: 2 }}
          >
            Goşmak
          </Button>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default UpdateAbsense;
