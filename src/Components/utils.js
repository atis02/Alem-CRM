import { Stack, styled, TableRow, Typography } from "@mui/material";

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const turkmenWeekdays = [
  "Düşenbe", // Sunday
  "Sişenbe", // Monday
  "Çarşenbe", // Tuesday
  "Penşenbe", // Wednesday
  "Anna", // Thursday
  "Şenbe", // Friday
  "Ýekşenbe", // Saturday
];
export const turkmenMonths = [
  "Ýanwar", // January
  "Fewral", // February
  "Mart", // March
  "Aprel", // April
  "Maý", // May
  "Iýun", // June
  "Iýul", // July
  "Awgust", // August
  "Sentýabr", // September
  "Oktýabr", // October
  "Noýabr", // November
  "Dekabr", // December
];
export const user = JSON.parse(localStorage.getItem("CRM_USER"));
export function Capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export const RandomBgColor = () => {
  const colors = ["#00B69B", "#FF9E58", "#E951BF", "#7551E9"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const projects = [
  { name: "Arzan Al", id: 1 },
  { name: "Alem CRM", id: 2 },
  { name: "HMDU", id: 3 },
  { name: "Rysgal Market", id: 4 },
];
export const style = {
  position: "absolute",
  top: "10%",
  left: "35%",
  transform: "translate(-50%, -50%)",
  width: 535,
  bgcolor: "#fff",
  boxShadow: 2,
  borderRadius: "30px",
  p: "10px 30px ",
  height: "575px",
  // overflow: "scroll",
  // "&::-webkit-scrollbar": {
  //   display: "none",
  // },
};
export const style3 = {
  position: "absolute",
  top: "10%",
  left: "35%",
  transform: "translate(-50%, -50%)",
  width: 535,
  bgcolor: "#fff",
  boxShadow: 2,
  borderRadius: "30px",
  p: "30px ",
  height: "575px",
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};
export const style2 = {
  position: "absolute",
  top: "20%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  width: 635,
  bgcolor: "#fff",
  boxShadow: 2,
  borderRadius: "30px",
  p: "30px",
  height: "350px",
};

export const items = [
  { id: 1, title: "№" },
  { id: 2, title: "Ady" },
  { id: 3, title: "Familiýasy" },
  { id: 5, title: "Gelen wagty" },
  { id: 6, title: "Giden wagty" },
  { id: 7, title: "Gijä galan sagady" },
  { id: 8, title: "Bellik" },
];
export const NonActiveUserItems = [
  { id: 1, title: "№" },
  { id: 2, title: "Ady" },
  { id: 3, title: "Familiýasy" },
  // { id: 4, title: "Wezipesi" },
  { id: 5, title: "Statusy" },
];
export const personalItems = [
  { id: 1, title: "Sene" },
  { id: 2, title: "Gelen wagty" },
  { id: 3, title: "Giden wagty" },
  { id: 4, title: "Işlän sagady" },
  { id: 5, title: "Gijä galan sagady" },
  { id: 6, title: "Bellik" },
];
export const projectTitles = [
  { id: 1, title: "Proýekt" },
  { id: 2, title: "Ýerine ýetirýän" },
  { id: 3, title: "Wagty" },
  { id: 4, title: "Derejesi" },
  { id: 5, title: "Wajyplygy" },
  { id: 6, title: "Statusy" },
];
export const projectTitlesForUser = [
  { id: 1, title: "Proýekt" },
  { id: 2, title: "Ýerine ýetirýän" },
  { id: 3, title: "Wagty" },
  { id: 4, title: "Derejesi" },
  { id: 5, title: "Wajyplygy" },
  { id: 6, title: "Statusy" },
  { id: 7, title: "" },
];
export const projectTitlesFor = [
  { id: 1, title: "Proýekt" },
  { id: 3, title: "Wagty" },
  { id: 4, title: "Derejesi" },
  { id: 5, title: "Wajyplygy" },
  { id: 6, title: "Statusy" },
];
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  fontFamily: "DM Sans, sans-serif",
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9fafc",
  },
  "&:hover": {
    backgroundColor: "#f9fafc",
  },
}));
export const  docTypes= [
 { id:0, title:'Dogluş hakynda şahadatnama'},
 { id:1, title:'Pasport'},
 { id:2, title:'Nika hakynda şahadatnama'},
 { id:3, title:'Diplom , Attestat'},
 { id:4, title:'Sertifikat'},
]
export  const lng = [
  { title: 'RUS' },
  { title: 'ENG' },
  { title: 'TKM' },
];