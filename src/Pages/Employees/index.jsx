import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Modal,
  Paper,
  Stack,
  styled,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/db/Redux/api/AxiosHelper";
import { getUsers } from "../../Components/db/Redux/api/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { registerFailure } from "../../Components/db/Redux/reducers/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { items, StyledTableRow } from "../../Components/utils";
import CustomDatePicker from "./components/Datepicker";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { getWorkTimeForDay } from "../../Components/db/Redux/api/GetComeTimeUsers";
import dayjs from "dayjs";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Register from "./components/Register";

const index = () => {
  const [titleSearch, setTitleSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+993");
  const [login, setLogin] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const status = useSelector((state) => state.getWorkTime.status);
  const error = useSelector((state) => state.getWorkTime.error);
  const data = useSelector((state) => state.getWorkTime.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(dayjs());
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("CRM_USER"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim().length <= 0 || password.trim().length <= 0) {
        toast.error("Dogry maglumatyňyzy giriziň!");
      } else {
        setLoading(true);
        const response = await AxiosInstance.post("/user/registration", {
          login: login,
          password: password,
          surname: surname,
          firstname: name,
          email: email,
          phoneNumber: phoneNumber,
        });
        toast.success("Üstünlikli!");
        setEmail("");
        setPhoneNumber("");
        setLogin("");
        setSurname("");
        setName("");
        setPassword("");
        setLoading(false);
        handleClose();
        dispatch(getUsers());
      }
    } catch (error) {
      toast.error(
        error.message === "Network Error"
          ? "Internet baglanyşygy ýok"
          : error.response.data.error,

        dispatch(registerFailure(error.message || "Login failed"))
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getWorkTimeForDay(dayjs(date).format("YYYY-MM-DD")));
  }, [date, dispatch]);

  const filteredUsers =
    status === "succeeded"
      ? data.users &&
        data.users.filter(
          (item) =>
            item.id !== 9 &&
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    border: "1px solid lightgray",
    gap: "10px",
    height: 650,
    justifyContent: "center",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };

  const style2 = { p: 1, textAlign: "center", fontFamily: "DM Sans" };
  const Note = () => {
    return (
      <Typography color="tomato" fontSize={14}>
        -
      </Typography>
    );
  };

  const currentDate = moment()
    .set({
      year: 2024,
      month: 8,
      date: 28,
      hour: 9,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    .toISOString();
  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="auto"
      p="10px"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p="0 30px 8px 0"
      >
        <Typography
          p="0px 5px"
          fontSize="30px"
          fontWeight="500"
          fontFamily="Montserrat"
        >
          Işgärler
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            autoComplete="off"
            sx={{
              color: "#000",
              minWidth: "150px",
              borderRadius: "40px",
              mr: "20px",
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Ady boýunça gözle"
            InputProps={{
              sx: {
                height: "45px",
                color: "#000",
                fontWeight: "600",
                borderRadius: "40px",
                padding: "none",
              },
            }}
          />
          <CustomDatePicker selectedDay={date} setDateNote={setDate} />

          <Button
            sx={{
              color: "#9A93FF",
              textTransform: "revert",
              background: "#e7e7fb",
              "&:hover": { background: "#e7e7fb" },
              gap: "10px",
              width: 190,
              height: 45,
              borderRadius: "20px",
            }}
            variant="outlined"
            onClick={handleOpen}
          >
            <PersonAddAltIcon />
            Işgär goşmak
          </Button>
        </Stack>
      </Stack>
      <Stack
        backgroundColor="#fff"
        minHeight="78vh"
        borderRadius="20px"
        pb="10px"
        boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
      >
        <Stack direction="row" alignItems="center" justifyContent="center">
          <ToastContainer />

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack alignItems="end" width="100%" p="0 20px" mt={2}>
                <IconButton
                  sx={{ fontWeight: 600, fontSize: 20 }}
                  onClick={handleClose}
                >
                  X
                </IconButton>
              </Stack>

              <Register />
            </Box>
          </Modal>
        </Stack>
        <Stack>
          {status === "loading..." ? (
            <Stack
              direction="column"
              height="100%"
              alignItems="center"
              sx={{ gap: "10px" }}
            >
              <CircularProgress />
              Loading...
            </Stack>
          ) : status === "failed" ? (
            toast.error(error)
          ) : status === "succeeded" ? (
            <Stack>
              {filteredUsers === undefined ? (
                <Typography textAlign="center" fontSize={20}>
                  Ulanyjy tapylmady!
                </Typography>
              ) : (
                <TableContainer
                  sx={{
                    height: "77vh",
                    overflowY: "scroll",
                    borderRadius: "20px",
                  }}
                  className="times2"
                >
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          backgroundColor: "#F6FDFD",
                          fontFamily: "DM Sans",
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          boxShadow: " 0px 12px 7px -14px rgba(71,71,71,1)",
                        }}
                      >
                        {items.map((elem) => (
                          <TableCell
                            sx={{
                              color: "#222222",
                              fontWeight: 500,
                              fontSize: 18,
                              textAlign: "center",
                            }}
                            key={elem.id}
                          >
                            {elem.title}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.map((user, index) => (
                        <StyledTableRow
                          key={user.id}
                          onClick={() =>
                            navigate(`/employees/${user.id}?date=${date}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell sx={style2}>{index + 1}</TableCell>
                          <TableCell sx={{ ...style2, textAlign: "start" }}>
                            {user.name}
                          </TableCell>
                          <TableCell sx={style2}>{user.surname}</TableCell>

                          <TableCell sx={style2}>
                            {user.employeeRegistrationTimes.length > 0 &&
                            user.employeeRegistrationTimes[0]?.comeTime ? (
                              dayjs(
                                user.employeeRegistrationTimes[0].comeTime
                              ).format("HH:mm")
                            ) : (
                              <Note />
                            )}
                          </TableCell>
                          <TableCell sx={style2}>
                            {user.employeeRegistrationTimes &&
                            user.employeeRegistrationTimes.length > 0 &&
                            user.employeeRegistrationTimes[
                              user.employeeRegistrationTimes.length - 1
                            ] ? (
                              user.employeeRegistrationTimes[
                                user.employeeRegistrationTimes.length - 1
                              ].leaveTime === null ? (
                                "Bellik edilmedi"
                              ) : (
                                dayjs(
                                  user.employeeRegistrationTimes[
                                    user.employeeRegistrationTimes.length - 1
                                  ].leaveTime
                                ).format("HH:mm")
                              )
                            ) : (
                              <Note />
                            )}
                          </TableCell>
                          <TableCell sx={{ ...style2, color: "tomato" }}>
                            {new Date(
                              user.employeeRegistrationTimes[0]?.comeTime
                                ? user.employeeRegistrationTimes[0].comeTime
                                : ""
                            ).getHours() >= 9 ? (
                              new Date(
                                user.employeeRegistrationTimes[0]?.comeTime
                                  ? user.employeeRegistrationTimes[0].comeTime
                                  : ""
                              ).getHours() -
                                9 >
                                0 ||
                              new Date(
                                user.employeeRegistrationTimes[0]?.comeTime
                                  ? user.employeeRegistrationTimes[0].comeTime
                                  : ""
                              ).getMinutes() > 0 ? (
                                <>
                                  {new Date(
                                    user.employeeRegistrationTimes[0]?.comeTime
                                      ? user.employeeRegistrationTimes[0]
                                          .comeTime
                                      : ""
                                  ).getHours() -
                                    9 >
                                    0 &&
                                    new Date(
                                      user.employeeRegistrationTimes[0]
                                        ?.comeTime
                                        ? user.employeeRegistrationTimes[0]
                                            .comeTime
                                        : ""
                                    ).getHours() -
                                      9 +
                                      "(sag)"}
                                  {new Date(
                                    user.employeeRegistrationTimes[0]?.comeTime
                                      ? user.employeeRegistrationTimes[0]
                                          .comeTime
                                      : ""
                                  ).getMinutes() > 0 && (
                                    <>
                                      {new Date(
                                        user.employeeRegistrationTimes[0]
                                          ?.comeTime
                                          ? user.employeeRegistrationTimes[0]
                                              .comeTime
                                          : ""
                                      ).getHours() -
                                        9 >
                                        0 && ":"}
                                      {new Date(
                                        user.employeeRegistrationTimes[0]
                                          ?.comeTime
                                          ? user.employeeRegistrationTimes[0]
                                              .comeTime
                                          : ""
                                      ).getMinutes()}
                                      (min)
                                    </>
                                  )}
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </TableCell>

                          <TableCell
                            key={index}
                            sx={{
                              maxWidth: "230px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              textAlign: "center",
                            }}
                          >
                            {user.employeeRegistrationTimes.length > 0 &&
                            user.employeeRegistrationTimes[0]?.note
                              ? user.employeeRegistrationTimes[0].note
                              : ""}
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
        </Stack>
      </Stack>
    </Box>
  );
};

export default index;
