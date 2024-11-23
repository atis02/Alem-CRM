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

const DocumentModal = ({ open, handleClose, data }) => {
  const [files, setFiles] = useState(null);
  const [docName, setDocName] = useState(data && data.name);
  const loggedUser = JSON.parse(localStorage.getItem("CRM_USER"));
  const [user, setUser] = useState(loggedUser);
  console.log(data);

  useEffect(() => {
    setDocName(data && data.name);

    setUser(loggedUser);
  }, [data]);
  console.log(data);

  const dispatch = useDispatch();
  const updateFiles = (e) => {
    const file = e.target.files[0];
    file && toast.success("Faýl saýlandy");
    setFiles(file);
    setDocName(file.name);
  };
  const handleUpload = () => {
    if (docName == "") {
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
    body.append("documentTypeId", data.id);
    const data2 = {
      userId: user.id,
      body: body,
    };
    dispatch(createPdf(data2));
    setFiles(null);
    setDocName("");
    handleClose();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    bgcolor: "background.paper",
    border: "0px solid lightgray",
    gap: "10px",
    maxHeight: 550,
    height: 460,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <Modal open={open} onClose={handleClose}>
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
            Goşmaça resminama
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
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
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography fontSize={20} fontFamily="DM Sans">
                  Ady
                </Typography>
                <TextField
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
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                height="80%"
                spacing={2}
              >
                <Typography fontSize={20} fontFamily="DM Sans">
                  Faýl
                </Typography>
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
            <Stack width="100%" alignItems="end">
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
                onClick={handleUpload}
              >
                + Goş
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DocumentModal;
