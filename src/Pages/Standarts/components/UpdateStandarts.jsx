import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Capitalize } from "../../../Components/utils";
import { getUsers } from "../../../Components/db/Redux/api/UserSlice";
import CloseIcon from "@mui/icons-material/Close";
import {
  postStandart,
  updateStandart,
} from "../../../Components/db/Redux/api/StandartSlice";
import { toast } from "react-toastify";

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

const UpdateStandarts = ({ openUpdate, handleClose, data, userId }) => {
  const UsersData = useSelector((state) => state.users.data);
  const [userData, setUserData] = useState([data && data]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [description, setDescription] = useState(data && data.description);
  const [title, setTitle] = useState(data && data.title);

  useEffect(() => {
    data && setUserData(data);
    data && setTitle(data.title);
    data && setDescription(data.description);
  }, [data]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "0px solid lightgray",
    gap: "10px",
    maxHeight: 650,

    minHeight: 500,
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
      id: userData.id,
      title: title,
      description: description,
      usersId: selectedUser.length
        ? selectedUser
        : userData.users.map((user) => user.id),
      userId: userId,
    };

    if (title && description) {
      dispatch(updateStandart(body));
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
    <Modal open={openUpdate} onClose={handleClose}>
      <Box sx={style}>
        <Stack
          width="100%"
          bgcolor="#00B69B"
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
            {userData.title}
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
            fullWidth
            defaultValue={data && data.users}
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
          {/* <TextareaAutosize
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3} // Sets the minimum number of visible rows
            maxRows={16} // Optionally set a maximum height
            placeholder="Resizable Text Area"
            style={{
              width: "100%", // Set to 100% of its container's width
              resize: "vertical", // Enables vertical resizing
              padding: "8px", // Optional padding for better styling
              fontSize: "16px",
            }}
          /> */}
          <TextField
            label="Beýan"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            minRows={6}
            maxRows={18}
            fullWidth
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                resize: "vertical", // Only allows vertical resizing
              },
            }} // Margin top for spacing
          />
          <Stack alignItems="end" mt={2} mb={1}>
            <Button
              onClick={handleSubmit}
              // variant="contained"
              // sx={{ mt: 2, bgcolor: "#00B69B" }}
              sx={{
                border: "1px solid #00b69b",
                width: 115,
                height: 40,
                textTransform: "revert",
                borderRadius: "20px",
                color: "#00B69B",
                backgroundColor: "#f0f7ff",
              }}
            >
              Goşmak
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdateStandarts;
