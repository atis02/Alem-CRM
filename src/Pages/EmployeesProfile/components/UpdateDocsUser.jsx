import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  createPdf,
  createPdfByAdmin,
  getDocType,
  updatePdf,
  updatePdfByAdmin,
} from "../../../Components/db/Redux/api/PdfSlice";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const DocumentUpdateModal = ({ open, handleClose, data }) => {
  const [selectedValue, setSelectedValue] = useState(
    data?.documentTypeId || ""
  );
  const [files, setFiles] = useState(null);
  const [docName, setDocName] = useState(data?.title || "");
  const [searchParams] = useSearchParams();
  const params = searchParams.get("date");
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getDocType(data.id));
  }, [dispatch]);
  const docType = useSelector((state) => state.uploadPDf.docType);
  const status = useSelector((state) => state.uploadPDf.status);
  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Get the selected value
  };
  useEffect(() => {
    if (data && open) {
      setDocName(data.title || "Goşmaça");
      setSelectedValue(data.documentTypeId || "");
    }
  }, [data, open]);

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
    bodyForm.append("userId", data.userId);
    bodyForm.append("documentId", data.id);
    bodyForm.append("title", docName);
    bodyForm.append("file", files);
    bodyForm.append(
      "documentTypeId",
      data ? selectedValue : "17e6fed6-a4bc-4d1d-98f1-d014fedb99f9"
    );
    const body = {
      title: docName,
      userId: data.userId,
      documentId: data.id,
      documentTypeId: data
        ? selectedValue
        : "17e6fed6-a4bc-4d1d-98f1-d014fedb99f9",
    };

    const data2 = {
      userId: data.userId,
      body: files ? bodyForm : body,
      files: files ? files : null,
      date: moment(params).format("YYYY-MM-DD"),
    };

    dispatch(updatePdfByAdmin(data2));
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
    height: 500,
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
              <Stack direction="column" alignItems="center" spacing={2}>
                <TextField
                  label="Resminama ady"
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
                          color: "#d5dd5",
                          fontWeight: 400,
                          fontSize: 16,
                        },
                      },
                    },
                  }}
                  variant="outlined"
                />
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    // shrink
                    sx={{
                      transform: "translate(14px, 11px) scale(1)", // Adjust initial position
                      "&.Mui-focused, &.MuiFormLabel-filled": {
                        transform: "translate(14px, -9px) scale(0.75)", // Adjust position when focused
                      },
                      height: "45px",
                    }}
                  >
                    Resminama görnüşi
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    label="Resminama görnüşi"
                    onChange={handleChange}
                    sx={{
                      height: "45px",
                      borderRadius: "30px",
                    }}
                  >
                    {status === "succeeded" &&
                      docType.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
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
                  color: "#2F6FD0",
                  textTransform: "revert",
                  background: "#e7e7fb",
                  border: "1px solid #2F6FD0 ",
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

export default DocumentUpdateModal;
