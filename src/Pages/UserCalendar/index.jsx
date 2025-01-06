import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grow,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Capitalize, style, style2 } from "../../Components/utils";
import Calendar from "./components/Calendar";
import {
  deleteUserNote,
  getAdminNoteForProject,
  getAdminNotes,
  getUserDayWorkTime,
  getUserMonthWorkTime,
  getUserNoteForProject,
  noteUpdate,
  postComeTime,
  postLeaveTime,
  postNote,
} from "../../Components/db/Redux/api/ComeTimeSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import moment from "moment";
import "moment/locale/tk";
import deleteIcon from "../../../public/images/Delete.png";
import mark from "../../../public/images/mark.png";
import checked from "../../../public/images/checked.png";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import ModeratorModal from "./components/ModeratorModal";
import {
  deleteHoliday,
  getHolidays,
} from "../../Components/db/Redux/api/HolidaySlice";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import ModeratorModalUpdate from "./components/ModeratorModalUpdate";

const index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showHolidays, setShowHolidays] = useState(() =>
    JSON.parse(localStorage.getItem("holidayShown") || true)
  );
  const [moderatorModalOpen, setModeratorModalOpen] = useState(false);
  const [modalOpenNoteUpdate, setModalOpenNoteUpdate] = useState(false);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#7551E9");
  const [selectedDay, setSelectedDay] = useState(null);
  const [event, setEvent] = useState({});
  const [eventText, setEventText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [users, setUsers] = useState([]);
  const [noteID, setNoteId] = useState();
  const [update, setUpdate] = useState();
  const [updateHoliday, setUpdateHoliday] = useState();
  const [updateHolidayModal, setUpdateHolidayModal] = useState();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const data = useSelector((state) => state.getWorkDate.data);
  const statusMonth = useSelector((state) => state.getWorkDate.statusMonth);

  const holiday = useSelector((state) => state.holidays.data.data);
  const statusHoliday = useSelector((state) => state.holidays.status);
  const errorHoliday = useSelector((state) => state.holidays.error);

  useEffect(() => {
    const body = {
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
    };
    if (startDate !== "" && endDate !== "") {
      dispatch(getHolidays(body));
    }
  }, [startDate, endDate, dispatch]);

  const monthWorkData = useSelector(
    (state) => state.getWorkDate.employeerTime.employeerTime
  );

  const adminNotes = useSelector((state) => state.getWorkDate.adminNotes);
  const adminNotesForProject = useSelector(
    (state) => state.getWorkDate.adminNote
  );

  const adminNoteStatus = useSelector(
    (state) => state.getWorkDate.statusAdminNote
  );

  const status = useSelector((state) => state.getWorkDate.status);

  moment.locale("tk");

  useEffect(() => {
    const color = [
      { color: "#7551E9", id: 1 },
      { color: "#E951BF", id: 2 },
      { color: "#FF9E58", id: 3 },
      { color: "#9FC2A5", id: 4 },
    ];
    setColors(color);
  }, []);
  const handleDayWorkTime = (day) => {
    console.log(day);

    const body = {
      userId: user.id,
      date: day,
    };
    if (moment(day).isAfter(moment(), "day")) {
      return;
    } else {
      dispatch(getUserDayWorkTime(body));
    }
  };
  const filteredData = data.filter((item) => item.leaveTime === null);

  useEffect(() => {
    const body = {
      userId: user.id,
      date: moment(startDate).add(13, "days").format("YYYY-MM-DD"),
    };
    startDate !== "" ? dispatch(getUserMonthWorkTime(body)) : "";
  }, [startDate, dispatch]);

  useEffect(() => {
    const body = {
      startDate: startDate,
      endDate: endDate,
      userId: user.id,
    };
    if (body.startDate || body.endDate !== "") {
      dispatch(getAdminNotes(body));
      dispatch(getUserNoteForProject(user.id));
    }
  }, [startDate, endDate, dispatch]);

  const groupedByDate =
    statusMonth === "succeeded" &&
    monthWorkData.reduce((acc, item) => {
      if (item.note !== null) {
        const date = moment(item.comeTime).format("YYYY-MM-DD");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
      }
      return acc;
    }, {});

  const groupedByDatee =
    adminNoteStatus === "succeeded" &&
    adminNotes.reduce((acc, item) => {
      if (item.note !== null) {
        const date = moment(item.date, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD");
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
      }
      return acc;
    }, {});

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const handleClose = () => {
    setModalOpenNoteUpdate(false);
    setModalOpen(false);
    setUsers([]);
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setModalOpen(true);
    handleDayWorkTime(day);
  };

  const handleAddCameTime = () => {
    const body = {
      userId: user.id,
      comeStatus: true,
      userGetTime: {
        id: user.id,
        date: selectedDay,
      },
    };
    dispatch(postComeTime(body));
  };
  const handleAddLeaveTime = () => {
    const body = {
      userId: user.id,
      leaveStatus: true,
      userGetTime: {
        id: user.id,
        date: selectedDay,
      },
    };
    dispatch(postLeaveTime(body));
  };
  const filteredByDate =
    statusMonth === "succeeded"
      ? monthWorkData.filter((item) => {
          return item.note !== null;
        })
      : [];

  const handleAddNote = () => {
    const body = {
      id: data[data.length - 1].id,
      note: eventText,
      color: selectedColor,
      userGetTime: {
        id: user.id,
        date: selectedDay,
      },
    };
    eventText !== "" && dispatch(postNote(body));
    setEventText("");
  };

  const handleUpdateNote = () => {
    const body = {
      id: update.id,
      note: eventText,
      color: selectedColor,
      userGetTime: {
        id: user.id,
        date: selectedDay,
      },
    };
    eventText !== ""
      ? dispatch(noteUpdate(body))
      : toast.error("Maglumatlary giriziň!");
    setEventText("");
  };
  const handleEventSave = (e) => {
    e.preventDefault();
    if (selectedDay) {
      const dateKey = selectedDay;

      const newEvent = {
        text: eventText,
        color: selectedColor,
      };
      setEvent(newEvent);
      handleAddNote();
      setModalOpen(false);
    }
  };
  const handleEventUpdate = () => {
    handleUpdateNote();
    setEvent({
      text: eventText,
      color: selectedColor,
    });
    setModalOpenNoteUpdate(false);
  };
  const handleUpdateNoteForProject = (item) => {
    setEventText(item.note);
    setUpdate(item);
    setModalOpenNoteUpdate(true);
    setNoteId(item.id);
  };
  const handleDeleteNoteForProject = (id) => {
    const body = {
      id: id,
      userId: user.id,
      date: moment(startDate).add(13, "days").format("YYYY-MM-DD"),
    };
    if (body.id && body.userId) {
      dispatch(deleteUserNote(body));
    }
  };
  const handleDeleteHoliday = (id) => {
    const body = {
      id: id,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
    };
    if (body.id) {
      dispatch(deleteHoliday(body));
    }
  };
  const handleUpdateHoliday = (data) => {
    setUpdateHoliday(data);
    setUpdateHolidayModal(true);
  };
  return (
    <Box backgroundColor="#fff">
      <Stack
        direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
        mt="10px"
        justifyContent="space-around"
        flexDirection={{
          xs: "column-reverse",
          lg: "row",
          md: "row",
          sm: "column",
        }}
      >
        <Stack
          mt={1}
          direction="column"
          width={{ lg: "28%", md: "28%", sm: "100%", xs: "100%" }}
          height="88vh"
        >
          <Stack
            backgroundColor="#fff"
            spacing={2}
            width="90%"
            borderRadius="20px"
            m="0px 20px "
            boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
            fontFamily="Montserrat"
            mb="14px"
            sx={{
              display: "flex",
              minHeight: "200px",
              maxHeight: "35%",
            }}
            className="notes"
            overflow="auto"
          >
            <Stack maxHeight="100%">
              <Stack direction="row">
                <Typography
                  textAlign="start"
                  fontWeight={600}
                  color="#DC6262"
                  fontSize={15}
                  mb="10px"
                  p="18px 20px 0 14px"
                >
                  Admindan bellik
                </Typography>
              </Stack>
              <ModeratorModal
                open={moderatorModalOpen}
                handleClose={() => setModeratorModalOpen(false)}
                startDate={startDate}
                endDate={endDate}
              />
              <ModeratorModalUpdate
                open={updateHolidayModal}
                handleClose={() => setUpdateHolidayModal(false)}
                holidayData={updateHoliday}
                startDate={startDate}
                endDate={endDate}
              />

              <Stack>
                {adminNoteStatus === "loading..." ? (
                  <Stack
                    direction="column"
                    height="10%"
                    alignItems="center"
                    sx={{ gap: "10px", mt: "10px" }}
                  >
                    <CircularProgress />
                    Loading...
                  </Stack>
                ) : adminNoteStatus === "failed" ? (
                  <Typography
                    textAlign="center"
                    color="tomato"
                    height="33%"
                    mt={4}
                  >
                    Ýalňyşlyk!
                  </Typography>
                ) : adminNoteStatus === "succeeded" ? (
                  adminNotes.length == 0 && adminNotesForProject.length == 0 ? (
                    <Typography pt={4} textAlign="center">
                      Bellik ýok
                    </Typography>
                  ) : (
                    adminNotes.map((dateKey) => (
                      <Stack key={dateKey.id}>
                        <Divider sx={{ width: "100%" }} />

                        <Stack
                          sx={{
                            padding: "3px",
                            borderRadius: "5px",
                          }}
                          direction="row"
                          alignItems="center"
                          gap="5px"
                        >
                          <Stack borderRadius="100%" width={26} height={26}>
                            <img src={mark} alt="" />
                          </Stack>
                          <Stack direction="column">
                            <Typography
                              color="#202224"
                              fontSize={15}
                              fontWeight={600}
                            >
                              {Capitalize(dateKey.title)}
                            </Typography>
                            <Typography
                              color="#797a7c"
                              fontSize={14}
                              fontWeight={500}
                            >
                              {moment(dateKey.date).format("DD.MM.YYYY HH:mm")}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    ))
                  )
                ) : (
                  ""
                )}
              </Stack>
              <Stack>
                {adminNotesForProject.map((dateKey) => (
                  <Stack key={dateKey.id}>
                    <Divider sx={{ width: "100%" }} />
                    <Stack
                      key={dateKey.id}
                      sx={{
                        padding: "10px",
                        borderRadius: "5px",
                        margin: "5px 0",
                      }}
                      direction="row"
                      alignItems="center"
                      gap="5px"
                      mb="20px"
                    >
                      <Stack borderRadius="100%" width={26} height={26}>
                        <img src={checked} alt="" />
                      </Stack>
                      <Stack direction="column">
                        <Typography
                          color="#202224"
                          fontSize={15}
                          fontWeight={600}
                        >
                          {Capitalize(dateKey.content)}
                        </Typography>
                        <Typography
                          color="#797a7c"
                          fontSize={14}
                          fontWeight={500}
                        >
                          {moment(dateKey.createdAt).format("DD.MM.YYYY HH:mm")}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            backgroundColor="#fff"
            spacing="10px"
            width="90%"
            sx={{
              height: "100%",
            }}
            borderRadius="20px"
            alignItems="center"
            m="0px 20px "
            p="20px 10px"
            boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
            fontFamily="Montserrat"
            overflow="auto"
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  color: "#474747",
                  textTransform: "revert",
                  fontSize: 14,
                  width: "100%",
                  height: "45px",
                  ...(showHolidays == true
                    ? {
                        bgcolor: "#2F6FD0",
                        color: "#fff",
                        "&:hover": { bgcolor: "#2F6FD0", color: "#fff" },
                      }
                    : {
                        bgcolor: "#fff",
                        color: "#474747",
                        "&:hover": { bgcolor: "#fff", color: "#474747" },
                      }),
                }}
                onClick={() => {
                  setShowHolidays(true);
                  localStorage.setItem("holidayShown", JSON.stringify(true));
                }}
              >
                Ýetişik bellikleri
              </Button>
              <Button
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  color: "#474747",
                  textTransform: "revert",
                  fontSize: 14,
                  width: "90%",
                  height: "45px",
                  "&:hover": { bgcolor: "#fff", color: "#474747" },

                  ...(showHolidays == false
                    ? {
                        bgcolor: "#2F6FD0",
                        color: "#fff",
                        "&:hover": { bgcolor: "#2F6FD0", color: "#fff" },
                      }
                    : { bgcolor: "#fff", color: "#474747" }),
                }}
                onClick={() => {
                  setShowHolidays(false);
                  localStorage.setItem("holidayShown", JSON.stringify(false));
                }}
              >
                Baýramçylyklar
              </Button>
            </Stack>
            <Divider sx={{ width: "100%" }} />

            {showHolidays == true ? (
              statusMonth === "loading..." ||
              adminNoteStatus === "loading..." ? (
                <Stack
                  direction="column"
                  height="100%"
                  alignItems="center"
                  sx={{ gap: "10px", mt: "60px" }}
                >
                  <CircularProgress />
                  Loading...
                </Stack>
              ) : statusMonth === "failed" || adminNoteStatus === "failed" ? (
                <Typography
                  textAlign="center"
                  color="tomato"
                  height="43%"
                  mt={4}
                >
                  Ýalňyşlyk!
                </Typography>
              ) : statusMonth === "succeeded" ||
                adminNoteStatus === "succeeded" ? (
                filteredByDate.length === 0 || filteredByDate === undefined ? (
                  <Typography pt={4}>Bellik ýok</Typography>
                ) : (
                  <Grow
                    in={showHolidays == true}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(checked ? { timeout: 500 } : {})}
                  >
                    <Stack
                      p="6px"
                      height="100%"
                      width="100%"
                      className="times"
                      overflow="scroll"
                    >
                      <Stack>
                        {Object.keys(groupedByDate).map((item, index) => (
                          <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Stack
                                alignItems="center"
                                direction="row"
                                justifyContent="space-between"
                                width="100%"
                              >
                                <Typography
                                  color="#202224"
                                  fontFamily="Montserrat"
                                  fontSize={15}
                                  fontWeight={600}
                                >
                                  {moment(item).format("DD.MM.YYYY")}
                                </Typography>
                                <Stack
                                  width={30}
                                  height={30}
                                  backgroundColor="#90BAEB"
                                  color="#fff"
                                  alignItems="center"
                                  justifyContent="center"
                                  fontFamily="Montserrat"
                                  borderRadius="100%"
                                >
                                  {groupedByDate[item].length}
                                </Stack>
                              </Stack>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                              {groupedByDate[item].map((dateKey) => (
                                <Stack key={dateKey.id}>
                                  <Stack
                                    sx={{
                                      padding: "6px",
                                      borderRadius: "5px",
                                      margin: "5px 0",
                                    }}
                                    direction="row"
                                    alignItems="center"
                                    gap="15px"
                                    mb="20px"
                                  >
                                    <Stack
                                      borderRadius="100%"
                                      width={38}
                                      height={38}
                                      backgroundColor={dateKey.color}
                                    ></Stack>
                                    <Stack direction="column">
                                      <Typography
                                        color="#202224"
                                        fontSize={15}
                                        fontWeight={600}
                                      >
                                        {Capitalize(dateKey.note)}
                                      </Typography>
                                      <Typography
                                        color="#797a7c"
                                        fontSize={14}
                                        fontWeight={500}
                                      >
                                        {moment(dateKey.comeTime).format(
                                          "DD.MM.YYYY HH:mm"
                                        )}
                                      </Typography>
                                    </Stack>
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      sx={{
                                        ...(moment().isSame(
                                          dateKey.comeTime,
                                          "day"
                                        )
                                          ? {
                                              display: "flex",
                                            }
                                          : {
                                              display: "none",
                                            }),
                                      }}
                                    >
                                      <IconButton
                                        onClick={() =>
                                          handleUpdateNoteForProject(dateKey)
                                        }
                                        sx={{ mr: -1 }}
                                      >
                                        <CreateIcon sx={{ color: "#9FC2A6" }} />
                                      </IconButton>
                                      <IconButton
                                        onClick={() =>
                                          handleDeleteNoteForProject(dateKey.id)
                                        }
                                      >
                                        <img
                                          style={{ width: 24, height: 24 }}
                                          src={deleteIcon}
                                          alt=""
                                        />
                                      </IconButton>
                                    </Stack>
                                  </Stack>
                                  <Divider sx={{ width: "100%" }} />
                                </Stack>
                              ))}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </Stack>
                    </Stack>
                  </Grow>
                )
              ) : (
                ""
              )
            ) : (
              <Stack width="100%">
                <Button
                  variant="outlined"
                  sx={{
                    ...(user.role == "USER" && { display: "none" }),
                    width: "100%",
                    textTransform: "revert",
                    // height:
                    mt: 1,
                    border: "0.5px solid green",
                    color: "green",
                    "&:hover": {
                      border: "0.5px solid green",
                    },
                  }}
                  onClick={() => setModeratorModalOpen(true)}
                >
                  <AddIcon
                    sx={{
                      color: "green",
                      width: 25,
                      height: 25,
                      mr: 2,
                    }}
                  />
                  Baýramçylyk güni goşmak
                </Button>
                <Stack>
                  {statusHoliday === "loading..." ? (
                    <Stack
                      direction="column"
                      height="100%"
                      alignItems="center"
                      sx={{ gap: "10px", mt: "60px" }}
                    >
                      <CircularProgress />
                      Loading...
                    </Stack>
                  ) : statusHoliday === "failed" ? (
                    <Typography
                      textAlign="center"
                      color="tomato"
                      height="43%"
                      mt={4}
                    >
                      Ýalňyşlyk!
                    </Typography>
                  ) : statusHoliday === "succeeded" ? (
                    !holiday.length ? (
                      <Typography pt={4} textAlign="center">
                        Baýramçylyk ýok
                      </Typography>
                    ) : (
                      holiday.map((item) => (
                        <Grow in={showHolidays == false}>
                          <Stack
                            sx={{
                              padding: "6px",
                              borderRadius: "5px",
                              margin: "5px 0",
                            }}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            gap="15px"
                            mb="20px"
                          >
                            <Stack
                              direction="row"
                              gap="15px"
                              alignItems="center"
                            >
                              <Stack
                                borderRadius="100%"
                                width={38}
                                height={38}
                                backgroundColor={item.color}
                              ></Stack>
                              <Stack direction="column">
                                <Typography
                                  color="#202224"
                                  fontSize={15}
                                  fontWeight={600}
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  color="#797a7c"
                                  fontSize={14}
                                  fontWeight={500}
                                >
                                  {moment(item.date).format("DD.MM.YYYY")}
                                </Typography>
                              </Stack>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              sx={{
                                ...(moment().isSame(item.comeTime, "day") &&
                                user.role !== "USER"
                                  ? {
                                      display: "flex",
                                    }
                                  : {
                                      display: "none",
                                    }),
                              }}
                            >
                              <IconButton
                                onClick={() => handleUpdateHoliday(item)}
                                sx={{ mr: -1 }}
                              >
                                <CreateIcon sx={{ color: "#9FC2A6" }} />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteHoliday(item.id)}
                              >
                                <img
                                  style={{ width: 24, height: 24 }}
                                  src={deleteIcon}
                                  alt=""
                                />
                              </IconButton>
                            </Stack>
                          </Stack>
                        </Grow>
                      ))
                    )
                  ) : (
                    ""
                  )}
                </Stack>
              </Stack>
            )}

            {moment(selectedDay).isAfter(moment(), "day") ? (
              ""
            ) : (
              <Modal
                closeAfterTransition
                open={modalOpen}
                onClose={handleClose}
                BackdropProps={{
                  style: {
                    backgroundColor: "#7F7F7F",
                    opacity: "0.2",
                  },
                }}
                disableAutoFocus
              >
                <Grow
                  in={modalOpen}
                  style={{ transformOrigin: "1 0 0" }}
                  {...(checked ? { timeout: 500 } : {})}
                >
                  <Box sx={style} height="605px">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        ...(moment().isSame(selectedDay, "day")
                          ? {
                              marginBottom: "0px",
                            }
                          : {
                              marginBottom: "85px",
                            }),
                      }}
                    >
                      <Typography
                        textAlign="end"
                        fontFamily="Montserrat"
                        fontSize={32}
                        width="70%"
                        color="#474747"
                        fontWeight={500}
                      >
                        {moment(selectedDay).format("DD.MM.YYYY")}
                      </Typography>
                      <IconButton onClick={handleClose}>
                        <CloseIcon
                          sx={{
                            width: 38,
                            height: 38,
                            color: "#DC6262",
                          }}
                        />
                      </IconButton>
                    </Stack>
                    <Stack
                      alignItems="center"
                      direction="row"
                      justifyContent="center"
                      spacing="20px"
                      pt="10px"
                      pb="10px"
                      sx={{
                        ...(moment().isSame(selectedDay, "day")
                          ? {
                              display: "flex",
                            }
                          : {
                              display: "none",
                            }),
                      }}
                    >
                      <Button
                        disabled={filteredData.length > 0}
                        sx={{
                          ...(filteredData.length == 0
                            ? { backgroundColor: "#9FC2A5", color: "#fff" }
                            : { backgroundColor: "#F5F6FA", color: "#474747" }),
                          textTransform: "revert",
                          fontFamily: "Montserrat",
                          fontSize: 18,
                          fontWeight: 600,
                          width: 185,
                          border: "1px solid #D5D5D5",
                          borderRadius: "50px",
                          height: 55,
                          "&:hover": { background: "#78a880" },
                        }}
                        onClick={handleAddCameTime}
                      >
                        Geldim
                      </Button>
                      <Button
                        disabled={filteredData.length == 0}
                        sx={{
                          ...(filteredData.length > 0
                            ? {
                                backgroundColor: "#9FC2A5",
                                color: "#fff",
                                "&:hover": { background: "#9FC2A5" },
                              }
                            : {
                                backgroundColor: "#F5F6FA",
                                color: "#474747",
                                "&:hover": { background: "#F5F6FA" },
                              }),
                          textTransform: "revert",
                          fontFamily: "Montserrat",
                          fontSize: 18,
                          fontWeight: 600,
                          width: 185,
                          borderRadius: "50px",
                          border: "1px solid #D5D5D5",
                          height: 55,

                          // "&:hover": { background: "#78a880" },
                        }}
                        onClick={handleAddLeaveTime}
                      >
                        Gitdim
                      </Button>
                    </Stack>

                    {status === "loading..." ? (
                      <Stack
                        direction="column"
                        height="100%"
                        alignItems="center"
                        sx={{ gap: "10px", mt: "20px" }}
                      >
                        <CircularProgress />
                        Loading...
                      </Stack>
                    ) : status === "failed" ? (
                      <Typography
                        textAlign="center"
                        sx={{
                          ...(moment().isSame(selectedDay, "day")
                            ? { height: "28%" }
                            : { height: "36%" }),
                        }}
                        mt={4}
                        fontSize={35}
                      >
                        Maglumat ýok
                      </Typography>
                    ) : status === "succeeded" ? (
                      data.length === 0 ? (
                        <Typography
                          mt={4}
                          textAlign="center"
                          sx={{
                            ...(moment().isSame(selectedDay, "day")
                              ? { height: "35%" }
                              : { height: "36%" }),
                          }}
                          fontSize={35}
                        >
                          Maglumat ýok
                        </Typography>
                      ) : (
                        <Stack
                          // p="6px"
                          sx={{
                            ...(moment().isSame(selectedDay, "day")
                              ? {
                                  minHeight: "42%",
                                  maxHeight: "28%",
                                }
                              : {
                                  // mt: -7,
                                  height: "70%",
                                }),
                          }}
                          className="times"
                          overflow="scroll"
                        >
                          <Stack
                            spacing="10px"
                            direction="row"
                            justifyContent="space-between"
                            p="0 10px 20px 30px"
                            width="100%"
                            position="sticky"
                            top="0"
                            backgroundColor="#fff"
                          >
                            <Typography
                              fontWeight={500}
                              fontFamily="Montserrat"
                              color="#474747"
                              fontSize={{ lg: 15, md: 15, sm: 13, xs: 12 }}
                              textAlign="center"
                            >
                              Gelen wagty
                            </Typography>
                            <Typography
                              fontWeight={500}
                              fontFamily="Montserrat"
                              color="#474747"
                              textAlign="center"
                              fontSize={{ lg: 15, md: 15, sm: 13, xs: 12 }}
                            >
                              Giden wagty
                            </Typography>
                            <Typography
                              fontWeight={500}
                              fontFamily="Montserrat"
                              color="#474747"
                              textAlign="center"
                              fontSize={{ lg: 15, md: 15, sm: 13, xs: 12 }}
                            >
                              Işlän sagady
                            </Typography>
                          </Stack>
                          <Stack
                            direction="column"
                            key={index}
                            width="100%"
                            spacing="10px"
                            // height="10%"
                          >
                            {data.map((item, index) => (
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={1}
                              >
                                <Typography
                                  fontFamily="Montserrat"
                                  color="#000"
                                  textAlign="center"
                                  fontSize={15}
                                >
                                  {index + 1}
                                </Typography>
                                <Stack
                                  width="100%"
                                  spacing="5px"
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  border="1px solid #d5d5d5"
                                  p="0 40px"
                                  borderRadius="50px"
                                  backgroundColor="#F8F9FA"
                                >
                                  <Stack
                                    height={25}
                                    color="#A6A6A6"
                                    fontSize={15}
                                    fontWeight={400}
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    direction="row"
                                  >
                                    <Typography
                                      fontFamily="Montserrat"
                                      color="#A6A6A6"
                                      textAlign="center"
                                      fontSize={15}
                                    >
                                      {moment(item.comeTime).format("HH:mm")}
                                    </Typography>
                                  </Stack>
                                  <Stack
                                    height={35}
                                    color="#A6A6A6"
                                    fontSize={15}
                                    fontWeight={400}
                                    alignItems="start"
                                    justifyContent="center"
                                  >
                                    {item.leaveTime != null
                                      ? moment(item.leaveTime).format("HH:mm")
                                      : ""}
                                  </Stack>
                                  <Stack
                                    height={25}
                                    fontSize={15}
                                    fontWeight={400}
                                    alignItems="start"
                                    color="#A6A6A6"
                                    justifyContent="center"
                                  >
                                    {item.comeTime && item.leaveTime
                                      ? moment
                                          .duration(
                                            moment(item.leaveTime).diff(
                                              moment(item.comeTime)
                                            )
                                          )
                                          .hours() +
                                        ":" +
                                        moment
                                          .duration(
                                            moment(item.leaveTime).diff(
                                              moment(item.comeTime)
                                            )
                                          )
                                          .minutes()
                                      : ""}
                                  </Stack>
                                </Stack>
                              </Stack>
                            ))}
                          </Stack>
                        </Stack>
                      )
                    ) : (
                      ""
                    )}
                    <Stack
                      direction="column"
                      sx={{
                        ...(moment().isSame(selectedDay, "day")
                          ? {
                              display: "flex",
                            }
                          : {
                              display: "none",
                            }),
                      }}
                    >
                      <form onSubmit={handleEventSave}>
                        <Stack spacing="10px" width="100%">
                          <Typography
                            fontWeight={500}
                            fontFamily="Montserrat"
                            color="#474747"
                            fontSize={15}
                            mb="9px"
                          >
                            Bellik
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            label="Text"
                            type="text"
                            variant="outlined"
                            value={eventText}
                            autoComplete="off"
                            name="eventText"
                            onChange={(e) => setEventText(e.target.value)}
                            sx={{
                              fontFamily: "Montserrat",
                              "& .MuiOutlinedInput-root": {
                                height: "60px",
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
                        <Stack direction="row" alignItems="center">
                          <Stack spacing="10px" width="100%" pt="8px">
                            <Typography
                              fontWeight={500}
                              fontFamily="Montserrat"
                              color="#474747"
                              fontSize={15}
                            >
                              Bellik reňkini saýla
                            </Typography>

                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              width="100%"
                            >
                              <Stack
                                direction="row"
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
                                    {selectedColor === item.color ? (
                                      <CheckIcon />
                                    ) : (
                                      ""
                                    )}
                                  </Stack>
                                ))}
                              </Stack>
                              <Button
                                sx={{
                                  backgroundColor: "#F5F6FA",
                                  color: "#474747",
                                  textTransform: "revert",
                                  fontFamily: "Montserrat",
                                  fontSize: 18,
                                  fontWeight: 600,
                                  width: { lg: 185, md: 185, sm: 155, xs: 135 },
                                  borderRadius: "50px",
                                  border: "1px solid #D5D5D5",
                                  height: 55,
                                  mt: { lg: -0.5, md: -0.5, sm: -1, xs: -1.5 },
                                  "&:hover": {
                                    background: "#78a880",
                                    color: "#F5F6FA",
                                  },
                                }}
                                type="submit"
                              >
                                Goşmak
                              </Button>
                            </Stack>
                          </Stack>{" "}
                        </Stack>
                      </form>
                    </Stack>
                  </Box>
                </Grow>
              </Modal>
            )}

            <Modal
              closeAfterTransition
              open={modalOpenNoteUpdate}
              onClose={handleClose}
              BackdropProps={{
                style: {
                  backgroundColor: "#7F7F7F",
                  opacity: "0.2",
                },
              }}
              disableAutoFocus
            >
              <Grow in={modalOpenNoteUpdate}>
                <Box sx={style2} height="565px">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <IconButton onClick={handleClose}>
                      <CloseIcon
                        sx={{
                          width: 38,
                          height: 38,
                          color: "#DC6262",
                        }}
                      />
                    </IconButton>
                    <Typography
                      textAlign="center"
                      fontFamily="Montserrat"
                      fontSize={32}
                      color="#474747"
                      fontWeight={500}
                    >
                      {update !== undefined
                        ? moment(update.comeTime).format("DD.MM.YYYY")
                        : ""}
                    </Typography>
                    <IconButton onClick={handleEventUpdate}>
                      <CheckIcon
                        sx={{
                          width: 38,
                          height: 38,
                          color: "#9FC2A5",
                        }}
                      />
                    </IconButton>
                  </Stack>

                  <Stack spacing="10px" width="100%" pt="10px">
                    <Typography
                      fontWeight={500}
                      fontFamily="Montserrat"
                      color="#474747"
                      fontSize={15}
                      mb="9px"
                    >
                      Bellik
                    </Typography>
                    <TextField
                      id="outlined-basic"
                      label="Text"
                      type="text"
                      variant="outlined"
                      value={eventText}
                      autoComplete="off"
                      name="username"
                      onChange={(e) => setEventText(e.target.value)}
                      sx={{
                        fontFamily: "Montserrat",
                        "& .MuiOutlinedInput-root": {
                          height: "60px",
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
                  <Stack spacing="10px" width="100%" pt="8px">
                    <Typography
                      fontWeight={500}
                      fontFamily="Montserrat"
                      color="#474747"
                      fontSize={15}
                    >
                      Bellik reňkini saýla
                    </Typography>

                    <Stack direction="row" spacing="9px">
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
                </Box>
              </Grow>
            </Modal>
          </Stack>
        </Stack>
        <Stack
          backgroundColor="#fff"
          spacing={4}
          width={{ lg: "68%", md: "68%", sm: "100%", xs: "100%" }}
          borderRadius="20px"
          m="0px 20px 0 0 "
          pb="10px"
          boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
        >
          <Calendar
            openModal={openModal}
            color={selectedColor}
            events={filteredByDate}
            setEvents={setEvent}
            setStartDate={(day) => setStartDate(day)}
            setEndDate={(day) => setEndDate(day)}
            holidays={holiday}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default index;
