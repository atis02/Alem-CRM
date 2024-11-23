import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  createPdf,
  createPdfByAdmin,
  deletePdf,
  getDocType,
} from "../../../Components/db/Redux/api/PdfSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserMonthWorkTime } from "../../../Components/db/Redux/api/ComeTimeSlice";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

const UpdateUserDocs = ({ id, handleCloseDocsModal, params }) => {
  const [files, setFiles] = useState(null);
  const [docName, setDocName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const docType = useSelector((state) => state.uploadPDf.docType);
  const status = useSelector((state) => state.uploadPDf.status);

  useEffect(() => {
    dispatch(getDocType(id));
  }, [dispatch]);
  const updateFiles = (e) => {
    const file = e.target.files[0];
    file && toast.success("Faýl saýlandy");
    setFiles(file);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Get the selected value
  };
  const handleUpload = () => {
    if (!docName) {
      toast.warn("Faýl ady giriz!");
      return;
    }
    if (!files) {
      toast.warn("Faýl saýlaň");
      return;
    }
    if (!selectedValue) {
      toast.warn("Faýl görnüşini saýlaň");
      return;
    }
    const body = new FormData();
    body.append("userId", id);
    body.append("title", docName);
    body.append("documentTypeId", selectedValue);
    body.append("file", files);
    const data = {
      body: body,
      userId: id,
      date: moment(params).format("YYYY-MM-DD"),
    };
    dispatch(createPdfByAdmin(data));
    setFiles(null);
    handleCloseDocsModal();
    setDocName("");
  };

  return (
    <>
      <ToastContainer />
      <Stack
        width="80%"
        spacing="20px"
        height="80%"
        position="relative"
        alignItems="start"
      >
        <Stack
          width="100%"
          justifyContent="space-between"
          spacing={1}
          height="100%"
        >
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
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              shrink
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
          Ýatda sakla
        </Button>
      </Stack>
    </>
  );
};

export default UpdateUserDocs;
