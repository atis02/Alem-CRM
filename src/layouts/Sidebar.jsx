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
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from "@mui/icons-material/Settings";
import GavelIcon from "@mui/icons-material/Gavel";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";

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
import logo from "../../public/images/alemtilsimat.png";
// import projectIcon from "../../public/images/project.png";
// import projectWhiteIcon from "../../public/images/projectWhite.png";

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
            backgroundColor: "#F8F9FA",
            color: "#606C8F",
            maxHeight: "100%",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px !important",
            borderRight: "1px solid lightgray",
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
                    width: "auto",
                    height: "75px",
                  }}
                  alt=""
                />
                {/* <Typography
                  textAlign="center"
                  color="#606C8F"
                  fontWeight="500"
                  fontSize={16}
                  ml={-2}
                  fontFamily="Montserrat"
                >
                  ÄLEM TILSIMAT
                </Typography> */}
              </Stack>
            </Link>
          </Stack>
          <Stack height="100%" justifyContent="center">
            <Menu
              menuItemStyles={{
                button: {
                  "&:hover": {
                    borderRadius: "7px",
                    backgroundColor: "#E9ECEF",
                    color: "#606C8F !important",
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setActiveMenu(null);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/account" />}
                icon={<AccountCircleIcon />}
              >
                Profil
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setActiveMenu(null);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/document" />}
                icon={<FileCopyIcon />}
              >
                Resminama
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActiveMenu(null);
                  setIsExpanded(false);
                }}
                component={
                  <NavLink
                    className="sideNav"
                    to={
                      user.role === "USER"
                        ? "/"
                        : user.role === "MODERATOR"
                        ? "/"
                        : "/calendar"
                    }
                  />
                }
                icon={<CheckCircleOutlineIcon />}
              >
                {user.role === "USER" || user.role === "MODERATOR"
                  ? "Bellikler"
                  : "Kalendar"}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActiveMenu(null);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/projects" />}
                icon={<InventoryOutlinedIcon />}
              >
                Proýektler
              </MenuItem>

              {/* <SubMenu
                label="Tertip - düzgünnama"
                title="Tertip - düzgünnama"
                component={<NavLink className="sideNav" to="/standarts" />}
                icon={<GavelIcon />}
                suffix={
                  isExpanded ? (
                    <KeyboardArrowDownIcon sx={{ width: 30, height: 30 }} />
                  ) : (
                    <ArrowForwardIosIcon />
                  )
                }
                open={activeMenu}
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
                      <NavLink className="sideNav2" to="/standarts/all" end />
                    }
                  >
                    Ähli Işgärler
                  </MenuItem>
                  <MenuItem
                    component={
                      <NavLink className="sideNav2" to="/standarts/specific" />
                    }
                  >
                    Aýratyn
                  </MenuItem>
                </Stack>
              </SubMenu> */}
              <MenuItem
                style={{
                  ...(user.role !== "USER"
                    ? { display: "none" }
                    : { display: "flex" }),
                }}
                icon={<GavelIcon />}
                component={
                  <NavLink className="sideNav" to="/standarts/specific" />
                }
              >
                Tertip - düzgünnama
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActiveMenu(null);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/employees" />}
                icon={<Diversity3Icon />}
                style={{
                  ...(user.role === "USER"
                    ? { display: "none" }
                    : { display: "flex" }),
                }}
              >
                Işgärler
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setActiveMenu(null);
                  setIsExpanded(false);
                }}
                component={<NavLink className="sideNav" to="/chat" />}
                icon={<ForumIcon />}
              >
                Söhbetdeşlik
              </MenuItem>
              <MenuItem
                style={{
                  ...(user.role == "USER"
                    ? { display: "none" }
                    : { display: "flex" }),
                }}
                component={
                  <NavLink className="sideNav" to="/standarts/specific" />
                }
                icon={<GavelIcon />}
              >
                Aýratyn (Tertip-düzgünnama)
              </MenuItem>
              <MenuItem
                style={{
                  ...(user.role == "USER"
                    ? { display: "none" }
                    : { display: "flex" }),
                }}
                component={<NavLink className="sideNav" to="/standarts/all" />}
                icon={<GavelIcon />}
              >
                Ähli işgärler (Tertip-düzgünnama)
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActiveMenu(null);
                  setIsExpanded(false);
                }}
                icon={<SettingsIcon />}
                component={<NavLink className="sideNav" to="/settings" />}
                style={{
                  ...(user.role === "USER"
                    ? { display: "none" }
                    : { display: "flex" }),
                }}
              >
                Sazlamalar
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" p="0 0 50px 18px">
          {/* <PowerSettingsNewIcon sx={{ width: 30, height: 30 }} /> */}
          {/* <img src={signOut} style={{ width: 30, height: 30 }} alt="Sign Out" /> */}
          <LogoutIcon sx={{ color: "#606C8F" }} />

          <Button
            onClick={handleLogout}
            sx={{
              color: "#606C8F",
              display: "flex",
              flexDirection: "column",
              fontFamily: "Montserrat",
              fontWeight: 500,
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
