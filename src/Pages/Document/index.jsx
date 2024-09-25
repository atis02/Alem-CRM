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
import QRCodeComponent from "../Account/components/QRCodeComponent";
import { Capitalize } from "../../Components/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  createPdf,
  deletePdf,
  getPDF,
} from "../../Components/db/Redux/api/PdfSlice";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
export const user = JSON.parse(localStorage.getItem("CRM_USER"));

const index = () => {
  const [files, setFiles] = useState(null);
  const [fileInfo, setFileInfo] = useState([]);

  const data = useSelector((state) => state.uploadPDf.data);
  const status = useSelector((state) => state.uploadPDf.status);
  const error = useSelector((state) => state.uploadPDf.error);

  const updateFiles = (e) => {
    setFiles(e.target.files[0]);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const user2 = JSON.parse(localStorage.getItem("CRM_USER"));
    dispatch(getPDF(user2.id));
  }, [dispatch]);

  const handleUpload = () => {
    if (files == null) {
      toast.warn("Faýl saýlaň");
    } else {
      const body = new FormData();
      body.append("userId", user.id);
      body.append("title", files.name);
      body.append("file", files);
      dispatch(createPdf(body));
      setFiles(null);
    }
  };
  const handleDeletePdf = (id) => {
    const body = {
      userId: user.id,
      documentId: id,
    };
    dispatch(deletePdf(body));
  };

  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#F5F6FA"
      overflow="scroll"
    >
      <Typography
        p="10px 20px"
        fontSize={{ lg: "32px", md: "30px", sm: "25px", xs: "20px" }}
        fontFamily="Poppins"
        fontWeight="500"
      >
        Resminama saýla
      </Typography>
      <Stack
        direction="row"
        backgroundColor="#fff"
        spacing="60px"
        minHeight="78vh"
        borderRadius="20px"
        m="0px 20px "
        pb="10px"
        boxShadow=" 0px 0px 8px -5px rgba(0,0,0,0.75)"
        alignItems=""
        padding=" 20px 0 0 30px"
      >
        <Stack
          width="48%"
          spacing="40px"
          height={450}
          position="relative"
          alignItems="start"
        >
          <Stack width="100%" pacing={1} height="70%">
            <input
              type="file"
              onChange={updateFiles}
              id="file"
              accept=".pdf, .docx "
              className="file-input"
              // style={{
              //   ...(files.length > 0 ? { height: "240px", width: "100%" } : ""),
              // }}
            />
            <label htmlFor="file" className="file-input-label"></label>
            {files !== null ? (
              <>
                <Typography>Ady : {files.name}</Typography>
                <Typography>Göwrümi : {files.size}B</Typography>
              </>
            ) : (
              "Faýl saýlaň"
            )}
          </Stack>
          <Button
            sx={{
              color: "#fff",
              background: "#9FC2A5",
              textTransform: "revert",
              width: "100%",
              minHeight: "55px",
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
        {status === "loading..." ? (
          <Stack
            direction="column"
            height="100%"
            alignItems="center"
            sx={{ gap: "10px", mt: "20px" }}
          >
            <CircularProgress />
            Loading...
          </Stack>
        ) : status === "failed" ? (
          <Typography textAlign="center" height="43%" mt={4}>
            Maglumat ýok
          </Typography>
        ) : status === "succeeded" ? (
          data.length === 0 ? (
            <Typography width="50%" pt={15} textAlign="center" fontSize={25}>
              Resminama ýok
            </Typography>
          ) : (
            <Stack width="45%">
              {data.map((elem) => (
                <>
                  <Stack
                    key={elem.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    minHeight="60px"
                    p="15px 20px"
                  >
                    <NavLink
                      to={`http://192.168.1.46/files/${elem.pathPdf}`}
                      style={{
                        textDecoration: "none",
                        color: "#474747",
                        width: "80%",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <FolderOpenIcon
                          sx={{ color: "#9FC2A5", width: 36, height: 36 }}
                        />
                        <Typography
                          fontFamily="Poppins"
                          fontWeight="400"
                          fontSize={22}
                          pl={3}
                          width="80%"
                        >
                          {Capitalize(elem.title)}
                        </Typography>
                      </Stack>
                    </NavLink>
                    <IconButton onClick={() => handleDeletePdf(elem.id)}>
                      <img
                        style={{ width: 24, height: 24 }}
                        src="/images/Delete.png"
                        alt=""
                      />
                    </IconButton>
                  </Stack>
                  <Divider />
                </>
              ))}
            </Stack>
          )
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default index;
