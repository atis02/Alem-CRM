import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CreateStandarts from "./components/CreateStandarts";
import { useDispatch, useSelector } from "react-redux";
import { getStandarts } from "../../Components/db/Redux/api/StandartSlice";

const index = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.standarts.status);
  const error = useSelector((state) => state.standarts.error);
  const data = useSelector((state) => state.standarts.data);
  console.log(data);

  const user = JSON.parse(localStorage.getItem("CRM_USER"));

  useEffect(() => {
    dispatch(getStandarts(user.id));
  }, [dispatch]);
  return (
    <Box
      height="100vh"
      width="100%"
      backgroundColor="#f2f9fc"
      overflow="auto"
      p="10px"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p="0 30px 8px 0"
      >
        <Typography
          p="0px 20px 0px 10px"
          fontSize={{ lg: "25px", md: "25px", sm: "20px", xs: "18px" }}
          fontFamily="Montserrat"
          fontWeight="500"
        >
          Tertip - düzgünnama
        </Typography>
        <IconButton
          // onClick={() => {
          //   handleOpen();
          //   setDetails(user);
          // }}
          onClick={handleOpen}
        >
          <BorderColorOutlinedIcon
            sx={{
              color: "#90BAEB",
              width: 20,
              height: 20,
            }}
          />
        </IconButton>
        <CreateStandarts open={open} handleClose={handleClose} />
      </Stack>
      <Stack>
        <Grid container spacing={2}>
          {data.map((elem, index) => (
            <Grid item xs={12} key={index} lg={4} sm={12}>
              <Paper
                sx={{
                  height: "155px",
                  borderRadius: "12px",
                  display: "flex",
                  width: "400px",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="row"
                  width="70%"
                  sx={{
                    ...(elem.id == 4
                      ? {
                          // flexDirection: "column",
                          cursor: "pointer",
                          justifyContent: "center",
                          alignItems: "center",
                        }
                      : ""),
                    gap: "16px",
                  }}
                  justifyContent="center"
                >
                  <Stack>
                    <Typography
                      color="#222222"
                      fontSize={24}
                      fontFamily="DM Sans"
                      fontWeight={600}
                    >
                      {elem.title}
                    </Typography>
                    <Typography
                      color="#666666"
                      fontSize={16}
                      fontFamily="DM Sans"
                      fontWeight={400}
                      className="times"
                      sx={{
                        maxWidth: "100%",
                        height: "100px", // Change to 'auto' to allow dynamic height
                        overflow: "hidden", // This can be removed if you want to show all text
                        display: "-webkit-box", // Use webkit box for multi-line
                        WebkitBoxOrient: "vertical", // Required for webkit box to work
                        overflowY: "auto", // Add this if you want a scrollbar
                        lineClamp: 3, // Limit to 3 lines (you can adjust this number)
                        textAlign: "justify",
                      }}
                    >
                      {elem.description}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default index;
