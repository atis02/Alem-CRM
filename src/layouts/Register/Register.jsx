import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AxiosInstance from "../../Components/db/Redux/api/AxiosHelper";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Capitalize } from "../../Components/utils";
import LanguageCheckboxes from "../../Pages/EmployeesProfile/components/LanguageCheck";

const turkmenPhoneRegex = /^\+?993\s?\d{2}\s?\d{6}$/;

const Register = ({ openModal, handleNext }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+993");
  const [logined, setLogined] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [education, setEducation] = useState("");
  const [live, setLive] = useState("");
  const [value, setValue] = useState(dayjs());
  const [position, setPosition] = useState([]);
  const [passwordConf, setPasswordConf] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [error, setError] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(["TKM"]);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleLogin = () => {
    openModal(true);
  };
  useEffect(() => {
    const position = async () => {
      await AxiosInstance.get("/position/get").then((res) => {
        setPosition(res.data);
      });
    };

    position();
  }, []);
  const formatPhoneNumber = (input) => {
    // Apply spacing for the phone number format "+993 XX XX XX XX"
    const cleanedInput = input.replace(/[^+\d]/g, ""); // Remove invalid characters
    return cleanedInput.replace(
      /(\+993)(\d{2})?(\d{2})?(\d{2})?(\d{2})?/,
      (match, p1, p2, p3, p4, p5) =>
        [p1, p2, p3, p4, p5].filter(Boolean).join(" ")
    );
  };
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("RegisterData"));

    if (savedData) {
      setEmail(savedData.mail || "");
      const formattedNumber = formatPhoneNumber(savedData.phoneNumber);
      setPhoneNumber(formattedNumber || "+993");
      setLogined(savedData.login || "");
      setSurname(savedData.surname || "");
      setName(savedData.name || "");
      setPassword(savedData.pass || "");
      setPasswordConf(savedData.pass || "");
      setSelectedValue(savedData.positionId || null);
      setEducation(savedData.whereStudy || "");
      setLive(savedData.whereLive || "");
      setValue(dayjs(savedData.birthday) || dayjs());
      setSelectedLanguages(savedData.languages || "TKM");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        email.trim().length <= 0 ||
        password.trim().length <= 0 ||
        passwordConf.trim().length <= 0 ||
        surname.trim().length <= 0 ||
        name.trim().length <= 0 ||
        phoneNumber == "+993" ||
        value === "" ||
        education.trim().length <= 0 ||
        selectedLanguages.length <= 0 ||
        selectedValue.trim().length <= 0 ||
        live.trim().length <= 0
      ) {
        toast.error("Doly maglumatyňyzy giriziň!");
        setError(true);
        setError(true);
      } else {
        setError(false);

        setLoading(true);
        const registerData = {
          pass: password,
          surname: Capitalize(surname),
          name: Capitalize(name),
          mail: email,
          phoneNumber: phoneNumber,
          birthday: value,
          whereStudy: education,
          whereLive: live,
          languages: selectedLanguages,
          role: "USER",
          positionId: selectedValue,
        };
        localStorage.setItem("RegisterData", JSON.stringify(registerData));
        handleNext();
      }
    } catch (error) {
      toast.error(
        error.message === "Network Error"
          ? "Internet baglanyşygy ýok"
          : error.response.data
      );

      console.log(error);
    }
  };
  const handleChangeLang = (event) => {
    const { name, checked } = event.target;

    setSelectedLanguages((prevLanguages) =>
      checked
        ? [...prevLanguages, name]
        : prevLanguages.filter((lang) => lang !== name)
    );
  };
  const handleChangePhoneNumber = (e) => {
    const input = e.target.value;
    const cleanedInput = input.replace(/[^+\d]/g, "");
    if (!cleanedInput.startsWith("+993")) {
      setPhoneError(true);
      setPhoneNumber(cleanedInput); // Show partially typed number
      return;
    }
    setPhoneError(false);
    const formattedNumber = cleanedInput.replace(
      /(\+993)(\d{2})?(\d{2})?(\d{2})?(\d{2})?/,
      (match, p1, p2, p3, p4, p5) => {
        return [p1, p2, p3, p4, p5].filter(Boolean).join(" ");
      }
    );
    setPhoneNumber(formattedNumber);
  };
  const handleChangeEmail = (e) => {
    const input = e.target.value;
    setEmail(input);
  };
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="300%"
      pt={2}
      ml={2}
    >
      <Stack
        // width={{ lg: "65%", md: "80%", sm: "97", xs: "97%" }}
        width="70%"
        height={580}
        boxShadow="0px 0px 22px 3px rgba(168,168,168,1)"
        justifyContent="center"
        borderRadius="20px"
      >
        <Typography
          mb="10px"
          color="#474747"
          fontSize="25px"
          fontFamily="Montserrat"
          fontWeight="600"
          textAlign="start"
          ml={3}
        >
          {/* Hasaba alyş */}
          Esasy Maglumatlar
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
            {/* <TextField
              id="outlined-basic"
              label="Login / Telefon belgi"
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
            /> */}
            <TextField
              id="outlined-basic"
              label="Login / Telefon belgiňiz"
              type="text"
              value={phoneNumber}
              // onChange={(e) => {
              //   // const isNumber = /^\d+(\.\d+)?$/;
              //   const isNumber = /^\+\d+(\.\d+)?$/;
              //   // const isNumber = /^\+993\s\d{2}\s\d{6}$/;
              //   const inputValue = e.target.value;

              //   const flag = isNumber.test(e.target.value);
              //   const numericValue = inputValue.replace(/\D/g, "");
              //   const formattedValue =
              //     numericValue.match(/.{1,2}/g)?.join(" ") ?? "";

              //   if (flag) {
              //     console.log(flag);
              //     setPhoneNumber(formattedValue);
              //   }
              // }}
              onChange={handleChangePhoneNumber}
              variant="outlined"
              error={phoneError} // Show error if phoneError is true
              helperText={
                phoneError
                  ? "Telefon belgiňizi dogry formatda giriziň (+993 61 00 00 01)"
                  : ""
              }
              inputProps={{
                maxLength: 15,
                pattern: "\\+993-\\d{2}-\\d{2}-\\d{2}-\\d{2}", // Regex for the phone number
              }}
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
              <InputLabel id="simple-select-label">Wezipe</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select"
                value={selectedValue}
                onChange={handleChange}
                label="Wezipe"
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
              type="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              variant="outlined"
              autoComplete="off"
              error={error}
              // helperText={
              //   error ? "E-poçta format (e.g., example@mail.com)" : null
              // }
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
              error={education.length < 10}
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
              error={live.length < 10}
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
            {/* <TextField
              id="outlined-basic"
              label="Telefon belgiňiz"
              type="text"
              name="password"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
              // onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
              inputProps={{
                maxLength: 11,
                // pattern: "\\+993-\\d{2}-\\d{2}-\\d{2}-\\d{2}", // Regex for the phone number
              }}
              helperText="Format: +993-XX-XX-XX-XX"
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "100px",
                  height: "60px",
                },
                width: "100%",
                fontFamily: "Montserrat",
              }}
            /> */}
            {/* <FormControl fullWidth>
              <InputLabel id="simple-select-label">Dili</InputLabel>
              <Select
                label="Dili"
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
            </FormControl> */}
            <Stack
              direction="row"
              // flexWrap="wrap"
              spacing={2}
              width="100%"
              justifyContent="center"
              height="50px"
              alignItems="center"
            >
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
            </Stack>
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
                value={passwordConf}
                name="password"
                onChange={(e) => setPasswordConf(e.target.value)}
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
              width="100%"
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
              onClick={handleSubmit}
              sx={{
                backgroundColor: "blue",
                color: "#fff",
                "&:hover": { background: "black" },
                fontFamily: "Montserrat",
                height: "55px",
                width: { lg: "120px", md: "100px", sm: "100%", xs: "100%" },

                borderRadius: "100px",
              }}
            >
              {loading ? (
                <Stack alignItems="center">
                  <CircularProgress sx={{ color: "#fff" }} />
                </Stack>
              ) : (
                "Indiki"
              )}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
