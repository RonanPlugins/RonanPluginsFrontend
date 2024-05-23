import axios from "axios";

const client = axios.create({
  // https://api.ronanplugins.com
  baseURL: import.meta.env.VITE_API_URL,
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
  async autoLogin() {
    return client
      .get(`${import.meta.env.VITE_API_URL}/auth/login/success`)
      .then((response) => {
        if (response.status === 200) return response;
        throw new Error("authentication failed!");
      })
      .then((response) => {
        console.log("DATA", response);
        return response.data.user;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
