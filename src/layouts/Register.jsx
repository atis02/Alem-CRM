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
// import { jwtDecode } from "jwt-decode";

const Register = ({ openModal }) => {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+993");
  const [logined, setLogined] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueLang, setSelectedValueLang] = useState("TKM");
  const [education, setEducation] = useState("");
  const [live, setLive] = useState("");
  const [value, setValue] = useState(dayjs());
  const [position, setPosition] = useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeLng = (event) => {
    setSelectedValueLang(event.target.value);
  };
  const handleLogin = () => {
    openModal(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim().length <= 0 || password.trim().length <= 0) {
        toast.error("Dogry maglumatyňyzy giriziň!");
      } else {
        setLoading(true);
        const response = await AxiosInstance.post("/user/registration", {
          login: logined,
          pass: password,
          surname: Capitalize(surname),
          name: Capitalize(name),
          mail: email,
          phoneNumber: phoneNumber,
          birthday: value,
          whereStudy: education,
          whereLive: live,
          languages: selectedValueLang,
          role: "USER",
          positionId: selectedValue,
        }).then((res) =>
          res.data
            ? (setTimeout(() => navigate("/login"), 2000),
              toast.success("Üstünlikli registrasiýa!"),
              setEmail(""),
              setPhoneNumber("+993"),
              setLogined(""),
              setSurname(""),
              setName(""),
              setPassword(""),
              setLoading(false),
              setEducation(""),
              setSelectedValue(""),
              setSelectedValueLang(""),
              setLive(""),
              setValue(dayjs()),
              openModal(false))
            : ""
        );
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
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <Stack
      direction="column"
      alignItems="center"
      height="100vh"
      justifyContent="center"
      width={{ lg: "60%", md: "60%", sm: "100%", xs: "100%" }}
    >
      <Stack
        width={{ lg: "65%", md: "80%", sm: "97", xs: "97%" }}
        height={650}
        boxShadow="0px 0px 22px 3px rgba(168,168,168,1)"
        justifyContent="center"
        borderRadius="20px"
      >
        <Typography
          mb="10px"
          color="#474747"
          fontSize="30px"
          fontFamily="Montserrat"
          fontWeight="600"
          textAlign="start"
          ml={3}
        >
          Hasaba alyş
        </Typography>
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
            <TextField
              id="outlined-basic"
              label="Ady"
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
                width: "90%",
                fontFamily: "Montserrat",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Familiýasy"
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
                width: "90%",
                fontFamily: "Montserrat",
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
          >
            <TextField
              id="outlined-basic"
              label="Login"
              type="text"
              variant="outlined"
              autoComplete="off"
              name="username"
              value={logined}
              onChange={(e) => setLogined(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "60px",
                  borderRadius: "100px",
                },
                fontFamily: "Montserrat",
                width: { lg: "100%", md: "70%", sm: "90%", xs: "90%" },
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Wezipe</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={selectedValue}
                onChange={handleChange}
                label="Select Item"
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
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
            alignItems="center"
          >
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              sx={{ width: "100%", pt: 0 }} // Ensuring no top padding in the parent container
            >
              <DemoContainer
                sx={{ width: "100%", pt: "4px" }} // Removing top padding from DemoContainer
                components={["DatePicker", "DatePicker"]}
              >
                <DatePicker
                  label="Doglan senesi"
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
              </DemoContainer>
            </LocalizationProvider>

            <TextField
              id="outlined-basic"
              label="Poçta"
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
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
          >
            <TextField
              id="outlined-basic"
              label="Okan ýeri"
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
                width: "90%",
                fontFamily: "Montserrat",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Ýaşaýan ýeri"
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
                width: "90%",
                fontFamily: "Montserrat",
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            width="90%"
            spacing={2}
          >
            <TextField
              id="outlined-basic"
              label="Telefon belgiňiz"
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
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Dili</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={selectedValueLang}
                onChange={handleChangeLng}
                label="Select Item"
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
          <Stack direction="column" width="90%" spacing={2}>
            <Stack direction="row" width="100%" spacing={2}>
              <TextField
                id="outlined-basic"
                label="Parol"
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "60px",
                    borderRadius: "100px",
                  },
                  width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                  fontFamily: "Montserrat",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Paroly gaytala"
                type="text"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                autoComplete="off"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "60px",
                    borderRadius: "100px",
                  },
                  width: { lg: "70%", md: "70%", sm: "90%", xs: "90%" },
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>
          </Stack>
          <Stack
            // direction="row"
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            width="90%"
            mt={2}
          >
            <Stack
              // direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
              direction="row"
              spacing={2}
            >
              <Button
                onClick={handleLogin}
                style={{
                  color: "#00159D",
                  fontSize: 15,
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  textDecoration: "none",
                  textTransform: "revert",
                }}
              >
                Siziň hasabyňyz barmy? Şu ýere giriň
              </Button>
            </Stack>
            <Button
              type="submit"
              // onClick={handleSubmit}
              sx={{
                backgroundColor: "blue",
                color: "#fff",
                "&:hover": { background: "black" },
                fontFamily: "Montserrat",
                height: "55px",
                width: { lg: "160px", md: "160px", sm: "100%", xs: "100%" },

                borderRadius: "100px",
              }}
            >
              {loading ? (
                <Stack alignItems="center">
                  <CircularProgress sx={{ color: "#fff" }} />
                </Stack>
              ) : (
                "Hasaba gir"
              )}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
