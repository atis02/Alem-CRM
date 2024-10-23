import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { createPdf } from "../../../Components/db/Redux/api/PdfSlice";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";

const UpdateUserDocs = ({ id }) => {
  const [files, setFiles] = useState(null);
  const [docName, setDocName] = useState("");
  const dispatch = useDispatch();
  const updateFiles = (e) => {
    const file = e.target.files[0];
    file && toast.success("Faýl saýlandy");
    setFiles(file);
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

    const body = new FormData();
    body.append("userId", id);
    body.append("title", docName);
    body.append("file", files);
    dispatch(createPdf(body));
    setFiles(null);
    setDocName("");
  };
  return (
    <>
      <Toaster />
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
          height="65%"
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
    </>
  );
};

export default UpdateUserDocs;
