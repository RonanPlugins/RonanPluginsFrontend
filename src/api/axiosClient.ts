import axios from "axios";

export const backendApi = axios.create({
  // https://api.ronanplugins.com
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const backendApiJSON = axios.create({
  // https://api.ronanplugins.com
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const spigotApi = axios.create({
  baseURL: `https://api.spiget.org/v2/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const discordApi = axios.create({
  baseURL: `https://discord.com/api/v10/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const mcstatusioAPI = axios.create({
  baseURL: `https://api.mcstatus.io/v2`,
  headers: {
    "Content-Type": "application/json",
  },
});
