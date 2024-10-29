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
import {
  createPdf,
  updatePdf,
} from "../../../Components/db/Redux/api/PdfSlice";

const DocumentUpdateModal = ({ open, handleClose, data, docId }) => {
  const [files, setFiles] = useState(null);
  const [docName, setDocName] = useState((data && data.title) || "Goşmaça");
  const loggedUser = JSON.parse(localStorage.getItem("CRM_USER"));
  const [user, setUser] = useState(loggedUser);

  useEffect(() => {
    setDocName(data && data.title);

    setUser(loggedUser);
  }, [data]);

  const dispatch = useDispatch();
  const updateFiles = (e) => {
    const file = e.target.files[0];
    file && toast.success("Faýl saýlandy");
    setFiles(file);
  };

  const handleUpload = () => {
    if (docName == "") {
      toast.warn("Faýl ady giriz!");
      return;
    }

    const bodyForm = new FormData();
    bodyForm.append("userId", user.id);
    bodyForm.append("documentId", data.id);
    bodyForm.append("title", docName);
    bodyForm.append("file", files);
    bodyForm.append(
      "documentTypeId",
      data
        ? data.docTypeId
          ? data.docTypeId
          : data.documentType && data.documentType.id
        : "17e6fed6-a4bc-4d1d-98f1-d014fedb99f9"
    );
    const body = {
      title: docName,
      userId: user.id,
      documentId: data.id,
      documentTypeId: data
        ? data.docTypeId
          ? data.docTypeId
          : data.documentType && data.documentType.id
        : "17e6fed6-a4bc-4d1d-98f1-d014fedb99f9",
    };

    const data2 = {
      userId: user.id,
      body: files ? bodyForm : body,
      files: files ? files : null,
    };
    dispatch(updatePdf(data2));
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
    height: 430,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setFiles(null);
        handleClose();
      }}
    >
      <Box sx={style}>
        <Stack
          width="100%"
          bgcolor="#00B69B"
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
            Resminama üýtgetmek
          </Typography>
          <IconButton
            onClick={() => {
              setFiles(null);
              handleClose();
            }}
          >
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
            width="100%"
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
                height="100%"
                spacing={2}
              >
                <Typography fontSize={20} fontFamily="DM Sans">
                  Faýl
                </Typography>
                <input
                  type="file"
                  onChange={updateFiles}
                  id="file2"
                  accept=".docx,.xlsx,.pdf"
                  className="file-input"
                />
                <label htmlFor="file2" className="file-input-label"></label>
              </Stack>

              {files ? (
                <Stack>
                  <Typography>
                    Saýlanan faýl:
                    {files.name} - {(files.size / 1024).toFixed(2)} KB
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
            </Stack>
            <Stack width="100%" alignItems="end">
              <Button
                sx={{
                  color: "#9A93FF",
                  textTransform: "revert",
                  background: "#e7e7fb",
                  "&:hover": {
                    background: "#e7e7fb",
                    border: "1px solid #9A93FF ",
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

export default DocumentUpdateModal;
