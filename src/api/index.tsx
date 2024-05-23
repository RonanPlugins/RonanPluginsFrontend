import axios from "axios";

const client = axios.create({
  // https://api.ronanplugins.com
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "json",
  withCredentials: true,
});

export default {
  async loginDiscord() {
    // const params = new URLSearchParams({ username, password });
    window.open(`${import.meta.env.VITE_API_URL}/auth/discord`);
    // return client.get(`/auth/discord`);
  },
  async logout() {
    client.post("/auth/logout");
  },
};
