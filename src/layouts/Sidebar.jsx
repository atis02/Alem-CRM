import React, { useState } from "react";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TelegramIcon from "@mui/icons-material/Telegram";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import {
  MenuItem,
  Menu,
  Sidebar,
  sidebarClasses,
  SubMenu,
} from "react-pro-sidebar";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../Components/db/Redux/reducers/AuthSlice";
import signOut from "../../public/images/Sign Out.png";
import logo from "../../public/images/Logo.png";
import projectIcon from "../../public/images/project.png";
import projectWhiteIcon from "../../public/images/projectWhite.png";

export default function SidebarNav(data, sendingData) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // State to track active SubMenu

  const handleMenuClick = () => {
    setActiveMenu(!activeMenu);
  };
  const user = JSON.parse(localStorage.getItem("CRM_USER"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("CRM_USER");
    setTimeout(() => navigate("/login"), 500);
    // window.location.reload();
    toast.success("Üstünlikli çykyş!");
  };
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#9FC2A6",
            color: "#F3F3F4",
            maxHeight: "100vh",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        className="sidebar"
        style={{
          minHeight: "100vh",
          minWidth: "250px",

          width: { ...(isMobile ? "150px" : "250px") },
          ...(isMobile ? { display: "none" } : { display: "flex" }),
          border: "none",
        }}
      >
        <Stack height="100%">
          <Stack
            // sx={{ ...(open ? "" : { flexDirection: "column" }) }}
            height="54px"
            direction="row"
            alignItems="center"
            justifyContent="center"
            m="20px 30px"
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <Stack
                left="30px"
                top="30px"
                // position="absolute"
                // width={250}
                direction="row"
                alignItems="center"
              >
                <img
                  src={logo}
                  style={{
                    width: "55px",
                    height: "65px",
                  }}
                  alt=""
                />
                <Typography
                  textAlign="center"
                  color="#fff"
                  fontWeight="500"
                  fontSize={16}
                  ml={-2}
                  fontFamily="Montserrat"
                >
                  ÄLEM TILSIMAT
                </Typography>
              </Stack>
            </Link>
          </Stack>
          <Stack height="100%"  justifyContent="center">
            <Menu
              menuItemStyles={{
                button: {
                  "&:hover": {
                    backgroundColor: "#76917c",
                    borderTopLeftRadius: "30px",
                    color: "#fff !important",
                  },
                },
              }}
            >
              {/* <MenuItem
              component={<NavLink className="sideNav" to="/" />}
              icon={<HomeIcon />}
            >
              Baş sahypa
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/dashboard" />}
              icon={<DashboardIcon />}
            >
              Dolandyryş
            </MenuItem> */}

              {/* <MenuItem
              component={<NavLink className="sideNav" to="/chat" />}
              icon={<TelegramIcon />}
            >
              Söhbetdeşlik
            </MenuItem> */}

              <MenuItem
                onClick={() => {
                  setActiveMenu(false);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/account" />}
                icon={<AccountCircleIcon />}
              >
                Profil
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setActiveMenu(false);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/document" />}
                icon={<FileCopyIcon />}
              >
                Resminama
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActiveMenu(false);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/" />}
                icon={<CheckCircleOutlineIcon />}
              >
                {user.role === "USER" ? "Bellikler" : "Kalendar"}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActiveMenu(false);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/projects" />}
                icon={
                  // <img
                  //   src={
                  //     location.pathname === "/projects" ||
                  //     location.pathname == "/projects/"
                  //       ? projectIcon
                  //       : projectWhiteIcon
                  //   }
                  //   alt=""
                  //   style={{ width: 24, height: 24 }}
                  // />
                  <InventoryOutlinedIcon />
                }
                // style={{
                //   ...(user.role === "USER"
                //     ? { display: "none" }
                //     : { display: "flex" }),
                // }}
              >
                Edilmeli işler
              </MenuItem>
              <SubMenu
                label="Işgärler"
                title="Işgärler"
                component={<NavLink className="sideNav" to="/employees" />}
                icon={<Diversity3Icon />}
                suffix={
                  isExpanded ? (
                    <KeyboardArrowDownIcon sx={{ width: 30, height: 30 }} />
                  ) : (
                    <ArrowForwardIosIcon />
                  )
                }
                open={activeMenu == true}
                onClick={() => {
                  handleMenuClick();
                  setIsExpanded(!isExpanded);
                }}
                style={{
                  ...(user.role === "USER"
                    ? { display: "none" }
                    : { display: "flex" }),
                }}
              >
                <Stack
                  sx={{
                    borderLeft: "2px solid #9FC2A5",
                    ml: "35px",
                    mb: 1,
                  }}
                >
                  <MenuItem
                    component={
                      <NavLink className="sideNav2" to="/employees/working" />
                    }
                  >
                    Iş wagtlary
                  </MenuItem>
                  <MenuItem
                    component={
                      <NavLink
                        className="sideNav2"
                        to="/employees/regulating"
                      />
                    }
                  >
                    Tertip - düzgünnama
                  </MenuItem>
                </Stack>
              </SubMenu>
            </Menu>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" p="0 0 50px 20px">
          {/* <PowerSettingsNewIcon sx={{ width: 30, height: 30 }} /> */}
          <img src={signOut} style={{ width: 30, height: 30 }} alt="Sign Out" />
          <Button
            onClick={handleLogout}
            sx={{
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: "20px",
              textTransform: "revert",
            }}
          >
            Ulgamdan çyk
          </Button>
        </Stack>
      </Sidebar>
    </>
  );
}
