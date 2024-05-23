import axios from "axios";

const client = axios.create({
  // https://api.ronanplugins.com
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "json",
  withCredentials: true,
  crossdomain: true,
});

export default {
  async loginDiscord() {
    // const params = new URLSearchParams({ username, password });

    return client.get(`/auth/discord`);
  },
};
