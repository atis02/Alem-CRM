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
  getStatusUsers,
  postStatusUser,
} from "../../../Components/db/Redux/api/UserSlice";
import moment from "moment";
import { toast } from "react-toastify";
const NonActiveUsers = () => {
  const statusData = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const data = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  // Manage checked status for each user
  const [checkedStates, setCheckedStates] = useState({});

  useEffect(() => {
    dispatch(getStatusUsers());
  }, [dispatch]);

  useEffect(() => {
    if (statusData === "succeeded") {
      // Initialize the switch states for each user
      const initialCheckedStates = data.messagge.reduce((acc, user) => {
        acc[user.id] = user.status; // Set initial switch state based on user status
        return acc;
      }, {});
      setCheckedStates(initialCheckedStates);
    }
  }, [statusData, data]);

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

  const filteredUsers =
    statusData === "succeeded"
      ? data.messagge.filter((item) => item.status === false)
      : [];
  const style2 = { p: 1, textAlign: "center", fontFamily: "DM Sans" };

  return (
    <Stack
      backgroundColor="#fff"
      width="100%"
      height="62vh"
      borderRadius="20px"
      pb="10px"
      boxShadow="0px 0px 8px -5px rgba(0,0,0,0.75)"
      p="30px 24px 17px"
    >
      <Stack>
        {statusData === "loading" ? (
          <Stack
            direction="column"
            height="100%"
            alignItems="center"
            sx={{ gap: "10px" }}
          >
            <CircularProgress />
            Loading...
          </Stack>
        ) : statusData === "failed" ? (
          toast.error(error)
        ) : statusData === "succeeded" ? (
          <Stack>
            {filteredUsers.length === 0 ? (
              <Typography textAlign="center" fontSize={20}>
                Ulanyjy tapylmady!
              </Typography>
            ) : (
              <TableContainer
                sx={{
                  minHeight: "100%",
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
                    {filteredUsers.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell sx={style2}>{index + 1}</TableCell>
                        <TableCell sx={style2}>{user.name}</TableCell>
                        <TableCell sx={style2}>
                          {user.surname || "Yok"}
                        </TableCell>
                        <TableCell sx={style2}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={checkedStates[user.id] || false} // Bind switch to state per user
                                onChange={handleSwitchChange(user.id)} // Handle switch change
                                color="primary"
                              />
                            }
                            label={`Işgär ${
                              checkedStates[user.id] ? "Aktiw" : "Aktiw däl"
                            }`}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
};

export default NonActiveUsers;
