import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Stack,
  TextField,
  Button,
  Typography,
  Backdrop,
  useMediaQuery,
  useTheme,
  Drawer,
  Badge,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  DateCalendar,
  LocalizationProvider,
  StaticTimePicker,
  TimeClock,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Components/db/Redux/api/store";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  MenuItem,
  Menu,
  Sidebar,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Alert from "./../../../public/images/Alert Badge.png";
import search from "../../../public/images/Search (1).png";
import axios from "axios";
import menuItems from "./components/menuItems";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const admin = JSON.parse(localStorage.getItem("CRM_USER"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const data = useSelector((state) => state.imgAccount.data.img);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      height="75px"
      width="100%"
      backgroundColor="#fff"
      boxShadow="0px 1px 8px #999"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextField
        id="input-with-icon-textfield"
        placeholder="Ähli resminamalary gözle"
        fullWidth
        sx={{
          width: { lg: "430px", md: "100%", sm: "100%", xs: "100%" },
          p: { lg: "0 0 0 30px", xs: "0 5px 0 5px" },
        }}
        InputProps={{
          startAdornment: (
            <img
              src={search}
              style={{ width: "24px", height: "24px", marginRight: 10 }}
              alt=""
            />
          ),
          sx: {
            transition: "all ease-in-out 0.2s",
            borderRadius: "35px",
            backgroundColor: "#fff",
            height: "45px",
            color: "#000",
            fontWeight: "600",
            outline: "none",
            boxShadow: "none",
          },
          inputProps: {
            sx: {
              "&::placeholder": {
                color: "#d5dd5", // Set the placeholder color
                fontWeight: 400,
                fontSize: 16,
              },
            },
          },
        }}
        variant="outlined"
      />

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        pr={{ lg: "30px", md: "30px", sm: "30px", xs: "10px" }}
      >
        <Stack
          direction="row"
          sx={{ display: { lg: "flex", md: "flex", sm: "flex", xs: "none" } }}
          alignItems="center"
        >
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              color: "#5C9FE3",
              transition: "all ease-in-out 0.2s",
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            <img
              src={Alert}
              style={{
                width: "30px",
                height: "30px",
              }}
              alt=""
            />
          </IconButton>

          <Backdrop
            sx={{
              backgroundColor: "transparent",
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={() => setOpen(false)}
          >
            <Stack
              position="absolute"
              minWidth={200}
              minHeight={100}
              backgroundColor="#9FC2A6"
              top={65}
              right={150}
              border="1px solid #9FC2A6"
              borderRadius="10px"
              alignItems="center"
              justifyContent="center"
            >
              Sazlamalar ýerinde
            </Stack>
          </Backdrop>
        </Stack>

        <Link
          to="/account"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
          }}
        >
          <IconButton sx={{ height: 60, width: 60 }}>
            {admin.img === null ? (
              <Avatar
                alt={admin.name}
                src={admin.name}
                sx={{ background: "#9FC2A6", height: 50, width: 50 }}
              />
            ) : (
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "100px",
                }}
                src={`http://192.168.1.46/images/${admin.img}`}
                alt=""
              />
            )}
          </IconButton>
          <Stack direction="column" alignItems="center">
            <Typography
              color="#474747"
              fontFamily="Montserrat"
              sx={{
                display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
              }}
              fontSize={16}
              fontWeight={500}
            >
              {admin.name}.{admin.surname}
            </Typography>

            <Typography
              color="#A6A6A6"
              fontFamily="Montserrat"
              sx={{
                display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
              }}
              fontSize={13}
              fontWeight={400}
              lineHeight="15px"
            >
              {admin.position == null ? "ADMIN" : admin.position.name}
            </Typography>
          </Stack>
        </Link>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ ...(isMobile ? { display: "flex" } : { display: "none" }) }}
        >
          <IconButton
            onClick={toggleMobileMenu}
            sx={{
              width: 24,
              height: 24,
              p: 0,
            }}
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          sx={{
            "& .MuiDrawer-paper": {
              width: "60%",
              backgroundColor: "transparent",
              backdropFilter: "blur(5px)",
            },
          }}
        >
          <Box
            className="mobile-menu"
            sx={{
              bg: "#000",
              height: "100%",
              padding: "16px 0",
            }}
          >
            <Stack
              spacing={2}
              direction="column"
              height="35px"
              alignItems="center"
            >
              <Button onClick={toggleMobileMenu}>
                <svg
                  fillRule="evenodd"
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="close"
                  width="2em"
                  height="2em"
                  fill="#fff"
                  aria-hidden="true"
                >
                  <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                </svg>
              </Button>
              <Stack direction="column" alignItems="center" spacing={2}>
                <Stack>
                  <Stack
                    sx={{ ...(open ? "" : { flexDirection: "column" }) }}
                    height="54px"
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    m="0px 30px"
                  >
                    <Link style={{ textDecoration: "none" }} to="/">
                      <Typography
                        color="#F3F3F4"
                        fontWeight="700"
                        sx={{
                          ...(open
                            ? { fontSize: "30px" }
                            : { fontSize: "18px" }),
                        }}
                        textAlign="center"
                        fontFamily="Montserrat"
                      >
                        Älem Doc
                      </Typography>
                    </Link>
                  </Stack>
                  <Menu
                    menuItemStyles={{
                      button: {
                        "&:hover": { backgroundColor: "#1976d2" },
                      },
                    }}
                  >
                    {menuItems.map((elem) => (
                      <MenuItem
                        key={elem}
                        component={
                          <NavLink className="sideNavMobile" to={elem.link} />
                        }
                        icon={elem.icon}
                      >
                        {elem.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>
                <Stack>
                  <Button
                    sx={{
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      fontSize: "12px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    <HelpOutlineIcon sx={{ width: 30, height: 30 }} />
                    Kömek
                  </Button>
                  <Button
                    // onClick={Logout}
                    sx={{
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      fontFamily: "Montserrat",
                      fontSize: "11px",
                    }}
                  >
                    <PowerSettingsNewIcon sx={{ width: 30, height: 30 }} />
                    Çykmak
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Drawer>
      </Stack>
    </Box>
  );
}
