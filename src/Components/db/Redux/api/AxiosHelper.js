import axios from "axios";

// export const BASE_URL = import.meta.env.VITE_API_KEY;
export const BASE_URL = "http://192.168.1.46/api/";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default AxiosInstance;
