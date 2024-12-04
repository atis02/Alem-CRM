import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  createTheme,
  Divider,
  Fade,
  Grow,
  IconButton,
  Modal,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  Capitalize,
  getRandomNumber,
  projects,
  RandomBgColor,
  style,
  style2,
  style3,
  user,
} from "../../Components/utils";
import Calendar from "./components/Calendar";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  adminNotesOfMonth,
  deleteAdminNote,
  deleteAdminNotes,
  getAdminNoteForProject,
  getAdminNotes,
  getUserDayWorkTime,
  getUserMonthWorkTime,
  postAdminNote,
  postAdminNotes,
  postComeTime,
  postLeaveTime,
  postNote,
  updateAdminNote,
  // updateAdminNote,
  updateAdminNotes,
} from "../../Components/db/Redux/api/ComeTimeSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/tk";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { toast } from "react-toastify";
import { getUsers } from "../../Components/db/Redux/api/UserSlice";
import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import {
  DatePicker,
  DateTimePicker,
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker,
  MobileTimePicker,
  TimeClock,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/tk";
import check from "../../../public/images/check.png";
import deleteIcon from "../../../public/images/Delete.png";
import { formToJSON } from "axios";
import { getProjects } from "../../Components/db/Redux/api/ProjectSlice";
import {
  deleteHoliday,
  getHolidays,
} from "../../Components/db/Redux/api/HolidaySlice";
import AddIcon from "@mui/icons-material/Add";
import ModeratorModalUpdate from "../UserCalendar/components/ModeratorModalUpdate";

const index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenNote, setModalOpenNote] = useState(false);
  const [modalOpenNoteUpdate, setModalOpenNoteUpdate] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#7551E9");
  const [selectedDay, setSelectedDay] = useState(null);
  const [event, setEvent] = useState({});
  const [eventText, setEventText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notify, setNotify] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState(null);
  const [dateNote, setDateNote] = useState(null);
  const [dateNote2, setDateNote2] = useState();
  const [dateHour, setDateHour] = useState();
  const [noteID, setNoteId] = useState();
  const [noteAdmin, setNoteAdmin] = useState();
  const [notificationAdmin, setNotificationAdmin] = useState();
  const [projectId, setProjectId] = useState("");
  const [updateHoliday, setUpdateHoliday] = useState();
  const [updateHolidayModal, setUpdateHolidayModal] = useState();
  dayjs.locale("tk");
  const holiday = useSelector((state) => state.holidays.data.data);
  const statusHoliday = useSelector((state) => state.holidays.status);
  const errorHoliday = useSelector((state) => state.holidays.error);

  const turkmenLocaleText = {
    // Customize any text that appears on the date or time pickers
    cancelButtonLabel: "Yza",
    clearButtonLabel: "Arassala",
    okButtonLabel: "Bolýar",
    todayButtonLabel: "Şu gün",
    selectTimeLabel: "Wagty saýlaň",
    // Add translations for any other labels if needed
  };
  const theme = createTheme({
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            // Target the specific Typography element
            "& .MuiTypography-overline": {
              display: "none",
            },
          },
        },
      },
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const body = {
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
    };
    if (startDate != "" && endDate != "") {
      dispatch(getHolidays(body));
    }
  }, [startDate, endDate, dispatch]);
  useEffect(() => {
    const labelElement = document.querySelector(".MuiTypography-overline");
    if (labelElement) {
      labelElement.textContent = "Your custom text"; // Replace with your desired text
    }
  }, []);
  const projects = useSelector((state) => state.project.data);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const adminNotes = useSelector((state) => state.getWorkDate.adminNotes);
  const adminNoteStatus = useSelector(
    (state) => state.getWorkDate.statusAdminNote
  );

  const statusUsers = useSelector((state) => state.users.status);
  const UsersData = useSelector((state) => state.users.data);

  const defaultSelectedUsers =
    notificationAdmin !== undefined
      ? notificationAdmin.WarningShares &&
        notificationAdmin.WarningShares.map((share) => ({
          userId: share.userId,
          name: share.User.name,
          surname: share.User.surname,
        }))
      : [];

  const filteredUsersData =
    statusUsers === "succeeded" &&
    UsersData.filter(
      (user) =>
        defaultSelectedUsers &&
        !defaultSelectedUsers.some((selected) => selected.userId === user.id)
    );
  const [selectedUser, setSelectedUser] = useState(defaultSelectedUsers);
  const [users, setUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const data = useSelector((state) => state.getWorkDate.data);
  const statusMonth = useSelector((state) => state.getWorkDate.statusMonth);

  const monthWorkData = useSelector(
    (state) => state.getWorkDate.employeerTime.employeerTime
  );

  const adminNotesForProject = useSelector(
    (state) => state.getWorkDate.adminNote
  );

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

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const body = {
      startDate: startDate,
      endDate: endDate,
    };
    if (body.startDate || body.endDate !== "") {
      dispatch(adminNotesOfMonth(body));
      dispatch(getAdminNoteForProject(user.id));
    }
  }, [startDate, endDate, dispatch]);

  const groupedByDatee =
    adminNoteStatus === "succeeded"
      ? adminNotes.reduce((acc, item) => {
          if (item.note !== null) {
            const date = moment(item.date).format("YYYY-MM-DD");
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(item);
          }
          return acc;
        }, {})
      : "";

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const handleClose = () => {
    setModalOpenNote(false);
    setModalOpen(false);
    setAdminModalOpen(false);
    setModalOpenNoteUpdate(false);
    setUsers([]);
    setNotify("");
    setUserId("");
    setDate();
    setDateNote(null);
    setSelectedDay(null);
    setDateHour();
    setUserId("");
    setProjectId("");
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setModalOpen(true);
  };
  const userIds =
    defaultSelectedUsers &&
    defaultSelectedUsers.map((user) => ({
      id: user.userId,
    }));
  const optionsWithSelectAll = [
    { id: "selectAll", name: "Ählisi", surname: "" },
    ...UsersData,
  ];
  const handleAddAdminNote = () => {
    const filteredUsers = users.map((item) => ({ id: item.id }));

    const body = {
      title: notify,
      date: moment(dateNote === null ? selectedDay : dateNote).format(
        "YYYY-MM-DD"
      ),
      //  moment(selectedDay).format("YYYY-MM-DD"),
      // date: dateNote,
      dateHour: dateHour,
      color: selectedColor,
      startDate: startDate,
      endDate: endDate,
      users: users,
    };

    if (
      notify !== "" &&
      (dateNote !== null || selectedDay) &&
      dateHour !== undefined
    ) {
      dispatch(postAdminNote(body));

      handleClose();
    } else {
      toast.error("Maglumatlary giriziň!");
    }
  };
  const handleAddAdminNoteSecond = () => {
    const body = {
      userId: userId,
      authorId: user.id,
      content: notify,
      project: projectId,
    };

    if (notify !== "" && userId !== "" && projectId !== "") {
      dispatch(postAdminNotes(body));

      handleClose();
    } else {
      toast.error("Maglumatlary giriziň!");
    }
  };

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

  const handleChangeStep2 = (e, newValues) => {
    if (newValues) {
      setSelectedUser(() => [
        ...newValues.map((user) => ({ id: user.id ? user.id : user.userId })),
      ]);
      setUsers(() => [
        ...newValues.map((user) => ({ id: user.id ? user.id : user.userId })),
      ]);

      setUserId(newValues.id);
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== newValues.id)
      );
    }
  };
  const handleChangeStep = (e, newValues) => {
    if (newValues.some((user) => user.id === "selectAll")) {
      // If "selectAll" is selected, set all users
      setUsers(UsersData);
    } else {
      // Otherwise, map over newValues and create the user objects with either 'id' or 'userId'
      setUsers(() => [
        ...newValues.map((user) => ({
          id: user.id ? user.id : user.userId,
          name: user.name,
          surname: user.surname,
        })),
      ]);

      // If you want to set a specific user ID, you can add it here
      // Assuming newValues is an array, you'd have to update how you handle `newValues.id`
      setUserId(newValues.length > 0 ? newValues[0].id : null); // Adjust to how you want to get the ID
    }
  };

  const handleDeleteUser = (id) => {
    const deleted = users.filter((elem) => elem.id !== id);
    return setUsers(deleted);
  };
  const handleDeleteNote = (id) => {
    const body = {
      id: id,
      startDate: startDate,
      endDate: endDate,
    };
    dispatch(deleteAdminNote(body));
  };
  const handleDeleteNoteForProject = (id) => {
    const body = {
      id: id,
      authorId: user.id,
    };
    dispatch(deleteAdminNotes(body));
  };
  const handleUpdateAdminNote = () => {
    const body = {
      id: noteID,
      title: notify,
      color: selectedColor,
      startDate: startDate,
      endDate: endDate,
    };
    if (notify !== "") {
      dispatch(updateAdminNote(body));
      setNotify("");
      setAdminModalOpen(false);
    }
  };

  const handleUpdateAdminNotes = () => {
    const body = {
      noteId: noteID,
      content: notify,
      date: moment(dateNote2 && dateNote2.date).format("YYYY-MM-DD"),
      dateHour: dateHour == undefined ? moment(date).format("HH:mm") : dateHour,
      startDate: startDate,
      endDate: endDate,
      authorId: user.id,
      users: users.length === 0 ? userIds : users,
      color: selectedColor,
    };

    if (
      notify !== "" &&
      (users.length !== 0 ||
        (defaultSelectedUsers && defaultSelectedUsers.length !== 0))
    ) {
      dispatch(updateAdminNotes(body));
      handleClose();
    } else {
      toast.error("Maglumatlary giriziň!");
    }
  };
  const handleUpdateNote = (item) => {
    setNotificationAdmin(item);
    setAdminModalOpen(true);
    setDate(item.date);
    setNotify(item.title);
    setNoteId(item.id);
  };

  const adminProjectNoteUpdate = () => {
    const body = {
      authorId: user.id,
      noteId: noteID,
      content: notify,
      projectId: projectId == "" ? noteAdmin.projectId : projectId,
      userId: userId == "" ? noteAdmin.userId : userId,
    };

    if (notify !== "") {
      dispatch(updateAdminNote(body));
      handleClose();
    } else {
      toast.error("Maglumatlary giriziň!");
    }
  };
  const handleUpdateNoteForProject = (item) => {
    setNoteAdmin(item);
    setModalOpenNoteUpdate(true);
    setNoteId(item.id);
    setNotify(item.content);
  };
  const handleUpdateHoliday = (data) => {
    setUpdateHoliday(data);
    setUpdateHolidayModal(true);
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
  return (
    <Box height="100vh" backgroundColor="#fff">
      <Stack direction="row" mt="10px" justifyContent="space-around">
        <Stack direction="column" width="28%">
          <Stack
            backgroundColor="#fff"
            spacing="10px"
            width="97%"
            sx={{
              height: "87.5vh",
            }}
            borderRadius="20px"
            alignItems="center"
            m="0px 10px "
            p="20px 10px 10px 20px"
            boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
            fontFamily="Montserrat"
          >
            <Button
              sx={{
                color: "#fff",
                background: "#DC6262",
                textTransform: "revert",
                width: "240px",
                minHeight: "45px",
                borderRadius: "10px",
                fontWeight: 600,
                "&:hover": { background: "#9FC2A5" },
              }}
              onClick={() => setModalOpen(true)}
            >
              <PriorityHighIcon /> Duýduryş goşmak
            </Button>
            <Button
              sx={{
                color: "#fff",
                background: "#90BAEB",
                textTransform: "revert",
                width: "240px",
                minHeight: "45px",

                borderRadius: "10px",
                "&:hover": { background: "#9FC2A5" },
                gap: "10px",
                fontWeight: 600,
              }}
              onClick={() => setModalOpenNote(true)}
            >
              <img style={{ width: 20, height: 20 }} src={check} alt="check" />{" "}
              Bellik goşmak
            </Button>

            {adminNoteStatus === "loading..." ||
            statusHoliday === "loading..." ? (
              <Stack
                direction="column"
                height="100%"
                alignItems="center"
                sx={{ gap: "10px", mt: "60px" }}
              >
                <CircularProgress />
                Loading...
              </Stack>
            ) : adminNoteStatus === "failed" || statusHoliday === "failed" ? (
              <Typography textAlign="center" color="tomato" height="43%" mt={4}>
                Ýalňyşlyk!
              </Typography>
            ) : adminNoteStatus === "succeeded" ||
              statusHoliday === "succeeded" ? (
              adminNotes.length === 0 &&
              adminNotesForProject.length == 0 &&
              !holiday.length ? (
                <Typography pt={4}>Bellik ýok</Typography>
              ) : (
                <Stack
                  p="6px"
                  height="100%"
                  width="100%"
                  className="times"
                  overflow="scroll"
                >
                  <Stack>
                    <Typography
                      textAlign="center "
                      fontWeight={600}
                      fontSize={15}
                      mb={1}
                    >
                      Duýduryşlar
                    </Typography>
                    <Divider sx={{ width: "100%", mb: 2 }} />

                    {Object.keys(groupedByDatee).length === 0 ? (
                      <Typography mb={3} textAlign="center">
                        Duýduryş ýok
                      </Typography>
                    ) : (
                      Object.keys(groupedByDatee).map((item, index) => (
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
                                {groupedByDatee[item].length}
                              </Stack>
                            </Stack>
                          </AccordionSummary>
                          <AccordionDetails sx={{ padding: 0 }}>
                            {groupedByDatee[item].map((dateKey) => (
                              <>
                                <Stack
                                  key={dateKey.id}
                                  sx={{
                                    padding: "10px",
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
                                    borderRadius="100%"
                                    minWidth={35}
                                    minHeight={35}
                                    backgroundColor={dateKey.color}
                                  ></Stack>
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
                                      {moment(
                                        dateKey.date
                                        // "DD.MM.YYYY  HH:mm"
                                      ).format("DD.MM.YYYY  HH:mm")}
                                    </Typography>
                                  </Stack>
                                  <Stack direction="row" alignItems="center">
                                    <IconButton
                                      onClick={() => handleUpdateNote(dateKey)}
                                      sx={{ mr: -1 }}
                                    >
                                      <CreateIcon sx={{ color: "#2F6FD0" }} />
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        handleDeleteNote(dateKey.id)
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
                              </>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                      ))
                    )}
                  </Stack>
                  <Stack>
                    <Typography
                      textAlign="center "
                      fontWeight={600}
                      fontSize={15}
                      mb={1}
                      mt={1}
                    >
                      Bellikler
                    </Typography>
                    <Divider sx={{ width: "100%", mb: 1 }} />
                    {adminNotesForProject.length == 0 ? (
                      <Typography mb={3} textAlign="center">
                        Bellik ýok
                      </Typography>
                    ) : (
                      adminNotesForProject.map((dateKey) => (
                        <>
                          <Stack
                            key={dateKey.id}
                            sx={{
                              borderRadius: "5px",
                            }}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            gap="5px"
                            mb="10px"
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap="5px"
                            >
                              <Stack borderRadius="100%" width={26} height={26}>
                                <LibraryAddCheckIcon
                                  sx={{ color: "#90BAEB" }}
                                />
                              </Stack>
                              <Stack direction="column">
                                <Typography
                                  color="#202224"
                                  fontSize={15}
                                  fontWeight={600}
                                  fontFamily="Montserrat"
                                >
                                  {Capitalize(dateKey.content)}
                                </Typography>
                                <Typography
                                  // color="#202224"
                                  fontSize={15}
                                  fontWeight={600}
                                  fontFamily="Montserrat"
                                  color="#90BAEB"
                                >
                                  {Capitalize(dateKey.projectId)}
                                </Typography>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={1}
                                  justifyContent="space-between"
                                >
                                  <Typography
                                    color="#797a7c"
                                    fontSize={15}
                                    fontWeight={500}
                                  >
                                    {UsersData.find(
                                      (user) => user.id === dateKey.userId
                                    )
                                      ? `${Capitalize(
                                          UsersData.find(
                                            (user) => user.id === dateKey.userId
                                          ).name
                                        )} ${Capitalize(
                                          UsersData.find(
                                            (user) => user.id === dateKey.userId
                                          ).surname
                                        )}`
                                      : ""}
                                  </Typography>
                                  <Typography
                                    color="#797a7c"
                                    fontSize={14}
                                    fontWeight={500}
                                  >
                                    {moment(dateKey.createdAt).format(
                                      "DD.MM.YYYY "
                                    )}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>

                            <Stack direction="row" alignItems="center">
                              <IconButton
                                onClick={() =>
                                  handleUpdateNoteForProject(dateKey)
                                }
                                sx={{ mr: -1 }}
                              >
                                <CreateIcon sx={{ color: "#2F6FD0" }} />
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
                        </>
                      ))
                    )}
                  </Stack>
                  <Stack>
                    <Typography
                      textAlign="center "
                      fontWeight={600}
                      fontSize={15}
                      mb={1}
                      mt={1}
                    >
                      Baýramçylyklar
                    </Typography>
                    <Divider sx={{ width: "100%", mb: 1 }} />
                    <Stack width="100%">
                      {/* <Button
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
                      </Button> */}

                      <Stack>
                        {!holiday.length ? (
                          <Typography mb={3} textAlign="center">
                            Baýramçylyk ýok
                          </Typography>
                        ) : (
                          holiday.map((item) => (
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
                                    fontSize={16}
                                    fontWeight={500}
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
                          ))
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              )
            ) : (
              ""
            )}
            <ModeratorModalUpdate
              open={updateHolidayModal}
              handleClose={() => setUpdateHolidayModal(false)}
              holidayData={updateHoliday}
              startDate={startDate}
              endDate={endDate}
            />
            <Modal
              closeAfterTransition
              open={modalOpenNote}
              onClose={handleClose}
              BackdropProps={{
                style: {
                  backgroundColor: "#7F7F7F",
                  opacity: "0.2",
                },
              }}
              disableAutoFocus
            >
              <Grow in={modalOpenNote}>
                <Box sx={style2}>
                  <Stack>
                    <Stack
                      sx={{
                        width: "100%",
                        height: 38,
                        justifyContent: "flex-end",
                        alignItems: "end",
                      }}
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
                    </Stack>
                  </Stack>
                  <Stack
                    mt="20px"
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography
                        fontSize={15}
                        fontWeight={600}
                        textAlign="start"
                        color="#474747"
                        mb="5px"
                      >
                        Proýekti saýla
                      </Typography>

                      <Autocomplete
                        id="combo-box-demo"
                        options={projects}
                        getOptionLabel={(option) =>
                          `${Capitalize(option.name)} `
                        }
                        onChange={(e, newValues) =>
                          setProjectId(newValues.name)
                        }
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "35px",
                                width: "100%",
                                backgroundColor: "#F5F6FA",
                              },
                            }}
                            {...params}
                            fullWidth
                            autoComplete="off"
                            placeholder="Adyny ýazyň ýa-da saýlaň"
                            variant="outlined"
                          />
                        )}
                      />
                    </Stack>
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography
                        fontSize={15}
                        fontWeight={600}
                        textAlign="start"
                        color="#474747"
                        mb="5px"
                      >
                        Işgärleri
                      </Typography>

                      <Autocomplete
                        id="combo-box-demo"
                        options={UsersData}
                        getOptionLabel={
                          (option) =>
                            `${Capitalize(option.name)} ${Capitalize(
                              option.surname == null ? "" : option.surname
                            )}`
                          // " " +
                          // `(${option.position.name})`
                        }
                        onChange={(e, newValues) => setUserId(newValues.id)}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "35px",
                                width: "100%",
                                backgroundColor: "#F5F6FA",
                              },
                            }}
                            {...params}
                            fullWidth
                            autoComplete="off"
                            placeholder="Adyny ýazyň ýa-da saýlaň"
                            variant="outlined"
                          />
                        )}
                      />
                    </Stack>
                  </Stack>
                  <Stack direction="column" justifyContent="space-beteen">
                    <Typography
                      fontSize={15}
                      fontWeight={600}
                      textAlign="start"
                      color="#474747"
                      mb="5px"
                    >
                      Bellik
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Tekst"
                      type="text"
                      name="Tekst"
                      onChange={(e) => setNotify(e.target.value)}
                      variant="outlined"
                      InputProps={{
                        sx: {
                          transition: "all ease-in-out 0.2s",
                          borderRadius: "35px",
                          backgroundColor: "#F5F6FA",
                          height: "55px",
                          color: "#000",
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    />
                    <Stack
                      width="100%"
                      mt="30px"
                      direction="row"
                      justifyContent="flex-end"
                      spacing="10px"
                    >
                      <Button
                        onClick={handleAddAdminNoteSecond}
                        sx={{
                          "&:disabled": { background: "lightgray" },
                          background: "#2F6FD0",
                          color: "#fff",
                          "&:hover": { background: "#2F6FD0" },
                          height: "40px",
                          width: "115px",
                          borderRadius: "50px",
                          textTransform: "revert",
                          fontSize: 16,
                        }}
                      >
                        Ibermek
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Grow>
            </Modal>
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
                <Box sx={style2}>
                  <Stack>
                    <Stack
                      sx={{
                        width: "100%",
                        height: 38,
                        justifyContent: "flex-end",
                        alignItems: "end",
                      }}
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
                    </Stack>
                  </Stack>
                  <Stack
                    mt="20px"
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography
                        fontSize={15}
                        fontWeight={600}
                        textAlign="start"
                        color="#474747"
                        mb="5px"
                      >
                        Proýekti saýla
                      </Typography>
                      <Autocomplete
                        id="combo-box-demo"
                        options={projects}
                        value={
                          projects.find(
                            (project) =>
                              project.name ===
                              (noteAdmin ? noteAdmin.projectId : "")
                          ) || null
                        }
                        // defaultValue={projectId}
                        // value={noteAdmin ? noteAdmin.projectId : []}
                        getOptionLabel={(option) =>
                          `${Capitalize(option.name)}`
                        }
                        onChange={(e, newValues) => {
                          if (newValues) {
                            setProjectId(newValues.name);
                          } else {
                            setProjectId("");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "35px",
                                width: "100%",
                                backgroundColor: "#F5F6FA",
                              },
                            }}
                            {...params}
                            fullWidth
                            autoComplete="off"
                            placeholder="Adyny ýazyň ýa-da saýlaň"
                            variant="outlined"
                          />
                        )}
                      />
                    </Stack>
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography
                        fontSize={15}
                        fontWeight={600}
                        textAlign="start"
                        color="#474747"
                        mb="5px"
                      >
                        Işgärler
                      </Typography>
                      <Autocomplete
                        id="combo-box-demo"
                        options={UsersData}
                        value={
                          UsersData.find(
                            (user) =>
                              user.id === (noteAdmin ? noteAdmin.userId : "")
                          ) || null
                        }
                        getOptionLabel={(option) =>
                          `${Capitalize(option.name)} ${Capitalize(
                            option.surname == null ? "" : option.surname
                          )}`
                        }
                        onChange={(e, newValues) => setUserId(newValues.id)}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "35px",
                                width: "100%",
                                backgroundColor: "#F5F6FA",
                              },
                            }}
                            {...params}
                            fullWidth
                            autoComplete="off"
                            placeholder="Adyny ýazyň ýa-da saýlaň"
                            variant="outlined"
                          />
                        )}
                      />
                    </Stack>
                  </Stack>
                  <Stack direction="column" justifyContent="space-beteen">
                    <Typography
                      fontSize={15}
                      fontWeight={600}
                      textAlign="start"
                      color="#474747"
                      mb="5px"
                    >
                      Bellik
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Tekst"
                      type="text"
                      name="Tekst"
                      value={notify}
                      onChange={(e) => setNotify(e.target.value)}
                      variant="outlined"
                      InputProps={{
                        sx: {
                          transition: "all ease-in-out 0.2s",
                          borderRadius: "35px",
                          backgroundColor: "#F5F6FA",
                          height: "55px",
                          color: "#000",
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    />
                    <Stack
                      width="100%"
                      mt="30px"
                      direction="row"
                      justifyContent="flex-end"
                      spacing="10px"
                    >
                      <Button
                        onClick={adminProjectNoteUpdate}
                        sx={{
                          "&:disabled": { background: "lightgray" },
                          background: "#2F6FD0",
                          color: "#fff",
                          "&:hover": { background: "#2F6FD0" },
                          height: "40px",
                          width: "115px",
                          borderRadius: "50px",
                          textTransform: "revert",
                          fontSize: 16,
                        }}
                      >
                        Ibermek
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Grow>
            </Modal>
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
              <Grow in={modalOpen}>
                {
                  <Box sx={style3}>
                    <Stack>
                      <Stack
                        sx={{
                          width: "100%",
                          height: 38,
                          justifyContent: "flex-end",
                          alignItems: "end",
                        }}
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
                      </Stack>
                      <Stack direction="column" justifyContent="space-beteen">
                        <Typography
                          fontSize={15}
                          fontWeight={600}
                          textAlign="start"
                          color="#474747"
                          mb="5px"
                        >
                          Duýduryş
                        </Typography>
                        <TextField
                          fullWidth
                          placeholder="Tekst"
                          type="text"
                          name="Tekst"
                          onChange={(e) => setNotify(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            sx: {
                              transition: "all ease-in-out 0.2s",
                              borderRadius: "35px",
                              backgroundColor: "#F5F6FA",
                              height: "55px",
                              color: "#000",
                              outline: "none",
                              boxShadow: "none",
                            },
                          }}
                        />
                      </Stack>
                      <Stack
                        mt="20px"
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Typography
                            fontSize={15}
                            fontWeight={600}
                            textAlign="start"
                            color="#474747"
                            mb="5px"
                          >
                            Işgärler
                          </Typography>

                          <Autocomplete
                            id="combo-box-demo"
                            multiple
                            value={users}
                            options={optionsWithSelectAll}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            getOptionLabel={(option) =>
                              `${Capitalize(option.name)} ${Capitalize(
                                option.surname == null ? "" : option.surname
                              )}`
                            }
                            onChange={handleChangeStep}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "35px",
                                    width: "100%",
                                    backgroundColor: "#F5F6FA",
                                  },
                                }}
                                {...params}
                                fullWidth
                                autoComplete="off"
                                placeholder="Adyny ýazyň ýa-da saýlaň"
                                variant="outlined"
                              />
                            )}
                          />
                        </Stack>
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
                            }}
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-beteen"
                              spacing="16px"
                            >
                              <Stack
                                width="100%"
                                direction="column"
                                justifyContent="space-between"
                              >
                                <Typography
                                  fontSize={15}
                                  fontWeight={600}
                                  textAlign="start"
                                  color="#474747"
                                  mb="5px"
                                >
                                  Senesi
                                </Typography>

                                <DatePicker
                                  disabled={dayjs(
                                    selectedDay,
                                    "YYYY-MM-DD"
                                  ).isValid()}
                                  value={
                                    dayjs(selectedDay, "YYYY-MM-DD").isValid()
                                      ? dayjs(selectedDay, "YYYY-MM-DD")
                                      : null
                                  }
                                  onChange={(newValue) => {
                                    if (newValue) {
                                      setDateNote(
                                        dayjs(newValue).format("YYYY-MM-DD")
                                      );
                                    } else {
                                      setDateNote(null);
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
                                width="100%"
                                direction="column"
                                justifyContent="space-between"
                              >
                                <Typography
                                  fontSize={15}
                                  fontWeight={600}
                                  textAlign="start"
                                  color="#474747"
                                  mb="5px"
                                >
                                  Wagty
                                </Typography>
                                <ThemeProvider theme={theme}>
                                  <MobileTimePicker
                                    ampm={false}
                                    onChange={(newValue) => {
                                      if (newValue) {
                                        setDateHour(newValue.format("HH:mm"));
                                      } else {
                                        setDateHour(null);
                                      }
                                    }}
                                    // <span class="MuiTypography-root MuiTypography-overline css-1hbyad5-MuiTypography-root" id=":rr:">Select time</span>
                                    DialogProps={{
                                      sx: {
                                        ".MuiTypography-root": {
                                          display: "none",
                                        },
                                      },
                                    }}
                                    format="HH:mm"
                                    slotProps={{
                                      textField: {
                                        size: "small",
                                        InputProps: {
                                          sx: {
                                            borderRadius: "35px",
                                            backgroundColor: "#F5F6FA",
                                            height: 55,
                                            width: "100%",
                                            border: "1px solid #ccc", // Ensure border is set
                                          },
                                        },
                                      },
                                    }}
                                  />
                                </ThemeProvider>
                              </Stack>
                            </Stack>
                          </DemoContainer>
                        </LocalizationProvider>
                      </Stack>
                      <Stack spacing="10px" mt="20px" pt="8px">
                        <Typography
                          fontSize={15}
                          fontWeight={600}
                          textAlign="start"
                          color="#474747"
                          mb="5px"
                        >
                          Bellik reňkini saýla
                        </Typography>

                        <Stack direction="row" spacing="9px">
                          {colors.map((item, index) => (
                            <Stack
                              key={index}
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
                              {selectedColor === item.color ? (
                                <CheckIcon />
                              ) : (
                                ""
                              )}
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                      <Stack
                        width="100%"
                        mt="30px"
                        direction="row"
                        justifyContent="flex-end"
                        spacing="10px"
                      >
                        <Button
                          onClick={handleAddAdminNote}
                          sx={{
                            "&:disabled": { background: "lightgray" },
                            background: "#2F6FD0",
                            color: "#fff",
                            "&:hover": { background: "#2F6FD0" },
                            height: "40px",
                            width: "115px",
                            borderRadius: "50px",
                            textTransform: "revert",
                            fontSize: 16,
                          }}
                        >
                          Ibermek
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                }
              </Grow>
            </Modal>
            <Modal
              closeAfterTransition
              open={adminModalOpen}
              onClose={handleClose}
              BackdropProps={{
                style: {
                  backgroundColor: "#7F7F7F",
                  opacity: "0.2",
                },
              }}
              disableAutoFocus
            >
              <Grow in={adminModalOpen}>
                {
                  <Box sx={style3} height="565px">
                    <Stack>
                      <Stack
                        sx={{
                          width: "100%",
                          height: 38,
                          justifyContent: "flex-end",
                          alignItems: "end",
                        }}
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
                      </Stack>
                      <Stack direction="column" justifyContent="space-beteen">
                        <Typography
                          fontSize={15}
                          fontWeight={600}
                          textAlign="start"
                          color="#474747"
                          mb="5px"
                        >
                          Duýduryş y
                        </Typography>
                        <TextField
                          fullWidth
                          value={notify}
                          placeholder="Tekst"
                          type="text"
                          name="Tekst"
                          onChange={(e) => setNotify(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            sx: {
                              transition: "all ease-in-out 0.2s",
                              borderRadius: "35px",
                              backgroundColor: "#F5F6FA",
                              height: "55px",
                              color: "#000",
                              outline: "none",
                              boxShadow: "none",
                            },
                          }}
                        />
                      </Stack>
                      <Stack direction="column" mt={2} width="100%">
                        <Typography
                          fontSize={15}
                          fontWeight={600}
                          textAlign="start"
                          color="#474747"
                          mb="5px"
                        >
                          Işgärler
                        </Typography>

                        <Autocomplete
                          id="combo-box-demo"
                          options={filteredUsersData}
                          multiple
                          defaultValue={defaultSelectedUsers}
                          filterSelectedOptions
                          getOptionLabel={(option) =>
                            `${Capitalize(option.name)} ${Capitalize(
                              option.surname == null ? "" : option.surname
                            )}`
                          }
                          onChange={handleChangeStep}
                          sx={{
                            width: "100%", // Set custom width here
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "35px",
                                  width: "100%",
                                  backgroundColor: "#F5F6FA",
                                },
                              }}
                              {...params}
                              fullWidth
                              autoComplete="off"
                              placeholder="Adyny ýazyň ýa-da saýlaň"
                              variant="outlined"
                            />
                          )}
                        />
                      </Stack>

                      <Stack width="100%" direction="row">
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          localeText={turkmenLocaleText}
                          adapterLocale="tk"
                        >
                          <DemoContainer
                            components={["MobileTimePicker", "DatePicker"]}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Stack
                              direction="row"
                              justifyContent="space-beteen"
                              spacing="16px"
                            >
                              <Stack
                                width="100%"
                                direction="column"
                                justifyContent="space-between"
                              >
                                <Typography
                                  fontSize={15}
                                  fontWeight={600}
                                  textAlign="start"
                                  color="#474747"
                                  mb="5px"
                                >
                                  Senesi
                                </Typography>
                                <DatePicker
                                  fullWidth
                                  defaultValue={
                                    dayjs(date).isValid() ? dayjs(date) : null
                                  }
                                  onChange={(newValue) => {
                                    setDateNote2(
                                      newValue
                                        ? dayjs(newValue).format("YYYY-MM-DD")
                                        : null
                                    );
                                  }}
                                  format="DD.MM.YYYY"
                                  slotProps={{
                                    textField: {
                                      size: "small",
                                      error: false,
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
                                width="100%"
                                direction="column"
                                justifyContent="space-between"
                              >
                                <Typography
                                  fontSize={15}
                                  fontWeight={600}
                                  textAlign="start"
                                  color="#474747"
                                  mb="5px"
                                >
                                  Wagty
                                </Typography>
                                <ThemeProvider theme={theme}>
                                  <MobileTimePicker
                                    ampm={false}
                                    defaultValue={
                                      dayjs(date).isValid() ? dayjs(date) : null
                                    }
                                    onChange={(newValue) => {
                                      setDateHour(
                                        newValue
                                          ? dayjs(newValue).format("HH:mm")
                                          : null
                                      );
                                    }}
                                    views={["hours", "minutes"]}
                                    format="HH:mm"
                                    slotProps={{
                                      textField: {
                                        size: "small",
                                        error: false,
                                        InputProps: {
                                          sx: {
                                            borderRadius: "35px",
                                            backgroundColor: "#F5F6FA",
                                            height: 55,
                                            width: "100%",
                                            border: "1px solid #ccc",
                                          },
                                        },
                                      },
                                    }}
                                  />
                                </ThemeProvider>
                              </Stack>
                            </Stack>
                          </DemoContainer>
                        </LocalizationProvider>
                      </Stack>
                      <Stack spacing="10px" mt="40px" width="100%" pt="8px">
                        <Typography
                          fontSize={15}
                          fontWeight={600}
                          textAlign="start"
                          color="#474747"
                          mb="5px"
                        >
                          Bellik reňkini saýla
                        </Typography>

                        <Stack direction="row" spacing="9px">
                          {colors.map((item, index) => (
                            <Stack
                              key={index}
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
                              {selectedColor === item.color ? (
                                <CheckIcon />
                              ) : (
                                ""
                              )}
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                      <Stack
                        width="100%"
                        mt="30px"
                        direction="row"
                        justifyContent="flex-end"
                        spacing="10px"
                      >
                        <Button
                          onClick={handleUpdateAdminNotes}
                          sx={{
                            "&:disabled": { background: "lightgray" },
                            background: "#2F6FD0",
                            color: "#fff",
                            "&:hover": { background: "#2F6FD0" },
                            height: "40px",
                            width: "115px",
                            borderRadius: "50px",
                            textTransform: "revert",
                            fontSize: 16,
                          }}
                        >
                          Ibermek
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                }
              </Grow>
            </Modal>
          </Stack>
        </Stack>
        <Stack
          backgroundColor="#fff"
          spacing={4}
          width="68%"
          borderRadius="20px"
          m="0px 20px 0 0 "
          pb="10px"
          boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
        >
          <Calendar
            openModal={openModal}
            color={selectedColor}
            events={adminNotes}
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
