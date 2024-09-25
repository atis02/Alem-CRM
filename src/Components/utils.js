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
export const style = {
  position: "absolute",
  top: "15%",
  left: "35%",
  transform: "translate(-50%, -50%)",
  width: 535,
  bgcolor: "#fff",
  boxShadow: 2,
  borderRadius: "30px",
  p: "30px",
  height: "565px",
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
  { id: 4, title: "Telefon belgisi" },
  { id: 5, title: "Bellik" },
  { id: 6, title: "Gelen wagty" },
  { id: 7, title: "Giden wagty" },
  { id: 8, title: "Gijä galan sagady" },
];
