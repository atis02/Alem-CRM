import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { createPdf } from "../../../Components/db/Redux/api/PdfSlice";

const DocumentStepper = ({
  handleNext,
  openModal,
  handleBack,
  updateFiles,
  files,
}) => {
  // const [files, setFiles] = useState(null);
  const [docName, setDocName] = useState("Passport");
  const loggedUser = JSON.parse(localStorage.getItem("CRM_USER"));
  const [user, setUser] = useState(loggedUser);

  useEffect(() => {
    setUser(loggedUser);
  }, []);

  const dispatch = useDispatch();
  // const updateFiles = (e) => {
  //   const file = e.target.files[0];
  //   file && toast.success("Faýl saýlandy");
  //   setFiles(file);
  //   setDocName(file.name);
  // };
  const handleUpload = () => {
    if (docName == "") {
      toast.warn("Faýl ady giriz!");
      return;
    }
    if (!files) {
      toast.warn("Faýl saýlaň");
      return;
    }
    handleNext();

    // const body = new FormData();
    // body.append("userId", user.id);
    // body.append("title", docName);
    // body.append("file", files);
    // body.append("documentTypeId", "0b368ac2-e7a4-41e4-b749-26099c8c610e");
    // const data2 = {
    //   userId: user.id,
    //   body: body,
    // };
    // dispatch(createPdf(data2));
    // const bodyObject = {};
    // body.forEach((value, key) => {
    //   bodyObject[key] = value;
    // });
    // localStorage.setItem("RegisterDataDoc", JSON.stringify(bodyObject));
    // setFiles(null);
    // setDocName("");
    // handleClose();
  };
  const handleLogin = () => {
    openModal(true);
  };
  const style = {
    position: "absolute",
    top: "450%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "190%",
    bgcolor: "background.paper",
    border: "0px solid lightgray",
    gap: "10px",
    height: 450,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    boxShadow: "0px 0px 22px 3px rgba(168,168,168,1)",
    justifyContent: "center",
    borderRadius: "20px",
    mt: 8,
    pt: 2,
  };
  return (
    <Box sx={style}>
      {/* <Stack
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
          Goşmaça resminama
        </Typography>
        <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
          </Stack> */}
      <Stack
        width="95%"
        p={1}
        height="100%"
        overflow="auto"
        className="times"
        justifyContent="space-between"
      >
        <Stack
          width="95%"
          spacing="20px"
          height={450}
          position="relative"
          alignItems="start"
        >
          <Stack width="100%" spacing={1} height="95%">
            <Typography
              mb="10px"
              color="#474747"
              fontSize="25px"
              fontFamily="Montserrat"
              fontWeight="600"
              textAlign="start"
              ml={3}
            >
              {/* Hasaba alyş */}
              Resminamaňyzy ýükläň
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* <Typography fontSize={20} fontFamily="DM Sans">
                Ady
              </Typography> */}
              <Typography
                fontSize={20}
                textAlign="center"
                width="100%"
                fontFamily="DM Sans"
              >
                {docName}
              </Typography>
              {/* <TextField
                id="input-with-icon-textfield"
                placeholder="Resminama ady"
                onChange={(e) => setDocName(e.target.value)}
                fullWidth
                value={docName}
                sx={{
                  width: "100%",
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
              /> */}
            </Stack>
            <Stack direction="row" alignItems="center" height="80%" spacing={2}>
              {/* <Typography fontSize={20} fontFamily="DM Sans">
                Faýl
              </Typography> */}
              <input
                type="file"
                onChange={updateFiles}
                id="file"
                accept=".docx,.xlsx,.pdf"
                className="file-input"
              />
              <label htmlFor="file" className="file-input-label"></label>
            </Stack>

            {files ? (
              <Stack>
                <Typography>
                  Ady: {files.name} - {(files.size / 1024).toFixed(2)} KB
                </Typography>
              </Stack>
            ) : (
              ""
            )}
          </Stack>
          <Stack
            // direction="row"
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            width="100%"
            mt={2}
          >
            <Stack
              // direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
              direction="row"
              spacing={2}
              width="100%"
            ></Stack>
            <Button
              type="submit"
              onClick={handleBack}
              sx={{
                backgroundColor: "#fff",
                color: "blue",
                "&:hover": { background: "#fff" },
                fontFamily: "Montserrat",
                height: "55px",
                width: { lg: "120px", md: "100px", sm: "100%", xs: "100%" },
                border: "1px solid blue",
                borderRadius: "100px",
              }}
            >
              yza
            </Button>
            <Button
              type="submit"
              onClick={handleUpload}
              sx={{
                backgroundColor: "blue",
                color: "#fff",
                "&:hover": { background: "black" },
                fontFamily: "Montserrat",
                height: "55px",
                width: { lg: "120px", md: "100px", sm: "100%", xs: "100%" },

                borderRadius: "100px",
              }}
            >
              Indiki
            </Button>
          </Stack>
          {/* <Stack width="100%" alignItems="end">
            <Button
              sx={{
                color: "#2F6FD0",
                textTransform: "revert",
                background: "#e7e7fb",
                border: "1px solid #2F6FD0",

                "&:hover": {
                  background: "#e7e7fb",
                },
                gap: "10px",
                width: "30%",
                height: 45,
                fontSize: 20,
                borderRadius: "20px",
              }}
              onClick={handleNext}
            >
              + Goş
            </Button>
          </Stack> */}
        </Stack>
      </Stack>
    </Box>
  );
};

export default DocumentStepper;
