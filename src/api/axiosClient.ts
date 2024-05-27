import axios from "axios";

export const client = axios.create({
  // https://api.ronanplugins.com
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
