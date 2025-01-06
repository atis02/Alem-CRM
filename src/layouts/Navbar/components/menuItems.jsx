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
import { Badge } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import GavelIcon from "@mui/icons-material/Gavel";
import LogoutIcon from "@mui/icons-material/Logout";

const user = JSON.parse(localStorage.getItem("CRM_USER"));
const menuItems = user && [
  // { title: "Baş sahypa", link: "/", icon: <HomeIcon /> },
  { title: "Profil", link: "/account", icon: <AccountCircleIcon /> },
  {
    title: "Resminama",
    link: "/document",
    icon: (
      // <Badge badgeContent={1} color="primary">
      <FileCopyIcon />
      // </Badge>
    ),
  },
  {
    title:
      user.role === "USER" || user.role === "MODERATOR"
        ? "Bellikler"
        : "Kalendar",

    link:
      user.role === "USER"
        ? "/"
        : user.role === "MODERATOR"
        ? "/"
        : "/calendar",
    icon: (
      // <Badge badgeContent={1} color="primary">
      <CheckCircleOutlineIcon />
      // </Badge>
    ),
  },
  {
    title: "Proýektler",
    link: "/projects",
    icon: (
      // <Badge badgeContent={1} color="primary">
      <InventoryOutlinedIcon />
      // </Badge>
    ),
  },
  {
    title: "Tertip - düzgün...",
    link: "/standarts/specific/user",
    icon: <GavelIcon />,
  },
  { title: "Söhbetdeşlik", link: "/chat", icon: <ForumIcon /> },
  // user.role !== "USER" &&
  {
    title: "Aýratyn (Tertip...)",
    link: "/standarts/specific",
    icon: <GavelIcon />,
  },
  {
    title: "Ähli işgärler",
    link: "/standarts/all",
    icon: <GavelIcon />,
  },
  { title: "Işgärler", link: "/employees", icon: <Diversity3Icon /> },
  { title: "Bildiriş", link: "/notifications", icon: <NotificationsIcon /> },
  { title: "Sazlamalar", link: "/settings", icon: <SettingsIcon /> },
];
export default menuItems;
