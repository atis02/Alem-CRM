import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/tk";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Capitalize,
  turkmenMonths,
  turkmenWeekdays,
  turkmenWeekdaysMin,
} from "../../../Components/utils";
import pattern from "../../../../public/images/pattern.png";

const CustomCalendar = ({
  openModal,
  events,
  setStartDate,
  setEndDate,
  holidays,
}) => {
  moment.locale("tk");
  moment.updateLocale("tk", {
    weekdays: turkmenWeekdays.slice(0, 7),
    weekdaysShort: turkmenWeekdaysMin.slice(0, 7),
  });

  moment.updateLocale("tk", {
    months: turkmenMonths,
  });
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventText, setEventText] = useState("");
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState("month"); // 'month', 'week', 'day'

  const generateCalendar = () => {
    let startDay, endDay;
    if (viewMode === "month") {
      startDay = currentDate.clone().startOf("month").startOf("isoWeek"); // Start from Monday
      endDay = currentDate
        .clone()
        .endOf("month")
        .endOf("isoWeek")
        .subtract(1, "day"); // End on Sunday
    } else if (viewMode === "week") {
      startDay = currentDate.clone().startOf("isoWeek"); // Start from Monday
      endDay = currentDate.clone().endOf("isoWeek").subtract(1, "day"); // End on Sunday
    } else {
      return [];
    }
    const day = startDay.clone().subtract(1, "day");
    const calendar = [];

    // Generate the calendar weeks
    while (day.isBefore(endDay, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    if (calendar.length === 5) {
      const lastWeek = calendar[4];
      const lastDayOfLastWeek = lastWeek[6];
      if (lastDayOfLastWeek.isBefore(endDay, "day")) {
        calendar.push(
          Array(7)
            .fill(0)
            .map(() => day.add(1, "day").clone())
        );
      }
    }

    return {
      calendar,
      firstDay: startDay.format("YYYY MM DD"),
      lastDay: endDay.format("YYYY MM DD"),
      endDay,
      startDay,
    };
  };
  useEffect(() => {
    const { startDay, endDay } = generateCalendar();

    setStartDate(startDay.format("YYYY-MM-DD"));
    setEndDate(endDay.format("YYYY-MM-DD"));
  }, [currentDate, viewMode, setStartDate, setEndDate]);
  const isSunday = (day) => day.day() === 0;
  const handleDayClick = (day) => {
    setSelectedDay(day), openModal(day.format("YYYY-MM-DD"));
  };
  const isholidays = (day) => {
    return (
      holidays && holidays.some((item) => moment(item.date).isSame(day, "day"))
    );
  };
  const isMarked = (day) => {
    return events.some((item) => moment(item.comeTime).isSame(day, "day"));
  };

  const filteredEvents = (day) =>
    events.filter((item) => moment(item.comeTime).isSame(day, "day"));

  const renderCalendar = () => {
    if (viewMode === "day") {
      return renderDayView();
    } else {
      const calendar = generateCalendar();
      const theme = useTheme();
      const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
      return (
        <Table>
          <TableHead>
            {/* <TableRow>
              {moment.weekdays().map((day, index) => (
                <TableCell
                  sx={{
                    backgroundColor: "#F5F6FA",
                    height: { lg: "25px", md: "25px", sm: "20px", xs: "18px" },
                    p: 1,
                    ...(index === 0 ? { borderTopLeftRadius: "12px" } : ""),
                    ...(moment.weekdays().length - 1 === index
                      ? { borderTopRightRadius: "12px" }
                      : ""),
                    fontWeight: 500,
                    color: "#202224",
                    fontSize: { lg: 14, md: 14, sm: 10, xs: 10 },
                  }}
                  key={index}
                  align="center"
                >
                  {day}
                </TableCell>
              ))}
            </TableRow> */}
            <TableRow>
              {(isMobile ? moment.weekdaysShort() : moment.weekdays()).map(
                (day, index) => (
                  <TableCell
                    sx={{
                      backgroundColor: "#F5F6FA",
                      height: {
                        lg: "25px",
                        md: "25px",
                        sm: "20px",
                        xs: "18px",
                      },
                      p: 1,
                      ...(index === 0 ? { borderTopLeftRadius: "12px" } : ""),
                      ...(isMobile
                        ? moment.weekdaysMin().length - 1 === index
                        : moment.weekdays().length - 1 === index
                        ? { borderTopRightRadius: "12px" }
                        : ""),
                      fontWeight: 500,
                      color: "#202224",
                      fontSize: { lg: 14, md: 14, sm: 10, xs: 10 },
                    }}
                    key={index}
                    align="center"
                  >
                    {day}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {calendar.calendar.map((week, weekIndex) => (
              <TableRow key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <TableCell
                    key={dayIndex}
                    onClick={() => {
                      handleDayClick(day);
                    }}
                    sx={{
                      cursor: "pointer",
                      border: "1px solid #ddd",
                      // borderRadius: { lg: 0, md: 0, sm: 0, xs: "100%" },
                      // borderRadius: "100%",

                      // width: "90px",
                      // height: {
                      //   lg: "90px",
                      //   md: "90px",
                      //   sm: "60px",
                      //   xs: "20px",
                      // },

                      padding: 0,
                      backgroundColor: isSunday(day) ? "#ADD8E6   " : "#fff",
                      // height: "85px",
                      height: {
                        lg: "85px",
                        md: "85px",
                        sm: "60px",
                        xs: "60px",
                      },
                      fontSize: "16px",
                      fontWeight: 500,

                      color:
                        day.month() === currentDate.month()
                          ? "#474747"
                          : "#959494",
                      ...(day.month() === currentDate.month()
                        ? ""
                        : {
                            backgroundImage: `url(${pattern})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }),
                      position: "relative",
                      "&:hover": {
                        backgroundColor: "#f5f6fa",
                        color: "#000",
                      },
                    }}
                  >
                    <Stack
                      height="30px"
                      width="30px"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        ...(moment().isSame(day, "day") && {
                          background: "#2F6FD0",
                          color: "#fff",
                          borderRadius: "100%",
                          zIndex: 100,
                        }),
                      }}
                    >
                      {day.format("D")}
                    </Stack>

                    {isMarked(day) &&
                      events
                        .filter((item) =>
                          moment(item.comeTime).isSame(day, "day")
                        )
                        .map((item, index) => (
                          <Stack
                            style={{
                              fontSize: "14px",
                              backgroundColor: item.color ? "#e5dffb" : "white",
                              color: day ? item.color : "blue",
                              borderLeft: `6px solid ${item.color}`,
                              height: 25,
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "100%",
                              display: " flex",
                              position: "absolute",
                              bottom: 0,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            width="100%"
                            direction="row"
                            justifyContent="space-evenly"
                            spacing={1}
                            key={index}
                          >
                            <Typography
                              width="70%"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              textAlign="center"
                            >
                              {Capitalize(item.note)}
                            </Typography>
                            {filteredEvents(day).length !== (1 || 0) && (
                              <Stack
                                width={20}
                                height={20}
                                backgroundColor={item.color}
                                color="#fff"
                                alignItems="center"
                                justifyContent="center"
                                fontFamily="Montserrat"
                                borderRadius="100%"
                                fontSize={12}
                              >
                                + {filteredEvents(day).length - 1}
                              </Stack>
                            )}
                          </Stack>
                        ))}
                    {isholidays(day) &&
                      holidays
                        .filter((elem) => moment(elem.date).isSame(day, "day"))
                        .map((item, index) => (
                          <Stack
                            style={{
                              fontSize: "14px",
                              backgroundColor: item.color
                                ? "transparent"
                                : "white",
                              color: day ? item.color : "blue",
                              border: `3px solid ${item.color}`,
                              height: "100%",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: "100%",
                              display: " flex",
                              position: "absolute",
                              bottom: 0,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            width="100%"
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="end"
                            spacing={1}
                            key={index}
                          >
                            <Typography
                              width="90%"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              textAlign="start"
                              pt={2}
                            >
                              {item.name}
                            </Typography>
                          </Stack>
                        ))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const handleTodayClick = () => {
    setCurrentDate(moment()); // Set to today's date
  };

  return (
    <Stack
      sx={{
        p: { xs: "5px 10px 2px 10px", md: "10px 15px 5px 15px" },
      }}
    >
      <Stack
        mb="4px"
        direction="row"
        alignItems="center"
        justifyContent={{
          lg: "space-between",
          md: "space-between",
          sm: "center",
          xs: "flex-start",
          // xs: "center",
        }}
        spacing={1}
      >
        <Button
          sx={{
            color: "#565656",
            fontSize: { lg: 14, md: 14, sm: 10, xs: 10 },

            textTransform: "revert",
            fontWeight: 600,
            textAlign: "start",
            border: "0.6px solid #D5D5D5",
            borderRadius: "15px",
            // width: "68px",
            // minHeight: "40px",
            width: { lg: 68, md: 68, ms: 48, xs: 48 },
            height: { lg: 40, md: 40, ms: 30, xs: 30 },
          }}
          onClick={handleTodayClick}
        >
          Şu gün
        </Button>
        <Stack
          direction="row"
          width={{ lg: "66%", md: "66%", sm: "80%", xs: "65%" }}
          alignItems="center"
          justifyContent={{
            lg: "space-between",
            md: "space-between",
            sm: "center",
            xs: "center",
          }}
          spacing={1}
        >
          <Stack direction="row" alignItems="center">
            <IconButton
              sx={{
                color: "#565656",
                p: 0,
              }}
              onClick={handlePrevMonth}
            >
              <ArrowBackIosIcon sx={{ width: 18, height: 20 }} />
            </IconButton>
            <Typography
              width={{ lg: 205, md: 205, sm: 155, xs: 105 }}
              align="center"
              color="#474747"
              pt={1}
              fontWeight={500}
              fontSize={{ lg: 24, md: 24, sm: 20, xs: 18 }}
              gutterBottom
            >
              {currentDate.format("MMMM YYYY")}
            </Typography>
            <IconButton
              sx={{ color: "#565656", p: 0 }}
              onClick={handleNextMonth}
            >
              <ArrowForwardIosIcon sx={{ width: 18, height: 20 }} />
            </IconButton>
          </Stack>
          <Stack
            width={{ lg: 136, md: 136, sm: 106, xs: 76 }}
            direction="row"
            border="0.6px solid #D5D5D5"
            borderRadius="15px"
            // ml={2}
          >
            <Button
              sx={{
                width: { lg: 68, md: 68, ms: 48, xs: 48 },
                height: { lg: 40, md: 40, ms: 30, xs: 30 },
                fontSize: { lg: 14, md: 14, sm: 10, xs: 10 },

                color: "#202224",
                fontWeight: 500,
                textTransform: "revert",
                border: "0",
                borderTopRightRadius: "0 ",
                borderBottomRightRadius: "0 ",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",

                ...(viewMode === "week"
                  ? {
                      background: "#2F6FD0",
                      color: "#fff",
                      "&:hover": { background: "#809c85" },
                    }
                  : { background: "#fff" }),
              }}
              onClick={() => setViewMode("week")}
            >
              Hepde
            </Button>
            <Button
              sx={{
                width: { lg: 68, md: 68, ms: 48, xs: 48 },
                height: { lg: 40, md: 40, ms: 30, xs: 30 },
                fontSize: { lg: 14, md: 14, sm: 10, xs: 10 },

                // height: "40px",
                color: "#202224",
                fontWeight: 500,
                textTransform: "revert",
                borderRadius: "0",
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px ",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",

                ...(viewMode == "month"
                  ? {
                      background: "#2F6FD0",
                      color: "#fff",
                      "&:hover": { background: "#809c85" },
                      borderRadius: "0px",
                    }
                  : { background: "#fff" }),
              }}
              onClick={() => setViewMode("month")}
            >
              Aý
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {renderCalendar()}
    </Stack>
  );
};

export default CustomCalendar;


