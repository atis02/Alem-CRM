import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStandartForAll,
  getStandartsForAll,
} from "../../../Components/db/Redux/api/StandartSlice";
import deleteIcon from "../../../../public/images/Delete.png";
import AddIcon from "@mui/icons-material/Add";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../Components/db/Redux/api/AxiosHelper";

const StandartsForNewUser = ({
  handleNext,
  openModal,
  handleBack,
  initialTime = 30,
  docFile,
  docName,
}) => {
  const [registerData, setRegisterData] = useState("");
  //   const [docName, setDocName] = useState("Passport");
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [update, setUpdate] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenLaborUpdate = (elem) => {
    setUpdate(elem);
    setOpenUpdate(true);
  };
  const navigate = useNavigate();
  const handleCloseLaborUpdate = () => setOpenUpdate(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.standarts.status);
  const error = useSelector((state) => state.standarts.error);
  const data = useSelector((state) => state.standarts.data);

  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("RegisterData"));
    if (savedData) {
      setRegisterData(savedData);
    }
  }, []);
  useEffect(() => {
    if (timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup timer on unmount
  }, [timeLeft]);
  // const allData = data.filter((elem) => !elem.users);
  // const filteredData = data.filter(
  //   (elem) => (elem.users && elem.users.length) !== UsersData.length
  // );
  const handleLogin = () => {
    openModal(true);
  };

  useEffect(() => {
    dispatch(getStandartsForAll());
  }, [dispatch]);

  const handleDeleteLabor = (id) => {
    const body = {
      laborId: id,
      userId: user.id,
      permissionUserId: user.id,
    };
    dispatch(deleteStandartForAll(body));
  };
  //   const updateFiles = (e) => {
  //     const file = e.target.files[0];
  //     file && toast.success("Faýl saýlandy");
  //     setFiles(file);
  //     setDocName(file.name);
  //   };
  const handleSubmit = async () => {
    if (!docFile) {
      toast.warn("Faýl saýlaň");
      return;
    }
    const body = new FormData();
    body.append("file", docFile);
    body.append("surname", registerData.surname);
    body.append("name", registerData.name);
    body.append("birthday", registerData.birthday);
    body.append("phoneNumber", registerData.phoneNumber);
    body.append("mail", registerData.mail);
    body.append("whereStudy", registerData.whereStudy);
    body.append("whereLive", registerData.whereLive);
    body.append("languages", registerData.languages);
    body.append("login", registerData.login);
    body.append("pass", registerData.pass);
    body.append("positionId", registerData.positionId);
    body.append("title", docName);
    body.append("documentTypeId", "0b368ac2-e7a4-41e4-b749-26099c8c610e");

    const response = await AxiosInstance.post("/registration/step", body);
    if (response.data.status === 200) {
      toast.success("Üstünlikli registrasiýa!");
      setTimeout(() => {
        openModal(false);
      }, 1500);
      localStorage.removeItem("RegisterData");
    }
    setFiles(null);
  };

  return (
    <Box
      position="absolute"
      left="-165%"
      height="80vh"
      width="230%"
      backgroundColor="#fff"
      p="10px"
      mt={2}
      borderRadius="20px"
      //   boxShadow="0px 0px 22px 3px rgba(168,168,168,1)"
      justifyContent="center"
    >
      <Stack
        direction="row"
        alignItems="center"
        // justifyContent="space-between"
        p="0 10px 8px 0"
      >
        {/* {user.role === "USER" ? (
          ""
        ) : (
          <Button
            sx={{
              color: "#2F6FD0",
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
                color: "#2F6FD0",
                width: 25,
                height: 25,
              }}
            />
            Düzgünnama goşmak
          </Button>
        )}

        <CreateStandartsForAll
          open={open}
          userId={user.id}
          handleClose={handleClose}
        /> */}
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
            {!data.length ? (
              <Typography textAlign="center" mt={5} fontSize={18} width="100%">
                Düzgünnama ýok
              </Typography>
            ) : (
              <>
                <Stack direction="row" spacing={1}>
                  <Grid
                    container
                    item
                    height="100%"
                    xs={12}
                    md={6}
                    lg={12}
                    spacing={2}
                  >
                    <Stack width="100%">
                      {data.length &&
                        data.map((elem, index) => (
                          <Grid
                            item
                            xs={12}
                            key={index}
                            mt={index == 0 ? "" : 2}
                            lg={12}
                            sm={12}
                          >
                            <Stack
                              width="97%"
                              sx={{
                                ...(elem.id == 4
                                  ? {
                                      cursor: "pointer",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }
                                  : ""),
                                gap: "16px",
                                height: "420px",
                                overflow: "auto",
                              }}
                              direction="column"
                              justifyContent="center"
                            >
                              <Stack
                                direction="row"
                                width="100%"
                                justifyContent="space-between"
                              >
                                <Stack
                                  direction="row"
                                  width="100%"
                                  justifyContent="space-between"
                                  alignItems="center"
                                >
                                  <Typography
                                    color="#474747"
                                    fontSize={24}
                                    fontFamily="DM Sans"
                                    fontWeight={600}
                                    width="90%"
                                  >
                                    {elem.title}
                                  </Typography>
                                </Stack>
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
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mt: 3,
                              }}
                            >
                              <Checkbox
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                color="primary"
                              />
                              <Typography variant="body1">
                                Tanyşdym ylalaşýaryn
                              </Typography>
                            </Box>
                            <Stack
                              direction={{
                                lg: "row",
                                md: "row",
                                sm: "row",
                                xs: "column",
                              }}
                              alignItems="center"
                              justifyContent="flex-end"
                              spacing={2}
                              width="97%"
                              mt={2}
                            >
                              <Button
                                type="submit"
                                onClick={handleBack}
                                sx={{
                                  backgroundColor: "#fff",
                                  color: "blue",
                                  "&:hover": { background: "#fff" },
                                  fontFamily: "Montserrat",
                                  height: "55px",
                                  width: {
                                    lg: "120px",
                                    md: "100px",
                                    sm: "100%",
                                    xs: "100%",
                                  },
                                  border: "1px solid blue",
                                  borderRadius: "100px",
                                }}
                              >
                                yza
                              </Button>
                              <Button
                                disabled={timeLeft !== 0 || isChecked == false}
                                onClick={handleSubmit}
                                sx={{
                                  backgroundColor: "#fff",
                                  color: "blue",
                                  "&:hover": { background: "#fff" },
                                  fontFamily: "Montserrat",
                                  height: "55px",
                                  width: {
                                    lg: "190px",
                                    md: "100px",
                                    sm: "100%",
                                    xs: "100%",
                                  },
                                  border: "1px solid blue",
                                  borderRadius: "100px",
                                }}
                              >
                                Hasaba al
                              </Button>
                              <Stack
                                backgroundColor="#1976D2"
                                width={30}
                                height={30}
                                alignItems="center"
                                justifyContent="center"
                                color="#fff"
                                borderRadius="100%"
                              >
                                {timeLeft}
                              </Stack>
                            </Stack>
                          </Grid>
                        ))}
                    </Stack>
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

export default StandartsForNewUser;
