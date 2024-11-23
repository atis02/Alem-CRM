import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Capitalize } from "../../Components/utils";
import { useDispatch, useSelector } from "react-redux";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  createPdf,
  deletePdf,
  getDocType,
  getPDF,
} from "../../Components/db/Redux/api/PdfSlice";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { toast, ToastContainer } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import deleteIcon from "../../../public/images/Delete.png";
import DocumentModal from "./components/DocumentModal";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DocumentUpdateModal from "./components/DocumentUpdateModal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Index = () => {
  const [docTitle, setDocTitle] = useState("");
  const [docId, setDocId] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem("CRM_USER"));
  const [user, setUser] = useState(loggedUser);
  useEffect(() => {
    setUser(loggedUser);
  }, []);
  const data = useSelector((state) => state.uploadPDf.data);
  const docType = useSelector((state) => state.uploadPDf.docType);
  const status = useSelector((state) => state.uploadPDf.status);
  const error = useSelector((state) => state.uploadPDf.error);
  const progress = useSelector((state) => state.uploadPDf.uploadProgress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocType(user.id));
    dispatch(getPDF(user.id));
  }, [dispatch]);
  console.log(docType);
  console.log(data);

  const handleUploadFile = (e, name, id) => {
    const body = new FormData();
    body.append("userId", user.id);
    body.append("title", name);
    body.append("documentTypeId", id);

    // Get the selected file
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      body.append("file", selectedFile);
    } else {
      console.error("No file selected");
      return;
    }

    dispatch(createPdf(body));
  };
  const shouldDisplayIconButton = (title) => {
    return !(
      birthDoc.some((doc) => doc.title === title) ||
      pasport.some((doc) => doc.title === title) ||
      certficate.some((doc) => doc.title === title) ||
      diplom.some((doc) => doc.title === title) ||
      weddDoc.some((doc) => doc.title === title)
    );
  };
  const handleDeletePdf = (id) => {
    console.log(id);

    const body = {
      userId: user.id,
      documentId: id[0].id,
    };
    dispatch(deletePdf(body));
  };
  const handleOpen = (elem) => {
    console.log(elem);

    setDocTitle(elem);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleOpenUpdate = (elem) => {
    setDocId(elem.documentType && elem.documentType.id);

    setDocTitle(elem);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  return (
    <Box height="100vh" width="100%" backgroundColor="#fff" overflow="auto">
      <Typography
        p="5px 20px"
        fontSize="30px"
        fontWeight="500"
        fontFamily="Montserrat"
      >
        Resminama
      </Typography>
      <ToastContainer />

      <Stack
        direction="row"
        backgroundColor="#fff"
        spacing="60px"
        minHeight="80vh"
        borderRadius="10px"
        m="0px 20px "
        pb="10px"
        boxShadow="0px 0px 8px -5px rgba(0,0,0,0.75)"
        padding="0px 0 30px"
        justifyContent="space-between"
      >
        <Stack width="100%" justifyContent="flex-start" alignItems="center">
          {status === "loading..." ? (
            <Stack
              direction="column"
              height="100%"
              width="40%"
              alignItems="center"
              sx={{ gap: "10px", mt: "20px" }}
            >
              <CircularProgress />
              <Typography>{progress}% Loading...</Typography>
            </Stack>
          ) : status === "failed" ? (
            <Typography textAlign="center" height="43%" mt={4}>
              Maglumat ýok: {error}
            </Typography>
          ) : status === "succeeded" ? (
            <Stack width="95%" mt={2}>
              <Stack width="100%">
                <Typography
                  fontFamily="DM Sans"
                  fontWeight="400"
                  fontSize={20}
                  pb={1}
                  width="100%"
                >
                  Esasy
                </Typography>
                <Divider />

                {data.map((elem, idx) => (
                  <Stack
                    key={idx}
                    direction="row"
                    sx={{
                      borderBottom: "1px solid lightgray",
                    }}
                    alignItems="center"
                    justifyContent="space-between"
                    backgroundColor="#fff"
                  >
                    <Stack
                      width="80%"
                      height={45}
                      alignItems="center"
                      direction="row"
                      pl={2.5}
                      minHeight="45px"
                    >
                      <FolderOpenIcon
                        sx={{
                          color: "#2F6FD0",
                          width: 36,
                          height: 36,
                        }}
                      />
                      <Typography
                        fontFamily="DM Sans"
                        fontWeight="400"
                        fontSize={18}
                        key={idx}
                        pl={5}
                        color="#474747"
                        width="100%"
                      >
                        {elem.name}{" "}
                        {elem.pdfDocuments.length
                          ? `( ${
                              elem.pdfDocuments &&
                              elem.pdfDocuments.map((item) => item.title)
                            })`
                          : ""}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      {elem.pdfDocuments && elem.pdfDocuments.length ? (
                        <>
                          <IconButton onClick={() => handleOpenUpdate(elem)}>
                            <BorderColorOutlinedIcon
                              sx={{
                                color: "#0099ED",
                                width: 20,
                                height: 20,
                              }}
                            />
                          </IconButton>

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
                              to={`http://192.168.1.46/files/${elem.pdfDocuments[0].pathPdf}`}
                            >
                              <RemoveRedEyeIcon sx={{ color: "#9FA1C2" }} />
                            </Link>
                          </IconButton>
                        </>
                      ) : (
                        ""
                      )}

                      {!elem.pdfDocuments.length ? (
                        <IconButton
                          sx={{
                            width: 38,
                            height: 38,
                            position: "relative",
                            overflow: "hidden",
                            // ...(shouldDisplayIconButton(elem.title)
                            //   ? { display: "block" }
                            //   : { display: "none" }),
                          }}
                          onClick={() => handleOpen(elem)}
                        >
                          {/* <input
                            type="file"
                            accept=".docx,.xlsx,.pdf"
                            onChange={handleOpen}
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              zIndex: 100,
                              right: 0,
                              bottom: 0,
                              width: "100%",
                              height: "100%",
                              opacity: 0,
                              cursor: "pointer",
                            }}
                          /> */}
                          <PostAddIcon
                            sx={{
                              color: "#2F6FD0",
                              cursor: "pointer",
                              width: 28,
                              height: 28,
                            }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{
                            width: 38,
                            height: 38,
                          }}
                          onClick={() => handleDeletePdf(elem.pdfDocuments)}
                        >
                          <img
                            style={{ width: 24, height: 24 }}
                            src={deleteIcon}
                            alt="Delete"
                          />
                        </IconButton>
                      )}
                    </Stack>
                  </Stack>
                ))}
              </Stack>

              <DocumentModal
                open={open}
                data={docTitle}
                handleClose={handleClose}
              />
              <DocumentUpdateModal
                open={openUpdate}
                handleClose={handleCloseUpdate}
                data={docTitle}
                docId={docId}
              />
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Index;


