import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginFailure,
  loginSuccess,
  registerFailure,
} from "../Components/db/Redux/reducers/AuthSlice";
import AxiosInstance from "../Components/db/Redux/api/AxiosHelper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Capitalize } from "../Components/utils";
import { updateImg } from "../Components/db/Redux/api/ImageUpdateSlice";
// import { jwtDecode } from "jwt-decode";

const UpdateUserInfo = ({ img, setFile }) => {
  const admin = JSON.parse(localStorage.getItem("CRM_USER"));

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(admin.mail);
  const [phoneNumber, setPhoneNumber] = useState(admin.phoneNumber);
  const [logined, setLogined] = useState("");
  const [surname, setSurname] = useState(admin.surname);
  const [name, setName] = useState(admin.name);
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    admin.position ? admin.position.id : "ADMIN"
  );
  const [selectedValueLang, setSelectedValueLang] = useState(admin.languages);
  const [education, setEducation] = useState(admin.whereStudy);
  const [live, setLive] = useState(admin.whereLive);
  const [value, setValue] = useState(dayjs(admin.birthday)); //user birthday
  const [position, setPosition] = useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeLng = (event) => {
    setSelectedValueLang(event.target.value);
  };
  const handleUpdateImg = () => {
    const body = new FormData();
    body.append("file", img);
    body.append("userId", admin.id);
    if (img !== null) {
      dispatch(updateImg(body));
    }
    setFile(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const position = async () => {
      await AxiosInstance.get("/position/get").then((res) => {
        setPosition(res.data);
      });
    };

    position();
  }, []);
  const data = useSelector((state) => state.imgAccount.updated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        email.trim().length <= 0 ||
        name.trim().length <= 0 ||
        email.trim().length <= 0 ||
        phoneNumber.trim().length <= 0
      ) {
        toast.error("Dogry maglumatyňyzy giriziň!");
      } else {
        setLoading(true);
        const response = await AxiosInstance.put("/user/updata/info", {
          userId: admin.id,
          surname: Capitalize(surname),
          name: Capitalize(name),
          mail: email,
          phoneNumber: phoneNumber,
          birthday: value,
          whereStudy: education,
          whereLive: live,
          languages: selectedValueLang,
          positionId: selectedValue,
        }).then((res) => {
          res.data
            ? (localStorage.setItem("CRM_USER", JSON.stringify(res.data)),
              toast.success("Maglumat üýtgedildi!"),
              handleUpdateImg(),
              setLoading(false))
            : "";
        });
      }
    } catch (error) {
      toast.error(
        error.message === "Network Error"
          ? "Internet baglanyşygy ýok"
          : error.response.data
      );

      setLoading(false);
    }
  };

  return (
    <Stack direction="column" width="80%">
      <Stack justifyContent="space-between" width="100%">
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
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
                id="outlined-basic"
                type="text"
                value={name}
                name="password"
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "100px",
                    height: "60px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
              <Typography
                fontSize={15}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Familiýa
              </Typography>
              <TextField
                id="outlined-basic"
                type="text"
                name="password"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                variant="outlined"
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "100px",
                    height: "60px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
              <Typography
                fontSize={15}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Wezipe
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={selectedValue}
                  onChange={handleChange}
                  sx={{
                    height: "60px",
                    borderRadius: "100px",
                    width: { lg: "100%", md: "70%", sm: "90%", xs: "90%" },
                  }}
                >
                  {position.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
            alignItems="center"
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
              <Typography
                fontSize={15}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Doglan senesi
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                sx={{ width: "100%", pt: 0 }} // Ensuring no top padding in the parent container
              >
                <DatePicker
                  value={value}
                  format="DD.MM.YYYY"
                  onChange={(newValue) => setValue(newValue)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "100px",
                      height: "60px",
                      width: "100%",
                      paddingTop: 0, // Set padding-top to 0
                    },

                    "& .MuiPaper-root": {
                      borderRadius: "100px", // Radii for dropdown
                    },
                  }}
                />
              </LocalizationProvider>
            </Stack>
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
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
                id="outlined-basic"
                type="text"
                name="password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "100px",
                    height: "60px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
              <Typography
                fontSize={15}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Okan ýeri
              </Typography>

              <TextField
                id="outlined-basic"
                type="text"
                value={education}
                name="password"
                onChange={(e) => setEducation(e.target.value)}
                variant="outlined"
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "100px",
                    height: "60px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>

            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
              <Typography
                fontSize={15}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Ýaşaýan ýeri
              </Typography>

              <TextField
                id="outlined-basic"
                type="text"
                name="password"
                value={live}
                onChange={(e) => setLive(e.target.value)}
                variant="outlined"
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "100px",
                    height: "60px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
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
                id="outlined-basic"
                type="text"
                name="password"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "100px",
                    height: "60px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
            >
              <Typography
                fontSize={15}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Dili
              </Typography>
              <FormControl fullWidth>
                <Select
                  id="simple-select"
                  value={selectedValueLang}
                  onChange={handleChangeLng}
                  sx={{
                    height: "60px",
                    borderRadius: "100px",
                    width: { lg: "100%", md: "70%", sm: "90%", xs: "90%" },
                  }}
                >
                  <MenuItem value="ENG">ENG</MenuItem>
                  <MenuItem value="RUS">RUS</MenuItem>
                  <MenuItem value="TKM">TKM</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </form>
        <Stack alignItems="center" pt={4}>
          <Button
            onClick={handleSubmit}
            disabled={admin.name === email && admin.surname === lastName}
            sx={{
              "&:disabled": { background: "lightgray" },
              background: "#9FC2A6",
              color: "#fff",
              "&:hover": { background: "#9FC2A6" },
              height: "55px",
              width: "250px",
              borderRadius: "50px",
              textTransform: "revert",
              fontSize: 20,
              mb: 3,
            }}
          >
            {loading ? (
              <Stack alignItems="center">
                <CircularProgress sx={{ color: "#fff" }} />
              </Stack>
            ) : (
              "Ýatda sakla"
            )}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UpdateUserInfo;
