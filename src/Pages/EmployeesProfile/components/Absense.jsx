import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Grid2,
  CircularProgress,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddAbsense from "./AddAbsense";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  deleteAbsense,
  getAbsenseForUser,
} from "../../../Components/db/Redux/api/AbsenseSlice";
import { user } from "../../../Components/utils";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UpdateAbsense from "./UpdateAbsense";
const Absense = ({ open, handleClose, data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [userData, setUserData] = useState(data && data.id);
  const [updateData, setUpdateData] = useState();

  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenUpdateModal(false);
    setOpenModal(false);
  };

  const dispatch = useDispatch();
  const absenseData = useSelector((state) => state.absense.data);
  const status = useSelector((state) => state.absense.status);
  const error = useSelector((state) => state.absense.error);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    bgcolor: "background.paper",
    border: "1px solid lightgray",
    gap: "10px",
    height: 650,
    // justifyContent: "center",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
  useEffect(() => {
    data && setUserData(data.id);
  }, [data]);

  useEffect(() => {
    if (userData) {
      dispatch(
        getAbsenseForUser({
          permissionUserId: user.id,
          userId: userData,
        })
      );
    }
  }, [dispatch, userData]);
  const handleDeleteAbsense = (id) => {
    const body = {
      absenceId: id,
      userId: userData,
      permissionUserId: user.id,
    };
    dispatch(deleteAbsense(body));
  };
  const handleUpdateAbsense = (elem) => {
    setOpenUpdateModal(true);
    setUpdateData(elem);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Stack
          width="100%"
          bgcolor="#2F6FD0"
          p="15px 20px"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          textTransform="capitalize"
          sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        >
          <Typography
            color="#fff"
            fontSize={24}
            fontWeight={400}
            fontFamily="DM Sans"
          >
            Ulanyjy Rugsat güni
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
        <Stack alignItems="end" width="98%">
          <Button
            sx={{
              color: "#9A93FF",
              textTransform: "revert",
              background: "#e7e7fb",
              "&:hover": { background: "#e7e7fb" },
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
                color: "#90BAEB",
                width: 25,
                height: 25,
              }}
            />
            Täze Rugsat güni
          </Button>
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
              flexWrap="wrap"
            >
              {absenseData.length == 0 ? (
                <Typography
                  textAlign="center"
                  mt={5}
                  fontSize={18}
                  width="100%"
                >
                  Rugsatly guni ýok
                </Typography>
              ) : (
                <>
                  <Grid2 container item xs={12} md={6} lg={12} spacing={2}>
                    {absenseData.map((elem, index) => (
                      <Grid2 item xs={12} key={index} lg={12} sm={12}>
                        <Paper
                          sx={{
                            height: "100%",
                            flexWrap: "wrap",
                            minHeight: "155px",
                            borderRadius: "12px",
                            display: "flex",
                            width: "300px",
                            // width: "100%",
                            justifyContent: "space-around",
                            alignItems: "start",
                            bgcolor: elem.color,
                            p: 1,
                          }}
                        >
                          <Stack
                            width="95%"
                            // p="15px 0"
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
                            justifyContent="flex-start"
                          >
                            <Stack
                              direction="row"
                              width="100%"
                              justifyContent="flex-start"
                              alignItems="center"
                            >
                              <Typography
                                color="#fff"
                                fontSize={22}
                                fontFamily="DM Sans"
                                fontWeight={500}
                                width="90%"
                                // textAlign="center"
                              >
                                {index + 1}. {elem.reason}
                              </Typography>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={-1}
                              >
                                <IconButton
                                  onClick={() => handleDeleteAbsense(elem.id)}
                                >
                                  <DeleteOutlineIcon sx={{ color: "#fff" }} />
                                </IconButton>

                                <IconButton
                                  onClick={() => handleUpdateAbsense(elem)}
                                >
                                  <BorderColorOutlinedIcon
                                    sx={{
                                      color: "#fff",
                                      width: 20,
                                      height: 20,
                                    }}
                                  />
                                </IconButton>
                              </Stack>
                            </Stack>
                            <Typography
                              color="#fff"
                              fontSize={16}
                              fontFamily="DM Sans"
                              fontWeight={400}
                              whiteSpace="pre-wrap"
                            >
                              Baslanýan senesi:{" "}
                              {dayjs(elem.startDate).format("DD.MM.YYYY")}
                            </Typography>
                            <Typography
                              color="#fff"
                              fontSize={16}
                              fontFamily="DM Sans"
                              fontWeight={400}
                              whiteSpace="pre-wrap"
                            >
                              Tamamlanýan senesi:{" "}
                              {dayjs(elem.endDate).format("DD.MM.YYYY")}
                            </Typography>
                          </Stack>
                        </Paper>
                      </Grid2>
                    ))}
                  </Grid2>
                </>
              )}
            </Stack>
          ) : (
            ""
          )}
        </Stack>
        <AddAbsense
          open={openModal}
          handleCloseModal={handleCloseModal}
          data={data}
          absenseData={absenseData}
        />
        <UpdateAbsense
          open={openUpdateModal}
          handleCloseModal={handleCloseModal}
          data={data}
          absenseData={updateData}
        />
      </Box>
    </Modal>
  );
};

export default Absense;
