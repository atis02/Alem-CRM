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

const CreateStandarts = ({ open, handleClose }) => {
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
    width: "35%",
    bgcolor: "background.paper",
    border: "0px solid lightgray",
    gap: "10px",
    maxHeight: 550,
    height: 460,
    // justifyContent: "center",
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

  return (
    <Modal open={open} onClose={handleClose}>
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
            Täze tertip - düzgünnama
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
        <Stack width="95%" p={1} height={550} overflow="auto" className="times">
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
            rows={4} // Set the number of visible rows
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }} // Margin top for spacing
          />

          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ mt: 2, bgcolor: "#00B69B" }}
          >
            Goşmak
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateStandarts;
