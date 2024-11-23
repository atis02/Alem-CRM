import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  FormControl,
  Grow,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  getProjectForUser,
  getProjects,
} from "../../../Components/db/Redux/api/ProjectSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import {
  projectTitles,
  StyledTableRow,
  turkmenLocaleText,
} from "../../../Components/utils";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../../../public/images/Delete.png";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import UpdateModalComponent from "./UpdateModalComponent";
import { getUsers } from "../../../Components/db/Redux/api/UserSlice";
import FadeTooltip from "../../../Components/Tooltip";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/tk";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
dayjs.locale("tk");

const Projects = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [age, setAge] = useState("");
  const [details, setDetails] = useState();
  const status = useSelector((state) => state.project.status);
  const error = useSelector((state) => state.project.error);
  const data = useSelector((state) => state.project.data);
  const [filtered, setFiltered] = useState(data);

  const UsersData = useSelector((state) => state.users.data);
  const UsersDataStatus = useSelector((state) => state.users.status);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);

  console.log(dateFrom);
  console.log(data);

  const filteredProjects =
    status === "succeeded"
      ? data.filter(
          (item) =>
            item.id !== 9 &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  // const filteredProjects =
  //   status === "succeeded"
  //     ? data.filter((item) => {
  //         return (
  //           item.id !== 9 && // Exclude id 9
  //           item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //         );
  //       })
  //     : data;
  // console.log(filtered);

  // const filteredProjects =
  //   status === "succeeded"
  //     ? data.filter((item) => {
  //         const projectStartDate = new Date(item.startdate);
  //         const projectEndDate = new Date(item.enddate);

  //         // Filter based on date range (start date and end date)
  //         const isWithinDateRange =
  //           projectStartDate >= new Date(dateFrom) &&
  //           projectEndDate <= new Date(dateTo);

  //         // Additional checks like excluding certain projects (e.g., item.id !== 9) or searching by name
  //         return setFiltered(
  //           isWithinDateRange &&
  //             item.name.toLowerCase().includes(searchTerm.toLowerCase())
  //         );
  //       })
  //     : data;

  // console.log(filteredProjects);

  // const filteredProjects =
  //   status === "succeeded" && (dateFrom || dateTo)
  //     ? data.filter((item) => {
  //         console.log(new Date(item.startdate) >= new Date(dateFrom));

  //         new Date(item.startdate) >= new Date(dateFrom);
  //         // ||  new Date(item.enddate) <= new Date(dateTo);
  //       })
  //     : [];

  // console.log(filteredByDate);
  console.log(filteredProjects);

  const handleChange = (event) => {
    setAge(event.target.value);
    handleCloseFilter();
  };
  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    if (age !== "") {
      dispatch(getProjectForUser(age.id));
    }
  }, [dispatch, age]);
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const AllProjects = () => {
    setDateTo(null);
    setDateFrom(null);
    setSearchTerm("");
    setAge("");
    dispatch(getProjects());
  };
  const style2 = {
    p: "0 10px",
    textAlign: "center",
    fontFamily: "DM Sans",
  };
  const style3 = {
    fontSize: "14px",
    textAlign: "center",
    fontFamily: "DM Sans",
    maxWidth: "250px",
    whiteSpace: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: 500,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };
  const handleDeleteProject = (id) => {
    if (id) {
      const body = {
        projectId: id,
        responsibleUserId: user.id,
      };
      dispatch(deleteProject(body));
    }
  };
  const handleFocus = () => {
    setIsFocused(true); // Set focused state to true
  };

  const handleBlur = () => {
    setIsFocused(false); // Set focused state to false
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
  const styles = {
    modal: {
      position: "absolute",
      top: "25%",
      left: "30%",
      transform: "translate(-50%, -50%)",
      width: 700,
      height: 400,
      bgcolor: "background.paper",
      border: "0.5px solid gray",
      boxShadow: 24,
      p: "8px 25px",
      borderRadius: "10px",
    },
  };
  return (
    <Box mt={1.5} width="100%" backgroundColor="#fff">
      <Stack
        width="100%"
        height="90%"
        borderRadius="12px"
        p="10px"
        // m="10px"
        boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
      >
        <Stack
          // height={70}
          backgroundColor="#F6FDFD"
          alignContent="center"
          justifyContent="space-between"
          p="10px 10px"
          borderRadius="12px"
          direction="row"
        >
          <Stack width="80%" alignContent="center" justifyContent="center">
            <Typography fontFamily="DM Sans" fontWeight={600} fontSize={18}>
              Proýektleriň mazmuny
            </Typography>
          </Stack>
          <Stack
            // width="20%"
            height="100%"
            direction="row"
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {/* <FormControl>
              <InputLabel
                id="age-label"
                shrink={isFocused || !!age}
                sx={{
                  position: "absolute",
                  top: isFocused || !!age ? 0 : "50%",
                  left: 14,
                  transform:
                    isFocused || !!age
                      ? "translateY(-50%)"
                      : "translateY(-50%)", // Move label above the select
                  padding: 0,
                  paddingRight: 1,
                  margin: 0,
                  fontSize: "16px",
                  transition: "all 0.2s ease-in-out",
                  color: "#474747",
                  fontFamily: "DM Sans",
                }}
              >
                Işgärler
              </InputLabel>
              <Select
                labelId="age-label"
                value={age}
                label="Işgärler   "
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#F0F7FF",
                  minWidth: 230,
                  height: 45,
                  padding: 0, 
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                {UsersDataStatus == "succeeded" &&
                  UsersData.map((elem) => (
                    <MenuItem key={elem.id} value={elem}>
                      {elem.name} {elem.surname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
            <Button
              sx={{
                textTransform: "revert",
                color: "#474747",
                fontSize: 16,
                fontFamily: "DM Sans",
                backgroundColor: "#F0F7FF",
                borderRadius: "20px",
                width: 110,
                height: 45,
                border: "1px solid lightgray",
              }}
              onClick={AllProjects}
            >
              Arassala
            </Button>
            <Button
              sx={{
                textTransform: "revert",
                color: "#474747",
                fontSize: 16,
                fontFamily: "DM Sans",
                backgroundColor: "#F0F7FF",
                borderRadius: "20px",
                width: 110,
                height: 45,
                border: "1px solid lightgray",
                gap: "10px",
              }}
              onClick={handleOpenFilter}
            >
              <TuneIcon />
              Filter
            </Button>
            <Modal
              disableAutoFocus
              open={openFilter}
              onClose={handleCloseFilter}
              closeAfterTransition
            >
              <Grow in={openFilter}>
                <Box sx={styles.modal}>
                  <Stack alignItems="end" fullWidth>
                    <IconButton onClick={handleCloseFilter}>
                      <CloseIcon
                        sx={{
                          width: 28,
                          height: 28,
                          color: "#474747",
                        }}
                      />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" flexWrap="wrap">
                    <Stack direction="row" width="100%">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoComplete="off"
                        sx={{
                          width: "100%",
                          color: "#000",
                          // minWidth: "150px",
                          borderRadius: "40px",
                          mr: "20px",
                          mt: 2,
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder="Proýektleriň ady boýunça gözle"
                        InputProps={{
                          sx: {
                            backgroundColor: "#F0F7FF",

                            height: "45px",
                            color: "#000",
                            fontWeight: "500",
                            borderRadius: "40px",
                            padding: "none",
                            "& ::placeholder": {
                              color: "#000",
                            },
                          },
                        }}
                      />
                      <Stack width="100%" mt={2}>
                        <FormControl fullWidth>
                          <InputLabel
                            id="age-label"
                            shrink={isFocused || !!age}
                            sx={{
                              position: "absolute",
                              top: isFocused || !!age ? 0 : "50%",
                              left: 14,
                              transform:
                                isFocused || !!age
                                  ? "translateY(-50%)"
                                  : "translateY(-50%)", // Move label above the select
                              padding: 0,
                              paddingRight: 1,

                              margin: 0,
                              fontSize: "16px",
                              transition: "all 0.2s ease-in-out",
                              color: "#8b8f94",
                              width: "100%",
                              fontFamily: "DM Sans",
                            }}
                          >
                            Işgärler
                          </InputLabel>
                          <Select
                            labelId="age-label"
                            value={age}
                            label="Işgärler   "
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            sx={{
                              borderRadius: "20px",
                              backgroundColor: "#F0F7FF",
                              // minWidth: 230,
                              width: "100%",
                              height: 45,
                              padding: 0,
                              "& .MuiSelect-select": {
                                padding: "10px 14px",
                                display: "flex",
                                alignItems: "center",
                              },
                            }}
                          >
                            {UsersDataStatus == "succeeded" &&
                              UsersData.map((elem) => (
                                <MenuItem key={elem.id} value={elem}>
                                  {elem.name} {elem.surname}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Stack>
                    </Stack>

                    <Stack direction="row" width="100%">
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
                            direction="row"
                            justifyContent="space-beteen"
                            spacing="16px"
                            width="100%"
                          >
                            <Stack
                              width="100%"
                              direction="column"
                              justifyContent="space-between"
                            >
                              <Typography
                                fontSize={15}
                                fontWeight={500}
                                textAlign="start"
                                color="#474747"
                                mb="5px"
                              >
                                Sene aralygy(dan)
                              </Typography>

                              <DatePicker
                                value={
                                  dayjs(dateFrom, "YYYY-MM-DD").isValid()
                                    ? dayjs(dateFrom, "YYYY-MM-DD")
                                    : null
                                }
                                onChange={(newValue) => {
                                  if (newValue) {
                                    setDateFrom(
                                      dayjs(newValue).format("YYYY-MM-DD")
                                    );
                                  } else {
                                    setDateFrom(null);
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
                                        backgroundColor: "#F0F7FF",
                                        width: "100%",
                                        height: 45,
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
                                fontWeight={500}
                                textAlign="start"
                                color="#474747"
                                mb="5px"
                              >
                                Sene aralygy(çenli)
                              </Typography>
                              <ThemeProvider theme={theme}>
                                <DatePicker
                                  value={
                                    dayjs(dateTo, "YYYY-MM-DD").isValid()
                                      ? dayjs(dateTo, "YYYY-MM-DD")
                                      : null
                                  }
                                  onChange={(newValue) => {
                                    if (newValue) {
                                      setDateTo(
                                        dayjs(newValue).format("YYYY-MM-DD")
                                      );
                                    } else {
                                      setDateTo(null);
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
                                          backgroundColor: "#F0F7FF",
                                          width: "100%",
                                          height: 45,
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
                  </Stack>
                </Box>
              </Grow>
            </Modal>
          </Stack>
        </Stack>
        <Stack>
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
            toast.error(error)
          ) : status === "succeeded" ? (
            <Stack
            // sx={{
            //   overflow: "auto",
            //   height: "80%",
            //   // maxHeight: "80%",
            //   // minHeight: "340px",
            // }}
            >
              {filteredProjects.length == 0 ? (
                <Typography
                  textAlign="center"
                  mt={5}
                  fontSize={18}
                  width="100%"
                >
                  Proýekt ýok
                </Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          backgroundColor: "#fff",
                          fontFamily: "DM Sans",
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          boxShadow: " 0px 12px 7px -14px rgba(71,71,71,1)",
                        }}
                      >
                        {projectTitles.map((elem) => (
                          <TableCell
                            sx={{
                              fontFamily: "DM Sans",
                              color: "#222222",
                              fontWeight: 600,
                              fontSize: 16,
                              textAlign: "center",
                            }}
                            key={elem.id}
                          >
                            {elem.title}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody sx={{ cursor: "pointer" }}>
                      {filteredProjects.map((user, index) => (
                        <StyledTableRow key={index}>
                          <FadeTooltip
                            value={user.name}
                            data={
                              <TableCell
                                sx={style2}
                                onClick={() =>
                                  navigate(
                                    `/projects/${
                                      user.project_id
                                        ? user.project_id
                                        : user.id
                                    }`
                                  )
                                }
                              >
                                <Typography sx={style3}>{user.name}</Typography>
                              </TableCell>
                            }
                          />
                          <TableCell
                            onClick={() =>
                              navigate(
                                `/projects/${
                                  user.project_id ? user.project_id : user.id
                                }`
                              )
                            }
                            sx={style2}
                          >
                            {user.users
                              ? user.users[0]
                                ? user.users[0].name
                                : ""
                              : age.name + " " + age.surname}
                            {user.users && user.users[1]
                              ? ` , ${user.users[1].name}`
                              : ""}{" "}
                            {user.users && user.users[2]
                              ? ` , ${user.users[2].name}`
                              : ""}
                          </TableCell>
                          <TableCell
                            onClick={() =>
                              navigate(
                                `/projects/${
                                  user.project_id ? user.project_id : user.id
                                }`
                              )
                            }
                            sx={style2}
                          >
                            {moment(user.startdate).format("DD.MM.YYYY")} -{" "}
                            {moment(user.enddate).format("DD.MM.YYYY")}
                          </TableCell>
                          <TableCell
                            onClick={() =>
                              navigate(
                                `/projects/${
                                  user.project_id ? user.project_id : user.id
                                }`
                              )
                            }
                            sx={style2}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.3}
                            >
                              <Stack
                                sx={{
                                  // width: `${user.completion}%`,
                                  width: "80%",
                                  height: "14px",
                                  // backgroundColor: "#00B69B",
                                  backgroundColor: "#DDDDDD",
                                  borderRadius: "100px",
                                  // flexDirection: "column",
                                  gap: "10px",
                                }}
                                direction="row"
                              >
                                <Stack
                                  style={{
                                    width: `${user.completion}%`,
                                    height: "14px",
                                    backgroundColor: "#00B69B",
                                    borderRadius: "100px",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                ></Stack>
                              </Stack>
                              <Stack
                                style={{
                                  fontSize: 13,

                                  color: "#00B69B",
                                }}
                              >
                                {`${Math.ceil(user.completion)}%`}
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell
                            onClick={() =>
                              navigate(
                                `/projects/${
                                  user.project_id ? user.project_id : user.id
                                }`
                              )
                            }
                            sx={{
                              ...style2,
                            }}
                          >
                            {user.priority == "Pes" ? (
                              <Typography
                                backgroundColor="#d4f4fc"
                                borderRadius="50px"
                                color="gray"
                                width="100%"
                                textAlign="center"
                                border="0.5px solid gray"
                              >
                                Pes
                              </Typography>
                            ) : user.priority == "Orta" ? (
                              <Typography
                                backgroundColor="#E9FAF4"
                                borderRadius="50px"
                                color="#29D697"
                                border="0.5px solid #29D697"
                              >
                                Orta
                              </Typography>
                            ) : (
                              <Typography
                                backgroundColor="#9A93FF26"
                                borderRadius="50px"
                                color="#9A93FF"
                                border="0.5px solid #9A93FF"
                              >
                                Ýokary
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell
                            onClick={() =>
                              navigate(
                                `/projects/${
                                  user.project_id ? user.project_id : user.id
                                }`
                              )
                            }
                            sx={style2}
                          >
                            {user.status == "Dowam edýän" ? (
                              <Typography
                                backgroundColor="#FFF1E0"
                                borderRadius="50px"
                                color="#E79124"
                                width="100%"
                                textAlign="center"
                                border="0.5px solid #E79124"
                              >
                                Dowam edýän
                              </Typography>
                            ) : user.status == "Tamamlanan" ? (
                              <Typography
                                backgroundColor="#E9FAF4"
                                borderRadius="50px"
                                color="#29D697"
                                border="0.5px solid #29D697"
                              >
                                Tamamlanan
                              </Typography>
                            ) : (
                              <Typography
                                backgroundColor="#FFF0ED"
                                borderRadius="50px"
                                border="0.5px solid #FF6A54"
                                color="#FF6A54"
                              >
                                {user.status}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ width: "100px" }}>
                            <Stack direction="row" alignItems="end" spacing={1}>
                              <IconButton
                                onClick={() => {
                                  handleOpen();
                                  setDetails(user);
                                }}
                              >
                                <BorderColorOutlinedIcon
                                  sx={{
                                    color: "#0099ED",
                                    width: 20,
                                    height: 20,
                                  }}
                                />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  handleDeleteProject(
                                    user.project_id ? user.project_id : user.id
                                  )
                                }
                              >
                                <img
                                  style={{ width: 20, height: 20 }}
                                  src={deleteIcon}
                                  alt=""
                                />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Stack>
          ) : (
            ""
          )}
          <UpdateModalComponent
            open={open}
            handleClose={handleClose}
            details={details}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Projects;
