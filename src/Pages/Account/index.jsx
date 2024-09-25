import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import QRCodeComponent from "./components/QRCodeComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateImg } from "../../Components/db/Redux/api/ImageUpdateSlice";
import AxiosInstance from "../../Components/db/Redux/api/AxiosHelper";
import axios from "axios";
import { Capitalize } from "../../Components/utils";
import UpdateUserInfo from "../../layouts/UpdateUserInfo";

export default function Account() {
  const admin = JSON.parse(localStorage.getItem("CRM_USER"));

  const [email, setEmail] = useState(admin.mail);
  const [lastName, setLastName] = useState(admin.surname);
  const [phoneNumber, setPhoneNumber] = useState(
    admin.phoneNumber == null ? "+993 66778899" : admin.phoneNumber
  );
  const [username, setUserName] = useState(admin.name);
  const [position, setPosition] = useState(
    admin.position == null ? "ADMIN" : admin.position.name
  );
  const [address, setAddress] = useState(admin.whereLive);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const data = useSelector((state) => state.imgAccount.data);
  const status = useSelector((state) => state.imgAccount.status);
  const error = useSelector((state) => state.imgAccount.error);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const currentPassword = "AlemTilsimat50";
  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#F5F6FA"
      overflow="scroll"
    >
      <Stack>
        <Typography p="5px 20px" fontSize="30px" fontWeight="600">
          Profil
        </Typography>
        <Stack
          backgroundColor="#fff"
          direction="column"
          spacing={1}
          minHeight="79vh"
          borderRadius="20px"
          m="0px 20px 10px 20px"
          boxShadow=" 0px 0px 5px -2px rgba(0,0,0,0.75)"
        >
          <Stack alignItems="center" direction="column" pt={2}>
            <IconButton
              sx={{
                "&:hover .file-input-label2": {
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              <Stack position="relative" display="inline-block">
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="file"
                  accept=".img,.jpg,.png"
                  className="file-input2"
                />
                <label htmlFor="file" className="file-input-label2"></label>
              </Stack>
              <Stack
                width={80}
                height={80}
                borderRadius="100px"
                alignItems="center"
                justifyContent="center"
                bgcolor="#ECECEE"
              >
                {admin.img ? (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "100px",
                    }}
                    src={`http://192.168.1.46/images/${admin.img}`}
                    alt=""
                  />
                ) : (
                  <CameraAltIcon
                    sx={{
                      width: 25,
                      height: 25,
                    }}
                  />
                )}
              </Stack>
            </IconButton>
            {file !== null ? file.name : ""}

            <Typography fontSize={30} mb={2} fontWeight={600}>
              {admin.firstName}
            </Typography>
          </Stack>
          <Stack
            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            justifyContent="center"
          >
            {/* <Stack alignItems="center">
              <form
                // onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 360,
                  gap: "35px",
                }}
              >
                <Stack direction="column" justifyContent="space-between">
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    textAlign="start"
                    color="#474747"
                    mb="5px"
                  >
                    Ady
                  </Typography>
                  <TextField
                    fullWidth
                    value={username.toUpperCase()}
                    placeholder="Adyňyz"
                    type="text"
                    name="password"
                    onChange={(e) => setUserName(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#F5F6FA",
                        height: "55px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
                <Stack direction="column" justifyContent="space-between">
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    textAlign="start"
                    color="#474747"
                    mb="5px"
                  >
                    Poçta
                  </Typography>
                  <TextField
                    fullWidth
                    value={email.toUpperCase()}
                    placeholder="@gmail.com"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#F5F6FA",
                        height: "55px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
                <Stack direction="column" justifyContent="space-between">
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    textAlign="start"
                    color="#474747"
                    mb="5px"
                  >
                    Telefon belgi
                  </Typography>
                  <TextField
                    fullWidth
                    value={phoneNumber}
                    placeholder="Telefon Belgi"
                    type="text"
                    variant="outlined"
                    name="username"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#F5F6FA",
                        height: "55px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
              </form>
            </Stack> 
             <Stack alignItems="center">
              <form
                // onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 360,
                  gap: "35px",
                }}
              >
                <Stack direction="column" justifyContent="space-between">
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    textAlign="start"
                    color="#474747"
                    mb="5px"
                  >
                    Familiýasy
                  </Typography>
                  <TextField
                    fullWidth
                    value={lastName.toUpperCase()}
                    placeholder="Familiýasy"
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#F5F6FA",
                        height: "55px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
                <Stack direction="column" justifyContent="space-between">
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    textAlign="start"
                    color="#474747"
                    mb="5px"
                  >
                    Wezipe
                  </Typography>
                  <TextField
                    fullWidth
                    value={position.toUpperCase()}
                    placeholder="Işleýän wezipäňiz"
                    type="text"
                    name="Işleýän wezipäňiz"
                    onChange={(e) => setPosition(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#F5F6FA",
                        height: "55px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
                <Stack direction="column" justifyContent="space-between">
                  <Typography
                    fontSize={15}
                    fontWeight={600}
                    textAlign="start"
                    color="#474747"
                    mb="5px"
                  >
                    Salgy
                  </Typography>
                  <TextField
                    fullWidth
                    value={address}
                    placeholder="Öz ýaşaýan salgyňyz"
                    type="text"
                    variant="outlined"
                    name="salgy"
                    onChange={(e) => setAddress(e.target.value)}
                    InputProps={{
                      sx: {
                        transition: "all ease-in-out 0.2s",
                        borderRadius: "35px",
                        backgroundColor: "#F5F6FA",
                        height: "55px",
                        color: "#000",
                        outline: "none",
                        boxShadow: "none",
                      },
                    }}
                  />
                </Stack>
              </form>
            </Stack>  */}
            <UpdateUserInfo img={file} setFile={() => setFile(null)} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
