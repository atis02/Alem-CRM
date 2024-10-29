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

  const birthDoc = data.filter(
    (e) =>
      e.documentType && e.documentType.name === "Dogluş hakynda şahadatnama"
  );
  const pasport = data.filter(
    (e) => e.documentType && e.documentType.name === "Pasport"
  );
  const certficate = data.filter(
    (e) => e.documentType && e.documentType.name === "Sertifikat"
  );
  const diplom = data.filter(
    (e) => e.documentType && e.documentType.name === "Diplom , Attestat"
  );
  const weddDoc = data.filter(
    (e) => e.documentType && e.documentType.name === "Nika hakynda şahadatnama"
  );
  const militaryDoc = data.filter(
    (e) => e.documentType && e.documentType.name === "Harby bilet"
  );
  const driverDoc = data.filter(
    (e) => e.documentType && e.documentType.name === "Sürüjilik şahadatnamasy"
  );
  const additionalDoc = data.filter(
    (e) => e.documentType && e.documentType.name === "Goşmaça"
  );

  const getDocumentIds = (data, documentName) => {
    return data.filter((e) => e.name === documentName).map((e) => e.id); // Extract the documentType id
  };

  const birthDocIds = getDocumentIds(docType, "Dogluş hakynda şahadatnama");
  const passportIds = getDocumentIds(docType, "Pasport");
  const certificateIds = getDocumentIds(docType, "Sertifikat");
  const diplomaIds = getDocumentIds(docType, "Diplom , Attestat");
  const weddDocIds = getDocumentIds(docType, "Nika hakynda şahadatnama");
  const militaryDocIds = getDocumentIds(docType, "Harby bilet");
  const driverDocIds = getDocumentIds(docType, "Sürüjilik şahadatnamasy");

  const documents = [
    {
      id: birthDocIds[0],
      doc: birthDoc,
      defaultTitle: "Dogluş hakynda şahadatnama",
    },
    { id: passportIds[0], doc: pasport, defaultTitle: "Pasport" },
    {
      id: weddDocIds[0],
      doc: weddDoc,
      defaultTitle: "Nika hakynda şahadatnama",
    },
    { id: diplomaIds[0], doc: diplom, defaultTitle: "Diplom , Attestat" },
    { id: certificateIds[0], doc: certficate, defaultTitle: "Sertifikat" },
    { id: militaryDocIds[0], doc: militaryDoc, defaultTitle: "Harby bilet" },
    {
      id: driverDocIds[0],
      doc: driverDoc,
      defaultTitle: "Sürüjilik şahadatnamasy",
    },
  ];

  const docTypes = documents.map(({ doc, defaultTitle, id }) => ({
    originalName: doc?.[0]?.title || "",
    pathPdf: doc?.[0]?.pathPdf || "",
    docTypeId: id,
    id: doc?.[0]?.id,
    title: doc?.[0]?.documentType?.name || defaultTitle,
  }));

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
    const body = {
      userId: user.id,
      documentId: id,
    };
    dispatch(deletePdf(body));
  };
  const handleOpen = (elem) => {
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
    <Box height="100vh" width="100%" backgroundColor="#F5F6FA" overflow="auto">
      <Typography
        p="5px 20px"
        fontSize="30px"
        fontWeight="500"
        fontFamily="Montserrat"
      >
        Resminama saýla
      </Typography>
      <ToastContainer />

      <Stack
        direction="row"
        backgroundColor="#fff"
        spacing="60px"
        minHeight="80vh"
        borderRadius="20px"
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
                {docTypes.map((elem, idx) => (
                  <Stack
                    key={idx}
                    direction="row"
                    sx={{
                      borderBottom: "1px solid lightgray",
                    }}
                    alignItems="center"
                    justifyContent="space-between"
                    backgroundColor={elem.pathPdf ? "#efefef" : "#fff"}
                  >
                    <Stack
                      width="70%"
                      height={45}
                      alignItems="center"
                      direction="row"
                      pl={2.5}
                      minHeight="45px"
                    >
                      <FolderOpenIcon
                        sx={{
                          color: "#9FC2A5",
                          width: 36,
                          height: 36,
                        }}
                      />
                      <Typography
                        fontFamily="DM Sans"
                        fontWeight="400"
                        fontSize={20}
                        key={idx}
                        pl={5}
                        color="#474747"
                        width="80%"
                      >
                        {elem.title}{" "}
                        {elem.originalName ? `(${elem.originalName})` : ""}
                      </Typography>
                    </Stack>
                    <Stack direction="row">
                      {elem.pathPdf ? (
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
                              to={`http://192.168.1.46/files/${elem.pathPdf}`}
                            >
                              <RemoveRedEyeIcon sx={{ color: "#9FC2A6" }} />
                            </Link>
                          </IconButton>
                        </>
                      ) : (
                        ""
                      )}

                      {!elem.pathPdf ? (
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
                              color: "#9FC2A6",
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
                          onClick={() => handleDeletePdf(elem.id)}
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
              <Stack direction="row">
                <Typography
                  fontFamily="DM Sans"
                  fontWeight="400"
                  fontSize={20}
                  pt={1}
                  width="100%"
                >
                  Goşmaça
                </Typography>
                <Stack direction="row" pt={1}>
                  <IconButton
                    sx={{
                      width: 38,
                      height: 38,
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onClick={() => handleOpen("Goşmaça")}
                  >
                    <PostAddIcon
                      sx={{
                        color: "brown",
                        cursor: "pointer",
                        width: 28,
                        height: 28,
                      }}
                    />
                  </IconButton>
                  <DocumentModal
                    open={open}
                    data={docTitle}
                    handleClose={handleClose}
                  />
                </Stack>
              </Stack>
              <DocumentUpdateModal
                open={openUpdate}
                handleClose={handleCloseUpdate}
                data={docTitle}
                docId={docId}
              />
              {additionalDoc.map((elem) => (
                <React.Fragment key={elem.id}>
                  <Stack
                    direction="column"
                    // alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    minHeight="40px"
                    p="5px 0 0 20px"
                  >
                    <Stack direction="row">
                      <NavLink
                        to={`http://192.168.1.46/files/${elem.pathPdf}`}
                        style={{
                          textDecoration: "none",
                          color: "#474747",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                        target="_blank"
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <FolderOpenIcon
                            sx={{ color: "#9FC2A5", width: 36, height: 36 }}
                          />
                          <Typography
                            fontFamily="DM Sans"
                            fontWeight="400"
                            fontSize={20}
                            pl={3}
                            width="100%"
                          >
                            {Capitalize(elem.title)}
                          </Typography>
                        </Stack>
                      </NavLink>
                      {elem.pathPdf && (
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
                              to={`http://192.168.1.46/files/${elem.pathPdf}`}
                            >
                              <RemoveRedEyeIcon sx={{ color: "#9FC2A6" }} />
                            </Link>
                          </IconButton>
                        </>
                      )}
                      <IconButton onClick={() => handleDeletePdf(elem.id)}>
                        <img
                          style={{ width: 24, height: 24 }}
                          src={deleteIcon}
                          alt="Delete"
                        />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Divider />
                </React.Fragment>
              ))}
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Index;


