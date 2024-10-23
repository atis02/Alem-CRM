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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NonActiveUserItems, StyledTableRow } from "../../../Components/utils";
import {
  // getStatusUsers,
  postStatusUser,
} from "../../../Components/db/Redux/api/UserSlice";
import moment from "moment";
import { toast } from "react-toastify";
import AxiosInstance from "../../../Components/db/Redux/api/AxiosHelper";

const NonActiveUsers = () => {
  const [statusData, setStatusData] = useState(false);
  const [statusUsersData, setStatusUsersData] = useState([]);
  const dispatch = useDispatch();

  // Manage checked status for each user
  const [checkedStates, setCheckedStates] = useState({});

  useEffect(() => {
    const getStatusUsers = async () => {
      setStatusData(true);
      const response = await AxiosInstance.get("/user/status").then((resp) => {
        setStatusUsersData(resp.data.messagge);
        setStatusData(false);
      });
    };
    getStatusUsers();
  }, []);

  useEffect(() => {
    const initialCheckedStates = statusUsersData.reduce((acc, user) => {
      acc[user.id] = user.status;
      return acc;
    }, {});
    setCheckedStates(initialCheckedStates);
  }, [statusUsersData]);

  const handleSetStatus = (id) => {
    const updatedStatus = checkedStates[id] === true ? false : true;
    const data2 = {
      userId: id,
      status: updatedStatus,
    };
    dispatch(postStatusUser(data2));
  };

  const handleSwitchChange = (id) => (event) => {
    const newCheckedState = event.target.checked;
    setCheckedStates((prevState) => ({
      ...prevState,
      [id]: newCheckedState, // Update the switch state for the specific user
    }));
    handleSetStatus(id); // Call API to update user status
  };

  const filteredUsers = statusUsersData.filter((item) => item.status === false);
  const style2 = { p: 1, textAlign: "center", fontFamily: "DM Sans" };
  console.log(statusUsersData);

  return (
    <Stack
      backgroundColor="#fff"
      width="97.5%"
      height="62vh"
      borderRadius="20px"
      pb="10px"
      boxShadow="0px 0px 8px -5px rgba(0,0,0,0.75)"
      p="10px 24px 17px"
      m="15px 0 10px 15px"
    >
      <Typography textAlign="center" mb={2} fontSize={20}>
        Ulanyjylar
      </Typography>
      <Stack>
        {statusData === true ? (
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
                  height: "380px",
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
                    {statusUsersData.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell sx={style2}>{index + 1}</TableCell>
                        <TableCell sx={style2}>{user.name}</TableCell>
                        <TableCell sx={style2}>
                          {user.surname || "Yok"}
                        </TableCell>
                        {/* <TableCell sx={style2}>
                          {user.position || "Yok"}
                        </TableCell> */}
                        <TableCell sx={style2}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={checkedStates[user.id] || false} // Bind switch to state per user
                                onChange={handleSwitchChange(user.id)} // Handle switch change
                                color="primary"
                              />
                            }
                            label={` ${checkedStates[user.id] ? "" : ""}`}
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
