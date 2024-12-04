import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grow,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { changeLoginPassword } from "../../../Components/db/Redux/api/StandartSlice";

const style = {
  position: "absolute",
  top: "30%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
export const user = JSON.parse(localStorage.getItem("CRM_USER"));

const NewPassLoginUpdate = ({ open, handleClose, userData }) => {
  const [newPassUser, setNewPassUser] = useState("");
  const [textFieldValues, setTextFieldValues] = useState({
    field1: "",
    field2: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    userData !== null && setNewPassUser(userData);
  }, [userData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTextFieldValues({ ...textFieldValues, [name]: value });
  };

  const handleSubmit = () => {
    const body = {
      editorId: user.id,
      userId: newPassUser.id,
      newLogin: textFieldValues.field1,
      newPassword: textFieldValues.field2,
    };
    console.log(body);

    if (
      user &&
      newPassUser !== "" &&
      textFieldValues.field1 !== "" &&
      textFieldValues.field2 !== ""
    ) {
      dispatch(changeLoginPassword(body));
      handleClose();
      setTextFieldValues({ field1: "", field2: "" });
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Grow in={open}>
          <Box sx={style}>
            <Typography variant="h6" textAlign="center" mb={2}>
              {newPassUser.name} {newPassUser.surname}
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Täze Login"
                name="field1"
                value={textFieldValues.field1}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Täze Açar söz"
                name="field2"
                value={textFieldValues.field2}
                onChange={handleInputChange}
                fullWidth
              />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={handleClose} variant="outlined">
                  Yza
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                  Çalyşmak
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grow>
      </Modal>
    </>
  );
};

export default NewPassLoginUpdate;
