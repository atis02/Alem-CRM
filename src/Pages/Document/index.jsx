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
import {
  createPdf,
  deletePdf,
  getPDF,
} from "../../Components/db/Redux/api/PdfSlice";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import deleteIcon from "../../../public/images/Delete.png";

export const user = JSON.parse(localStorage.getItem("CRM_USER"));

const Index = () => {
  const [files, setFiles] = useState(null);
  const [docName, setDocName] = useState("");

  const data = useSelector((state) => state.uploadPDf.data);
  const status = useSelector((state) => state.uploadPDf.status);
  const error = useSelector((state) => state.uploadPDf.error);
  const progress = useSelector((state) => state.uploadPDf.uploadProgress);

  const dispatch = useDispatch();

  useEffect(() => {
    const user2 = JSON.parse(localStorage.getItem("CRM_USER"));
    dispatch(getPDF(user2.id));
  }, [dispatch]);

  const updateFiles = (e) => {
    const file = e.target.files[0];
    file && toast.success("Faýl saýlandy");
    setFiles(file);
  };
  const birthDoc = data.filter((e) => e.title === "Dogluş hakynda şahadatnama");
  const pasport = data.filter((e) => e.title === "Pasport");
  const certficate = data.filter((e) => e.title === "Sertifikat");
  const diplom = data.filter((e) => e.title === "Diplom , Attestat");
  const weddDoc = data.filter((e) => e.title === "Nika hakynda şahadatnama");
  // console.log(birthDoc[0].id);

  const docTypes = [
    {
      pathPdf: birthDoc.length && birthDoc[0].pathPdf,
      id: birthDoc.length && birthDoc[0].id,
      title: "Dogluş hakynda şahadatnama",
    },
    {
      pathPdf: pasport.length && pasport[0].pathPdf,
      id: pasport.length && pasport[0].id,
      title: "Pasport",
    },
    {
      pathPdf: weddDoc.length && weddDoc[0].pathPdf,
      id: weddDoc.length && weddDoc[0].id,
      title: "Nika hakynda şahadatnama",
    },
    {
      pathPdf: diplom.length && diplom[0].pathPdf,
      id: diplom.length && diplom[0].id,
      title: "Diplom , Attestat",
    },
    {
      pathPdf: certficate.length && certficate[0].pathPdf,
      id: certficate.length && certficate[0].id,
      title: "Sertifikat",
    },
  ];
  const allData = data.filter(
    (e) => !docTypes.map((doc) => doc.title).includes(e.title.trim())
  );
  console.log(docName);
  const handleUpload = () => {
    if (!docName) {
      toast.warn("Faýl ady giriz!");
      return;
    }
    if (!files) {
      toast.warn("Faýl saýlaň");
      return;
    }

    const body = new FormData();
    body.append("userId", user.id);
    body.append("title", docName);
    body.append("file", files);
    dispatch(createPdf(body));
    setFiles(null);
    setDocName("");
  };

  const handleUploadFile = (e, name) => {
    const body = new FormData();
    body.append("userId", user.id);
    body.append("title", name);

    // Get the selected file
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      body.append("file", selectedFile);
    } else {
      console.error("No file selected");
      return;
    }

    console.log(selectedFile); // To verify the file

    // Dispatch the action to upload the file
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
      documentId: id,
    };
    dispatch(deletePdf(body));
  };
  return (
    <Box height="100vh" width="100%" backgroundColor="#F5F6FA" overflow="auto">
      <Typography
        p="10px 20px"
        fontSize={{ lg: "32px", md: "30px", sm: "25px", xs: "20px" }}
        fontFamily="Montserrat"
        fontWeight="500"
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
        padding="20px 0 0 30px"
        justifyContent="space-between"
      >
        <Stack
          width="40%"
          spacing="20px"
          height={450}
          position="relative"
          alignItems="start"
        >
          <Stack width="100%" spacing={1} height="65%">
            <TextField
              id="input-with-icon-textfield"
              placeholder="Resminama ady"
              onChange={(e) => setDocName(e.target.value)}
              fullWidth
              value={docName}
              sx={{
                width: { lg: "430px", md: "100%", sm: "100%", xs: "100%" },
              }}
              InputProps={{
                sx: {
                  transition: "all ease-in-out 0.2s",
                  borderRadius: "35px",
                  backgroundColor: "#fff",
                  height: "45px",
                  color: "#000",
                  fontWeight: "400",
                  outline: "none",
                  boxShadow: "none",
                },
                inputProps: {
                  sx: {
                    "&::placeholder": {
                      color: "#d5dd5", // Set the placeholder color
                      fontWeight: 400,
                      fontSize: 16,
                    },
                  },
                },
              }}
              variant="outlined"
            />
            <input
              type="file"
              onChange={updateFiles}
              id="file"
              accept=".docx,.xlsx,.pdf"
              className="file-input"
            />
            <label htmlFor="file" className="file-input-label"></label>
            {files ? (
              <Stack>
                <Typography>
                  Ady: {files.name} - {(files.size / 1024).toFixed(2)} KB
                </Typography>
              </Stack>
            ) : (
              <Typography>Faýl saýlaň</Typography>
            )}
          </Stack>
          <Button
            sx={{
              color: "#fff",
              background: "#9FC2A5",
              textTransform: "revert",
              width: "100%",
              height: "45px",
              borderRadius: "50px",
              fontSize: 23,
              fontWeight: 500,
              "&:hover": { background: "#9FC2A5" },
            }}
            onClick={handleUpload}
          >
            + Goş
          </Button>
        </Stack>
        <Stack width="70%">
          <Stack width="95%">
            {docTypes.map((elem, idx) => (
              <Stack
                direction="row"
                sx={{
                  borderBottom: "1px solid lightgray",
                }}
                alignItems="center"
              >
                <NavLink
                  to={`http://192.168.1.46/files/${elem.pathPdf}`}
                  style={{
                    textDecoration: "none",
                    color: "#474747",
                    width: "90%",
                  }}
                  target="_blank"
                >
                  <Stack
                    height={45}
                    alignItems="center"
                    direction="row"
                    pl={2.5}
                    minHeight="60px"
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
                      {elem.title}
                    </Typography>
                  </Stack>
                </NavLink>
                <IconButton
                  sx={{
                    width: 38,
                    height: 38,
                    position: "relative",
                    overflow: "hidden",
                    ...(shouldDisplayIconButton(elem.title)
                      ? { display: "block" }
                      : { display: "none" }),
                  }}
                >
                  <input
                    type="file"
                    accept=".docx,.xlsx,.pdf"
                    onChange={(e) => handleUploadFile(e, elem.title)}
                    id="file"
                    // className="file-input"
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
                  />
                  <PostAddIcon
                    sx={{
                      color: "#9FC2A6",
                      cursor: "pointer",
                      width: 28,
                      height: 28,
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{
                    width: 38,
                    height: 38,
                    ...(!shouldDisplayIconButton(elem.title)
                      ? { display: "block" }
                      : { display: "none" }),
                  }}
                  onClick={() => handleDeletePdf(elem.id)}
                >
                  <img
                    style={{ width: 24, height: 24 }}
                    src={deleteIcon}
                    alt="Delete"
                  />
                </IconButton>
              </Stack>
            ))}
          </Stack>
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
            allData.length === 0 ? (
              <Typography width="100%" pt={5} textAlign="center" fontSize={25}>
                Goşmaça resminama ýok
              </Typography>
            ) : (
              <Stack width="95%" justifyContent="flex-end">
                <Typography
                  fontFamily="DM Sans"
                  fontWeight="400"
                  fontSize={20}
                  pt={2}
                  width="100%"
                >
                  Goşmaça
                </Typography>
                {allData.map((elem) => (
                  <React.Fragment key={elem.id}>
                    <Stack
                      direction="column"
                      // alignItems="center"
                      justifyContent="space-between"
                      width="100%"
                      minHeight="60px"
                      p="15px 20px"
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
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
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
            )
          ) : null}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Index;
