import {
  Button,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NonActiveUserItems } from "../../../Components/utils";
import { postStatusUser } from "../../../Components/db/Redux/api/UserSlice";
import AxiosInstance from "../../../Components/db/Redux/api/AxiosHelper";
import { updateUserRole } from "../../../Components/db/Redux/api/ComeTimeSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import moment from "moment";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import deleteIcon from "../../../../public/images/Delete.png";
import UserWorkTimeSet from "./UserWorkTimeSet";
import { getUserStatusWork } from "../../../Components/db/Redux/api/SetWorkTimeSlice";

const NonActiveUsers = () => {
  const [statusData, setStatusData] = useState(false);
  const [openUserTimeModal, setOpenUserTimeModal] = useState(false);
  // const [statusUsersData, setStatusUsersData] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [checkedStatesModer, setCheckedStatesModer] = useState({});
  const [date, setDate] = useState(dayjs());
  const [details, setDetails] = useState(null);

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const navigate = useNavigate();

  const statusUsersData = useSelector((state) => state.workTime.userStatus);
  const statusUsersHoliday = useSelector((state) => state.workTime.status);
  const statusUsersError = useSelector((state) => state.workTime.error);
  console.log(statusUsersData);

  useEffect(() => {
    // const getStatusUsers = async () => {
    //   try {
    //     setStatusData(true);
    //     const response = await AxiosInstance.get("/user/status");
    //     setStatusUsersData(response.data.messagge);
    //   } catch (error) {
    //     console.error("Error fetching user status:", error);
    //   } finally {
    //     setStatusData(false);
    //   }
    // };
    // getStatusUsers();
    dispatch(getUserStatusWork());
  }, [dispatch]);

  useEffect(() => {
    const initialCheckedStates = statusUsersData.reduce((acc, user) => {
      acc[user.id] = user.status;
      return acc;
    }, {});
    const initialCheckedStatesRole = statusUsersData.reduce((acc, user) => {
      acc[user.id] = user.role === "MODERATOR";
      return acc;
    }, {});
    setCheckedStates(initialCheckedStates);
    setCheckedStatesModer(initialCheckedStatesRole);
  }, [statusUsersData]);

  const handleSetStatus = useCallback(
    (id) => {
      const updatedStatus = !checkedStates[id];
      const data2 = { userId: id, status: updatedStatus };
      dispatch(postStatusUser(data2));
      setCheckedStates((prevState) => ({ ...prevState, [id]: updatedStatus }));
    },
    [checkedStates, dispatch]
  );

  const handleRoleChange = useCallback(
    (id, role) => {
      const body = { editorId: user.id, userId: id, newRole: role };
      dispatch(updateUserRole(body));
      setCheckedStatesModer((prevState) => ({
        ...prevState,
        [id]: role === "MODERATOR",
      }));
    },
    [user.id, dispatch]
  );

  const notActiveUsers = statusUsersData.filter(
    (item) => item.role !== "ADMIN" && item.status === false
  );
  const moderators =
    // statusUsersData.length &&
    statusUsersData.filter((item) => item.role == "MODERATOR");
  const activeUsers = statusUsersData.filter(
    (user) =>
      user.role !== "ADMIN" && user.role !== "MODERATOR" && user.status === true
  );
  const allUsers = [...moderators, ...activeUsers, ...notActiveUsers];
  console.log(allUsers);

  const style2 = {
    p: 1,
    textAlign: "center",
    fontFamily: "DM Sans",
  };

  return (
    <Stack
      backgroundColor="#fff"
      width="80%"
      height="100%"
      borderRadius="20px"
      pb="10px"
      boxShadow="0px 0px 8px -5px rgba(0,0,0,0.75)"
      p="10px 24px 17px"
      m="15px 0 10px 15px"
    >
      <Typography textAlign="center" fontFamily="DM Sans" mb={2} fontSize={20}>
        Ulanyjylar
      </Typography>
      <Stack height="100%">
        {statusData ? (
          <Stack
            direction="column"
            height="100%"
            alignItems="center"
            sx={{ gap: "10px" }}
          >
            <CircularProgress />
            Loading...
          </Stack>
        ) : (
          <Stack>
            {statusUsersData.length === 0 ? (
              <Typography textAlign="center" fontSize={20}>
                Ulanyjy tapylmady!
              </Typography>
            ) : (
              <TableContainer
                sx={{
                  height: "78vh",
                  overflowY: "auto",
                  borderRadius: "20px",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#F6FDFD",
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        boxShadow: "0px 12px 7px -14px rgba(71,71,71,1)",
                      }}
                    >
                      {NonActiveUserItems.map((elem) => (
                        <TableCell
                          sx={{
                            color: "#222222",
                            fontWeight: 500,
                            fontFamily: "DM Sans",
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
                    {allUsers.map((user, index) => (
                      <TableRow
                        key={user.id}
                        // onClick={() =>
                        //   navigate(`/employees/${user.id}?date=${date}`)
                        // }
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <TableCell
                          onClick={() =>
                            navigate(`/employees/${user.id}?date=${date}`)
                          }
                          sx={style2}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            navigate(`/employees/${user.id}?date=${date}`)
                          }
                          sx={style2}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            navigate(`/employees/${user.id}?date=${date}`)
                          }
                          sx={style2}
                        >
                          {user.surname || "-"}
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            navigate(`/employees/${user.id}?date=${date}`)
                          }
                          sx={style2}
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={checkedStates[user.id] || false}
                                onChange={() => handleSetStatus(user.id)}
                                color="primary"
                              />
                            }
                            label=""
                          />
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            navigate(`/employees/${user.id}?date=${date}`)
                          }
                          sx={style2}
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={checkedStatesModer[user.id] || false}
                                onChange={() =>
                                  handleRoleChange(
                                    user.id,
                                    checkedStatesModer[user.id]
                                      ? "USER"
                                      : "MODERATOR"
                                  )
                                }
                                color="primary"
                              />
                            }
                            label=""
                          />
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            navigate(`/employees/${user.id}?date=${date}`)
                          }
                          sx={style2}
                        >
                          {user.workTime && user.workTime.startTime
                            ? ` ${moment(
                                user.workTime && user.workTime.startTime,
                                "HH:mm:ss"
                              ).format("HH:mm")} -
                                ${moment(
                                  user.workTime && user.workTime.endTime,
                                  "HH:mm:ss"
                                ).format("HH:mm")}`
                            : "-"}
                        </TableCell>
                        <TableCell sx={{ width: "50px" }}>
                          <Stack direction="row" alignItems="end" spacing={1}>
                            <IconButton
                              onClick={() => {
                                setOpenUserTimeModal(true);
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
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                    <UserWorkTimeSet
                      open={openUserTimeModal}
                      handleClose={() => setOpenUserTimeModal(false)}
                      userDetails={details}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default NonActiveUsers;
