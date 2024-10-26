import {
  CircularProgress,
  FormControlLabel,
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

const NonActiveUsers = () => {
  const [statusData, setStatusData] = useState(false);
  const [statusUsersData, setStatusUsersData] = useState([]);
  const [checkedStates, setCheckedStates] = useState({});
  const [checkedStatesModer, setCheckedStatesModer] = useState({});
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  useEffect(() => {
    const getStatusUsers = async () => {
      try {
        setStatusData(true);
        const response = await AxiosInstance.get("/user/status");
        setStatusUsersData(response.data.messagge);
      } catch (error) {
        console.error("Error fetching user status:", error);
      } finally {
        setStatusData(false);
      }
    };
    getStatusUsers();
  }, []);

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

  const filteredUsers = statusUsersData.filter((item) => item.role !== "ADMIN");

  const style2 = { p: 1, textAlign: "center", fontFamily: "DM Sans" };

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
                    {filteredUsers.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell sx={style2}>{index + 1}</TableCell>
                        <TableCell sx={style2}>{user.name}</TableCell>
                        <TableCell sx={style2}>{user.surname || "-"}</TableCell>
                        <TableCell sx={style2}>
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
                        <TableCell sx={style2}>
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
                      </TableRow>
                    ))}
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
