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
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Capitalize } from "../../../Components/utils";
import AxiosInstance from "../../../Components/db/Redux/api/AxiosHelper";
import moment from "moment";
import { getUserMonthWorkTime } from "../../../Components/db/Redux/api/ComeTimeSlice";
import { getPDF } from "../../../Components/db/Redux/api/PdfSlice";
import LanguageCheckboxes from "./LanguageCheck";
// import { jwtDecode } from "jwt-decode";

const UpdateUserInfo = ({ userData, userId, params, handleClose }) => {
  const admin = JSON.parse(localStorage.getItem("CRM_USER"));
  const userInfo = userData && userData.user;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(userInfo.mail);
  const [phoneNumber, setPhoneNumber] = useState(userInfo.phoneNumber);
  const [logined, setLogined] = useState("");
  const [surname, setSurname] = useState(userInfo.surname);
  const [name, setName] = useState(userInfo.name);
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState(
    userInfo.position ? userInfo.position.id : "ADMIN"
  );

  const [selectedLanguages, setSelectedLanguages] = useState(
    userInfo.languages ? userInfo.languages.split(",") : []
  );

  const [education, setEducation] = useState(userInfo.whereStudy);
  const [live, setLive] = useState(userInfo.whereLive);
  const [value, setValue] = useState(dayjs(userInfo.birthday)); //user birthday
  const [position, setPosition] = useState([]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
        const body = {
          userId: userId,
          date: moment(params).format("YYYY-MM-DD"),
        };
        const response = await AxiosInstance.put("/user/updata/info", {
          userId: userInfo.id,
          surname: Capitalize(surname),
          name: Capitalize(name),
          mail: email,
          phoneNumber: phoneNumber,
          birthday: value.add(1, "day"),
          whereStudy: education,
          whereLive: live,
          languages: selectedLanguages.join(","),
          positionId: selectedValue,
        }).then((res) => {
          res.data
            ? (toast.success("Maglumat üýtgedildi!"),
              dispatch(getUserMonthWorkTime(body)),
              handleClose(),
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

  const handleChangeLang = (event) => {
    const { name, checked } = event.target;
    console.log(event.target);

    setSelectedLanguages((prevLanguages) =>
      checked
        ? [...prevLanguages, name]
        : prevLanguages.filter((lang) => lang !== name)
    );
  };

  return (
    <Stack direction="column" width="95%">
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
            <Stack direction="column" width="100%" justifyContent="flex-start">
              <Typography
                fontSize={13}
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
                    height: "45px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>
            <Stack direction="column" width="100%" justifyContent="flex-start">
              <Typography
                fontSize={13}
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
                    height: "45px",
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
            <Stack direction="column" width="100%" justifyContent="flex-start">
              <Typography
                fontSize={13}
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
                    height: "45px",
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
                fontSize={13}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Doglan senesi
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                sx={{ width: "100%", pt: 0 }}
              >
                <DatePicker
                  value={value}
                  format="DD.MM.YYYY"
                  onChange={(newValue) => setValue(newValue)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "100px",
                      height: "45px",
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
            <Stack direction="column" width="100%" justifyContent="flex-start">
              <Typography
                fontSize={13}
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
                    height: "45px",
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
            <Stack direction="column" width="100%" justifyContent="flex-start">
              <Typography
                fontSize={13}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Okan ýeri (doly ady)
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
                    height: "45px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>

            <Stack direction="column" width="100%" justifyContent="flex-start">
              <Typography
                fontSize={13}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Ýaşaýan ýeri (doly ady)
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
                    height: "45px",
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
            <Stack direction="column" width="100%" justifyContent="flex-start">
              <Typography
                fontSize={13}
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
                    height: "45px",
                  },
                  width: "100%",
                  fontFamily: "Montserrat",
                }}
              />
            </Stack>
            <Stack direction="column" width="100%" justifyContent="flex-start">
              <Typography
                fontSize={13}
                fontWeight={600}
                textAlign="start"
                color="#474747"
                mb="5px"
              >
                Dili
              </Typography>
              <LanguageCheckboxes
                handleChange={handleChangeLang}
                selectedLanguages={selectedLanguages}
              />
              {/* <FormControl fullWidth>
                <Select
                  id="simple-select"
                  value={selectedValueLang}
                  onChange={handleChangeLng}
                  sx={{
                    height: "45px",
                    borderRadius: "100px",
                    width: { lg: "100%", md: "70%", sm: "90%", xs: "90%" },
                  }}
                >
                  <MenuItem value="Turkmen"> Turkmen (TKM)</MenuItem>
                  <MenuItem value="Russian"> Russian (RUS)</MenuItem>
                  <MenuItem value="English"> English (ENG)</MenuItem>
                  <MenuItem value="Chinese">Chinese (Hytaý)</MenuItem>
                  <MenuItem value="Turkish"> Turkish (Türk)</MenuItem>
                  <MenuItem value="German">German (Nemes)</MenuItem>
                </Select>
              </FormControl> */}
            </Stack>
          </Stack>
        </form>
        <Stack alignItems="center" pt={2}>
          <Button
            onClick={handleSubmit}
            disabled={userInfo.name === email && userInfo.surname === surname}
            sx={{
              "&:disabled": { background: "lightgray" },
              background: "#9FC2A6",
              color: "#fff",
              "&:hover": { background: "#9FC2A6" },
              height: "50px",
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
