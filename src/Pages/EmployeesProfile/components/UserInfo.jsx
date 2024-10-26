import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  Modal,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { user } from "../../../Components/utils";
import call from "../../../../public/images/Phone.png";
import mail from "../../../../public/images/Envelope.png";
import send from "../../../../public/images/PaperPlaneRight.png";
import buildings from "../../../../public/images/Buildings.png";
import calendar from "../../../../public/images/Calendar2.png";
import Call from "../../../../public/images/call.png";
import globus from "../../../../public/images/globus.png";
import location from "../../../../public/images/location.png";
import mail2 from "../../../../public/images/mail.png";
import portfel from "../../../../public/images/portfel.png";
import DescriptionIcon from "@mui/icons-material/Description";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import deleteIcon from "../../../../public/images/Delete.png";
import addIcon from "../../../../public/images/addDoc.png";
import moment from "moment";
import EmployeesProjects from "./EmployeesProjects";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserMonthWorkTime,
  postUserStatus,
  updateUserRole,
} from "../../../Components/db/Redux/api/ComeTimeSlice";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import UpdateUserInfo from "./UpdateUserInfo";
import UpdateUserDocs from "./UpdateUserDocs";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  deletePdf,
  deletePdfForUser,
} from "../../../Components/db/Redux/api/PdfSlice";

