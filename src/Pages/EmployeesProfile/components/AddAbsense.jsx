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
} from "../../../Components/db/Redux/api/AbsenseSlice";

// Component
const AddAbsense = ({ open, handleCloseModal, data, absenseData }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [textInput, setTextInput] = useState("");
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
    absenseData;
  }, [absenseData]);

  // Disable dates in the past or already marked

  const shouldDisableDate = React.useCallback(
    (date) => {
      const today = dayjs().startOf("day");
      const isPastDate = date.isBefore(today, "day");
      const fromDateDisable = fromDate && date.isSame(fromDate, "day");
      const toDateDisable = toDate && date.isSame(toDate, "day");
      const isUnavailable = absenseData?.some(
        ({ startDate, endDate }) =>
          dayjs(startDate).isSameOrBefore(date, "day") &&
          dayjs(endDate).isSameOrAfter(date, "day")
      );
      return isPastDate || isUnavailable || fromDateDisable;
    },
    [absenseData, fromDate, toDate] // Include `fromDate` and `toDate` in the dependency array to update when they change
  );
  const shouldDisableDateFrom = React.useCallback(
    (date) => {
      const today = dayjs().startOf("day");
      const isPastDate = date.isBefore(today, "day");
      const isUnavailable = absenseData?.some(
        ({ startDate, endDate }) =>
          dayjs(startDate).isSameOrBefore(date, "day") &&
          dayjs(endDate).isSameOrAfter(date, "day")
      );
      const toDateDisable = toDate && date.isSame(toDate, "day");
      return isPastDate || isUnavailable || toDateDisable;
    },
    [absenseData, fromDate, toDate] // Include `fromDate` and `toDate` in the dependency array to update when they change
  );
  const close = () => {
    setFromDate(null);
    setToDate(null);
    setTextInput("");
    handleCloseModal();
  };
  const handleSubmit = () => {
    if (!fromDate || !toDate || !textInput) {
      toast.error("Maglumatlary giriz!");
      return;
    }
    if (fromDate.isSame(toDate, "day")) {
      toast.error("Seneler deň bolup bilmeýär!");
      return;
    }
    dispatch(
      addAbsense({
        permissionUserId: user.id,
        userId: data.id,
        startDate: dayjs(fromDate).format("YYYY-MM-DD"),
        endDate: dayjs(toDate).format("YYYY-MM-DD"),
        reason: textInput,
        color: selectedColor,
      })
    );
    close();
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={turkmenLocaleText}
      adapterLocale="tk"
    >
      <Modal open={open} onClose={close}>
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
            <Typography variant="h6">Täze Rugsat güni </Typography>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <DatePicker
            label="Başlanýan senesi"
            value={fromDate}
            sx={{
              width: "100%",
            }}
            shouldDisableDate={shouldDisableDateFrom}
            onChange={(newValue) => setFromDate(newValue)}
          />
          <DatePicker
            label="Tamamlanýan senesi"
            value={toDate}
            disabled={fromDate == null}
            sx={{
              width: "100%",
              mt: 2,
            }}
            shouldDisableDate={shouldDisableDate}
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
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Goşmak
          </Button>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default AddAbsense;
