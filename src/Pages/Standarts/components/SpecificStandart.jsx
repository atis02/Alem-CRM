import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CreateStandarts from "./CreateStandarts";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStandart,
  getStandarts,
  getStandartsForUser,
} from "../../../Components/db/Redux/api/StandartSlice";
import deleteIcon from "../../../../public/images/Delete.png";
import AddIcon from "@mui/icons-material/Add";
import { toast, ToastContainer } from "react-toastify";
import UpdateStandarts from "./UpdateStandarts";

const SpecificStandart = () => {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [update, setUpdate] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenLaborUpdate = (elem) => {
    setUpdate(elem);
    setOpenUpdate(true);
  };
  const handleCloseLaborUpdate = () => setOpenUpdate(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.standarts.status);
  const error = useSelector((state) => state.standarts.error);
  const data = useSelector((state) => state.standarts.data);

  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const UsersData = useSelector((state) => state.users.data);

  const allData = data.filter(
    (elem) => (elem.users && elem.users.length) === UsersData.length
  );
  const filteredData = data.filter(
    (elem) => (elem.users && elem.users.length) !== UsersData.length
  );

  useEffect(() => {
    if (user.role === "ADMIN") {
      dispatch(getStandarts(user.id));
    } else {
      dispatch(getStandartsForUser(user.id));
    }
  }, [dispatch]);
  const handleDeleteLabor = (id) => {
    const body = {
      laborId: id,
      userId: user.id,
    };
    dispatch(deleteStandart(body));
  };

  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#fff"
      overflow="auto"
      p="10px"
      borderRadius="20px"
    >
      <ToastContainer />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p="0 10px 8px 0"
      >
        <Typography
          p="0px 20px 0px 10px"
          fontSize={{ lg: "25px", md: "25px", sm: "20px", xs: "18px" }}
          fontFamily="Montserrat"
          fontWeight="500"
        >
          Tertip - düzgünnama (Aýratyn)
        </Typography>
        {user.role === "USER" ? (
          ""
        ) : (
          <Button
            sx={{
              color: "#2F6FD0",
              textTransform: "revert",
              background: "#E7E7FB",
              "&:hover": { background: "#E7E7FB" },
              gap: "10px",
              width: 250,
              height: 45,
              borderRadius: "20px",
            }}
            variant="outlined"
            onClick={handleOpen}
          >
            <AddIcon
              sx={{
                color: "#2F6FD0",
                width: 25,
                height: 25,
              }}
            />
            Düzgünnama goşmak
          </Button>
        )}

        <CreateStandarts
          open={open}
          userId={user.id}
          handleClose={handleClose}
        />
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
            sx={{
              height: "100%",
              // minHeight: "340px",
            }}
          >
            {filteredData.length == 0 ? (
              <Typography textAlign="center" mt={5} fontSize={18} width="100%">
                Düzgünnama ýok
              </Typography>
            ) : (
              <>
                <Stack direction="row" spacing={1}>
                  <Grid container item xs={12} md={6} lg={12} spacing={2}>
                    {filteredData.map((elem, index) => (
                      <Grid item xs={12} key={index} lg={12} sm={12}>
                        <Paper
                          sx={{
                            height: "100%",
                            minHeight: "155px",
                            borderRadius: "12px",
                            display: "flex",
                            // width: "400px",
                            width: "100%",
                            justifyContent: "space-around",
                            alignItems: "center",
                            p: 2,
                          }}
                        >
                          <Stack
                            width="98%"
                            sx={{
                              ...(elem.id == 4
                                ? {
                                    // flexDirection: "column",
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }
                                : ""),
                              gap: "16px",
                            }}
                            direction="column"
                            justifyContent="center"
                          >
                            <Stack
                              direction="row"
                              width="100%"
                              justifyContent="space-between"
                            >
                              <Typography
                                color="#222222"
                                fontSize={24}
                                fontFamily="DM Sans"
                                fontWeight={600}
                                width="90%"
                              >
                                {elem.title}
                                {elem.users &&
                                elem.users.length === UsersData.length ? (
                                  <Button
                                    sx={{
                                      color: "#F8F9FA",
                                      textTransform: "revert",
                                      background: "#2F6FD0",
                                      "&:hover": { background: "#2F6FD0" },
                                      gap: "10px",
                                      width: 140,
                                      height: 35,
                                      fontWeight: 500,
                                      borderRadius: "20px",
                                      border: `1px solid #00CCFF`,
                                      ...(index == 0 ? { ml: 3 } : { ml: 1 }),
                                    }}
                                    variant="outlined"
                                  >
                                    Ähli ulanyjylar
                                  </Button>
                                ) : (
                                  elem.users.map((item, index) => (
                                    <Button
                                      key={index}
                                      sx={{
                                        color: "#2F6FD0",
                                        textTransform: "revert",
                                        background: "#D9E8FF",
                                        "&:hover": { background: "#D9E8FF" },
                                        gap: "10px",
                                        // width: 75,
                                        height: 30,
                                        fontWeight: 500,
                                        borderRadius: "20px",
                                        border: `1px solid #2F6FD0`,
                                        ...(index == 0 ? { ml: 3 } : { ml: 1 }),
                                      }}
                                      variant="outlined"
                                    >
                                      {item.name} {item.surname}
                                    </Button>
                                  ))
                                )}
                              </Typography>
                              {user.role === "USER" ? (
                                ""
                              ) : (
                                <Stack
                                  direction="row"
                                  alignItems="end"
                                  spacing={1}
                                >
                                  <IconButton
                                    onClick={() => handleOpenLaborUpdate(elem)}
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
                                    onClick={() => handleDeleteLabor(elem.id)}
                                  >
                                    <img
                                      style={{ width: 20, height: 20 }}
                                      src={deleteIcon}
                                      alt=""
                                    />
                                  </IconButton>

                                  <UpdateStandarts
                                    data={update}
                                    openUpdate={openUpdate}
                                    handleClose={handleCloseLaborUpdate}
                                    userId={user.id}
                                  />
                                </Stack>
                              )}
                            </Stack>
                            <Typography
                              color="#666666"
                              fontSize={16}
                              fontFamily="DM Sans"
                              fontWeight={400}
                              whiteSpace="pre-wrap"
                              textAlign="justify"
                            >
                              {elem.description}
                            </Typography>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </>
            )}
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default SpecificStandart;
