import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField"; // Импорт из @mui/material
import dayjs from "dayjs";

const CustomDatePicker = ({ selectedDay, setDateNote }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultValue={
          dayjs(selectedDay, "DD/MM/YYYY").isValid()
            ? dayjs(selectedDay, "DD/MM/YYYY")
            : null
        }
        onChange={(newValue) => {
          if (newValue) {
            setDateNote(newValue.format("YYYY-MM-DD"));
          } else {
            setDateNote(null);
          }
        }}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            InputProps: {
              sx: {
                backgroundColor: "#f6e9e2", // Оранжевый цвет фона
                borderRadius: "40px", // Закругленные углы
                color: "#ff730f !important", // Белый текст
                padding: "0 16px", // Внутренний отступ
                height: 45,
                width: 190,
                "&:hover": {
                  border: "none", // Цвет границы при наведении
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #FF9E58", // Без границ
                },
                "& .MuiSvgIcon-root": {
                  color: "#ff730f", // Белая иконка календаря
                  opacity: 0.7, // Прозрачность иконки
                },
                "& .MuiInputBase-input": {
                  color: "#ff730f", // Белый текст
                  fontFamily: "DM Sans",
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
