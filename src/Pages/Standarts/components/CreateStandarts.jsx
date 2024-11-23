import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Capitalize } from "../../../Components/utils";
import { getUsers } from "../../../Components/db/Redux/api/UserSlice";
import CloseIcon from "@mui/icons-material/Close";
import { postStandart } from "../../../Components/db/Redux/api/StandartSlice";
import { toast, ToastContainer } from "react-toastify";

// Custom Paper component for Autocomplete
const CustomPaper = (props) => (
  <Paper
    {...props}
    sx={{
      maxHeight: 300, // Set max height for the dropdown
      overflow: "scroll", // Enable scrolling
    }}
  />
);

const CreateStandarts = ({ open, handleClose, userId }) => {
  const UsersData = useSelector((state) => state.users.data);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "0px solid lightgray",
    gap: "10px",
    width: "95%",
    maxHeight: "95%",
    minHeight: 700,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Handler for selecting users
  const handleChange = (event, newValue) => {
    if (newValue.some((user) => user.id === "selectAll")) {
      setUsers(UsersData);
      setSelectedUser(UsersData.map((user) => user.id));
    } else {
      setUsers(newValue);
      setSelectedUser(newValue.map((user) => user.id));
    }
  };

  const optionsWithSelectAll = [
    { id: "selectAll", name: "Ählisi", surname: "" },
    ...UsersData,
  ];
  const handleSubmit = () => {
    const body = {
      title: title,
      description: description,
      usersId: selectedUser,
      userId: userId,
    };
    if (title && description && selectedUser.length) {
      dispatch(postStandart(body));
      handleClose();
      setTitle("");
      setDescription("");
      setUsers([]);
      setSelectedUser([]);
    } else {
      toast.error("Maglumatlary giriziň!");
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
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
            Täze tertip - düzgünnama
          </Typography>
          <IconButton onClick={handleClose}>
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
          <TextField
            label="Tertip - düzgünnama ady"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, mt: 1 }} // Margin top for spacing
          />
          <Autocomplete
            id="combo-box-demo"
            multiple
            multiline
            rows={4} // Set the number of visible rows
            value={users}
            fullWidth
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={optionsWithSelectAll}
            getOptionLabel={(option) =>
              `${Capitalize(option.name)} ${Capitalize(option.surname || "")}`
            }
            onChange={handleChange}
            PaperComponent={CustomPaper} // Use the custom Paper component
            renderInput={(params) => (
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    width: "100%",
                  },
                }}
                {...params}
                label="Adyny ýazyň ýa-da saýlaň"
                fullWidth
                autoComplete="off"
                placeholder="Ady ýa-da Familiýasy"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>,
                }}
              />
            )}
          />
          <TextField
            label="Beýan"
            multiline
            minRows={15}
            maxRows={15}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mt: 2, height: "100%" }} // Margin top for spacing
          />
          <Stack alignItems="end" mt={2} mb={1}>
            <Button
              onClick={handleSubmit}
              // variant="contained"
              // sx={{ mt: 2, bgcolor: "#2F6FD0" }}
              sx={{
                border: "1px solid #2F6FD0",
                width: 115,
                height: 40,
                textTransform: "revert",
                borderRadius: "20px",
                color: "#2F6FD0",
                backgroundColor: "#f0f7ff",
              }}
            >
              Ýatda sakla
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateStandarts;