const UserInfo = () => {
  const [open, setOpen] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDocsModal = () => setOpenDocs(true);
  const handleCloseDocsModal = () => setOpenDocs(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const status = useSelector((state) => state.getWorkDate.statusMonth);
  const data = useSelector((state) => state.getWorkDate.employeerTime);
  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  const params = searchParams.get("date");
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(
    (data.user && data.user.status) || false
  );
  const dispatch = useDispatch();
  const userButtonsData = [
    {
      img: call,
      title: "Jaň ",
      link: `tel:${data.user && data.user.phoneNumber}`,
      target: "_blank",
    },

    { img: send, title: "Sms", link: "/chat", target: "" },
    {
      img: mail,
      title: "Poçta",
      target: "_blank",
      link: `mailto:${data.user && data.user.mail}`,
    },
  ];
  useEffect(() => {
    setIsChecked(data.user && data.user.status);
  }, [data]);
  useEffect(() => {
    const body = {
      userId: id,
      date: moment(params).format("YYYY-MM-DD"),
    };
    dispatch(getUserMonthWorkTime(body));
  }, [dispatch]);
  const handleSetStatus = () => {
    const body = {
      userId: id,
      date: moment(params).format("YYYY-MM-DD"),
    };
    const data2 = {
      userId: id,
      status: isChecked === true ? false : true,
    };

    dispatch(postUserStatus({ body: body, data: data2 }));
  };
  const handleSwitchChange = (event) => {
    if (event) {
      setIsChecked(event.target.checked);
      handleSetStatus();
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    bgcolor: "background.paper",
    border: "1px solid lightgray",
    gap: "10px",
    height: 550,
    justifyContent: "center",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
  const handleDeletePdf = (id, docId) => {
    const body = {
      userId: id,
      documentId: docId,
      date: moment(params).format("YYYY-MM-DD"),
    };
    dispatch(deletePdfForUser(body));
  };

  return (
    <Stack
      backgroundColor="#fff"
      width="40%"
      height="82vh"
      borderRadius="20px"
      pb="10px"
      boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
      p="30px 24px 17px"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing="30px"
        height="55%"
      >
        {status === "loading..." ? (
          <Stack
            direction="column"
            height="100%"
            width="40%"
            alignItems="center"
            sx={{ gap: "10px", mt: "20px" }}
          >
            <CircularProgress />
          </Stack>
        ) : status === "failed" ? (
          <Typography textAlign="center" height="43%" mt={4}>
            Maglumat ýok
          </Typography>
        ) : status === "succeeded" ? (
          data.length === 0 ? (
            <Typography width="100%" pt={5} textAlign="center" fontSize={25}>
              Goşmaça resminama ýok
            </Typography>
          ) : (
            <>
              <Stack width="40%" alignItems="center">
                <Stack alignItems="center">
                  <IconButton sx={{ height: 96, width: 96 }}>
                    {data.user && data.user.img === null ? (
                      <Avatar
                        alt={data.user && data.user.name}
                        src={data.user && data.user.img}
                        sx={{ background: "#9FC2A6", height: 96, width: 96 }}
                      />
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "100px",
                        }}
                        src={`http://192.168.1.46/images/${
                          data.user && data.user.img
                        }`}
                        alt=""
                      />
                    )}
                  </IconButton>
                  <Typography
                    fontFamily="DM Sans"
                    fontWeight="400"
                    mt={1}
                    fontSize={18}
                  >
                    {data.user && data.user.name}{" "}
                    {data.user && data.user.surname}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isChecked} // Bind switch to state
                        onChange={handleSwitchChange} // Update state on toggle
                        color="primary"
                      />
                    }
                    label={`Işgär ${isChecked ? "Aktiw" : "Aktiw däl"}`} // Label showing switch state
                  />
                </Stack>
                <Stack
                  mt={3}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                >
                  {userButtonsData.map((elem, index) => (
                    <Stack
                      key={index}
                      sx={{
                        ...(elem.link == "tel:null" ||
                        elem.link == "mailto:null"
                          ? { display: "none" }
                          : { display: "block" }),
                      }}
                      width={50}
                      alignItems="center"
                    >
                      <IconButton
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "100%",
                          border: "1px solid #000",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <a
                          href={elem.link}
                          style={{ width: 25, height: 25 }}
                          target={elem.target}
                          rel="noopener noreferrer"
                        >
                          <img
                            src={elem.img}
                            style={{ width: 25, height: 25 }}
                            alt=""
                          />
                        </a>
                      </IconButton>
                      <Typography
                        mt="7px"
                        textAlign="center"
                        fontSize={14}
                        color="#727272"
                      >
                        {elem.title}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Stack width="60%">
                <Stack alignItems="end">
                  <IconButton
                    // onClick={() => {
                    //   handleOpen();
                    //   setDetails(user);
                    // }}
                    onClick={handleOpen}
                  >
                    <BorderColorOutlinedIcon
                      sx={{
                        color: "#727272",
                        width: 20,
                        height: 20,
                      }}
                    />
                  </IconButton>
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

                      <UpdateUserInfo
                        userData={data}
                        userId={data.user && data.user.id}
                        params={params}
                        handleClose={handleClose}
                      />
                    </Box>
                  </Modal>
                </Stack>
                <Stack>
                  {data.user && data.user.mail && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt="16px"
                    >
                      <img
                        src={mail2}
                        style={{ width: 25, height: 25 }}
                        alt="mail2"
                      />
                      <Typography
                        mt="7px"
                        textAlign="center"
                        fontSize={16}
                        color="#727272"
                      >
                        {data.user && data.user.mail}
                      </Typography>
                    </Stack>
                  )}
                  {data.user && data.user.phoneNumber && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt="10px"
                    >
                      <img
                        src={Call}
                        style={{ width: 25, height: 25 }}
                        alt="mail2"
                      />
                      <Typography
                        mt="7px"
                        textAlign="center"
                        fontSize={16}
                        color="#727272"
                      >
                        {data.user && data.user.phoneNumber}
                      </Typography>
                    </Stack>
                  )}
                  {data.user && data.user.languages && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt="10px"
                    >
                      <img
                        src={globus}
                        style={{ width: 25, height: 25 }}
                        alt="mail2"
                      />
                      <Typography
                        mt="7px"
                        textAlign="center"
                        fontSize={16}
                        color="#727272"
                      >
                        {data.user && data.user.languages}
                      </Typography>
                    </Stack>
                  )}
                  {data.user && data.user.whereStudy && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt="10px"
                    >
                      <img
                        src={portfel}
                        style={{ width: 25, height: 25 }}
                        alt="mail2"
                      />
                      <Typography
                        mt="7px"
                        textAlign="center"
                        fontSize={16}
                        color="#727272"
                      >
                        {data.user && data.user.whereStudy}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                <Stack>
                  {data.user && data.user.birthday && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt="16px"
                    >
                      <img
                        src={calendar}
                        style={{ width: 25, height: 25 }}
                        alt="mail2"
                      />
                      <Typography
                        mt="7px"
                        textAlign="center"
                        fontSize={16}
                        color="#727272"
                      >
                        {moment(data.user && data.user.birthday).format(
                          "DD/MM/YYYY"
                        )}
                      </Typography>
                    </Stack>
                  )}
                  {data.user && data.user.whereLive && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt="10px"
                    >
                      <img
                        src={location}
                        style={{ width: 25, height: 25 }}
                        alt="mail2"
                      />
                      <Typography
                        mt="7px"
                        textAlign="center"
                        fontSize={16}
                        color="#727272"
                      >
                        {data.user && data.user.whereLive}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </>
          )
        ) : null}
      </Stack>

      <Divider />
      <Stack height="45%">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Typography fontFamily="DM Sans" fontWeight="400" fontSize={18}>
            Resminamalar
          </Typography>
          <IconButton
            onClick={handleOpenDocsModal}
            sx={{
              width: 44,
              height: 36,
              bgcolor: "#eff5fc",
              border: "0.5px solid #90BAEB",
              borderRadius: "10px",
            }}
          >
            <img style={{ width: 24, height: 24 }} src={addIcon} alt="Delete" />
          </IconButton>
          <Modal
            open={openDocs}
            onClose={handleCloseDocsModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack alignItems="end" width="100%" p="0 20px" mt={2}>
                <IconButton
                  sx={{ fontWeight: 600, fontSize: 20 }}
                  onClick={handleCloseDocsModal}
                >
                  X
                </IconButton>
              </Stack>

              <UpdateUserDocs
                id={data.user && data.user.id}
                params={params}
                handleCloseDocsModal={handleCloseDocsModal}
              />
            </Box>
          </Modal>
        </Stack>
        {data.documents && data.documents.length == 0 ? (
          <Typography
            color="#727272"
            textAlign="center"
            height={205}
            fontSize={18}
            fontFamily="DM Sans"
          >
            Resminama ýok
          </Typography>
        ) : (
          <Stack height="100%" className="times2" overflow="auto">
            {data.documents &&
              data.documents.map((item, index) => (
                <Stack
                  spacing="18px"
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt="10px"
                >
                  <Stack direction="row" alignItems="center">
                    <Typography color="#727272" mr={2} fontFamily="DM Sans">
                      {index + 1}.
                    </Typography>

                    <DescriptionIcon sx={{ color: "#727272", mr: 2 }} />
                    <Link
                      to={`http://192.168.1.46/files/${item.pathPdf}`}
                      // onClick={() =>
                      //   (window.location.href = `http://192.168.1.46/files/${item.pathPdf}`)
                      // }
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "#474747",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography color="#727272" fontFamily="DM Sans">
                        {item.title}
                      </Typography>
                    </Link>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <IconButton>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#474747",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                        target="_blank"
                        to={`http://192.168.1.46/files/${item.pathPdf}`}
                      >
                        <RemoveRedEyeIcon sx={{ color: "#9FC2A6" }} />
                      </Link>
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDeletePdf(data.user && data.user.id, item.id)
                      }
                    >
                      <img
                        style={{ width: 24, height: 24 }}
                        src={deleteIcon}
                        alt="Delete"
                      />
                    </IconButton>
                  </Stack>
                </Stack>
              ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default UserInfo;
